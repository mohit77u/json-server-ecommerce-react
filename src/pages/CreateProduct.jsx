import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Header from '../components/Header';

export default function EditProduct() {
    const navigate  = useNavigate();
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ image, setImage ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ slug, setSlug ] = useState('')


    // create product
    const HandleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title, description, category, price, slug, image
        }
        axios.post('/products/', data)
        .then(res=>{
            console.log(res)
            navigate('/all-products')
        }).catch(err=>{
            console.log(err)
        })

    }
    useEffect(() => {
        
    }, [])
    return (
        <div>
            {/* header */}
            <Header /> 

            {/* main */}
            <section className="products py-10">
                <div className="container mx-auto">
                    <h2 className="text-center text-white text-4xl mb-16">Edit Product</h2>
                    <div className="md:w-6/12 w-full">
                        <form onSubmit={HandleSubmit}>
                            <div className="form-group mb-2">
                                <label className="block text-gray-400 mb-2">Title</label>
                                <input type="text" className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded' name='title' onChange={(e) => {setTitle(e.target.value)}} value={title} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="block text-gray-400 mb-2">Slug</label>
                                <input type="text" className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded' name='Slug' onChange={(e) => {setSlug(e.target.value)}} value={slug} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="block text-gray-400 mb-2">Description</label>
                                <textarea className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded' name='description' rows={5} onChange={(e) => {setDescription(e.target.value)}} value={description} ></textarea>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-4">
                                <div className="form-group">
                                    <label className="block text-gray-400 mb-2">Category</label>
                                    <input type="text" className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded' name='category' rows={5} onChange={(e) => {setCategory(e.target.value)}} value={category} />
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-400 mb-2">Price (in $)</label>
                                    <input type="number" className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded' name='price' onChange={(e) => {setPrice(e.target.value)}} value={price} />
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label className="block text-gray-400 mb-2">Image URL</label>
                                <input type="text" className='w-full py-3 px-4 bg-transparent border border-gray-600 rounded' name='image' onChange={(e) => {setImage(e.target.value)}} value={image} />
                            </div>

                            <div className="form-group mb-2 mt-5">
                                <button type="submit" className='btn btn-success px-12'>Update</button>
                                <NavLink to={'/all-products/'} className="btn btn-error ml-3">Cancel</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
