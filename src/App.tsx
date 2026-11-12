import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginPage />;
  }

  return <LandingPage onLogin={() => setShowLogin(true)} />;
}
