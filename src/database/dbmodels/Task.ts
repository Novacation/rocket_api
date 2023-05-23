import { connection, types } from '../connection'
import { DataTypes, Model } from 'sequelize'

export class Task extends Model {}
Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        min: 1
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 100,
        min: 1
      }
    },

    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    modelName: 'Task',
    createdAt: true,
    updatedAt: true
  }
)
