// import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useParams,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "fontsource-roboto";
import Progress from "./components/Progress";
import Apply from "./pages/Apply";
import Login from "./pages/Login";
import page404 from "./pages/Page404";
import Album from "./layouot/Album";
import Dashboard from "./pages/CRUD/dashboard/Dashboard";
import Create from "./pages/CRUD/dashboard/Create";
import Detail from "./pages/CRUD/dashboard/Detail";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { Container, CssBaseline } from "@material-ui/core";

import { useApplyJobContext } from "./contexts/AuthContext";

function App() {
  // const [isLoading, setIsLoading] = useState(false);

  // will use Loading State.
  // eslint-disable-next-line no-unused-vars
  const userContext = useApplyJobContext();
  return (
    <Container component="main">
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Album} />
            <Route path="/apply" component={Apply} />
            <Route path="/login" component={Login} />
            <Route path="/create/" component={Create} />
            <Route path="/detail/:uid" component={Detail} />
            <Route path="/404" component={page404} />
            <Route component={page404} />
          </Switch>
          {/* <Route path="/signup" component={SignUp} /> */}
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
