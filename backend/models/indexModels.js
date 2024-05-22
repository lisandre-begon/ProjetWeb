const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function createUser(data) {
    try {
        const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                email: data.email,
                password: bcrypt.hashSync(data.password, 8),
                pseudo: data.pseudo,
            },
        });
        return user;
        
    }
    catch (error) {
        throw new Error(`Error creating user' : ${error.message}`);
    }
}

async function loginUser(data, res) {
    console.log(process.env.DATABASE_URL);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new Error('No user found with this email.');
        }

        const passwordIsValid = bcrypt.compareSync(data.password, user.password);

        if (!passwordIsValid) {
            throw new Error('Invalid password.');
        }

        // If the passwords match, the login is successful
        // Generate a token
        const token = jwt.sign({ id: user.id }, 'tiensletoken', { expiresIn: '1h' });
        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });
        // Send the token to the client
        return { auth: true, token: token };
        

    } catch (error) {
        console.error(error.stack);
        throw new Error(`Error logging in: ${error.message}`);
    }
}

async function updatePassword(data) {
    try {
        const user = await prisma.user.update({
            where: {
                email: data.email
            },
            data: {
                password: bcrypt.hashSync(data.password, 8),
            }
        });
    }
    catch (error) {
        throw new Error(`Error updating password' : ${error.message}`);
    }
}

async function updatePseudo(data) {
    try {
        const user = await prisma.user.update({
            where: {
                email: data.email
            },
            data: {
                pseudo: data.pseudo,
            }
        });
    }
    catch (error) {
        throw new Error(`Error updating pseudo' : ${error.message}`);
    }
}

async function deleteUser(data) {
    try {
        const user = await prisma.user.delete({
            where: {
                email: data.email
            }
        });
    }
    catch (error) {
        throw new Error(`Error deleting user' : ${error.message}`);
    }
}

async function getUser(data) {
    try {
        const user = await prisma.user.findMany({});
        return user;

    }
    catch (error) {
        throw new Error(`Error getting users' : ${error.message}`);
    }
}

module.exports = { createUser, loginUser, updatePassword, updatePseudo, deleteUser, getUser };