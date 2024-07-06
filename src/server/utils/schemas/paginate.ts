import { z } from '@hono/zod-openapi'
import { stringToPositiveInt } from './common'

export const paginateQuerySchema = z.object({
  page: stringToPositiveInt.default('1').openapi({ default: '1', description: 'ページ番号' }),
  limit: stringToPositiveInt
    .default('20')
    .openapi({ default: '20', description: '取得するデータ数' }),
})

export const paginateResponseSchema = z.object({
  totalCount: z.number().openapi({ description: '合計データ数' }),
  totalPages: z.number().openapi({ description: '合計ページ数' }),
})
