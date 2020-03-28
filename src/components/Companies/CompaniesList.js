import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateCompany from './CreateCompany';

const Company = props => (
  <>
    <tr>
      <td>{props.company.id}</td>
      <td>{props.company.companyName}</td>

      <td>
        <Link to={'/companies/edit/' + props.company._id}>edit</Link> |{' '}
        <a
          href="#"
          onClick={() => {
            props.deleteCompany(props.company._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
    <hr />
  </>
);

export default class ProductionPlanList extends Component {
  constructor(props) {
    super(props);

    this.deleteCompany = this.deleteCompany.bind(this);

    this.state = { companies: [], showAddCompany: false };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/')
      .then(response => {
        this.setState({ companies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteCompany(id) {
    axios
      .delete('http://localhost:5000/companies/delete/' + id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      companies: this.state.companies.filter(el => el._id !== id)
    });
  }

  createCompaniesList() {
    return this.state.companies.map(company => {
      return (
        <Company
          company={company}
          deleteCompany={this.deleteCompany}
          key={company._id}
        />
      );
    });
  }

  render() {
    const addCompany = () => {
      this.setState({ showAddCompany: true });
    };
    return (
      <div>
        <h3>List of Companies</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{this.createCompaniesList()}</tbody>
        </table>
        <button onClick={addCompany}>Add New Company</button>
        {this.state.showAddCompany && <CreateCompany />}
      </div>
    );
  }
}
