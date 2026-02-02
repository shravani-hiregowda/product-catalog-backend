import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Owner from "../src/models/Owner.js";

dotenv.config();

const updateOwner = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    // 🔐 CHANGE THESE VALUES
    const NEW_USERNAME = "ArunAdmin";
    const NEW_PASSWORD = "Arun@789";

    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);

    let owner = await Owner.findOne();

    if (!owner) {
      await Owner.create({
        username: NEW_USERNAME,
        password: hashedPassword
      });
      console.log("✅ Owner created successfully");
    } else {
      owner.username = NEW_USERNAME;
      owner.password = hashedPassword;
      await owner.save();
      console.log("✅ Owner credentials updated successfully");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to update owner:", error);
    process.exit(1);
  }
};

updateOwner();
