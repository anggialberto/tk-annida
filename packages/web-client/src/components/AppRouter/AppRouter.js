import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "~/components/Layout/Layout";
// import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
import routes from '~shared/routes'


export default function AppRouter() {
  return (
    <>
      {/*<ScrollToTop />*/}
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route}>
            {
              route.redirect ?
                (<Redirect to={route.redirect} />) :
                (<Layout InnerComponent={route.component} />)
            }
          </Route>
        ))}
      </Switch>
    </>
  );
}
