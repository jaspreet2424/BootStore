const mutations = `
    createNewUser(name : String! , email : String! , password : String!) : Response
    verifyOTP(email : String! , otp : Int!) : Response
    loginUser(email : String! , password : String!) : Response
    addToWishlist(userId : ID! , bookId : ID!) : Response
`
module.exports = mutations;