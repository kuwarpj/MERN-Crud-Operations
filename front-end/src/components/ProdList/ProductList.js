import React, { useEffect, useState } from 'react'
import "./ProductList.css"
import {Link} from 'react-router-dom'
export default function ProductList() {
 const [products, setProducts] = useState([]);


    useEffect(()=>{
        fetchProduct();
    },[])


   async  function fetchProduct(){
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }

 const deleteProduct = async (id)=>{
     
     let result = await  fetch(`http://localhost:5000/product/${id}`,{
         method:"Delete"
     });
     result = await result.json()
     if(result){
         fetchProduct();
     }

 }
 async function handleSearch(event){
     let key = event.target.value;

     if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
         
        })
        result = await result.json()
        if(result){
           setProducts(result)
        }
     }else{
         fetchProduct()
     }
     
 }

  return (
    <div className='productList'>

        <h1>Product List</h1>
        <input className='inputBox' type="text" placeholder="Search"
        onChange={handleSearch}
        
        ></input>


      <ul>
          <li>S.No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Categories</li>
          <li>Company</li>
          <li>Operations</li>
      </ul>
      {
         products.length>0 ? products.map((item, index)=>
      <ul key={item._id}>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.categories}</li>
          <li>{item.company}</li>
          <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
          <Link to={"/update/"+item._id} >Update</Link></li>
      </ul>
          )
          : <h2>No Record Found</h2>
      }
      
     
      
      
    </div>
  )
}
