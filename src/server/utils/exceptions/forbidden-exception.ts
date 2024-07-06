import { HTTPException } from 'hono/http-exception'

export class ForbiddenException extends HTTPException {
  constructor(message: string = 'アクセスが制限されています。') {
    super(403, {
      res: new Response(
        JSON.stringify({
          code: 403,
          message: message,
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    })
  }
}
