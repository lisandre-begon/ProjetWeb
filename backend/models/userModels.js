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

module.exports = {createUser};