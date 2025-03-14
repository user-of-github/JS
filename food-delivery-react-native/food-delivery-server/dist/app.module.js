"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_root_path_1 = require("app-root-path");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const config_1 = require("@nestjs/config");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/product/product.module");
const user_module_1 = require("./modules/user/user.module");
const serve_static_1 = require("@nestjs/serve-static");
const order_module_1 = require("./modules/order/order.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.local', '.env.prod'],
            }),
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            user_module_1.UserModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${app_root_path_1.path}/uploads`,
                serveRoot: '/uploads'
            }),
            order_module_1.OrderModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map