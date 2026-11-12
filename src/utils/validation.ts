import { LoginState } from '../types';

interface SignupData extends LoginState {
  name: string;
}

// Mock API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const validateForm = (data: LoginState): boolean => {
  const errors: Record<string, string> = {};
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email wajib diisi';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Format email tidak valid';
  }
  
  // Password validation
  if (!data.password) {
    errors.password = 'Password wajib diisi';
  } else if (data.password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
  }
  
  // Set errors globally via a side effect (in real app, use proper state management)
  (window as any).formErrors = errors;
  
  return Object.keys(errors).length === 0;
};

export const handleLogin = async (data: LoginState): Promise<{ success: boolean; message?: string }> => {
  await delay(800);
  
  // Mock successful login
  if (data.email && data.password) {
    return { success: true, message: 'Login berhasil! Mengalihkan...' };
  }
  
  return { success: false, message: 'Email atau password salah.' };
};

export const handleSignup = async (data: SignupData): Promise<{ success: boolean; message?: string }> => {
  await delay(1000);
  
  // Mock successful signup
  if (data.name && data.email && data.password) {
    return { success: true, message: 'Akun berhasil dibuat! Silakan login.' };
  }
  
  return { success: false, message: 'Gagal membuat akun. Silakan coba lagi.' };
};

export const handleForgotPassword = async (email: string): Promise<{ success: boolean; message?: string }> => {
  await delay(800);
  
  // Mock successful password reset
  if (email) {
    return { success: true, message: 'Tautan reset telah dikirim ke email Anda.' };
  }
  
  return { success: false, message: 'Gagal mengirim tautan. Silakan coba lagi.' };
};
