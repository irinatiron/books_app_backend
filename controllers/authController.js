import bcrypt from 'bcryptjs';

export const regiserController = async (req, res) => {
    try {
        const userData = req.body;
        const newPassword = userData.password;
        const hashPassword = await bcrypt.hash (newPassword, 10);
        userData.password = hashPassword;
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
}  
export const loginController = async (req, res) => {

}