import { useActions } from '@/store/useActions';
import { useStripe } from '@stripe/stripe-react-native';
import { useMutation } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import { useAuth } from '@/features/auth/AuthProvider';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useCart } from './useCart';

export const useCheckout = () => {
  const { items, total } = useCart();
  const { user } = useAuth();
  const { reset } = useActions();
  const { navigate } = useAppNavigation();

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
        return;
      }
    } catch {}
  };
};
