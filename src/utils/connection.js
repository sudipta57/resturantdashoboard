import mongoose from "mongoose";
const { MONGOUSERNAME, MONGOUSERPASSWORD } = process.env;

const connecttionStr = `mongodb+srv://${MONGOUSERNAME}:${MONGOUSERPASSWORD}@cluster0.acvase5.mongodb.net/foodapp
?retryWrites=true&w=majority&appName=Cluster0`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(connecttionStr).then((mongoose) => {
      console.log("db connected successfully");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
