import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import { useContext } from "react";
import { AuthContext } from "./providers/context";
import ProtectedRoutes from "./components/protected-routes";

export default function App() {
  const context = useContext(AuthContext);

  if (context.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={LogIn} />

        <Route>
          <ProtectedRoutes>
            <Switch>
              <Route path="/home" component={Home} />
            </Switch>
          </ProtectedRoutes>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
