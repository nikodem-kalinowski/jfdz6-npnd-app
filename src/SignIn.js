import React, {Component} from 'react'
import {signIn} from './state/auth'
import {connect} from 'react-redux'
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap'

class SignIn extends Component {
  state = {
    login: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signIn(
      this.state.login,
      this.state.password)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm='12' md={{size: 8, offset: 2}}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                {
                  this.props.auth.error && <p>{this.props.auth.error.message}</p>
                }
                <Label for="userEmail">
                  Email:
                </Label>
                <Input
                  name='login'
                  type='email'
                  id='userEmail'
                  onChange={this.handleChange}
                  autoFocus/>
              </FormGroup>
              <FormGroup>
                <Label for='userPassword'>
                  Hasło:
                </Label>
                <Input
                  name='password'
                  type='password'
                  id='userPassword'
                  onChange={this.handleChange}/>
                <Button type='submit' color='primary' size='md'>Zaloguj się</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)