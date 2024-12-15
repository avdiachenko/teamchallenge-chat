/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthrootImport } from './routes/auth/__root'
import { Route as ActivitiesrootImport } from './routes/activities/__root'
import { Route as AuthUpdatePasswordImport } from './routes/auth/update-password'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as AuthSigninImport } from './routes/auth/signin'
import { Route as AuthForgotPasswordImport } from './routes/auth/forgot-password'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()
const ActivitiesImport = createFileRoute('/activities')()
const SettingsLazyImport = createFileRoute('/settings')()
const PaymentsLazyImport = createFileRoute('/payments')()
const NeighboursLazyImport = createFileRoute('/neighbours')()
const HomeLazyImport = createFileRoute('/home')()
const ContactsLazyImport = createFileRoute('/contacts')()
const ChatLazyImport = createFileRoute('/chat')()
const IndexLazyImport = createFileRoute('/')()
const ActivitiesVotingsLazyImport = createFileRoute('/activities/votings')()
const ActivitiesNotificationsLazyImport = createFileRoute(
  '/activities/notifications',
)()
const ActivitiesNewsLazyImport = createFileRoute('/activities/news')()

// Create/Update Routes

const AuthrootRoute = AuthrootImport.update({
  id: '/__root',
  getParentRoute: () => AuthRoute,
} as any)

