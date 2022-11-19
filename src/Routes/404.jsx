import React from 'react'
import useTitle from "../Hooks/useTitle";
const Notfound = ({title}) => {
  useTitle(title);
  return (
    <div>Notfound</div>
  )
}

export default Notfound