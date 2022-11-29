import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'

export default function AllProducts() {
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState(false)

    // getProducts
    const getProducts = () => {
        axios.get('/products')
        .then(res => {
            // console.log(res)
            setProducts(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    // delete products
    const handleDelete = (id) =>{
        axios.delete('/products/' + id)
        .then(res => {
            // console.log(res)
            getProducts();
            setMessage('success')
            setTimeout(()=>{
                setMessage(false)
            }, 5000)
        }).catch(err=>{
            console.log(err)
            setMessage('error')
            setTimeout(()=>{
                setMessage(false)
            }, 5000)
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
                <h2 className="text-center text-white text-4xl mb-12">All Products</h2>
                {/* taost */}
                <div className='md:w-5/12 w-full mb-10'>
                    {/* success alert */}
                    {message === 'success' &&
                        (
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Product Deleted successfully.</span>
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
                                    <span>Error on Deleting product.</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-700 rounded">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product,index) =>(
                                <tr key={index}>
                                    <td>{index +1}</td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <NavLink to={'/edit-product/' + product.slug} className="btn btn-success">Edit</NavLink>
                                            <button className="btn btn-error ml-3" onClick={() =>{handleDelete(product.id)}}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        
    </div>
  )
}

