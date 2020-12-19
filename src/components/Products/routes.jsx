import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Products from './Index';
import New from './New/Index';
import Edit from './Edit/Index';
import Destroy from './Destroy/Index';

const Routes = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/" component={Products}/>

      {user && user.token ? (
        <>
          <Route exact path="/new" component={New}/>
          <Route exact path="/edit/:id" component={Edit}/>
          <Route exact path="/destroy/:id" component={Destroy}/>
        </>
      ) : null}
    </Switch>
  );
}
 
export default Routes;