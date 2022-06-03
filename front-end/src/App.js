
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Header/Nav"
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp';
import PrivateCompo from './components/PrivateCompo';
import Login from './components/Login';
import AddProduct from './components/AddProd/AddProduct';
import ProductList from './components/ProdList/ProductList';
import UpdateProduct from './components/UpdatePro/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
    <Routes>

      <Route element={<PrivateCompo />}>
      <Route path="/" element={<ProductList/>} />
      <Route path="/add" element={ <AddProduct/>} />
      <Route path="/update/:id" element={<UpdateProduct/>} />
      <Route path="/logout" element={<h1>logout Product Path</h1>} />
      <Route path="/profile" element={<h1>Profile Product Path</h1>} />
      </Route>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login/>} />
    </Routes>

  
  
     </BrowserRouter>
     {/* <Footer/> */}
    </div>
  );
}

export default App;
