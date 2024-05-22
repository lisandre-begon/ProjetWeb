async function getReceipt(data) {
    try {
        const user = await prisma.user.findMany({});
    }
    catch (error) {
        throw new Error(`Error getting users' : ${error.message}`);
    }
}
