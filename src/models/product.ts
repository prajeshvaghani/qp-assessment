import {
  Model,
  AllowNull,
  Column,
  DataType,
  Table,
} from "sequelize-typescript";

export interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  description: string;
  inventory: number;
}

@Table({ timestamps: true })
export class Product extends Model<ProductAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  inventory!: number;
}
