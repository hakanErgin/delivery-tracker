import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.component';
import ProductionPlanList from './components/ProductionPlans/production-plan-list.component';
import EditCompany from './components/Companies/EditCompany';
import CreateUser from './components/create-user.component';
import CompaniesList from './components/Companies/CompaniesList';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ProductionPlanList} />
        <Route path="/companies" component={CompaniesList} />
        <Route path="/user" component={CreateUser} />
        <Route path="/companies/edit/:id" component={EditCompany} />
      </div>
    </Router>
  );
}

export default App;
