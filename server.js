require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/db/db");

connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Running on port 3000");
});
