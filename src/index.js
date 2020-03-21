import CurrentUserChecker from 'components/current-user-checker'
import TopBar from 'components/top-bar'
import { CurrentUserProvider } from 'contexts/currentUser'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))