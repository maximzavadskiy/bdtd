import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import LoginButtons from './LoginButtons.jsx';

const App = () => (
  <div>
    <LoginButtons />
    <h1>Welcome to BTDT</h1>
    <Hello />
    <Info />
  </div>
);

export default App;
