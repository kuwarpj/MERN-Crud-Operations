import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function UpdateProduct() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState();
  const [company, setCompany] = useState();
  const params = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    console.log(params);
    let result = await fetch(`http://localhost:5000/update/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategories(result.categories);
    setCompany(result.company);
  }

  async function updateProduct() {
    console.log(name, price, categories, company);
    let result = await fetch(`http://localhost:5000/update/${params.id}`,{
       method:"put",
       body:JSON.stringify({name, price, categories, company}),
       headers:{
         "Content-Type":"application/json"
       }
      
    })
    result = await result.json()
    console.log(result);
    Navigate('/')
  }
  return (
    <div>
      <h1>Update Product</h1>
      <input
        className="productBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        type="text"
        placeholder="Name"
      ></input>

      <input
        className="productBox"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        type="text"
        placeholder="Price"
      ></input>

      <input
        className="productBox"
        onChange={(e) => setCategories(e.target.value)}
        value={categories}
        type="text"
        placeholder="Categories"
      ></input>

      <input
        className="productBox"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        type="text"
        placeholder="Company"
      ></input>

      <button className="addButton" onClick={updateProduct}>
        Add Product
      </button>
    </div>
  );
}
