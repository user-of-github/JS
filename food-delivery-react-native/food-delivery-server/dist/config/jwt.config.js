"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = void 0;
const getJwtConfig = async (configService) => {
    return {
        secret: configService.get('JWT_SECRET')
    };
};
exports.getJwtConfig = getJwtConfig;
//# sourceMappingURL=jwt.config.js.map