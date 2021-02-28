import React, {useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import {auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'


const promise = loadStripe('pk_test_51IPgWPDCYw14a9syqQJbGAdXqH8ytdb9E7vfs3wCqFPuFbvLYd2aErsYP3UVShVTUYwdBf1lxNKr5udBAeE244nM00AqVCMhpf');



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

            <Route path='/payment'>
              <Header />

              <Elements stripe={promise}>
               <Payment />
               
              </Elements>


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
