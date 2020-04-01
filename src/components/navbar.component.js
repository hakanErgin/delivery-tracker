import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CompaniesList from './Companies/CompaniesList';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          ExcerTracker
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Production Plans
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/companies" className="nav-link">
                Companies
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/deliverynotes" className="nav-link">
                Delivery notes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Invoices
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
