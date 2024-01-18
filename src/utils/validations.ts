import * as z from 'zod'
import { isCEP, isCNPJ, isCPF, isPhone, isDDD } from 'brazilian-values'

const schemaLogin = z.object({
  email: z
    .string({ required_error: 'Obrigatório' })
    .email({ message: 'Digite um email válido' })
    .refine((data) => !!data, { message: 'O campo de e-mail é obrigatório' }),
  password: z
    .string({ required_error: 'Obrigatório' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
})

const schemaCreateUser = z
  .object({
    name: z
      .string({ required_error: 'Obrigatório' })
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
    email: z
      .string({ required_error: 'Obrigatório' })
      .email({ message: 'Digite um email válido' })
      .refine((data) => !!data, { message: 'O campo de e-mail é obrigatório' }),
    password: z
      .string({ required_error: 'Obrigatório' })
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
    password_confirmation: z.string({ required_error: 'Obrigatório' }),
    empresas: z
      .array(
        z.string({
          required_error: 'Deve ser vinculado a uma ou mais empresas'
        })
      )
      .min(1, { message: 'Deve ser vinculado a uma ou mais empresas' })
      .nonempty({ message: 'Deve ser vinculado a uma ou mais empresas' }),
    cargos: z
      .array(
        z.string({
          required_error: 'Deve ser vinculado a um ou mais cargos'
        })
      )
      .optional()
  })
  .refine((schema) => schema.password_confirmation === schema.password, {
    message: 'Senhas não coincidem!',
    path: ['password_confirmation', 'password']
  })

const schemaUpdateUser = z.object({
  id: z
    .string({ required_error: 'ID é Obrigatório' })
    .min(8, { message: 'id inválido' }),
  name: z
    .string({ required_error: 'Obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .optional(),
  email: z
    .string({ required_error: 'Obrigatório' })
    .email({ message: 'Digite um email válido' })
    .refine((data) => !!data, { message: 'O campo de e-mail é obrigatório' })
    .optional(),
  password: z
    .string({ required_error: 'Obrigatório' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .optional(),
  empresas: z
    .array(
      z.string({ required_error: 'Deve ser vinculado a uma ou mais empresas' })
    )
    .min(1, { message: 'Deve ser vinculado a uma ou mais empresas' })
    .optional(),
  cargos: z
    .array(
      z.string({
        required_error: 'Deve ser vinculado a um ou mais cargos'
      })
    )
    .optional()
})

const schemaCreateCompany = z.object({
  razao_social: z.string({ required_error: 'Obrigatório' }),
  nome_fantasia: z.string({ required_error: 'Obrigatório' }),
  sigla: z.string({ required_error: 'Obrigatório' }),
  cnpj: z
    .string({ required_error: 'Obrigatório' })
    .refine((value) => isCNPJ(value), { message: 'CNPJ inválido' }),
  email: z.string({ required_error: 'Obrigatório' }).email(),
  logo_img_path: z.any({ required_error: 'Obritório' }),
  frase: z.string({ required_error: 'Obrigatório' })
})

const schemaUpdateCompany = z.object({
  id: z.string({ required_error: 'Obrigatório' }),
  razao_social: z.string({ required_error: 'Obrigatório' }).optional(),
  nome_fantasia: z.string({ required_error: 'Obrigatório' }).optional(),
  sigla: z.string({ required_error: 'Obrigatório' }).optional(),
  cnpj: z
    .string({ required_error: 'Obrigatório' })
    .refine((value) => isCNPJ(value), { message: 'CNPJ inválido' })
    .optional(),
  email: z.string({ required_error: 'Obrigatório' }).email().optional(),
  logo_img_path: z.any().optional(),
  frase: z.string({ required_error: 'Obrigatório' }).optional()
})

const schemaPosition = z.object({
  id: z.string({ required_error: 'ID é obrigatório' }).optional(),
  empresa_id: z.string({ required_error: 'ID da empresa é obrigatório' }),
  nome: z.string({ required_error: 'Obrigatório' }),
  permissoes: z
    .array(
      z.object({
        text: z.string({
          required_error: 'Deve ser vinculado a uma ou mais permissões'
        }),
        value: z.string({
          required_error: 'Deve ser vinculado a uma ou mais permissões'
        })
      })
    )
    .min(1, { message: 'Deve ser vinculado a uma ou mais permissões' })
    .nonempty({ message: 'Deve ser vinculado a uma ou mais permissões' })
})

const schemaTelefone = z.object({
  id: z.string().optional(),
  ddd: z
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas números'
    })
    .refine((value) => isDDD(String(value)), { message: 'DDD inválido' }),
  numero: z
    .string()
    .refine((value) => isPhone(value), { message: 'Telefone inválido' }),
  pessoa: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
    .min(1, { message: 'Campo obrigatório' })
})

const schemaEndereco = z.object({
  id: z.string().optional(),
  cep: z.string().refine((value) => isCEP(value), { message: 'CEP inválido' }),
  logradouro: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
    .min(1, { message: 'Campo obrigatório' }),
  bairro: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
    .min(1, { message: 'Campo obrigatório' }),
  numero: z.number({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Aceita apenas números'
  }),
  complemento: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
    .optional()
})

const schemaCreateClient = z.object({
  id: z.string().optional(),
  razao_social: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Aceita apenas caracteres'
  }),
  nome_fantasia: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Aceita apenas caracteres'
  }),
  sigla: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Aceita apenas caracteres'
  }),
  cnpj: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
    .refine((value) => isCNPJ(value), { message: 'CNPJ inválido' }),
  email: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Digite um Email válido'
    })
    .email(),
  enderecos: schemaEndereco.array().min(1),
  telefones: schemaTelefone.array().min(1),
  empresas: z
    .array(z.string({ required_error: 'Campo obrigatório' }), {
      required_error: 'Campo obrigatório'
    })
    .min(1, { message: 'Campo obrigatório' })
})

const schemaUpdateClient = schemaCreateClient.partial()

const schemaCreateMeansPublication = z.object({
  nome: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
    .min(1),
  empresas: z.array(
    z.string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Aceita apenas caracteres'
    })
  )
})

const schemaUpdateMeansPublication = schemaCreateMeansPublication.partial()

const schemaCreatePublication = z.object({
  publicacoes: z.array(
    z.object({
      date: z.string().min(1),
      file: z.any(),
      cliente_id: z.string().min(1),
      meio_publicacao_id: z.string().min(1)
    })
  )
})

const schemaUpdatePublication = schemaCreatePublication.partial()

export {
  schemaLogin,
  schemaCreateUser,
  schemaUpdateUser,
  schemaCreateCompany,
  schemaUpdateCompany,
  schemaPosition,
  schemaCreateClient,
  schemaUpdateClient,
  schemaCreateMeansPublication,
  schemaUpdateMeansPublication,
  schemaCreatePublication,
  schemaUpdatePublication
}
