import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Blog from './components/Blog/Blog'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'

const App = () => {
  return (

    <BrowserRouter>
      <Route
        path='/'
        render={() => <NavBar />} />
      <Switch>
        <Route
          exact path='/'
          component={Blog}
        />
        <Route
          exact path='/form'
          render={(match) => <Form userId={match} />} />
      </Switch>

    </BrowserRouter>
  )
}

export default App

