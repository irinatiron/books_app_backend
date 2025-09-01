import { DataTypes } from "sequelize";
import db_connection from "../database/db_connection.js";

const BookModel = db_connection.define('books', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo title campo no puede estar vacío'
            },
            len: {
                min: 2,
                msg: 'el campo title no permite menos de 2 caracteres'
            }
        }
    },
    writer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'este campo no puede estar vacío'
            },
            len: {
                min: 2,
                msg: 'este campo no permite menos de 2 caracteres'
            }
        }
    },
    book_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'este campo no puede estar vacío'
            },
            min: {
                args: 10,
                msg: 'este campo no permite menos de 10 caracterés'
            }
        }
    },

}, {
    timestamps: false
});
export default BookModel