import * as z from 'zod'
import { isCEP, isCNPJ, isDDD } from 'brazilian-values'

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
  })
})

const schemaPublication = z
  .array(
    z.object({
      date: z.date({
        required_error: 'Campo obrigatório',
        invalid_type_error: 'Data invalida'
      }),
      file: z.any().optional(),
      cliente_id: z
        .string({ required_error: 'Campo obrigatório' })
        .min(1, { message: 'Campo obrigatório' }),
      meio_publicacao_id: z
        .string({ required_error: 'Campo obrigatorio' })
        .min(1, { message: 'Campo obrigatório' }),
      file_path: z.string().nullable().optional()
    })
  )
  .refine((val) => {
    const errors: any[] = [] // Array to store individual errors

    val.forEach((element, index) => {
      if (
        (element.file_path && element.file?.name) ||
        (!element.file_path && !element.file?.name)
      ) {
        errors.push({
          message: 'O arquivo é obrigatório',
          path: ['file', index]
        })
      }
    })

    if (errors.length > 0) {
      // Throw a single ZodError with all collected errors
      throw new z.ZodError(errors)
    }

    return true // Explicitly return true for successful validation
  })

const schemaUpdatePublication = schemaCreatePublication.partial()

const schemaCreateEdital = z.object({
  modalidade_id: z
    .string({ required_error: '' })
    .min(1, 'Modalidade é obrigatório'),
  numero: z
    .string({
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
  cliente_gestor_id: z
    .string({ required_error: 'Gestor é obrigatório' })
    .min(1, 'Campo obrigatório'),
  clientes: z
    .array(
      z
        .string({ required_error: 'Clientes é obrigatório' })
        .min(1, 'Campo obrigatório')
    )
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

const itemProductSchema = z.object({
  numero: z.number({
    invalid_type_error: 'Número é obrigatório',
    required_error: 'Campo é obrigatório.'
  }),
  quantidade: z.number({
    invalid_type_error: 'Quantidade é obrigatório',
    required_error: 'Campo é obrigatório.'
  }),
  produto_item_id: z
    .string({
      invalid_type_error: 'Item de produto não válido',
      required_error: 'Campo é obrigatório.'
    })
    .min(1, { message: 'Um item de produto deve ser selecionado' })
})

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

const schemaUnitMeasure = z.object({
  nome: z
    .string({
      invalid_type_error: 'Apenas caracteres',
      required_error: 'Campo obrigatório'
    })
    .min(2, { message: 'No mínimo um caractere' }),
  tipo: z.string({ invalid_type_error: 'Apenas caracteres' }).refine(
    (value) => {
      return value === 'servico' || value === 'material'
    },
    {
      message: 'Valor inválido. Escolha entre "servicos" ou "material".'
    }
  ),
  empresas: z
    .array(
      z.string({
        invalid_type_error: 'Apenas caracteres',
        required_error: 'Campo obrigatório'
      }),
      { required_error: 'Campo obrigatório' }
    )
    .min(1, 'Selecione no mínimo uma empresa')
})

const addressesSchema = z
  .array(
    z.object({
      cep: z
        .string()
        .min(8, { message: 'CEP deve ter 8 caracteres.' })
        .max(8, { message: 'CEP deve ter 8 caracteres.' })
        .refine((value) => isCEP(value), {
          message: 'Digite um cep válido'
        }),
      logradouro: z
        .string()
        .min(3, { message: 'Logradouro não pode estar vazio.' }),
      cidade: z.string().min(3, { message: 'Cidade não pode estar vazio.' }),
      bairro: z.string().min(2, { message: 'Bairro não pode estar vazio.' }),
      numero: z.string().min(2, { message: 'Número não pode estar vazio.' }),
      complemento: z.string().optional()
    })
  )
  .min(1, { message: 'Cadastre pelo menos um endereço.' })

const contactsSchema = z
  .array(
    z.object({
      ddd: z
        .number({ invalid_type_error: 'Campo Obrigatório' })
        .refine((val) => isDDD(String(val)), {
          message: 'DDD deve conter exatamente 2 dígitos numéricos'
        }),
      numero: z
        .number({ invalid_type_error: 'Campo Obrigatório.' })
        .refine((num) => String(num).length >= 8 && String(num).length <= 9, {
          message:
            'Número inválido, digite um número válido com 8 ou 9 dígitos.'
        }),
      pessoa: z.string().min(1, { message: 'Nome da pessoa é obrigatório' })
    })
  )
  .min(1, { message: 'Cadastre pelo menos um contato.' })

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
  schemaSetorProduto,
  itemProductSchema,
  schemaUnitMeasure,
  addressesSchema,
  contactsSchema,
  schemaPublication
}
