import { hc } from 'hono/client';

import { ApiType } from '@/app/api/[[...route]]/route';

export const honoClient = hc<ApiType>(process.env.NEXT_PUBLIC_APP_URL!);
