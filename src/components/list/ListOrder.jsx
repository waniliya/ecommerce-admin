import React,{useEffect, useState} from 'react'
import axios from "axios";
import Loading from '../loading/Loading';
import { useParams } from 'react-router-dom';

const ListOrder = () => {
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    const [status, setStatus] = useState("");
    const {id} = useParams();

    useEffect(()=> {
         const getOrder = async() => {
            const response = await axios.get('http://localhost:5000/allorder')
            setData(response.data);
            setLoading(true);
            console.log(data);
        };
         
        
     getOrder();
    
      },[]); 

      const updateStatus = async(id) => {
        
        try{
            await axios.patch(`http://localhost:5000/update/${id}`,{
                status
                
            });
            window.location.reload(); 
            
        } catch (error){
            console.log(error);
        }
    }

    
  return (
    <div>
        <h2>List Order</h2>
        {loading ?
      <table className='table is-striped is-fullwidth mt-5 is-centered'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.map((order,index)=>(
          <tr key={index}>
          <td >{order.date}</td>
          <td >{order.userId}</td>
          <td >
           <p>{order.items.map((item,index)=>{
           if(index === order.items.length-1){
             return item.name[0].toUpperCase() + item.name.substring(1) + "x" + item.quantity;
           }else{
             return item.name[0].toUpperCase() + item.name.substring(1) + "x" + item.quantity + " ; ";
           }
          })}</p>
          </td>
          <td ><p>RM {order.amount}</p></td>
          <td >
           <span >&#x25cf;
           <b >{order.status}</b></span>
          </td>
          <td >
            <form onSubmit ={updateStatus}>
            <div class="select">
            <select value={status} 
                        onChange={(e)=>setStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="Accepted" >Accepted</option>
                <option value="Packaging process">Packaging Order</option>
                <option value="Delivering">Delivering</option>
                <option value="Successfully Delivered">Delivered</option>
            </select>
            </div>
            <button type="submit" class="ml-2 button is-primary" onClick={()=>{updateStatus(order._id)}}>Verify Status</button>
            </form>
            </td>
          
        </tr>
      

))}
</tbody>
</table>
        
      :<Loading/> }
    </div>
  )
}

export default ListOrder