const express = require("express");
const JWT=require("jsonwebtoken");
console.log(JWT);
const app = express();
app.use(express.json());
const JWT_SECRET="USER_APP";
const users = [];



app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });
  res.json({
    message: "you are signed in",
  });
  console.log(users);
});
app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user=users.find(user=>user.username===username&&user.password===password);
  
  if (user) {
    const token = JWT.sign({
        username:user.username,
        password:user.password

    },JWT_SECRET)
    user.token = token;
    

    res.send({
       token
    })
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});
app.get("/me", (req, res) => {
  const token = req.headers.token;
  const userDetails = JWT.verify(token,JWT_SECRET);
  const username=userDetails.username;
  const user=users.find(user=>user.username===username);
  if (user) {
    res.send({
      username: user.username,
      password:user.password
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
