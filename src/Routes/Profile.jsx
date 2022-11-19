import React from 'react'
import useTitle from "../Hooks/useTitle";
const Profile = (Usuari,{title}) => {
  useTitle(title);
  
  return (
    <div>Profile</div>
  )
}

export default Profile