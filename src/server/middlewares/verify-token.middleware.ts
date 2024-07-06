import type { z } from 'zod';
import { createMiddleware } from 'hono/factory';
import { UnauthorizedException } from '../utils/exceptions/unauthorized-exception';
import {
  adminAuthContextSchema,
  shopAuthContextSchema,
  shopCompanyAuthContextSchema,
  userAuthContextSchema,
} from '@/lib/route';
import { cacheService } from '@/services/cache-service';

const verifyTokenMiddleware = (schema: z.ZodObject<z.ZodRawShape>) =>
  createMiddleware(async (c, next) => {
    try {
      const authorization = c.req.header('authorization');
      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException();
      }
      const accessToken = authorization.substring(7);
      const parseData = await cacheService.get(accessToken, schema);

      if (!parseData) {
        throw new UnauthorizedException();
      }

      Object.keys(parseData).forEach((key) => {
        c.set(key, parseData[key]);
      });
    } catch (_) {
      throw new UnauthorizedException();
    }
    await next();
  });

export const verifyUserTokenMiddleware = verifyTokenMiddleware(userAuthContextSchema);
export const verifyAdminTokenMiddleware = verifyTokenMiddleware(adminAuthContextSchema);
export const verifyShopCompanyTokenMiddleware = verifyTokenMiddleware(shopCompanyAuthContextSchema);
export const verifyShopTokenMiddleware = verifyTokenMiddleware(shopAuthContextSchema);
