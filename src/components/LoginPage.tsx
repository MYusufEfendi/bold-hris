import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { LoginState, FormErrors, ViewState } from '../types';
import { validateForm, handleLogin, handleSignup, handleForgotPassword } from '../utils/validation';
import Dashboard from '../dashboard/Dashboard';

const LoginPage: React.FC = () => {
  const [view, setView] = useState<ViewState>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginState>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setSuccessMessage('');
    setErrorMessage('');
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let result;
      if (view === 'login') {
        result = await handleLogin(formData);
      } else if (view === 'signup') {
        result = await handleSignup({ ...formData, name });
      } else {
        result = await handleForgotPassword(formData.email);
      }

      if (result.success) {
        setSuccessMessage(result.message || 'Berhasil!');
        if (view === 'login') {
          setTimeout(() => setView('dashboard'), 1500);
        }
      } else {
        setErrorMessage(result.message || 'Terjadi kesalahan.');
      }
    } catch {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, [view, formData, name]);

  const switchView = useCallback((newView: ViewState) => {
    setView(newView);
    setFormData({ email: '', password: '' });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
    setShowPassword(false);
  }, []);

  const handleInputChange = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    setSuccessMessage('');
    setErrorMessage('');
  }, []);

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => switchView('login')} userName={name || formData.email.split('@')[0]} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] animate-bounce duration-[3000ms]" />
      </div>

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg shadow-primary/25">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {view === 'login' && 'Selamat Datang'}
            {view === 'signup' && 'Buat Akun Baru'}
            {view === 'forgot-password' && 'Lupa Password'}
          </h1>
          <p className="text-textSecondary">
            {view === 'login' && 'Masuk ke akun Anda untuk melanjutkan'}
            {view === 'signup' && 'Daftar sekarang dan mulai petualangan Anda'}
            {view === 'forgot-password' && 'Kami akan mengirimkan tautan reset ke email Anda'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface/80 backdrop-blur-xl rounded-3xl p-8 border border-border shadow-2xl">
          {/* Back button for forgot password */}
          {view === 'forgot-password' && (
            <button
              onClick={() => switchView('login')}
              className="flex items-center gap-2 text-textSecondary hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke masuk
            </button>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-success/10 border border-success/20 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-sm text-success">{successMessage}</p>
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-error/10 border border-error/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
              <p className="text-sm text-error">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field for signup */}
            {view === 'signup' && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => handleInputChange(setName)(e)}
                  placeholder="Nama lengkap"
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary group-focus-within:text-primary transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 bg-background border border-border rounded-2xl text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            {view === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary/20 cursor-pointer"
                  />
                  <span className="text-sm text-textSecondary group-hover:text-white transition-colors">Ingat saya</span>
                </label>
                <button
                  type="button"
                  onClick={() => switchView('forgot-password')}
                  className="text-sm text-primary hover:text-secondary transition-colors"
                >
                  Lupa password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  {view === 'login' && 'Masuk'}
                  {view === 'signup' && 'Daftar'}
                  {view === 'forgot-password' && 'Kirim Tautan'}
                </>
              )}
            </button>
          </form>

          {/* Social login */}
          {view !== 'forgot-password' && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-textSecondary text-sm">atau</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 px-4 bg-background border border-border rounded-2xl text-textSecondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="py-3 px-4 bg-background border border-border rounded-2xl text-textSecondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 group">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </>
          )}

          {/* Switch view links */}
          <div className="mt-6 text-center">
            {view === 'login' && (
              <p className="text-textSecondary">
                Belum punya akun?{' '}
                <button
                  onClick={() => switchView('signup')}
                  className="text-primary hover:text-secondary font-medium transition-colors"
                >
                  Daftar sekarang
                </button>
              </p>
            )}
            {view === 'signup' && (
              <p className="text-textSecondary">
                Sudah punya akun?{' '}
                <button
                  onClick={() => switchView('login')}
                  className="text-primary hover:text-secondary font-medium transition-colors"
                >
                  Masuk
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-textSecondary text-sm mt-6">
          Dengan melanjutkan, Anda menyetujui{' '}
          <button className="text-primary hover:underline">Syarat & Ketentuan</button>
          {' '}dan{' '}
          <button className="text-primary hover:underline">Kebijakan Privasi</button>
          {' '}kami.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
