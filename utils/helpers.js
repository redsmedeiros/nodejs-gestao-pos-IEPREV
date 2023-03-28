const bcrypt = require('bcryptjs');

const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const isPasswordMatched = async (password, hash)=>{
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    isPasswordMatched
}