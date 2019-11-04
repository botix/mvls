const { createHash } = require("crypto")
require("dotenv").config()


function createRequest(endpoint, limit = 20, offset = 1500){
    
    const publicKey = process.env.MARVEL_PUBK
    const privateKey = process.env.MARVEL_PRIVK
    
    if(!publicKey) throw new Error("Public key is required")
    if(!privateKey) throw new Error("Private key is required")
    
    const timestamp = Date.now() / 1000
    const toHash = timestamp + privateKey + publicKey 
    
    const hash = createHash('md5')
                    .update(toHash)
                    .digest('hex');

    const request = `http://gateway.marvel.com/${endpoint}?limit=${limit}&offset=${offset}
                     &ts=${timestamp}&apikey=${publicKey}&hash=${hash}`                   
    
    return request;
}

module.exports = createRequest