import jwt from "jsonwebtoken"


const secretKey = '1234567'

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, secretKey, {expiresIn: '30d'})

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV || 'development',
        sameSite: 'strict',
        maxAge: 30 * 30 * 60 * 60 * 1000
    })
    return token
}

export default generateToken;

