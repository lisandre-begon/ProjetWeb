import React, { useEffect } from 'react';
import axios from 'axios';

const Profil = () => {
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin', { withCredentials: true });
                if (response.status === 200 && response.data.isAdmin) {
                    console.log('User is admin');
                    window.location.href = '/admin';
                }
            } catch (error) {
                console.error('Failed to check admin status', error);
                window.location.href = '/login';
            }
        };
        checkAdmin();
    }, []);
    return (
        <div>
            <h1>Profile Page</h1>
            {/* Add your profile content here */}
        </div>
    );
};

export default Profil;