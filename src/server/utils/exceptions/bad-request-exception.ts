import { HTTPException } from 'hono/http-exception'

export class BadRequestException extends HTTPException {
  constructor(message: string = 'リクエストが不正です。', errors: object | undefined = undefined) {
    super(400, {
      res: new Response(
        JSON.stringify({
          code: 400,
          message,
          errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    })
  }
}
