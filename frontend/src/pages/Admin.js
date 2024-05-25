import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('/admin');
                if (!response.data.isAdmin) {
                    window.location.href = '/ProfilUser';
                }
            } catch (error) {
                console.error('Failed to check admin status', error);
            }
        };
    
        checkAdmin();
    }, []);

    const [email, setEmail] = useState('');

    const deleteUser = async () => {
        try {
            const response = await axios.delete('/api/deleteUser', {
                data: { email },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                // User deleted successfully
                console.log('User deleted');
            } else {
                // Handle error
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get('../../../backend/routes/indexRoutes', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                const user = response.data;
                // Do something with the user data
                console.log('User:', user);
            } else {
                // Handle error
                console.error('Failed to get user');
            }
        } catch (error) {
            console.error('Failed to get user', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={deleteUser}>Delete User</button>
            <button onClick={getUser}>Get User</button>
        </div>
    );
};

export default Admin;