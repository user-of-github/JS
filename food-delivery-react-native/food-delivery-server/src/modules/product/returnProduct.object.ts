import { Prisma } from '@prisma/client';
import { returnCategoryObject } from '../category/returnCategory.object';

export const returnProductObject: Prisma.ProductSelect = {
    id: true,
    name: true,
    slug: true,
    image: true,
    price: true,
    createdAt: true,
    description: true,
    category: {
        select: returnCategoryObject
    },
};