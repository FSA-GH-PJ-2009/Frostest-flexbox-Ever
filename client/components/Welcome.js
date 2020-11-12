import React from 'react'
import {Link} from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-text">
        <h1>Welcome!</h1>
        <Link className="peruse-button" to="/products">
          Peruse Our Noodles
        </Link>
      </div>
      <img className="welcome-img" src="./Logo.png" />
    </div>
  )
}
