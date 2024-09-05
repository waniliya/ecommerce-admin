import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [auth, setAuth]=useState({
    email:"",
    password:"",
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const changeHandler = (e)=>{
    setAuth({...auth,[e.target.name]:e.target.value})
}

const loginAdmin = async(e) =>{
   
  e.preventDefault();
  console.log(auth);
  
 let responseData;
  await fetch('http://localhost:5000/loginadmin',{
    method:'POST',
    headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(auth),
}).then ((response)=>response.json()).then((data)=>responseData=data)

  if(responseData.success){
    
    localStorage.setItem('jwt',responseData.accessToken);
    alert("Welcome")
    window.location.replace('/dashboard');
  }else{
    alert("Invalid admin account",responseData.errors)
  }

  
  
}
  return (
    <div >
          <nav className="navbar is-dark mb-3 p-2" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">  Product Inventory Management System
            </a>
          </div>
        </nav>
        <div className='container is-max-desktop box m-auto px-auto">'>
          <form onSubmit ={loginAdmin}>
          <h2 class="mx-auto has-text-centered mb-2 p-2 is-size-4 has-text-weight-semibold">Login For Admin </h2>
        <div class="field ">
        <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" name="email" onChange={changeHandler}  value={auth.email} />
            <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" name="password" onChange={changeHandler} value={auth.password}/>
            <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control">
            <button type="submit" class="button is-success" onClick={()=>{loginAdmin()}}>
            Login
            </button>
        </p>
        </div>
        </form>
        </div>

    </div>
  )
}

export default Login