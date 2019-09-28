import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Route exact path='/login' component={Login} />
    </div>
  );
}

export default App;
