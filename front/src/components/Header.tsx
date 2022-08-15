import React from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { Link } from 'react-router-dom';


function Header () {
  return (
    <header className="header">
      <BsPersonBoundingBox size="3em" className="ml-1rem my-05rem" />
      <Link to="/">
        <AiOutlineLogout size="2em" className="mr-1rem cursor-pointer"/>
      </Link>
    </header>
  )
}

export default Header
