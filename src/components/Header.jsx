import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){
    // var cartLength = ''
    const [cart, setCart] = useState([])
    const [cartActive, setCartActive] = useState(false)
    const [message, setMessage] = useState('')

    function getCart (){
        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        // setCart(cart)
        getCartData(cart);
       
    }

    function getCartData(cart){
        var string = ''
        for(let i = 0; i <= cart.length; i++)
        {
            if(i !== 0)
            {
                string += '&id=' + cart[i]
            }
            else 
            {
                string += 'id=' + cart[i]
            }
        }
        
        axios.get('/products?' + string )
        .then(res => {
            console.log(res.data)
            setCart(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const removeCart = (id) => {
        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)

        cart = cart.filter(item => item !== id)

        localStorage.setItem('cart', JSON.stringify(cart));
        setMessage('success')
        getCart();

        setTimeout(()=>{
            setMessage(false)
        })
    }

    useEffect(()=>{
        getCart();
    },[])
    return (
        <>
            {/* main header */}
            <div className='header container mx-auto sticky'>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><NavLink to='/'>Homepage</NavLink></li>
                                <li><NavLink to='/create-product'>Create Product</NavLink></li>
                                <li><NavLink to='/all-products'>All Products</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <a href='/' className="btn btn-ghost normal-case text-xl">E Commerce Application</a>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle" onClick={() => {setCartActive(!cartActive)}}>
                            <div role="button" className="relative flex text-gray-500 mt-2">
                                <svg className="flex-1 w-8 h-8 fill-current" viewBox="0 0 24 24">
                                <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                                </svg>
                                {cart.length > 0 && (
                                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                                        { cart.length }
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div> 
            </div>

            {/* cart */}
            { cartActive && (
                    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed z-50 inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <div className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-[#2a303d] shadow-xl">
                                        <div className='p-4'>
                                            {message === 'success' &&
                                                (
                                                    <div className="alert alert-success shadow-lg">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            <span>Product removed from cart successfully.</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {/* error alert */}
                                            {message === 'error'  &&
                                                (
                                                    <div className="alert alert-success shadow-lg">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                <span>{message}</span>
                                                            <span>Error on Removing product.</span>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-white" id="slide-over-title">Shopping cart</h2>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500"  onClick={() => {setCartActive(!cartActive)}}>
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-700">
                                                        {cart.length > 0 ? <>
                                                            {cart.map((product,index) => (
                                                                <li className="flex py-6" key={index}>
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                                                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                                                    </div>
        
                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-white">
                                                                                <h3>
                                                                                    <NavLink to={'/products/' + product.slug} onClick={() => {setCartActive(!cartActive)}}>{product.title}</NavLink>
                                                                                </h3>
                                                                                <p className="ml-4">${product.price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Qty 1</p>
        
                                                                            <div className="flex">
                                                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>{removeCart(product.id)}}>Remove</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </> : <>
                                                                
                                                        </>}
                                                        

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-600 py-6 px-4 sm:px-6">                                            
                                            <div className="mt-6 text-center">
                                                <button  className="mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={() => {setCartActive(!cartActive)}}>Checkout</button>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <NavLink to="/" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => {setCartActive(!cartActive)}}>
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
