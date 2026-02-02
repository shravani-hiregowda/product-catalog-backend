import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import Owner from "./models/Owner.js";
import bcrypt from "bcrypt";

dotenv.config();

const startServer = async () => {
  try {
    // 1️⃣ Connect DB FIRST
    await connectDB();

    // 2️⃣ Create owner ONLY if not exists
    const existingOwner = await Owner.findOne({ username: "owner" });

    if (!existingOwner) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await Owner.create({
        username: "owner",
        password: hashedPassword
      });

      console.log("✅ Owner created");
    }

    // 3️⃣ Start server LAST
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
