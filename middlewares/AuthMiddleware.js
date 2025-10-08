import { tokenVerify } from '../utils/handleJWT.js'
import UserModel from '../models/UserModel.js'
export const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'NEED_SESSION' })
        }
        const userToken = req.headers.authorization.split(' ').pop()
        console.log(userToken)
        const dataToken = await tokenVerify(userToken)
        if (!dataToken.id) {
            return res.status(401).json({ error: 'ERROR_ID_TOKEN' })
        }
        const user = await UserModel.findByPk(dataToken.id)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ error: 'NOT_SESSION', message: error.message })
    }
}