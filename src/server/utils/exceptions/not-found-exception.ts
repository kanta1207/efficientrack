import { HTTPException } from 'hono/http-exception'

export class NotFoundException extends HTTPException {
  constructor(message: string = '指定したリソースが見つかりませんでした。') {
    super(404, {
      res: new Response(
        JSON.stringify({
          code: 404,
          message: message,
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    })
  }
}
