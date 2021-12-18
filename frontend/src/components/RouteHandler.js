import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../helpers/authHandler';

export default ({ children, ...rest }) => {
    let logged = isLogged();
    let authorized = (rest.private && !logged) ? false : true;
    return (
        <Route
            basename="/mbstore"
            {...rest}
            render={() => 
                authorized ? children : <Redirect to="/signin"/>
            }
        />
    );
}