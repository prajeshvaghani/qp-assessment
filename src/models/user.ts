import {
  Model,
  AllowNull,
  Column,
  DataType,
  Table,
} from "sequelize-typescript";

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  userType: string;
}

@Table({ timestamps: true })
export class User extends Model<UserAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column({ unique: true })
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;

  @AllowNull(false)
  @Column
  declare userType: string;
}
