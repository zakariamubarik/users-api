function auth(req,res,next) {
    let isVerified = true;
    if (isVerified) {
        console.log("Logged in succesfully")
        next()
    }else{
        console.log("Not authorized")
        throw Error;
    }
}

module.exports = auth