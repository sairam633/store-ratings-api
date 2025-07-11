import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = (token) => {
    onAuthSuccess(token);
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {isLogin ? (
        <LoginForm onLogin={handleAuthSuccess} />
      ) : (
        <SignupForm onSignup={handleAuthSuccess} />
      )}
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
