const express = require('express');
const app = express();
const cors = require("cors");

const connectDb = require('./01-database/connectDB.js');

//SUPER ADMIN USER ROUTES
const superAdminUserRoutes = require("./05-routes/01-superAdmin/01-superAdminUserRoutes.js")
const distAdminUserRoutes = require("./05-routes/02-distAdmin/01-distAdminUserRoutes.js")


const studentProfileRoutes = require('./05-routes/03-studentProfile/01-studentProfileRoutes.js')
const alumuniStudentProfileRoutes = require('./05-routes/03-studentProfile/02-alumuniStudentProfileRoutes.js')
const boardMemberProfileRoutes = require('./05-routes/04-boardMember/01-boardMemberProfileRoutes.js')

const port = 8000;

connectDb()

app.use(express.json());
app.use(cors());

//SUPER ADMIN ROUTES
app.use("/", superAdminUserRoutes);
app.use("/", distAdminUserRoutes);
app.use("/", studentProfileRoutes);
app.use("/", alumuniStudentProfileRoutes);
app.use("/", boardMemberProfileRoutes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
