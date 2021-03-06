import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.component';
import ProductionPlanList from './components/ProductionPlans/ProductionPlanList';
import EditCompany from './components/Companies/EditCompany';
import EditProductionPlan from './components/ProductionPlans/EditProductionPlan';
import DeliveryNotesList from './components/DeliveryNotes/DeliveryNotesList';
import EditDeliveryNotes from './components/DeliveryNotes/EditDeliveryNotes';
import getCompanies from './components/getters/CompaniesGetter';

import CompaniesList from './components/Companies/CompaniesList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getCompanies().then((companies) => this.setState({ companies }));
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact>
            <ProductionPlanList companies={this.state.companies} />
          </Route>
          <Route path="/companies">
            <CompaniesList />
          </Route>
          <Route path="/deliverynotes">
            <DeliveryNotesList companies={this.state.companies} />
          </Route>
          {/* <Route path="/delivery-note/edit/:id" component={EditDeliveryNotes} /> */}
          {/* <Route path="/delivery-note/edit/:id">
            <EditDeliveryNotes companies={this.state.companies} />
          </Route> */}
          <Route
            path="/delivery-note/edit/:id"
            render={({ match }) => (
              <EditDeliveryNotes
                companies={this.state.companies}
                match={match}
              />
            )}
          />
          <Route path="/companies/edit/:id" component={EditCompany} />
          {/* <Route path="/companies/edit/:id">
            <EditCompany />
          </Route> */}
          <Route path="/edit/:id" component={EditProductionPlan} />
        </div>
      </Router>
    );
  }
}

export default App;
