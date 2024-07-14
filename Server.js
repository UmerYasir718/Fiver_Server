const express = require("express");
const cors = require("cors");
const PORT = 8000;
const fileUpload = require("express-fileupload");
const app = express();

require("dotenv/config");
require("./DataBase/DataBase");
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// --------------------------------------------------------------------------JWT Token MiddleWare--------------------------------------------------------------------------

const AdminLoginVerification = require("./Middleware/AdminLoginVerification");
const OwnerLoginVerification = require("./Middleware/OwnerLoginVerification");
const UserLoginVerification = require("./Middleware/UserLoginVerification");
app.use("/", AdminLoginVerification);
app.use("/", OwnerLoginVerification);
app.use("/", UserLoginVerification);
// --------------------------------------------------------------------------------------Routes----------------------------------------------------------------------------------
const AdminRoutes = require("./Routes/Admin");
const OwnerRoutes = require("./Routes/Owner");
const UserRoutes = require("./Routes/Users");
app.use("/", AdminRoutes);
app.use("/", OwnerRoutes);
app.use("/", UserRoutes);
// --------------------------------------------------------------------------------Server Checking API--------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Server is Running");
});
// ----------------------------------------------------------------------------------Server Listing-------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server Is Running On Port ${PORT}`);
});
