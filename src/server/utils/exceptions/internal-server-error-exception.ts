import { HTTPException } from 'hono/http-exception'

export class InternalServerErrorException extends HTTPException {
  constructor(message: string = '予期せぬエラーが発生しました。') {
    super(500, {
      res: new Response(
        JSON.stringify({
          code: 500,
          message: message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    })
  }
}
