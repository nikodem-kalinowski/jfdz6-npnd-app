import React from 'react';
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input
} from 'reactstrap';
import { runInThisContext } from 'vm';

class Costs extends React.Component {
  state = {
    costsGroup: [
      {
        id: 1,
        name: 'Spożywka'
      },
      {
        id: 2,
        name: 'Jedzenie na mieście'
      },
      {
        id: 3,
        name: 'Higiena'
      },
      {
        id: 4,
        name: 'Nietypowe'
      }
    ],
    costsRecords: [],
    inputValue: '',
    costAmount: 0,
    selectedCostGroup: ''
  };
  handleChange = e => {
    const selectedCostGroup = e.currentTarget.value;
    this.setState({ selectedCostGroup });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newCostGroup = this.state.inputValue;

    if (
      this.state.inputValue === '' ||
      this.state.costsGroup.some(
        cost => cost.name.toUpperCase() === this.state.inputValue.toUpperCase()
      )
    ) {
      console.log('nie mogę dodać, już to istnieje / puste nie pójdzie');
      this.setState({
        inputValue: ''
      });
    } else if (this.state.inputValue !== '') {
      this.setState({
        costsGroup: this.state.costsGroup.concat({
          id: this.state.costsGroup[this.state.costsGroup.length - 1].id + 1,
          name: newCostGroup
        }),
        inputValue: ''
      });
    }
  };
  handleInputChange = e => {
    const inputValue = e.currentTarget.value;

    this.setState({
      inputValue
    });
  };

  handelCostAmount = e => {
    const costAmount = e.currentTarget.value;

    this.setState({
      costAmount
    });
  };

  componentDidUpdate() {
    localStorage.setItem('costs', JSON.stringify(this.state.costsRecords));
    localStorage.setItem('costsGroups', JSON.stringify(this.state.costsGroup));
  }

  componentDidMount() {
    this.setState({
      costsRecords: JSON.parse(localStorage.getItem('costs')),
      costsGroup: JSON.parse(localStorage.getItem('costsGroups'))
    });
  }

  handleAddCostRecord = e => {
    e.preventDefault();
    const costAmount = this.state.costAmount;
    const selectedCostGroup = this.state.selectedCostGroup;
    const id =
      this.state.costsRecords && this.state.costsRecords.length > 0
        ? this.state.costsRecords[this.state.costsRecords.length - 1].id + 1
        : 1;

    this.setState({
      costsRecords: this.state.costsRecords.concat({
        id,
        costAmount,
        costGroup: selectedCostGroup
      })
    });
  };

  render() {
    return (
      <div
        style={{
          fontSize: '20px',
          color: 'white'
        }}
      >
        <div>
          Choose cost group Select group<select
            name=""
            id=""
            onChange={this.handleChange}
          >
            <option defaultValue="">-</option>
            {this.state.costsGroup.map(cost => (
              <option key={cost.id} value={cost.name}>
                {cost.name}
              </option>
            ))}
          </select>
        </div>
        Costs Sum of {`${this.state.selectedCostGroup}`}:{' '}
        {this.state.costsRecords.reduce(
          (accu, prev) =>
            prev.costGroup === this.state.selectedCostGroup
              ? accu + prev.costAmount * 1
              : accu,
          0
        )}
        <br />
        Zostało w budżecie dla Spożywka:
        {this.state.costsRecords.reduce(
          (accu, prev) =>
            prev.costGroup === this.state.selectedCostGroup
              ? accu - prev.costAmount * 1
              : accu,
          1000
        )}
        <br />
        Obecny trend dniowy:
        {this.state.costsRecords.reduce(
          (accu, prev) =>
            prev.costGroup === this.state.selectedCostGroup
              ? accu + prev.costAmount * 1
              : accu,
          0
        ) / 12}
        <form action="" onSubmit={this.handleSubmit}>
          Name of cost group{' '}
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
          <button type="submit">Add cost group</button>
        </form>
        <form onSubmit={this.handleAddCostRecord}>
          Amount{' '}
          <input type="number" step="0.01" onChange={this.handelCostAmount} />
          Select group<select name="" id="" onChange={this.handleChange}>
            <option defaultValue="">-</option>
            {this.state.costsGroup.map(cost => (
              <option key={cost.id} value={cost.name}>
                {cost.name}
              </option>
            ))}
          </select>
          <button type="submit">Add record</button>
        </form>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Kwota</th>
              <th>Rodzaj kosztu</th>
            </tr>
          </thead>
          <tbody>
            {this.state.costsRecords.length > 0
              ? this.state.costsRecords.map((record, index) => (
                  <tr key={record.id}>
                    <td>{index + 1}</td>
                    <td>{record.costAmount}</td>
                    <td>{record.costGroup}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Costs;
