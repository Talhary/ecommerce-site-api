import User from '../models/user.js'
 const IsLoggedIn = async(req,res,next)=>{
    // next()
    req.user?next():res.status(401).json({msg:'please Login to continue'})
}
export default IsLoggedIn