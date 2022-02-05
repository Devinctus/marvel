import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
//import { MainPage, ComicsListPage, Page404, SingleComicsPage } from '../pages';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsListPage = lazy(() => import('../pages/ComicsListPage'));
const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'));
const Page404 = lazy(() => import('../pages/404'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <Suspense fallback={<Spinner/>}>
          <main>
            <Switch>
              <Route exact path="/">
                <MainPage/>
              </Route>
              <Route exact path="/comics/">
                <ComicsListPage/>
              </Route>
              <Route exact path="/comics/:comicsId">
                <SingleComicsPage/>
              </Route>
              <Route path="*">
                <Page404/>
              </Route>
            </Switch>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
