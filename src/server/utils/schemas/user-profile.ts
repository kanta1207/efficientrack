import { z } from '@hono/zod-openapi'

export const userProfileSchema = z
  .object({
    lastName: z.string().openapi({ example: '山田', description: '名前（姓）' }),
    firstName: z.string().openapi({ example: '太郎', description: '名前（名）' }),
    lastNameKana: z.string().openapi({ example: 'ヤマダ', description: 'フリガナ（姓）' }),
    firstNameKana: z.string().openapi({ example: 'タロウ', description: 'フリガナ（名）' }),
    gender: z.enum(['male', 'female', 'other']).openapi({ example: 'male', description: '性別' }),
    birthDate: z
      .string()
      .datetime()
      .openapi({ example: '2001-03-03T00:00:00', description: '生年月日' }),
    postalCode: z.string().openapi({ example: '1234567', description: '郵便番号' }),
    address: z.string().openapi({ example: '東京都世田谷区○○1-2-3', description: '住所' }),
    building: z.string().nullable().openapi({ example: 'TIPPERビル3階', description: '建物名' }),
    phone: z.string().openapi({ example: '080-0000-0000', description: '電話番号' }),
    imagePath: z
      .string()
      .openapi({
        example: '/users/1/xxx.png',
        description: 'プロフィール画像',
      })
      .nullable(),
  })
  .nullable()
  .openapi('UserProfileSchema')
