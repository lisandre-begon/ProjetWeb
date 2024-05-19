import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleLoginClick = () => {
        history.push('/login');
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={handleLoginClick}>Go to Login</button>
        </div>
    );
};

export default Home;