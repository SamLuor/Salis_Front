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
      date: z.date({
        required_error: 'Campo obrigatório',
        invalid_type_error: 'Data invalida'
      }),
      file: z.any().refine((file) => file?.size > 0, 'Campo obrigatório'),
      cliente_id: z
        .string({ required_error: 'Campo obrigatório' })
        .min(1, { message: 'Campo obrigatório' }),
      meio_publicacao_id: z
        .string({ required_error: 'Campo obrigatorio' })
        .min(1, { message: 'Campo obrigatório' })
    })
  )
})

const schemaUpdatePublication = schemaCreatePublication.partial()

const schemaCreateEdital = z.object({
  modalidade_id: z
    .string({ required_error: '' })
    .nonempty('Modalidade ID é obrigatório'),
  regime_id: z
    .string({ required_error: '' })
    .nonempty('Regime ID é obrigatório'),
  tipo_execucao_id: z
    .string({ required_error: '' })
    .nonempty('Tipo de Execução ID é obrigatório'),
  modo_disputa_id: z
    .string({ required_error: '' })
    .nonempty('Modo de Disputa ID é obrigatório'),
  julgamento_id: z
    .string({ required_error: '' })
    .nonempty('Julgamento ID é obrigatório'),
  numero: z.string({ required_error: '' }).nonempty('Número é obrigatório'),
  periodico: z
    .string({ required_error: '' })
    .nonempty('Periodicidade é obrigatória'),
  portal_compra_id: z
    .string({ required_error: '' })
    .nonempty('Portal de Compra ID é obrigatório'),
  numero_portal_compra: z.string({
    required_error: 'Número do Portal de Compra é obrigatório'
  }),
  numero_p_a: z.string({
    required_error: 'Número do Processo Administrativo é obrigatório'
  }),
  pregoeiro: z.string({ required_error: 'Pregoeiro é obrigatório' }),
  descricao_completa_objeto: z
    .string({ required_error: '' })
    .nonempty('Descrição Completa do Objeto é obrigatória'),
  descricao_simplificada_objeto: z
    .string({ required_error: '' })
    .nonempty('Descrição Simplificada do Objeto é obrigatória'),
  inicio_acolhimento_proposta: z
    .string({ required_error: '' })
    .nonempty('Início do Acolhimento da Proposta é obrigatório'),
  limite_acolhimento_proposta: z
    .string({ required_error: '' })
    .nonempty('Limite do Acolhimento da Proposta é obrigatório'),
  abertura_proposta: z.string({
    required_error: 'Abertura da Proposta é obrigatória'
  }),
  data_disputa: z.string({ required_error: 'Data da Disputa é obrigatória' }),
  clientes: z
    .array(z.string({ required_error: 'Clientes é obrigatório' }))
    .nonempty(),
  arquivo: z.string({ required_error: 'Arquivo é obrigatório' }),
  anexos: z.object({
    add: z.array(z.string()),
    remove: z.array(z.string())
  })
})

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
  schemaUpdatePublication,
  schemaCreateEdital
}
