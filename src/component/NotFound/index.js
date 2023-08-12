import './index.css'

const NotFound = () => (
  <div className="app-container">
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
        alt="not found"
        className="notfound-image"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
