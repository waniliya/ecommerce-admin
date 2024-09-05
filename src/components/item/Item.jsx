import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading"


const Item = (props) => {
    const [products,setProducts]=useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async() => {
    await fetch('http://localhost:5000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setProducts(data)});
    setLoading(true);
};
useEffect(()=>{
    getProducts();
  },[]);

    const deleteProduct = async (id) =>{
        try{
            await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
            alert("Delete Product Successfully");
            
            getProducts();
            setLoading(true);
            window.location.reload();
        } catch (error){
            console.log(error);
        }
    }

  return (
    
        <tr key={props._id}>
            <td>{props.id}</td>
            <td><img src={props.image} alt="imageproduct" className="image is-64x64"/></td>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>{props.price}</td>
            <td>{props.totalofstocks}</td>
            <td><div class="control">
                  <label class="checkbox">
                    <input type="checkbox" name="available"/>
                    Not available
                  </label>
                </div>
              </td>
            <td>
              <Link to={`edit/${props.id}`}className="button is-warning is-small mx-2">Edit</Link>
              <button onClick={()=>deleteProduct(props.id)} className="button is-danger is-small">Delete</button>
            </td>
          </tr>
    
  )
}

export default Item