import express from "express";
import sequelize from "./db";
import UserRouter from "./routes/userRoutes";
import ProductRouter from "./routes/productRoutes";
import orderRouter from "./routes/orderRouters";
import dotenv from "dotenv";

dotenv.config();

// Create an Express application
const app = express();
// Set the port to default 3000
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the taskRoutes for handling task-related routes
app.use(UserRouter);
app.use(ProductRouter);
app.use(orderRouter);

// Sync the Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
