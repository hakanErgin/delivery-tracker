// axios
//   .get('http://localhost:5000/production-plan/')
//   .then((response) => {
//     const values = { ...this.state };
//     values.productionPlans.push(
//       response.data
//         .filter((prodPlan) => prodPlan.company === chosenCompany)
//         .sort(function (a, b) {
//           return new Date(a.date) - new Date(b.date);
//         })
//     );
//     this.setState(values);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// axios
//   .get('http://localhost:5000/production-plan/')
//   .then((response) => {
//     this.setState({
//       productionPlans: response.data
//         .filter((prodPlan) => prodPlan.company === chosenCompany)
//         .sort(function (a, b) {
//           return new Date(a.date) - new Date(b.date);
//         }),
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateDeliveryNote extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);

    this.state = {
      deliveryNoteId: '',
      date: new Date(),
      companies: [],
      deliveries: [{ company: '', code: '', quantity: '', productionPlan: '' }],
      productionPlans: [],
      chosenCompanyProductionPlans: [],
      codes: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/')
      .then((response) => {
        console.log('response', response);
        this.setState({ companies: response.data });
        console.log('state', this.state);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('add- state:', this.state);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  handleCompanyChange(index, event) {
    const values = { ...this.state };
    const selectedCompany = event.target.value;
    values.deliveries[index].company = selectedCompany;

    this.setState(values);

    axios
      .get(`http://localhost:5000/production-plan/company/${selectedCompany}`)
      .then((response) => {
        console.log(response);

        let selectedProductionPlan = [];
        response.data.map((prodPlan) => selectedProductionPlan.push(prodPlan));

        const currentProdPlan = this.state.chosenCompanyProductionPlans[index];
        // if we already have a production plan for the current index (meaning that a company has already been selected) we want to replace it instead of adding it to the array
        if (currentProdPlan) {
          const values = { ...this.state };
          values.chosenCompanyProductionPlans[index] = selectedProductionPlan;
          this.setState(values);
        } else {
          this.setState({
            chosenCompanyProductionPlans: [
              ...this.state.chosenCompanyProductionPlans,
              selectedProductionPlan,
            ],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onCodeChange(index, event) {
    const values = { ...this.state };
    values.deliveries[index].code = event.target.value;
    values.codes[index] = event.target.value;
    this.setState(values);
  }

  onChangeQuantity(index, event) {
    const values = { ...this.state };
    values.deliveries[index].quantity = event.target.value;
    values.deliveries[index].productionPlan = this.getSelectedProductionPlan(
      index
    )[0].productionPlanId;
    this.setState(values);
  }

  addFields() {
    const values = { ...this.state };
    values.deliveries.push({
      company: '',
      code: '',
      quantity: '',
      productionPlan: '',
    });
    this.setState(values);
  }

  onSubmit(e) {
    e.preventDefault();

    const deliveryNote = {
      deliveryNoteId: this.state.deliveryNoteId,
      date: this.state.date,
      delivery: [...this.state.deliveries],
    };

    console.log(deliveryNote);

    axios
      .post('http://localhost:5000/delivery-note/add', deliveryNote)
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/deliverynotes'));
  }

  getSelectedProductionPlan(index) {
    return this.state.chosenCompanyProductionPlans[index].filter(
      (productionPlan) => productionPlan.code === this.state.codes[index]
    );
  }

  getQuantityLeft(index) {
    const selectedProductionPlan = this.getSelectedProductionPlan(index);
    console.log('selectedProductionPlan', selectedProductionPlan);

    return selectedProductionPlan[0] && selectedProductionPlan[0].quantityLeft;
  }

  render() {
    return (
      <div>
        <h3>Create New Delivery Note</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Delivery Note Id : </label>
            <input
              name="deliveryNoteId"
              type="text"
              className="form-control"
              value={this.state.deliveryNoteId}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div>
            {this.state.deliveries.map((delivery, index) => (
              <React.Fragment key={`${delivery}~${index}`}>
                <div className="form-group">
                  <label>Company : </label>
                  <select
                    name="company"
                    ref="company"
                    required
                    className="form-control"
                    value={this.state.company}
                    onChange={(event) => this.handleCompanyChange(index, event)}
                  >
                    <option value="placeholder" defaultValue>
                      Select a Company
                    </option>
                    {this.state.companies &&
                      this.state.companies.map(function (company) {
                        return (
                          <option
                            key={company.companyName}
                            value={company.companyName}
                          >
                            {company.companyName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group">
                  <label>code : </label>
                  <select
                    name="code"
                    ref="code"
                    required
                    className="form-control"
                    value={this.state.deliveries[index].code}
                    onChange={(event) => this.onCodeChange(index, event)}
                  >
                    <option value="placeholder" defaultValue>
                      Select a code
                    </option>
                    {this.state.chosenCompanyProductionPlans[index] &&
                      this.state.chosenCompanyProductionPlans[index].map(
                        (chosenCompanyProductionPlan) => (
                          <option
                            key={chosenCompanyProductionPlan.code}
                            value={chosenCompanyProductionPlan.code}
                          >
                            {chosenCompanyProductionPlan.code}
                          </option>
                        )
                      )}
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    Quantity
                    {this.state.codes[index] != null &&
                      `
                    max: ${this.getQuantityLeft(index)}`}
                    :
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={
                      this.state.code && this.getQuantityLeft(this.state.code)
                    }
                    className="form-control"
                    value={delivery.quantity}
                    onChange={(event) => this.onChangeQuantity(index, event)}
                  />
                </div>
                {this.state.deliveries[index].productionPlan && (
                  <div>
                    <label>production plan </label>
                    {this.state.deliveries[index].productionPlan}
                  </div>
                )}
                <button type="button" onClick={() => this.addFields()}>
                  add
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Delivery Note"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
