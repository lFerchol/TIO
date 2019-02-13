import React from 'react'
import { render } from 'react-dom'
import APIInvoker from "./utils/APIInvoker"
import TweetsContainer from './TweetsContainer'
//import FormTest from './FormTest'
import Signup from './Signup'
import Login from './Login'
import TwitterApp from './TwitterApp'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
/*
class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Login/>
    )
  }
}
render(<App/>, document.getElementById('root'));
*/
var createBrowserHistory = require('history/createBrowserHistory')
render((
  <Router history={ browserHistory }>
    <Route path="/" component={TwitterApp}>
    <Route path="signup" component={Signup}/>
    <Route path="login" component={Login}/>
   </Route>
  </Router>
  /*
  <Router history={ browserHistory }>
  <Router component={TwitterApp} path="/">
  <Route path="/signup" component={Signup}/>
  <Route path="/login" component={Login}/>
  </Router>
  </Router>*/
  /*
  <Router history={ browserHistory }>
    <Route path="/" component={TwitterApp}>
      <Route path="signup" component={Signup}/>
        <Route path="login" component={Login}/>
          <Route path=":user" component={UserPage} >
            <IndexRoute component={MyTweets} tab="tweets" />
              <Route path="followers" component={Followers} tab="followers"/>
                <Route path="following" component={Followings} tab="followings"/>
                  <Route path=":tweet" component={TweetDetail}/>
                  </Route>

    </Route>
  </Router>*/
  ), document.getElementById('root'));
