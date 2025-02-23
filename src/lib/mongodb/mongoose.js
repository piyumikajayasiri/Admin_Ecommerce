import mongoose from "mongoose";
let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) {
    console.log("Mongodb already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ecommerce_platform",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb Connected");
    initialized = true;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
