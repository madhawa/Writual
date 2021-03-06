import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomeContainer from './components/HomeComponents/HomeContainer'
import NavBar from './components/UniversalCompnents/NavBar'
import CreateContainer from './components/CreateComponents/CreateContainer'
import ReadContainer from './components/ReadComponents/ReadContainer'
import ProfileContainer from './components/ProfileComponents/ProfileContainer'

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/create" component={CreateContainer} />
        <Route exact path="/profile/:id" component={ProfileContainer} />
        <Route exact path="/read/:id" component={ReadContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
