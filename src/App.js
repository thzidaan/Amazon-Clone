import React, {useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import {auth } from './firebase'
import { useStateValue } from './StateProvider';




function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => { 
    //Will only run once once the App compononent will load
    //Dynamic If statement & Listener

    auth.onAuthStateChanged(authUser => {
      console.log('The User is ', authUser);

      if(authUser){

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
        //User is or was logged in
      }else {
        //User is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    }) //Everytime auth changes, it will fire up hence trancking the user
  }, [])

  return (
    //BEM
    <Router>
      <div className="app">
      
        <Switch>

            <Route path='/login'>
              <Login />

            </Route>

            <Route path='/checkout'>
              <Header /> 
              <Checkout />
            </Route>

            <Route path='/'>
              <Header /> 
              <Home />    
            </Route>

        </Switch>
      </div>

    </Router>

  );
}

export default App;
