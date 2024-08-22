import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@fluentui/react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToEmployees = () => {
    navigate('/employees');
  };

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <PrimaryButton onClick={goToEmployees}>Go to Employees</PrimaryButton>
    </div>
  );
};

export default Home;

