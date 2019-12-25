import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductionPlan = props => (
  <>
    <tr>
      <td>{props.productionPlan.productionPlanId}</td>
      <td>{props.productionPlan.company}</td>
      {props.productionPlan.codes.map(code => {
        return (
          <>
            <td>{code.code}</td>
            <td>{code.quantity}</td>
          </>
        );
      })}
      <td>{props.productionPlan.date.substring(0, 10)}</td>
      <td>
        <Link to={'/edit/' + props.productionPlan._id}>edit</Link> |{' '}
        <a
          href="#"
          onClick={() => {
            props.deleteProductionPlan(props.productionPlan._id);
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

    this.deleteProductionPlan = this.deleteProductionPlan.bind(this);

    this.state = { productionPlans: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/production-plan/')
      .then(response => {
        this.setState({ productionPlans: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProductionPlan(id) {
    axios
      .delete('http://localhost:5000/production-plan/' + id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      productionPlans: this.state.exercises.filter(el => el._id !== id)
    });
  }

  createProductionPlanList() {
    return this.state.productionPlans.map(currentProductionPlan => {
      return (
        <ProductionPlan
          productionPlan={currentProductionPlan}
          deleteProductionPlan={this.deleteProductionPlan}
          key={currentProductionPlan._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>List of Production Plans</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Production Plan Id</th>
              <th>Company</th>
              <th>Code</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.createProductionPlanList()}</tbody>
        </table>
      </div>
    );
  }
}
