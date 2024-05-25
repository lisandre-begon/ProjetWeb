import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin', { withCredentials: true });
                if (response.status === 200 && response.data.isAdmin) {
                    console.log('User is admin');
                    fetchUsers(); // Fetch the list of users when user is admin
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

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const fetchUsers = async () => {
        try {
            console.log('Fetching users...');
            const response = await axios.get('http://localhost:5000/getUser', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
    
            // Check if the users array is empty
            if (response.data.user.length === 0) {
                console.log('No users found');
            } else {
                console.log('Response from getUser:', response.data);
            }
    
            if (response.status === 200) {
                // Extraire le tableau d'utilisateurs de la propriété 'user' de la réponse
                const userList = response.data.user;
                setUsers(userList); // Définir l'état 'users' avec le tableau d'utilisateurs
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };
    
    
    

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/${selectedUser}`, {
                data: { email: selectedUser },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('User deleted');
                fetchUsers(); // Fetch the updated list of users after deletion
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select user to delete</option>
                {Array.isArray(users) && users.map((user, index) => (
                    <option key={index} value={user.email}>{user.email}</option>
                ))}
            </select>
            <button onClick={deleteUser}>Delete User</button>
        </div>
    );
};

export default Admin;
