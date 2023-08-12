import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <nav className="header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="nav-logo"
      />
      <button type="button" className="header-button" onClick={logoutClicked}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
