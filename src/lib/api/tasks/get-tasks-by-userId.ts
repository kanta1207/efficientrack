import { apiRequest } from '@/lib/api/base';
import { honoClient } from '@/lib/honoClient';

type ResponseType = Awaited<ReturnType<(typeof honoClient.api)['tasks']['$get']>>;

export const getTasksByUserId = async (userId: string) => {
  const url = honoClient.api.tasks.$url().href;
  console.log('url', url);

  const res = await apiRequest<ResponseType>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};
