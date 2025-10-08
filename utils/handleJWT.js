import jwt from 'jsonwebtoken';
const JWT_SECRET = '1234';

export const tokenSign = async (user) => {
    const sign = jwt.sign({
        id: user.id,
        role: user.role,
        username: user.username,
    },
        JWT_SECRET,
    {
        expiresIn: "2h",
    }
    )
    return sign;
}
export const tokenVerify = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}