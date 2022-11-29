import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'

export default function Home() {
    const [products, setProducts] = useState([])

    const getProducts = () => {
        axios.get('/products')
        .then(res => {
            // console.log(res)
            setProducts(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(() => {
        getProducts();
    }, [])
  return (
    <div>

        {/* header */}
        <Header /> 

        {/* main  */}
        <section className="products py-10">
            <div className="container mx-auto">
                <h2 className="text-center text-white text-4xl mb-16">All Products</h2>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
                   {products.map((product,index) =>(
                    <NavLink to={'/products/' + product.slug} key={index}>
                        <div className="card card-compact bg-base-100 shadow-xl h-full">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                            <div className="card-body text-center">
                                <div>
                                    <h2 className="mb-2 text-2xl text-white text-center capitalize">{product.title}</h2>
                                    <p className='truncate mb-2'>{product.description}</p>
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                   ))}
                </div>
            </div>
        </section>
    </div>
  )
}
