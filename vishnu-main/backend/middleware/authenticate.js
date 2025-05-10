import jwt from 'jsonwebtoken'
import Register from '../db/userRegister.js'

let secretKey = '1234567'

const authenticate = async(req, res, next) => {
    let token
    token = await req.cookies.jwt

       
           
            if(token){
                try {
            console.log("Token Found : ", token)
            let decoded = jwt.verify(token, secretKey)
            console.log('decoded :', decoded)
            let user = await Register.findById(decoded.userId).select('-password')
            console.log("User form middleware :", user)
            if (user) {
                res.locals.user = user; // Makes the user data available in EJS templates
              }
            req.user = decoded
            next()
       
        } catch (error) {
            console.log('mudichuvittinga ponga !!!!')
            res.render('auth/userLogin')
            
        }
    }else{
        console.log("token not found")
        res.render('/auth/userLogin')
    }
  
    

}

export default authenticate