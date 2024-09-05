import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineInventory } from "react-icons/md";

const Navbar = () => {
  return (
    
    <nav className="navbar is-dark p-2 is-desktop" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item has-text-weight-semibold mx-2" href="/dashboard"> <MdOutlineInventory /> Product Inventory Management System
      </a>
    </div>

    <div id="navbarBasicExample " class="navbar-menu is-desktop">
    <div class="navbar-start ">
      <Link to="/dashboard" class="navbar-item">
        Home
      </Link>

      <Link to="/listorder" class="navbar-item">
        List of Orders
      </Link>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <Link to="/addproduct" class="navbar-item">
            Add new product
          </Link>
          <a class="navbar-item">
            List Admin
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider"/>
          {/*<a class="navbar-item">
            List of Report
          </a>*/}
        </div>
      </div>
    </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        
        <div class="buttons">
        <button onClick={()=>{localStorage.removeItem('jwt');window.location.replace('/')}} type="button" class="button is-danger is-outlined" >Logout</button>
        </div>
      </div>
    </div>
  </nav>
   
  )
}

export default Navbar