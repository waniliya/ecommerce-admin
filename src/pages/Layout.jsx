import React from 'react'
import Navbar from '../components/navbar/Navbar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <main className="m-3 centered">{children}</main>
    </React.Fragment>
  )
}

export default Layout