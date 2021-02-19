import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import './styles/Payment.css'
import CheckoutProduct from './CheckoutProduct'
import {Link, useHistory} from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { getBasketTotal } from '../reducer';
import CurrencyFormat from 'react-currency-format'
import axios from '../axios'


function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();

    const history = useHistory();


    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [clientSecret, setclientSecret] = useState(true) //This helps doing the transaction with Stripe

        
    
    //Everytime a cart changes, we need to change the payment details
        useEffect(() => {
            //generate the special stripe secret which allows us to charge a customer
            const getClientSecret = async () => {
                const response = await axios({
                    //Stripe expects the total in currencies in sub unit. so dollars means cents actually so multiply by 100
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                setclientSecret(response.data.clientSecret)
            }
    
            getClientSecret();
        }, [basket])

    const handleSubmit = async (event) => {

        event.preventDefault();

        setProcessing(true); //Starts processing and button will be disabled

        


        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ payemntIntent  }) => {
            //Stripe calls it paymentIntent = payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders') //Goes to the orders page

        }) 




    }

    const handleChange = event => {
        //Listen for changes in card Element
        //and display any error as the customer tyoes their card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }



    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items </Link>)
                </h1>

                {/*Delivery*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 Test Drive</p>
                        <p>Peg City, Canada</p>
                    </div>

                </div>
                {/*Items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (

                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />

                        ))}
                    </div>
                </div>
                {/*Payment method*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/*Stripe*/}
                        <form onSubmit={handleSubmit}>

                            <CardElement onSubmit={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>
                                            Order Total: <strong>{value}</strong>
                                        </h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button disabled={processing || disabled || succeeded }>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>



                            </div>

                            {/*Errors */}
                            {error && <div>{error}</div>}

                        </form>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}



export default Payment
