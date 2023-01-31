import { Model, INTEGER, STRING } from 'sequelize';
import db from './index';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
    field: 'username',
  },
  role: {
    type: STRING(30),
    allowNull: false,
    field: 'role',
  },
  email: {
    type: STRING(30),
    allowNull: false,
    field: 'email',
  },
  password: {
    type: STRING(30),
    allowNull: false,
    field: 'password',
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
