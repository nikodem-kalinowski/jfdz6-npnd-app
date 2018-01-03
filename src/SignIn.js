import React, {Component} from 'react'
import {signIn} from './state/auth'
import {connect} from 'react-redux'
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap'
import ModalSignUp from './ModalSignUp'
import './SignIn.css'

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
      <Container className='container'>
        <Row>
          <Col sm='12' md={{size: 6, offset: 3}} className='border rounded'>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="userEmail">
                  Email:
                </Label>
                <Input
                  name='login'
                  type='email'
                  id='userEmail'
                  onChange={this.handleChange}
                  autoFocus
                />
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
                <div className='text-center'>
                  <Button type='submit' color='primary' size='lg' style={{marginTop: 30}}>Zaloguj się</Button>
                  <p style={{color: 'red'}}>{this.props.auth.error ? this.props.auth.error.message : null}</p>
                </div>
                <p style={{marginTop: 50}} className='text-center'>Nie masz jeszcze konta? Zarejestruj się teraz!</p>
                <ModalSignUp/>
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