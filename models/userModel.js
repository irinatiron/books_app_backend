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
                msg: 'This field cannot be empty.'
            },
            len: {
                min: 2,
                msg: 'This field does not allow less than 2 characters.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'This field cannot be empty.'
            },
            min: {
                args: 5,
                msg: 'This field does not allow less than 5 characters.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'This field cannot be empty.'
            },
            min: {
                args: 5,
                msg: 'This field does not allow less than 5 characters.'
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
export default UserModel;