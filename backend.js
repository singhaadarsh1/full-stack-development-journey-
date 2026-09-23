const express = require("express");
const JWT=require("jsonwebtoken");
console.log(JWT);
const app = express();
app.use(express.json());
const JWT_SECRET="USER_APP";
const users = [];


app.get("/",function(re,res){
  res.sendFile(__dirname+"/public/frontend.html");
}
)
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
function auth(req,res,next){
    const token=req.headers.authorization;
    const userdetails=JWT.verify(token,JWT_SECRET);
    if(userdetails.username){
        req.username=userdetails.username;
        next()
    }else{
        res.json({
            message:"you are not logged in"
        })
    }
}
app.get("/me",auth, (req, res) => {
  
  const user=users.find(user=>user.username===req.username);
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