const ActivitiesrootRoute = ActivitiesrootImport.update({
  id: '/__root',
  getParentRoute: () => ActivitiesRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const ActivitiesRoute = ActivitiesImport.update({
  id: '/activities',
  path: '/activities',
  getParentRoute: () => rootRoute,
} as any)

const SettingsLazyRoute = SettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/settings.lazy').then((d) => d.Route))

const PaymentsLazyRoute = PaymentsLazyImport.update({
  id: '/payments',
  path: '/payments',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/payments.lazy').then((d) => d.Route))

const NeighboursLazyRoute = NeighboursLazyImport.update({
  id: '/neighbours',
  path: '/neighbours',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/neighbours.lazy').then((d) => d.Route))

const HomeLazyRoute = HomeLazyImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/home.lazy').then((d) => d.Route))

const ContactsLazyRoute = ContactsLazyImport.update({
  id: '/contacts',
  path: '/contacts',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/contacts.lazy').then((d) => d.Route))

const ChatLazyRoute = ChatLazyImport.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/chat.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ActivitiesVotingsLazyRoute = ActivitiesVotingsLazyImport.update({
  id: '/votings',
  path: '/votings',
  getParentRoute: () => ActivitiesRoute,
} as any).lazy(() =>
  import('./routes/activities/votings.lazy').then((d) => d.Route),
)

const ActivitiesNotificationsLazyRoute =
  ActivitiesNotificationsLazyImport.update({
    id: '/notifications',
    path: '/notifications',
    getParentRoute: () => ActivitiesRoute,
  } as any).lazy(() =>
    import('./routes/activities/notifications.lazy').then((d) => d.Route),
  )

const ActivitiesNewsLazyRoute = ActivitiesNewsLazyImport.update({
  id: '/news',
  path: '/news',
  getParentRoute: () => ActivitiesRoute,
} as any).lazy(() =>
  import('./routes/activities/news.lazy').then((d) => d.Route),
)

const AuthUpdatePasswordRoute = AuthUpdatePasswordImport.update({
  id: '/update-password',
  path: '/update-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSigninRoute = AuthSigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/chat': {
      id: '/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatLazyImport
      parentRoute: typeof rootRoute
    }
    '/contacts': {
      id: '/contacts'
      path: '/contacts'
      fullPath: '/contacts'
      preLoaderRoute: typeof ContactsLazyImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeLazyImport
      parentRoute: typeof rootRoute
    }
    '/neighbours': {
      id: '/neighbours'
      path: '/neighbours'
      fullPath: '/neighbours'
      preLoaderRoute: typeof NeighboursLazyImport
      parentRoute: typeof rootRoute
    }
    '/payments': {
      id: '/payments'
      path: '/payments'
      fullPath: '/payments'
      preLoaderRoute: typeof PaymentsLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsLazyImport
      parentRoute: typeof rootRoute
    }
    '/activities': {
      id: '/activities'
      path: '/activities'
      fullPath: '/activities'
      preLoaderRoute: typeof ActivitiesImport
      parentRoute: typeof rootRoute
    }
    '/activities/__root': {
      id: '/activities/__root'
      path: '/activities'
      fullPath: '/activities'
      preLoaderRoute: typeof ActivitiesrootImport
      parentRoute: typeof ActivitiesRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/__root': {
      id: '/auth/__root'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthrootImport
      parentRoute: typeof AuthRoute
    }
    '/auth/forgot-password': {
      id: '/auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/auth/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordImport
      parentRoute: typeof AuthImport
    }
    '/auth/signin': {
      id: '/auth/signin'
      path: '/signin'
      fullPath: '/auth/signin'
      preLoaderRoute: typeof AuthSigninImport
      parentRoute: typeof AuthImport
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/auth/update-password': {
      id: '/auth/update-password'
      path: '/update-password'
      fullPath: '/auth/update-password'
      preLoaderRoute: typeof AuthUpdatePasswordImport
      parentRoute: typeof AuthImport
    }
    '/activities/news': {
      id: '/activities/news'
      path: '/news'
      fullPath: '/activities/news'
      preLoaderRoute: typeof ActivitiesNewsLazyImport
      parentRoute: typeof ActivitiesImport
    }
    '/activities/notifications': {
      id: '/activities/notifications'
      path: '/notifications'
      fullPath: '/activities/notifications'
      preLoaderRoute: typeof ActivitiesNotificationsLazyImport
      parentRoute: typeof ActivitiesImport
    }
    '/activities/votings': {
      id: '/activities/votings'
      path: '/votings'
      fullPath: '/activities/votings'
      preLoaderRoute: typeof ActivitiesVotingsLazyImport
      parentRoute: typeof ActivitiesImport
    }
  }
}

// Create and export the route tree

interface ActivitiesRouteChildren {
  ActivitiesrootRoute: typeof ActivitiesrootRoute
  ActivitiesNewsLazyRoute: typeof ActivitiesNewsLazyRoute
  ActivitiesNotificationsLazyRoute: typeof ActivitiesNotificationsLazyRoute
  ActivitiesVotingsLazyRoute: typeof ActivitiesVotingsLazyRoute
}

const ActivitiesRouteChildren: ActivitiesRouteChildren = {
  ActivitiesrootRoute: ActivitiesrootRoute,
  ActivitiesNewsLazyRoute: ActivitiesNewsLazyRoute,
  ActivitiesNotificationsLazyRoute: ActivitiesNotificationsLazyRoute,
  ActivitiesVotingsLazyRoute: ActivitiesVotingsLazyRoute,
}

const ActivitiesRouteWithChildren = ActivitiesRoute._addFileChildren(
  ActivitiesRouteChildren,
)

interface AuthRouteChildren {
  AuthrootRoute: typeof AuthrootRoute
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthSigninRoute: typeof AuthSigninRoute
  AuthSignupRoute: typeof AuthSignupRoute
  AuthUpdatePasswordRoute: typeof AuthUpdatePasswordRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthrootRoute: AuthrootRoute,
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthSigninRoute: AuthSigninRoute,
  AuthSignupRoute: AuthSignupRoute,
  AuthUpdatePasswordRoute: AuthUpdatePasswordRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/chat': typeof ChatLazyRoute
  '/contacts': typeof ContactsLazyRoute
  '/home': typeof HomeLazyRoute
  '/neighbours': typeof NeighboursLazyRoute
  '/payments': typeof PaymentsLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/activities': typeof ActivitiesrootRoute
  '/auth': typeof AuthrootRoute
  '/auth/forgot-password': typeof AuthForgotPasswordRoute
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth/update-password': typeof AuthUpdatePasswordRoute
  '/activities/news': typeof ActivitiesNewsLazyRoute
  '/activities/notifications': typeof ActivitiesNotificationsLazyRoute
  '/activities/votings': typeof ActivitiesVotingsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/chat': typeof ChatLazyRoute
  '/contacts': typeof ContactsLazyRoute
  '/home': typeof HomeLazyRoute
  '/neighbours': typeof NeighboursLazyRoute
  '/payments': typeof PaymentsLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/activities': typeof ActivitiesrootRoute
  '/auth': typeof AuthrootRoute
  '/auth/forgot-password': typeof AuthForgotPasswordRoute
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth/update-password': typeof AuthUpdatePasswordRoute
  '/activities/news': typeof ActivitiesNewsLazyRoute
  '/activities/notifications': typeof ActivitiesNotificationsLazyRoute
  '/activities/votings': typeof ActivitiesVotingsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/chat': typeof ChatLazyRoute
  '/contacts': typeof ContactsLazyRoute
  '/home': typeof HomeLazyRoute
  '/neighbours': typeof NeighboursLazyRoute
  '/payments': typeof PaymentsLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/activities': typeof ActivitiesRouteWithChildren
  '/activities/__root': typeof ActivitiesrootRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/__root': typeof AuthrootRoute
  '/auth/forgot-password': typeof AuthForgotPasswordRoute
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth/update-password': typeof AuthUpdatePasswordRoute
  '/activities/news': typeof ActivitiesNewsLazyRoute
  '/activities/notifications': typeof ActivitiesNotificationsLazyRoute
  '/activities/votings': typeof ActivitiesVotingsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/chat'
    | '/contacts'
    | '/home'
    | '/neighbours'
    | '/payments'
    | '/settings'
    | '/activities'
    | '/auth'
    | '/auth/forgot-password'
    | '/auth/signin'
    | '/auth/signup'
    | '/auth/update-password'
    | '/activities/news'
    | '/activities/notifications'
    | '/activities/votings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/chat'
    | '/contacts'
    | '/home'
    | '/neighbours'
    | '/payments'
    | '/settings'
    | '/activities'
    | '/auth'
    | '/auth/forgot-password'
    | '/auth/signin'
    | '/auth/signup'
    | '/auth/update-password'
    | '/activities/news'
    | '/activities/notifications'
    | '/activities/votings'
  id:
    | '__root__'
    | '/'
    | '/chat'
    | '/contacts'
    | '/home'
    | '/neighbours'
    | '/payments'
    | '/settings'
    | '/activities'
    | '/activities/__root'
    | '/auth'
    | '/auth/__root'
    | '/auth/forgot-password'
    | '/auth/signin'
    | '/auth/signup'
    | '/auth/update-password'
    | '/activities/news'
    | '/activities/notifications'
    | '/activities/votings'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ChatLazyRoute: typeof ChatLazyRoute
  ContactsLazyRoute: typeof ContactsLazyRoute
  HomeLazyRoute: typeof HomeLazyRoute
  NeighboursLazyRoute: typeof NeighboursLazyRoute
  PaymentsLazyRoute: typeof PaymentsLazyRoute
  SettingsLazyRoute: typeof SettingsLazyRoute
  ActivitiesRoute: typeof ActivitiesRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ChatLazyRoute: ChatLazyRoute,
  ContactsLazyRoute: ContactsLazyRoute,
  HomeLazyRoute: HomeLazyRoute,
  NeighboursLazyRoute: NeighboursLazyRoute,
  PaymentsLazyRoute: PaymentsLazyRoute,
  SettingsLazyRoute: SettingsLazyRoute,
  ActivitiesRoute: ActivitiesRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/chat",
        "/contacts",
        "/home",
        "/neighbours",
        "/payments",
        "/settings",
        "/activities",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/chat": {
      "filePath": "chat.lazy.tsx"
    },
    "/contacts": {
      "filePath": "contacts.lazy.tsx"
    },
    "/home": {
      "filePath": "home.lazy.tsx"
    },
    "/neighbours": {
      "filePath": "neighbours.lazy.tsx"
    },
    "/payments": {
      "filePath": "payments.lazy.tsx"
    },
    "/settings": {
      "filePath": "settings.lazy.tsx"
    },
    "/activities": {
      "filePath": "activities",
      "children": [
        "/activities/__root",
        "/activities/news",
        "/activities/notifications",
        "/activities/votings"
      ]
    },
    "/activities/__root": {
      "filePath": "activities/__root.tsx",
      "parent": "/activities"
    },
    "/auth": {
      "filePath": "auth",
      "children": [
        "/auth/__root",
        "/auth/forgot-password",
        "/auth/signin",
        "/auth/signup",
        "/auth/update-password"
      ]
    },
    "/auth/__root": {
      "filePath": "auth/__root.tsx",
      "parent": "/auth"
    },
    "/auth/forgot-password": {
      "filePath": "auth/forgot-password.tsx",
      "parent": "/auth"
    },
    "/auth/signin": {
      "filePath": "auth/signin.tsx",
      "parent": "/auth"
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx",
      "parent": "/auth"
    },
    "/auth/update-password": {
      "filePath": "auth/update-password.tsx",
      "parent": "/auth"
    },
    "/activities/news": {
      "filePath": "activities/news.lazy.tsx",
      "parent": "/activities"
    },
    "/activities/notifications": {
      "filePath": "activities/notifications.lazy.tsx",
      "parent": "/activities"
    },
    "/activities/votings": {
      "filePath": "activities/votings.lazy.tsx",
      "parent": "/activities"
    }
  }
}
ROUTE_MANIFEST_END */
