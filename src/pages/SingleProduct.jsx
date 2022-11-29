import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';

export default function SingleProduct(){
    const { slug } = useParams();
    const [ product, setProduct ] = useState('')
    const [message, setMessage] = useState('')
    const [reponseType, setReponseType] = useState(false)

    const getProduct = () => {
        axios.get('/products/?slug=' + slug)
            .then(res =>{
                console.log(res)
                setProduct(res.data[0])
            }).catch(err =>{
                console.log(err)
            })
    }

    // add to cart
    const addToCart = (id) =>{
        var products = localStorage.getItem('cart')
        products = JSON.parse(products)
        console.log(products)

        if(products && products.length > 0){
            const productExists = products.includes(id);
            if(!productExists){
                products.push(id)
                localStorage.setItem('cart', JSON.stringify(products))
                setReponseType('success')
                setMessage('Product added to cart successfully.')
                setTimeout(()=>{
                    setReponseType(false)
                }, 5000)
            } 
            else
            {
                setReponseType('error')
                setMessage('Product already present in cart.')
                setTimeout(()=>{
                    setReponseType(false)
                }, 5000)
            }
        }
        else 
        {
            products = []
            products.push(id)
            localStorage.setItem('cart', JSON.stringify(products))
            setReponseType('success')
            setMessage('Product added to cart successfully.')
            setTimeout(()=>{
                setReponseType(false)
            }, 5000)
        }
    }

    const [cartLength, setCartLength] = useState(0)

    function getCartLength (){
        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        setCartLength(cart.length)
    }

    useEffect(() => {
        getProduct();
        getCartLength();
    }, [slug])

    return (
        <>
            {/* header */}
            <Header cartLength={cartLength}/> 

            {/* main */}
            <div className='single-product py-20'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-64 md:h-80 rounded-lg mb-4">
                                <div className="h-64 md:h-80 rounded-lg mb-4">
                                    <figure><img src="https://placeimg.com/400/225/arch" className='w-full' alt={product.title} /></figure>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl capitalize">{product.title}</h2>
                            <p className="text-gray-500 text-sm">Category <span className="text-indigo-600 hover:underline">{product.category}</span></p>

                            <div className="flex items-center space-x-4 my-4">
                                <div>
                                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                        <span className="text-indigo-400 mr-1 mt-1">$</span>
                                        <span className="font-bold text-indigo-600 text-3xl">{product.price}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-500">Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.</p>

                            <div className="flex py-4 space-x-4">

                                <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={() => {addToCart(product.id)}}>
                                    Add to Cart
                                </button>
                            </div>
                            {reponseType === 'success' &&
                                (
                                    <div className="alert alert-success shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>{message}</span>
                                        </div>
                                    </div>
                                )
                            }
                            {/* error alert */}
                            {reponseType === 'error'  &&
                                (
                                    <div className="alert alert-error shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>{message}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
