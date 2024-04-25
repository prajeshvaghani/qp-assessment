import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";

const sequelize = new Sequelize({
  database: config.DB,
  username: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  dialect: dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  models: [User, Product, Order],
});

export default sequelize;
