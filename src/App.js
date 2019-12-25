import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.component';
import ProductionPlanList from './components/production-plan-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateProductionPlan from './components/create-production-plan.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ProductionPlanList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateProductionPlan} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
