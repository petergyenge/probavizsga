import React, { useState } from "react";
import { Laptops } from "../api/get";




const LaptopComponent = ({ brand, name, weight }: Laptops) => {
  const [moreButton, setMoreButton] = useState(false)



  return (
    <div className="flex flex-col items-center ">
      <h2 className="card-title p-2">{brand}</h2>
      {moreButton &&
        <ul>
          <li className='pr-3'>{name}</li>
          <li>{weight}</li>
        </ul>
      }
      <button className='btn btn-primary'
        onClick={() => {
          setMoreButton(!moreButton)
        }}>{moreButton === true ? "Show less" : "Show more"}</button>
    </div>

  )
}




export default LaptopComponent;