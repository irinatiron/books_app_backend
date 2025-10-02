import { DataTypes } from "sequelize";
import db_connection from "../database/db_connection.js";

const BookModel = db_connection.define('books', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'The title field cannot be empty.'
            },
            len: {
                min: 2,
                msg: 'The title field does not allow less than 2 characters.'
            }
        }
    },
    writer: {
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
    book_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'This field cannot be empty.'
            },
            min: {
                args: 10,
                msg: 'This field does not allow less than 10 characters.'
            }
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    timestamps: false
});
export default BookModel;