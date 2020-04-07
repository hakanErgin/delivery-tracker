import React, { Component } from 'react';

export default class DeliveryBlock extends Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.state = {
      deliveries: [{ company: '', code: '', quantity: '', productionPlan: '' }],
    };
  }

  componentDidMount() {
    console.log(this.state.deliveries);
    console.log(typeof this.state.deliveries);
  }

  handleSelectChange(index, event) {
    const values = { ...this.state };
    values.deliveries[index].company = event.target.value;
    this.setState(values);
  }

  onChangeCode(index, event) {
    const values = { ...this.state };
    values.deliveries[index].code = event.target.value;
    this.setState(values);
  }

  onChangeQuantity(index, event) {
    const values = { ...this.state };
    values.deliveries[index].quantity = event.target.value;
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

  render() {
    return (
      <div>
        {this.state.deliveries &&
          this.state.deliveries.map((delivery, index) => (
            <React.Fragment key={`${delivery}~${index}`}>
              <div className="form-group">
                <label>Company : </label>
                <select
                  name="company"
                  ref="company"
                  required
                  className="form-control"
                  value={this.props.company}
                  onChange={(event) => this.handleSelectChange(index, event)}
                >
                  <option value="placeholder" defaultValue>
                    Select a Company
                  </option>
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
                <label>Code: </label>
                <input
                  type="text"
                  className="form-control"
                  value={delivery.code}
                  onChange={(event) => this.onChangeCode(index, event)}
                />
              </div>
              <div className="form-group">
                <label>Quantity: </label>
                <input
                  type="text"
                  className="form-control"
                  value={delivery.quantity}
                  onChange={(event) => this.onChangeQuantity(index, event)}
                />
              </div>
              {/* <div className="form-group">
              <label>Production plan: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.quantity}
              />
            </div> */}
              <button type="button" onClick={() => this.addFields()}>
                add
              </button>
            </React.Fragment>
          ))}
      </div>
    );
  }
}
