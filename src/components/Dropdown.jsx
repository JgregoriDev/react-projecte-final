import React from 'react'
import "../assets/style/dropdown.css";
import { Link } from 'react-router-dom'

const Dropdown = ({ props,links }) => {
  console.log(links);
  console.log();
  return (
    <div className="dropdown w-100">
      <button className="btn btn-primary dropbtn w-100">{props}</button>
      <div className="dropdown-content">
        <Link to={`${links.ToLink1}`} title={links.Nomlink1}>{links.Nomlink1}</Link>
        <Link to={`${links.ToLink2}`} title={links.Nomlink2}>{links.Nomlink2}</Link>
      </div>
    </div>
  )
}

export default Dropdown