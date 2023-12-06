import * as z from 'zod'

const schemaLogin = z.object({
  email: z
    .string()
    .email({ message: 'Digite um email válido' })
    .refine((data) => !!data, { message: 'O campo de e-mail é obrigatório' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
})

export { schemaLogin }
