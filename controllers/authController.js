import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'username, email y password son requeridos' });
    }
    const existing = await UserModel.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    return res.status(201).json({ message: 'Usuario creado', user: userResponse });
  } catch (error) {
    console.error('registerController error:', error);
    return res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed', details: error.message });
  }
};
