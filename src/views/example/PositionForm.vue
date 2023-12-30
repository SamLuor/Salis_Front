<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">
          <div class="flex gap-3" style="align-items: center">
            <i class="fa-solid fa-briefcase icon-header" />
            {{ position_id ? 'Atualizar Cargo' : 'Criar Cargo' }}
          </div>
        </h5>
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Informações de Cargo</h4>
              <p class="description">
                Essas informações para cadastrar e vincular permissões ao cargo.
              </p>
            </div>
          </div>
          <form class="container-form-bussiness">
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Nome do cargo</label>
              <InputText
                id="razao_social"
                v-bind="name"
                placeholder="Nome do cargo"
                aria-describedby="razao_social-help"
              />
              <small v-if="!errors.nome" id="razao_social-help"
                >Digite o nome do cargo.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.nome || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Permissões</label>
              <MultiSelect
                v-bind="permitions"
                :options="options.permitions"
                option-label="text"
                placeholder="Selecionar Permissões"
                display="chip"
                class="w-full"
              >
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <div>{{ slotProps.option.text }}</div>
                  </div>
                </template>
                <template #footer>
                  <div class="py-2 px-3">
                    <b>{{
                      values.permissoes ? values.permissoes.length : 0
                    }}</b>
                    permissões{{
                      (values.permissoes ? values.permissoes.length : 0) > 1
                        ? 's'
                        : ''
                    }}
                    selecionadas.
                  </div>
                </template>
              </MultiSelect>
              <small v-if="!errors.permissoes" id="razao_social-help"
                >Selecione as permissões.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.permissoes || '&nbsp;'
              }}</small>
              <DataTable
                v-if="values.permissoes && values.permissoes.length > 0"
                :value="values.permissoes"
                class="table-options"
                table-style="min-width: 50rem"
              >
                <Column field="text" header="Permissão"></Column>
              </DataTable>
            </div>
            <div class="input-full flex flex-row-reverse">
              <Button label="Criar" @click="onFormSubmit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schemaPosition } from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'

interface Options {
  [key: string]: [{ [key: string]: string }]
}

const toast = useToast()
const options = ref<Options>({ companies: [{}], permitions: [{}] } as Options)
const route = useRoute()
const position_id = route.params?.id
const { defineComponentBinds, handleSubmit, errors, setFieldValue, values } =
  useForm({
    validationSchema: toTypedSchema(schemaPosition)
  })

const name = defineComponentBinds('nome')
const permitions = defineComponentBinds('permissoes')

const onFormSubmit = handleSubmit(async (values) => {
  try {
    if (!position_id) await services.Position.createPosition(values)
    else await services.Position.updatePosition(values)

    toast.add({
      severity: 'success',
      summary: !values?.id
        ? 'Cargo criado com sucesso!'
        : 'Cargo atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !values?.id ? 'Erro ao criar Cargo' : 'Erro ao atualizar Cargo',
      detail: (err as Error).message,
      life: 3000
    })
  }
})

const receiveOptions = async () => {
  await Promise.allSettled([
    services.Option.getCompanies(),
    services.Option.getPermitions()
  ]).then((results) => {
    results.forEach((option) => {
      if (option.status == 'fulfilled') {
        const key: string = option.value.option
        options.value[key] = option.value.data
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error ao carregar opções',
          detail: option.reason,
          life: 3000
        })
      }
    })
  })
}

onMounted(async () => {
  await receiveOptions()
  if (position_id) {
    const response = await services.Position.getPosition(position_id as string)

    setFieldValue('id', response.data.id)
    setFieldValue('nome', response.data.nome)
    setFieldValue('nome', response.data.nome)
  }
})
</script>

<style>
.p-fileupload .p-fileupload-buttonbar {
  @apply bg-background-light-white70 dark:bg-background-dark-blue70;
}
.p-fileupload .p-fileupload-content {
  @apply bg-background-light-white dark:bg-background-dark-blue;
}
.p-fileupload .p-fileupload-content .name-file {
  @apply text-light-gray dark:text-dark-gray;
}
.p-fileupload .p-fileupload-empty .icon-upload {
  @apply text-light-black70 dark:text-dark-white70;
}
.p-fileupload .p-fileupload-empty .description {
  @apply text-light-gray dark:text-dark-gray;
}
.p-error {
  @apply text-red-400 !important;
}
</style>

<style scoped lang="scss">
.container-area-form {
  @apply grid grid-cols-3 relative;

  .section-form {
    .content {
      @apply sticky top-0;
    }

    .header {
      @apply text-light-black70 dark:text-dark-white70 text-lg mb-1 font-semibold;
    }
    .description {
      @apply text-light-gray dark:text-dark-gray pr-4;
    }
  }
}
.container-form-bussiness {
  @apply grid grid-cols-2 gap-6 py-6 col-start-2 col-end-4 bg-background-light-white dark:bg-background-dark-blue70 rounded-lg shadow-sm p-4 max-h-[70vh] overflow-y-scroll;

  label {
    @apply text-light-black70 dark:text-dark-white70;
  }
  small {
    @apply text-light-gray dark:text-dark-gray;
  }

  .input-full {
    @apply col-start-1 col-end-3;
  }
}
.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-secondary-500;

    .icon-header {
      @apply dark:text-secondary-500;
    }
  }
}
</style>
