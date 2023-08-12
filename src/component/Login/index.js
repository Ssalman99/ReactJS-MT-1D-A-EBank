import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMsgs: '',
  }

  enterUser = event => {
    this.setState({username: event.target.value})
  }

  enterPin = event => {
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props

    history.replace('/')
  }

  failure = errorMsg => {
    this.setState({error: true, errorMsgs: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {user_id: username, pin: password}

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    console.log(response.ok)

    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsgs, error, username, password} = this.state
    return (
      <div className="login-container">
        <div className="login-menu">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="web-logo"
          />
          <div className="login-page">
            <h1 className="login-heading">Welcome Back!</h1>
            <form className="form-container" onSubmit={this.submitForm}>
              <label htmlFor="UserID" className="label">
                User ID
              </label>
              <input
                type="text"
                className="input"
                id="UserID"
                onChange={this.enterUser}
                value={username}
                placeholder="Enter User ID"
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                className="input"
                id="pin"
                value={password}
                onChange={this.enterPin}
                placeholder="Enter PIN"
              />
              <button type="submit" className="button">
                Login
              </button>
              {error && <p className="error">{errorMsgs}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
