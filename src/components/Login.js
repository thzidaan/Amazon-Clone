import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, db } from '../firebase'
import './styles/Login.css'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //It succesfully create a new user with email and password
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>Email</h5>
                    <input value={email} type="text" onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input value={password} type="password" onChange={e => setPassword(e.target.value)} />

                    <button type="submit" onClick={signIn} className="login__signInButton">Sign in</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
                </p>

                <button onClick={register} className="login__registerButton">Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login
