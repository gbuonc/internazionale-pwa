import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()
const Home = () =>(
   <h1>Home</h1> 
)
const About = (props) =>(
   <div>
   <h1>About</h1>
   {JSON.stringify(props)}
   {new URLSearchParams(location.search).get('id')}
   </div>
)
const Contact = () =>(
   <h1>Contact</h1>
)
const Page = (props) =>{
   console.log(props.match)
   return(
   <h1>Page {props.match.params.page} / {props.match.params.subpage} </h1>
)}
const fourohFour = () =>{
   return <h1>404</h1>
}
const App = () =>(
   <Router>
      <div>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:page/:subpage" component={Page} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Redirect from="/old" to="/new" />
            <Route component={fourohFour} />
         </Switch>
         
         <NavLink exact to="/">Home</NavLink>&nbsp;|&nbsp;
         <NavLink exact to="/about?id=asc">About</NavLink>&nbsp;|&nbsp;
         <NavLink exact replace to="/contact" activeStyle={{color:'green'}}>Contact</NavLink>&nbsp;|&nbsp;
         <NavLink exact replace to="/notExist" activeStyle={{color:'green'}}>Not Exist</NavLink>

      </div>
   </Router>
)
export default App
