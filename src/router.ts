import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import InputDemoViewVue from '@/views/example/InputDemoView.vue'
import DashboardViewVue from './views/example/DashboardView.vue'
import FormLayoutDemoViewVue from './views/example/FormLayoutDemoView.vue'
import FloatLabelDemoViewVue from '@/views/example/FloatLabelDemoView.vue'
import InvalidStateDemoViewVue from '@/views/example/InvalidStateDemoView.vue'
import ButtonDemoViewVue from '@/views/example/ButtonDemoView.vue'
import TableDemoViewVue from '@/views/example/TableDemoView.vue'
import ListDemoViewVue from '@/views/example/ListDemoView.vue'
import TreeDemoViewVue from '@/views/example/TreeDemoView.vue'
import PanelDemoViewVue from '@/views/example/PanelsDemoView.vue'
import OverlayDemoViewVue from '@/views/example/OverlayDemoView.vue'
import MediaDemoViewVue from '@/views/example/MediaDemoView.vue'
import MenuDemoViewVue from '@/views/example/MenuDemoView.vue'
import PersonalDemoVue from '@/views/example/menu/PersonalDemo.vue'
import SeatDemoVue from '@/views/example/menu/SeatDemo.vue'
import PaymentDemoVue from '@/views/example/menu/PaymentDemo.vue'
import ConfirmationDemoVue from '@/views/example/menu/ConfirmationDemo.vue'

import MessagesDemoViewVue from '@/views/example/MessagesDemoView.vue'
import FileDemoViewVue from '@/views/example/FileDemoView.vue'
import ChartDemoViewVue from '@/views/example/ChartDemoView.vue'
import MiscDemoViewVue from '@/views/example/MiscDemoView.vue'
import CrudDemoViewVue from '@/views/example/CrudDemoView.vue'
import TimelineDemoViewVue from '@/views/example/TimelineDemoView.vue'
import EmptyPageViewVue from '@/views/example/EmptyPageView.vue'

import DocumentationViewVue from '@/views/example/DocumentationView.vue'
import BlocksDemoViewVue from '@/views/example/BlocksDemoView.vue'
import IconsDemoViewVue from '@/views/example/IconsDemoView.vue'

import LoginViewVue from '@/views/example/LoginView.vue'
import LandingDemoViewVue from '@/views/example/LandingDemoView.vue'
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
import PublicationFormVue from './views/example/PublicationForm.vue'
import PublicationViewVue from './views/example/PublicationView.vue'

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
          path: '/formlayout',
          name: 'formlayout',
          component: FormLayoutDemoViewVue
        },
        {
          path: '/input',
          name: 'input',
          component: InputDemoViewVue
        },
        {
          path: '/floatlabel',
          name: 'floatlabel',
          component: FloatLabelDemoViewVue
        },
        {
          path: '/invalidstate',
          name: 'invalidstate',
          component: InvalidStateDemoViewVue
        },
        {
          path: '/button',
          name: 'button',
          component: ButtonDemoViewVue
        },
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
          path: 'cliente-form',
          name: 'client-form',
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
          path: 'publicacao',
          name: 'publications',
          meta: {
            role: 'gerenciar meios de publicação'
          },
          component: PublicationViewVue
        },
        {
          path: 'publicacao-form',
          name: 'publication-form',
          meta: {
            role: 'gerenciar publicação'
          },
          component: PublicationFormVue
        },
        {
          path: 'publicacao-show',
          name: 'publication-show',
          meta: {
            role: 'gerenciar publicação'
          },
          component: PublicationFormVue
        },
        {
          path: '/list',
          name: 'list',
          component: ListDemoViewVue
        },
        {
          path: '/tree',
          name: 'tree',
          component: TreeDemoViewVue
        },
        {
          path: '/panel',
          name: 'panel',
          component: PanelDemoViewVue
        },
        {
          path: '/overlay',
          name: 'overlay',
          component: OverlayDemoViewVue
        },
        {
          path: '/media',
          name: 'media',
          component: MediaDemoViewVue
        },

        {
          path: '/menu',
          component: MenuDemoViewVue,
          children: [
            {
              path: '',
              component: PersonalDemoVue
            },
            {
              path: '/menu/seat',
              component: SeatDemoVue
            },
            {
              path: '/menu/payment',
              component: PaymentDemoVue
            },
            {
              path: '/menu/confirmation',
              component: ConfirmationDemoVue
            }
          ]
        },
        {
          path: '/messages',
          name: 'messages',
          component: MessagesDemoViewVue
        },
        {
          path: '/file',
          name: 'file',
          component: FileDemoViewVue
        },
        {
          path: '/chart',
          name: 'chart',
          component: ChartDemoViewVue
        },
        {
          path: '/misc',
          name: 'misc',
          component: MiscDemoViewVue
        },
        {
          path: '/crud',
          name: 'crud',
          component: CrudDemoViewVue
        },
        {
          path: '/timeline',
          name: 'timeline',
          component: TimelineDemoViewVue
        },
        {
          path: '/empty',
          name: 'empty',
          component: EmptyPageViewVue
        },
        {
          path: '/documentation',
          name: 'documentation',
          component: DocumentationViewVue
        },
        {
          path: '/blocks',
          name: 'blocks',
          component: BlocksDemoViewVue
        },
        {
          path: '/icons',
          name: 'icons',
          component: IconsDemoViewVue
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
      path: '/landing',
      name: 'landing',
      component: LandingDemoViewVue
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
