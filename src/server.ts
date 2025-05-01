import { Server } from "http";
import app from "./app";
import config from "./app/config";
import connectDB from "./app/utils/db";

async function startServer() {
  try {
    await connectDB();
    const server: Server = app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
