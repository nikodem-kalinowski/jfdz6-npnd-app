import React, {Component} from 'react'
import {connect} from 'react-redux'

import SignIn from './SignIn'
import WelcomePage from './WelcomePage'

class Auth extends Component {
  render() {
    return (
      <div>
        {
          this.props.auth.data === null ?
            <div>
              <WelcomePage/>
              <SignIn/>
            </div>
            :
            this.props.children
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Auth)