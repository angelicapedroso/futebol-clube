import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class User extends Model {
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, { sequelize: db, underscored: true });
