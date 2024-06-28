import React from 'react';
import {useNavigate} from 'react-router-dom'

import './Home.css';

const Home = () => {

 const url=useNavigate()
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">sujal bhai</h1>
      </header>
      <div className="home-content">
        <div className="quote-container">
          <p className="quote">
            {/**/}
          </p>
        </div>
        <div className="button-container">
            <button className="home-button" onClick={()=>{url('/signin')}}>Sign In</button>
            <button className="home-button" onClick={()=>{url('/signup')}}>Sign Up</button>
        </div>
      </div>
      <div className="background-decor">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
        <h5> <a href='https://twitter.com/Sujal__88__'>-By: Sujal Vishwakarma</a></h5>
    </div>
  );
};

export default Home;
