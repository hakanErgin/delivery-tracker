class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery: [{ company: '', code: '', quantity: '', productionPlan: '' }],
    };
  }

  handleCompanyChange = (index, event) => {
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
  };

  render() {
    const { dataValue } = this.state;
    const options = lookup[dataValue];
    return (
      <div>
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
                <option key={company.companyName} value={company.companyName}>
                  {company.companyName}
                </option>
              );
            })}
        </select>
        <hr />
        <select
          name="code"
          ref="code"
          required
          className="form-control"
          onChange={(event) => this.onCodeChange(index, event)}
        >
          {options.map((plan) => {
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
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
