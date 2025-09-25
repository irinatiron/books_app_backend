import { DataTypes } from "sequelize";
import db_connection from "../database/db_connection.js";

const UserModel = db_connection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Este campo no puede estar vacío.'
            },
            len: {
                min: 2,
                msg: 'Este campo no permite menos de 2 caracteres.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Este campo no puede estar vacío.'
            },
            min: {
                args: 5,
                msg: 'Este campo no permite menos de 5 caracteres.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Este campo no puede estar vacío.'
            },
            min: {
                args: 5,
                msg: 'Este campo no permite menos de 5 caracteres.'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
}, {
    timestamps: false
});
export default UserModel