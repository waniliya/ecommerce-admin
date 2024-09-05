import React, {useState, useEffect} from "react";
import axios from "axios";
import Loading from "../loading/Loading"
import Item from "../item/Item"

const ListProduct = () => {

  const [products,setProducts]=useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(products);
  const listItems = [...new Set(products.map((list) => list.category))]

  const filterItems = (cat) => {
    const newItems = products.filter((newlist) => newlist.category === cat )
    setList(newItems)
  }   
    


  const getProducts = async() => {
      await fetch('http://localhost:5000/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setProducts(data)});
      setLoading(true);
  };
  const deleteProduct = async (id) =>{
    try{
        await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
        getProducts();
        setLoading(true);
    } catch (error){
        console.log(error);
    }
}

useEffect(()=>{
  getProducts();
},[]);


  

  return (
    
    <div  >
      <div class="is-fullwidth mt-5 is-centered">
      <button class="button is-link is-soft m-2"
            onClick={() => setList(products)}>
            All
            </button>
            {
            listItems.map(val => (
            <button class="button is-link is-soft m-2"
            onClick={() => filterItems(val)}>
            {val[0].toUpperCase() + val.substring(1)}
            </button>
            ))
          }
      </div>
       
      {loading ?
      <table className='table is-striped is-fullwidth mt-5 is-centered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price RM</th>
            <th>Total of Stocks</th>
            <th>Is Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {list.map((item,index)=>{
          
      return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price} category={item.category} totalofstocks={item.totalofstocks}
      isAvailable={item.isAvailable}/>

})}
</tbody>
</table>
        
      :<Loading/> }
    </div>
  )
}

export default ListProduct