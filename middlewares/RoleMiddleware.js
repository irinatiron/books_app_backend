export const checkRole = (reqRole) => (req, res, next) => {
    try {
        const user = req.user
        const roleByUser = user.role
        const checkValueRole = reqRole.some((rolesingle) => roleByUser.includes(rolesingle))
        if (!checkValueRole) {
            return res.status(403).json({ error: 'ERROR_PERMISSIONS' })
        }
        next()
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}