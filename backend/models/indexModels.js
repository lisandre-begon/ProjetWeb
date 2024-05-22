const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function createUser(data, res) {
    try {
        const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                email: data.email,
                password: bcrypt.hashSync(data.password, 8),
                pseudo: data.pseudo,
            },
        });
        const token = jwt.sign({ id: user.id }, 'tiensletoken', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ user, auth: true, token: token });
    }
    catch (error) {
        res.status(500).json({ error: `Error creating user: ${error.message}` });
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

async function logoutUser(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie('token');
        // Send a response to the client
        res.status(200).json({ auth: false, token: null, message: 'You have been logged out.' });
    } catch (error) {
        // Send an error response to the client
        res.status(500).json({ error: `Error during logout: ${error.message}` });
    }
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, 'tiensletoken', (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

async function updatePassword(req, res) {
    try {
        const user = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                password: bcrypt.hashSync(req.body.password, 8),
            }
        });
        return user;
    }
    catch (error) {
        throw new Error(`Error updating password: ${error.message}`);
    }
}

async function updatePseudo(req, res) {
    try {
        const user = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                pseudo: req.body.pseudo,
            }
        });
        return user;
    }
    catch (error) {
        throw new Error(`Error updating pseudo: ${error.message}`);
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

module.exports = { createUser, loginUser, updatePassword, updatePseudo, deleteUser, getUser, verifyToken, logoutUser };