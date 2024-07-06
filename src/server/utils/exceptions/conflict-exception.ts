import { HTTPException } from 'hono/http-exception'

export class ConflictException extends HTTPException {
  constructor(message: string = '競合が発生しました。') {
    super(409, {
      res: new Response(
        JSON.stringify({
          code: 409,
          message: message,
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    })
  }
}
