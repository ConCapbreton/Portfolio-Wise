import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="page">
      <h1>Error Page</h1>
      <p>Hmmm... it seems there was an error! Click on the link below to naviate back to the Portfolio Wise login</p>
      <Link to="/">Login</Link>
    </div>
  )
}

export default ErrorPage