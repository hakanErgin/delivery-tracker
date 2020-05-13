import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import update from 'immutability-helper';

export default class EditDeliveryNote extends Component {
  constructor(props) {
    super(props);

    this.handleIdChange = this.handleIdChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);

    this.state = {
      id: props.match.params.id,
      deliveryNoteId: '',
      date: new Date(),
      delivery: [{ company: '', code: '', quantity: '', productionPlan: '' }],
      productionPlans: [],
      chosenCompanyProductionPlans: [],
      codes: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/delivery-note/' + this.state.id)
      .then((response) => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('http://localhost:5000/production-plan/')
      .then((response) => {
        this.setState({ productionPlans: response.data });
        console.log('response', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleIdChange(event) {
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
    this.setState({
      delivery: update(this.state.delivery, {
        [index]: {
          company: {
            $set: this.props.companies.find(
              (c) => c.companyName === event.target.value
            ),
          },
        },
      }),
    });
  }

  onCodeChange(index, event) {
    this.setState({
      delivery: update(this.state.delivery, {
        [index]: {
          code: {
            $set: event.target.value,
          },
        },
      }),
    });
    this.setState({
      codes: update(this.state.codes, {
        [index]: {
          $set: event.target.value,
        },
      }),
    });
  }

  onChangeQuantity(index, event) {
    const values = { ...this.state };
    values.delivery[index].quantity = event.target.value;
    values.delivery[index].productionPlan = this.getSelectedProductionPlan(
      index
    )[0].productionPlanId;
    this.setState(values);
  }

  addFields() {
    const values = { ...this.state };
    values.delivery.push({
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
      delivery: [...this.state.delivery],
    };

    console.log(deliveryNote);

    axios
      .post(
        'http://localhost:5000/delivery-note/edit/' + this.state.id,
        deliveryNote
      )
      .then((res) => console.log(res.data))
      .then(() => (window.location = '/deliverynotes'));
  }

  getSelectedProductionPlan(index) {
    return this.state.productionPlans.filter(
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
        <h3>Edit Delivery Note</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Delivery Note Id : </label>
            <input
              name="deliveryNoteId"
              type="text"
              className="form-control"
              value={this.state.deliveryNoteId}
              onChange={this.handleIdChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={new Date(this.state.date)}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div>
            {this.state.delivery.map((delivery, index) => (
              <React.Fragment key={index}>
                <div className="form-group">
                  <label>Company : </label>
                  <select
                    name="company"
                    ref="company"
                    required
                    className="form-control"
                    value={this.state.delivery[index].company.companyName}
                    onChange={(event) => this.handleCompanyChange(index, event)}
                  >
                    {this.props.companies &&
                      this.props.companies.map(function (company) {
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
                    onChange={(event) => this.onCodeChange(index, event)}
                  >
                    {this.state.productionPlans.map((plan) => {
                      if (plan.code == this.state.delivery[index].code)
                        return (
                          <option value={plan.code} selected>
                            {plan.code}
                          </option>
                        );
                      else if (
                        plan.company.companyName ==
                        this.state.delivery[index].company.companyName
                      )
                        return <option value={plan.code}>{plan.code}</option>;
                      else return null;
                    })}
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
                {this.state.delivery[index].productionPlan && (
                  <div>
                    <label>production plan </label>
                    {this.state.delivery[index].productionPlan}
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
              value="Update Delivery Note"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// axios
//   .get(
//     `http://localhost:5000/production-plan/company/${this.state.delivery[index].company._id}`
//   )
//   .then((response) => {
//     console.log(response);

//     let selectedProductionPlan = [];
//     response.data.map((prodPlan) => selectedProductionPlan.push(prodPlan));

//     const currentProdPlan = this.state.chosenCompanyProductionPlans[index];
//     // if we already have a production plan for the current index (meaning that a company has already been selected) we want to replace it instead of adding it to the array
//     if (currentProdPlan) {
//       const values = { ...this.state };
//       values.chosenCompanyProductionPlans[index] = selectedProductionPlan;
//       this.setState(values);
//     } else {
//       this.setState({
//         chosenCompanyProductionPlans: [
//           ...this.state.chosenCompanyProductionPlans,
//           selectedProductionPlan,
//         ],
//       });
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/* <div className="form-group">
                  <label>code : </label>
                  <select
                    name="code"
                    ref="code"
                    required
                    className="form-control"
                    value={this.state.delivery[index].code}
                    onChange={(event) => this.onCodeChange(index, event)}
                  >
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
                </div> */

// .then(() => {
//   const plans = this.state.productionPlans.filter((n) =>
//     this.state.delivery.some(
//       (n2) => n.company.companyName == n2.company.companyName
//     )
//   );
//   this.setState({
//     chosenCompanyProductionPlans: update(
//       this.state.chosenCompanyProductionPlans,
//       {
//         $set: plans,
//       }
//     ),
//   });
// })
