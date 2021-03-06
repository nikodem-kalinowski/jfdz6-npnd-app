import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, FormGroup, Form, Input, Label} from 'reactstrap'

import {add, changeInputCurrency, changeOutputCurrency} from '../../state/exchangeRates'

import './CalculatorInputCurrency.css'

class CalculatorInputCurrency extends Component {

  handleSubmit = event => {
    event.preventDefault()

    const userInput = this.userInput.value
    this.props.addValue(userInput)
    this.userInput.value = ''
  }

  handleInputSelect = event => {
    const optionField = event.target.value
    this.props.selectInputCurrency(optionField)
  }

  handleOutputSelect = event => {
    const optionField = event.target.value
    this.props.selectOutputCurrency(optionField)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div className='flex-container'>
            <div className='input-field'>
              <FormGroup>
                <Label for="input">Wpisz kwotę</Label>
                <Input id='input'
                       type='text'
                       innerRef={item => this.userInput = item}
                       placeholder={this.props.error ? this.props.error.message : this.props.userValue}
                       required/>
              </FormGroup>
            </div>
            <div className='currency-list'>
            <FormGroup>
              <Label for="inputCurrency">Wybierz walutę, z której chcesz przeliczyć</Label>
              <Input type="select"
                     name="select"
                     id="inputCurrency"
                     value={this.props.selectInputValue}
                     onChange={this.handleInputSelect}>
                {
                  this.props.rates.map(
                    rate => <option
                      value={rate.code}
                      key={rate.code}>
                      {rate.currency}
                    </option>
                  )
                }
                <option selected>-</option>
              </Input>
            </FormGroup>
            </div>
            <div className='currency-list'>
            <FormGroup>
              <Label for="outputCurrency">Wybierz walutę, na którą chcesz przeliczyć</Label>
              <Input type="select"
                     name="select"
                     id="outputCurrency"
                     value={this.props.selectOutputValue}
                     onChange={this.handleOutputSelect}>
                {
                  this.props.rates.map(
                    rate => <option
                      value={rate.code}
                      key={rate.code}>
                      {rate.currency}
                    </option>
                  )
                }
                <option selected>-</option>
              </Input>
            </FormGroup>
            </div>
            <div className='submit-button'>
            <Button type="submit" bsSize="lg" id="test" block='true'>Przelicz</Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  error: state.exchangeRates.error,
  userValue: state.exchangeRates.userValue,
  selectInputValue: state.exchangeRates.selectInputValue,
  selectOutputValue: state.exchangeRates.selectOutputValue
})

const mapDispatchToProps = dispatch => ({
  addValue: (userValue) => dispatch(add(userValue)),
  selectInputCurrency: (selectValue) => dispatch(changeInputCurrency(selectValue)),
  selectOutputCurrency: (selectOutputValue) => dispatch(changeOutputCurrency(selectOutputValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorInputCurrency)