export const config = {
  HOST: "mysql",
  USER: "root",
  PASSWORD: "root",
  DB: "test",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export const dialect = "mysql";
