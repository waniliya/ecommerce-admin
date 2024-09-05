import React from 'react'
import ReactLoading from 'react-loading';
import "./Loading.css"


const Loading = () => {
  return (
    <ReactLoading type={"cylon"} color={"#008080"} height={'10%'} width={'10%'} className="Loading" />
  )
}

export default Loading