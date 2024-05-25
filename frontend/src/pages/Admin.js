import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin', { withCredentials: true });
                if (response.status === 200 && response.data.isAdmin) {
                    console.log('User is admin');
                } else {
                    window.location.href = '/profil';
                }
            } catch (error) {
                console.error('Failed to check admin status', error);
                window.location.href = '/login';
            }
        };
        checkAdmin();
    }, []);

    const [email, setEmail] = useState('');

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/${email}`, {
                data: { email },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('User deleted');
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getUser', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                const user = response.data;
                console.log('User:', user);
            } else {
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
