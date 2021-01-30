import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/**Layout */
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
/**Components */
import NewTransaction from './components/transactions/NewTransaction';
import EditTransaction from './components/transactions/EditTransaction';
import Transactions from './components/transactions/Transactions';
import Expenses from './components/transactions/Expenses';
import Income from './components/transactions/Income';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid container main-content">
          <Nav />
          <main className="box-content col-9">
            <Switch>
              <Route exact path="/" component={Transactions} />
              <Route exact path="/new-transaction" component={NewTransaction} />
              <Route exact path="/edit-transaction/:id" component={EditTransaction} />
              <Route exact path="/income" component={Income} />
              <Route exact path="/expenses" component={Expenses} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  )
}

export default App;
