import { Router, Switch, Route } from 'wouter';
import Landing from './components/pages/Landing';
import LogIn from './components/pages/LogIn';
import Home from './components/pages/Home';
import NotFound from './components/pages/404';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={LogIn} />
        <Route path="/home" component={Home} />

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
