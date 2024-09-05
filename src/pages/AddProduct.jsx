import React, {useState} from 'react';
import Layout from './Layout'
import { useNavigate } from 'react-router-dom';
import { FaUpload } from "react-icons/fa";



const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetail, setProductDetail] = useState({
        name: "",
        image:"",
        category:"",
        price:"",
        description:"" ,
        color:"",
        totalofstocks:"",
        available:true
    })
    const imageHandler =(e) =>{
        setImage(e.target.files[0])
    }
    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setProductDetail({...productDetail,[e.target.name]:e.target.value})
    }

    const Add_Product = async(e) => {
        e.preventDefault();
        console.log(productDetail);
        let responseData;
        let product = productDetail;

        let formData=new FormData();
        formData.append('image',image);

    
                await fetch('http://localhost:5000/upload',{
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json'
                },
                body:formData,
                
            }).then((resp)=>resp.json()).then((data)=>{responseData=data});
           
            
         if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:5000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then ((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
        navigate("/dashboard")
    }

  return (
    <Layout>
    <div className="columns m-2">
        <div className="column is-half">
            <form onSubmit ={Add_Product}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input type="text" className="input" name="name"
                    value={productDetail.name} 
                    onChange={changeHandler} 
                    //onChange={(e)=>setName(e.target.value)} 
                    placeholder='Name' required/>
                </div>
            </div>

            <div className="field">
                <label className="label">Price RM</label>
                <div className="control">
                    <input type="number" className="input" name="price"
                    value={productDetail.price} 
                    onChange={changeHandler}
                    placeholder='Price' required/>
                </div>
            </div>
            <div className="field">
                <label className="label">Description</label>
                <textarea class="textarea" placeholder="Detail" value={productDetail.description} onChange={changeHandler} name="description"></textarea>
            </div>
            <div className="field">
                <label className="label">Total of Stocks</label>
                <div className="control">
                    <input type="number" className="input" name="totalofstocks"
                    value={productDetail.totalofstocks} 
                    onChange={changeHandler}
                    placeholder='Total of stocks' required/>
                </div>
            </div>
            <div className="field">
                <label className="label">Category</label>
                
                    <select class="select"  value={productDetail.category} onChange={changeHandler} name="category" required>
                        <option >Choose category</option>
                        <option value="speaker">Speaker</option>
                        <option value="phone">Phone</option>
                        <option value="headphone">Headphone</option>
                    </select>
                    
            </div>
            <div className="field">
                <label className="label">Color</label>
                
                    <select class="select"  value={productDetail.color} onChange={changeHandler} name="color" required>
                        <option >Choose a color</option>
                        <option value="white">White</option>
                        <option value="grey">Grey</option>
                        <option value="black">Black</option>
                    </select>
                    
            </div>

            <div className="field">
                <label className="label">Image</label>
                <div class="file has-name is-boxed">
                <div class="file has-name is-boxed">
                    <label class="file-label">

                        <img alt="upload area" src={image?URL.createObjectURL(image):<span className="file-cta">
                        <span className="file-icon"><FaUpload /></span>
                        <span className="file-label"> Choose a image… </span>
                        </span>} className="file-label"/>
                        <input class="file-input" type="file" name="image" value={productDetail.image} 
                        onChange={imageHandler}/>

                        
                    </label>
                    </div>
                    
            </div>
            </div>
            <div className="field">
                <label className="label">Is available </label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select value={productDetail.available} 
                        onChange={changeHandler} name="available" >
                            <option value="yes">Yes</option>
                            <option value="no">No </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                <button type="submit" className='button is-success' onClick={()=>{Add_Product()}}>Save</button>
                <button type="submit" className='button is-danger ml-2' onClick={()=>window.location.assign('/')}>Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    </Layout>
  )
}

export default AddProduct