export interface LoginState {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export type ViewState = 'login' | 'signup' | 'forgot-password' | 'dashboard';
