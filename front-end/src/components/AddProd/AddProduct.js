import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddProduct.css"
export default function AddProduct() {
    const[name, setName] = useState();
    const[price, setPrice] = useState();
    const [categories, setCategories] = useState();
    const [company, setCompany] = useState();
    const Navigate = useNavigate();


    async function handleProduct(){
     
      

        const userId = JSON.parse( localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/addProduct",{
            method:'post',
            body: JSON.stringify({name,price,categories,company, userId}),
            headers:{
                "Content-Type": "application/json"
            },
        })

        result = await result.json()
        console.log(result)
        Navigate('/')
    }
  return (
    <div className='AddProduct'>
        <h1>Add Product</h1>
        <input className='productBox' onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Name'></input>
  
        <input className='productBox' onChange={(e)=>setPrice(e.target.value)} value={price}  type="text" placeholder='Price'></input>
     
        <input className='productBox' onChange={(e)=>setCategories(e.target.value)} value={categories} type="text" placeholder='Categories'></input>
   
        <input className='productBox' onChange={(e)=>setCompany(e.target.value)} value={company} type="text" placeholder='Company'></input>

        <button className='addButton' onClick={handleProduct}  >Add Product</button>
    </div>
  )
}
