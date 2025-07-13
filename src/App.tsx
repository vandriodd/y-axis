import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import ProtectedRoutes from "./components/protected-routes";
import ProductPage from "./pages/Product";
import { CartContextProvider } from "./providers/cart";
import OnboardingPage from "./pages/Onboarding";
import useAuthContext from "./hooks/useAuthContext";

export default function App() {
  const { currentUser = "", isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">Loading...</div>
    );
  }

  return (
    <CartContextProvider username={currentUser || ""}>
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
