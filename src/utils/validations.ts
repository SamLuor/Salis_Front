import * as z from 'zod'
import { isCEP, isCNPJ, isPhone, isDDD } from 'brazilian-values'

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
  processo: z.object({
    tipo_processo_id: z
      .string({ required_error: 'Campo obrigatorio' })
      .min(1, { message: 'Campo obrigatório' })
  }),
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
    .min(1, 'Modalidade é obrigatório'),
  numero: z
    .number({
      required_error: '',
      invalid_type_error: 'Apenas números são válidos'
    })
    .min(1, 'Número é obrigatório'),
  periodico: z.string({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Selecione uma opção'
  }),
  portal_compra_id: z
    .string({ required_error: '' })
    .min(1, 'Portal de Compra é obrigatório'),
  numero_portal_compra: z
    .number({
      required_error: 'Número do Portal de Compra é obrigatório',
      invalid_type_error: 'Número do Portal de Compra é obrigatório'
    })
    .min(1, 'Número do Portal de Compra é obrigatório'),
  numero_p_a: z.number({
    required_error: 'Número do Processo Administrativo é obrigatório',
    invalid_type_error: 'Apenas números são válidos'
  }),
  pregoeiro: z
    .string({ required_error: 'Pregoeiro é obrigatório' })
    .min(1, 'Campo obrigatório'),
  descricao_completa_objeto: z
    .string({ required_error: '' })
    .min(1, 'Descrição Completa do Objeto é obrigatória'),
  descricao_simplificada_objeto: z
    .string({ required_error: '' })
    .min(1, 'Descrição Simplificada do Objeto é obrigatória'),
  inicio_acolhimento_proposta: z.date({
    required_error: 'Campo Obrigatório',
    invalid_type_error: 'Data Invalida'
  }),
  limite_acolhimento_proposta: z.date({
    required_error: 'Campo Obrigatório',
    invalid_type_error: 'Data Invalida'
  }),
  abertura_proposta: z.date({
    required_error: 'Abertura da Proposta é obrigatória',
    invalid_type_error: 'Data Invalida'
  }),
  data_disputa: z.date({
    required_error: 'Data da Disputa é obrigatória',
    invalid_type_error: 'Data Invalida'
  }),
  clientes: z
    .array(
      z
        .string({ required_error: 'Clientes é obrigatório' })
        .min(1, 'Campo obrigatório')
    )
    .min(1, 'Campo obrigatório'),
  arquivo: z
    .array(z.any({ required_error: 'Arquivo é obrigatório' }), {
      invalid_type_error: 'Campo obrigatório'
    })
    .min(1, 'Campo obrigatório'),
  anexos: z.object({
    add: z.array(z.any()),
    remove: z.array(z.any())
  })
})

const schemaProductItem = z
  .object({
    nome: z.string({ invalid_type_error: 'Apenas caracteres' }).optional(),
    produto_id: z
      .string({ invalid_type_error: 'Digite um id válido' })
      .optional(),
    descricao_simplificada: z
      .string({
        required_error: 'Campo obrigatório',
        invalid_type_error: 'Apenas caracteres'
      })
      .min(1, { message: 'Campo obrigatório' }),
    descricao_completa: z
      .string({
        required_error: 'Campo obrigatório',
        invalid_type_error: 'Apenas caracteres'
      })
      .min(1, { message: 'Campo obrigatório' }),
    unidade_medida_id: z
      .string({
        required_error: 'Selecione uma unidade',
        invalid_type_error: 'Selecione uma unidade válida'
      })
      .min(1, { message: 'Selecione uma unidade' })
  })
  .refine(
    (value) => {
      return (
        (value.produto_id && value.produto_id.length > 0) ||
        (value.nome && value.nome.length > 0)
      )
    },
    {
      message: 'Fornecer ou o ID do produto ou o nome do produto',
      path: ['produto_id']
    }
  )

const itemProductSchema = z
  .object({
    numero: z.number({ invalid_type_error: 'Número é obrigatório' }),
    quantidade: z.number({ invalid_type_error: 'Quantidade é obrigatório' }),
    produto_item_id: z
      .string({ invalid_type_error: 'Item de produto não válido' })
      .min(1, { message: 'Um item de produto deve ser selecionado' }),
    grupo: z.number().optional().nullable()
  })
  .refine(
    (data) =>
      ('grupo' in data && typeof data.grupo === 'number') || !('grupo' in data),
    {
      message: 'Se o grupo estiver presente, ele deve ser preenchido.',
      path: ['grupo']
    }
  )

const schemaTermReference = z.object({
  setor_produtos: z
    .array(
      z.string({
        invalid_type_error: 'Selecione um ou mais setores de produtos'
      })
    )
    .min(1, { message: 'Selecione um ou mais setores de produtos' }),
  subseguinte_comerciais: z
    .array(
      z.string({
        invalid_type_error: 'Selecione um ou mais subseguintes comerciais'
      })
    )
    .min(1, { message: 'Selecione um ou mais subseguintes comerciais' }),
  validade_proposta: z.date({
    invalid_type_error: 'Selecione uma data'
  }),
  prazo_entrega: z.date({
    invalid_type_error: 'Selecione uma data'
  }),
  prazo_garantia_produto: z.date({
    invalid_type_error: 'Selecione uma data'
  }),
  validade_assinatura_arp: z.number().optional(),
  itens: z.array(itemProductSchema),
  arquivo: z.any()
})

const schemaSetorProduto = z.object({
  id: z.string().optional().nullable(),
  nome: z
    .string({ required_error: 'Obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  empresas: z
    .array(
      z.string({
        required_error: 'Deve ser vinculado a uma ou mais empresas'
      })
    )
    .min(1, { message: 'Deve ser vinculado a uma ou mais empresas' })
    .nonempty({ message: 'Deve ser vinculado a uma ou mais empresas' })
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
  schemaCreateEdital,
  schemaProductItem,
  schemaTermReference,
  schemaSetorProduto
}
