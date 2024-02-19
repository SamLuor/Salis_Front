import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

import LoginViewVue from '@/views/example/LoginView.vue'
import ErrorViewVue from '@/views/example/ErrorView.vue'
import NotFoundViewVue from '@/views/example/NotFoundView.vue'
import AccessViewVue from '@/views/example/AccessView.vue'
import SelectCompanyVue from './views/example/SelectCompany.vue'
import UsersTableVue from './views/example/UsersTable.vue'
import CompanyViewVue from './views/example/CompanyView.vue'
import NoPermissionView from './views/example/NoPermissionView.vue'
import { useAuthStore } from './store/auth'
import { storeToRefs } from 'pinia'
import CompanyFormVue from './views/example/CompanyForm.vue'
import PositionViewVue from './views/example/PositionView.vue'
import PositionFormVue from './views/example/PositionForm.vue'
import ClientsViewVue from './views/example/ClientsView.vue'
import ClientFormVue from './views/example/ClientForm.vue'
import MeansPublicationViewVue from './views/example/MeansPublicationView.vue'
import MeansPublicationFormVue from './views/example/MeansPublicationForm.vue'
import ProcessViewVue from './views/example/ProcessView.vue'
import ProcessStepsVue from './views/example/ProcessSteps.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      meta: {
        guard: true
      },
      children: [
        /* {
          path: '',
          name: 'dashboard',
          component: DashboardViewVue
        }, */
        {
          path: '',
          name: 'user',
          meta: {
            role: 'gerenciar usuários'
          },
          component: UsersTableVue
        },
        {
          path: 'empresas',
          name: 'company',
          redirect: '',
          meta: {
            role: 'gerenciar empresas'
          },
          children: [
            {
              path: '',
              name: 'company',
              meta: {
                role: 'gerenciar empresas'
              },
              component: CompanyViewVue
            },
            {
              path: 'empresa/:id',
              name: 'company-show',
              meta: {
                role: 'gerenciar empresas'
              },
              component: CompanyFormVue
            },
            {
              path: 'empresa-form',
              name: 'company-form',
              meta: {
                role: 'gerenciar empresas'
              },
              component: CompanyFormVue
            }
          ]
        },
        /* {
          path: 'empresas/:id',
          name: 'company-show',
          meta: {
            role: 'gerenciar empresas'
          },
          component: CompanyFormVue
        },
        {
          path: 'empresas-form',
          name: 'company-form',
          meta: {
            role: 'gerenciar empresas'
          },
          component: CompanyFormVue
        }, */
        {
          path: 'cargos',
          name: 'positions',
          meta: {
            role: 'gerenciar cargos'
          },
          component: PositionViewVue
        },
        {
          path: 'cargos-form',
          name: 'position-form',
          meta: {
            role: 'gerenciar cargos'
          },
          component: PositionFormVue
        },
        {
          path: 'cargos/:id',
          name: 'position-show',
          meta: {
            role: 'gerenciar cargos'
          },
          component: PositionFormVue
        },
        {
          path: 'clientes',
          name: 'clients',
          meta: {
            role: 'gerenciar clientes'
          },
          component: ClientsViewVue
        },
        {
          path: 'clientes-form',
          name: 'client-form',
          meta: {
            role: 'gerenciar clientes'
          },
          component: ClientFormVue
        },
        {
          path: 'clientes-show/:id',
          name: 'client-show',
          meta: {
            role: 'gerenciar clientes'
          },
          component: ClientFormVue
        },
        {
          path: 'meios-publicacao',
          name: 'means-publication',
          meta: {
            role: 'gerenciar meios de publicação'
          },
          component: MeansPublicationViewVue
        },
        {
          path: 'meios-publicacao-form',
          name: 'means-publication-form',
          meta: {
            role: 'gerenciar meios de publicação'
          },
          component: MeansPublicationFormVue
        },
        {
          path: 'meios-publicacao-show/:id',
          name: 'means-publication-show',
          meta: {
            role: 'gerenciar meios de publicação'
          },
          component: MeansPublicationFormVue
        },
        {
          path: 'publicacoes',
          name: 'publications',
          meta: {
            role: 'gerenciar meios de publicação'
          },
          component: ProcessViewVue
        },
        {
          path: 'publicacoes-form',
          name: 'publications-form',
          meta: {
            role: 'gerenciar publicação'
          },
          component: ProcessStepsVue
        },
        {
          path: 'publicacoes-show/:id',
          name: 'publications-show',
          meta: {
            role: 'gerenciar publicação'
          },
          component: ProcessStepsVue
        }
      ]
    },
    {
      path: '/no-permission',
      name: 'no-permission',
      meta: {
        guard: true
      },
      component: NoPermissionView
    },
    {
      path: '/select-company',
      name: 'select-company',
      component: SelectCompanyVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorViewVue
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: NotFoundViewVue
    },
    {
      path: '/access',
      name: 'access',
      component: AccessViewVue
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const storeAuth = useAuthStore()
  const { token, user } = storeToRefs(storeAuth)
  const isRelesead = to.meta.role
    ? user.value?.permissions?.some(
        (permission) => permission.nome == to.meta.role
      )
    : true

  if (token.value && user.value.name && to.name == 'login') {
    next({ name: 'user' })
  }

  if (to.meta.guard) {
    if (token.value && user.value.name) {
      if (isRelesead) {
        next()
        return
      } else {
        next({ path: '/no-permission' })
        return
      }
    } else {
      next({ name: 'login' })
    }
  }

  if (!to.meta.guard) {
    next()
  }
})

export default router
