import React, { useEffect } from 'react';
import { supabase } from '../SupabaseClient';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      navigate('/');
    };
    
    setTimeout(signOut, 4000); // Sign out after 3 seconds
  }, [navigate]);

  return (
    <div className="signout-container">
      <h1 className="signout-text">Signing Out...</h1>
    </div>
  );
};

export default SignOut;
