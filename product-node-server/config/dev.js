module.exports = {
  db: {
    master: `mongodb+srv://lucifer:rajkumar@123@cluster0.trr57.mongodb.net/productmanager?retryWrites=true&w=majority`,
    options: {
      auto_reconnect: true,
      reconnectTries: Number.MAX_SAFE_INTEGER,
      poolSize: 100,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      readPreference: "primaryPreferred",
    },
  },
  BUCKET_NAME: "",
  IAM_USER_KEY: "",
  IAM_USER_SECRET: "",
  port: 5000,
};
