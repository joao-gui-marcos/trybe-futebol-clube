"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: false,
        field: 'username',
    },
    role: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: false,
        field: 'role',
    },
    email: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: false,
        field: 'email',
    },
    password: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: false,
        field: 'password',
    },
}, {
    sequelize: index_1.default,
    modelName: 'users',
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=UserModel.js.map