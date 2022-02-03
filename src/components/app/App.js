import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsListPage, Page404, SingleComicsPage } from '../pages';

const App = () => {
  return (
    <Router>
    <div className="app">
    <AppHeader/>
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
    </div>
    </Router>
  );
}

export default App;
