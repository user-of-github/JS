"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const Auth = () => (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'));
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map