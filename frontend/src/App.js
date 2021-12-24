import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './main';
import Form from './form';
import Detail from './detail';

function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/form" component={Form} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </div>  
    )
  }
export default App;