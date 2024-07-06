import { HTTPException } from 'hono/http-exception'

export class UnauthorizedException extends HTTPException {
  constructor(message: string = '認証されていません。') {
    super(401, {
      res: new Response(
        JSON.stringify({
          code: 401,
          message: message,
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    })
  }
}
