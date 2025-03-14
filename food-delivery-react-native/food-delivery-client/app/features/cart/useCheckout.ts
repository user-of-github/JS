import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { useStripe } from '@stripe/stripe-react-native';
import { orderService } from '@/services/order.service';
import { useActions } from '@/store/useActions';
import { useCart } from './useCart';

export const useCheckout = () => {
  const { items } = useCart();
  const { reset } = useActions();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const { mutateAsync: placeOrder } = useMutation({
    mutationKey: ['placeOrder'],
    mutationFn: () =>
      orderService.placeOrder({
        items: items.map((item) => ({
          price: item.price,
          count: item.count,
          productId: item.product.id
        }))
      })
  });

  const onCheckout = async () => {
    try {
      const { clientSecret } = await placeOrder();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'UserOfGitHub',
        paymentIntentClientSecret: clientSecret
      });

      if (error) {
        console.error('Error initializing payment sheet: ', error);
        Toast.show({
          text1: 'Payment error',
          text2: 'Error initializing payment sheet'
        });
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        console.error('Error presenting payment sheet: ', paymentError);
        Toast.show({
          text1: 'Payment error',
          text2: 'Error presenting payment sheet'
        });
      }

      reset();
      Toast.show({
        text1: 'Success',
        text2: 'Payment successfully saved'
      });
    } catch {
      Toast.show({
        text1: 'Payment error',
        text2: 'Try again later'
      });
    }
  };

  return { onCheckout };
};
