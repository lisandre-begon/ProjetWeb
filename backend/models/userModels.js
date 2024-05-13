const {PrismaClient} = require('@prisma/client');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

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
    }
    catch (error) {
        throw new Error(`Error creating user' : ${error.message}`);
    }}

async function loginUser(data) {
    try {
        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        // If the user was not found, throw an error
        if (!user) {
            throw new Error('No user found with this email.');
        }

        // Compare the provided password with the stored hashed password
        const passwordIsValid = bcrypt.compareSync(data.password, user.password);

        // If the passwords do not match, throw an error
        if (!passwordIsValid) {
            throw new Error('Invalid password.');
        }

        // If the passwords match, the login is successful
        return user;
    } catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
    }
}

module.exports = { createUser, loginUser };