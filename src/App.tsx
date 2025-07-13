import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import { useContext } from "react";
import { AuthContext } from "./providers/context";
import ProtectedRoutes from "./components/protected-routes";
import ProductPage from "./pages/Product";
import { CartContextProvider } from "./providers/cart";
import OnboardingPage from "./pages/Onboarding";

export default function App() {
  const context = useContext(AuthContext);

  if (context.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContextProvider username={context.currentUser || ""}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={LogIn} />
        <Route path="/onboarding" component={OnboardingPage} />

        <Route>
          <ProtectedRoutes>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/product/:id">
                {(params) => <ProductPage id={params.id} />}
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </ProtectedRoutes>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </CartContextProvider>
  );
}
