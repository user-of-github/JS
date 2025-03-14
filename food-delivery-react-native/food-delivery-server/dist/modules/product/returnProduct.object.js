"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnProductObject = void 0;
const returnCategory_object_1 = require("../category/returnCategory.object");
exports.returnProductObject = {
    id: true,
    name: true,
    slug: true,
    image: true,
    price: true,
    createdAt: true,
    description: true,
    category: {
        select: returnCategory_object_1.returnCategoryObject
    }
};
//# sourceMappingURL=returnProduct.object.js.map