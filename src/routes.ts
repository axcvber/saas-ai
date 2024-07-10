export enum AppRoutes {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  RESET_PASSWORD = '/auth/reset',
  NEW_PASSWORD = '/auth/new-password',
  DASHBOARD = '/dashboard',
  CONVERSATION = '/conversation',
  IMAGE = '/image',
  MUSIC = '/music',
  VIDEO = '/video',
  CODE = '/code',
  SETTINGS = '/settings',
  CHAT = '/chat',
  PROFILE = '/settings/profile',
  BILLING = '/settings/billing',
}

export const privateRoutes = [
  AppRoutes.DASHBOARD,
  AppRoutes.CONVERSATION,
  AppRoutes.IMAGE,
  AppRoutes.VIDEO,
  AppRoutes.CODE,
  AppRoutes.SETTINGS,
  AppRoutes.PROFILE,
  AppRoutes.BILLING,
  `${AppRoutes.CHAT}/(.*)`,
]

export const authRoutes = [AppRoutes.LOGIN, AppRoutes.REGISTER, AppRoutes.RESET_PASSWORD, AppRoutes.NEW_PASSWORD]

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = AppRoutes.DASHBOARD
