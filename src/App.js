import React from 'react';
import { Route } from 'react-router-dom';
import { Login, Contacts } from './components';

function App() {
  return (
    <div>
      <Route exact path='/' component={Contacts} />
      <Route exact path='/login' component={Login} />
    </div>
  );
}

export default App;
