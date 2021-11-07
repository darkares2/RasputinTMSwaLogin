import React from 'react';
import { LoginForm } from './login';

function App() {
  const appStyle = {
    height: '250px',
      display: 'flex'
  };

  return <div style={appStyle}>
            <LoginForm />
        </div>;
}

export default App;
