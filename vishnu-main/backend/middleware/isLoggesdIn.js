import jwt from 'jsonwebtoken'
import Register from '../db/userRegister.js'
import ServiceList from "../db/serviceSchema.js";


let secretKey = '1234567'

const isLoggedIn = async(req, res, next) => {
    let token
    token = await req.cookies.jwt


            if(token){
                try {
            console.log("Token Found from isloggedIn: ", token)
            let decoded = jwt.verify(token, secretKey)
            let user = await Register.findById(decoded.userId).select('-password')
            console.log("User form isLoggedIn middleware :", user)
            if (user) {
                res.locals.user = user; // Makes the user data available in EJS templates
              }
           
            next()
       
        } catch (error) {
           
            res.redirect('/')
            
        }
    }else{
        console.log("token not found")

        try {
    const serviceName = await ServiceList.find();
    
    
    console.log("user dashboard isloggedin:", res.locals.user)
    if (!serviceName) {
      console.log("No service added");
    }

    res.render("user/index", { serviceName, user: res.locals.user || ''});
  } catch (error) {
    console.log(error)
  }
    }
  
    

}

export default isLoggedIn