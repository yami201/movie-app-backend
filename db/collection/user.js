const { db } = require('../client');
const users = db.collection('users');

const saveUser = async ({id, email, password}) => {
    const user = await users.findOne({id});
    
    if(!user) {
        await users.insertOne({
            _id : id,
            email,
            password
        });
    }
}

const checkUser = async (email) => {
    const user = await users.findOne({email});
    return !!user
}



module.exports = {
    saveUser,
    checkUser,
}