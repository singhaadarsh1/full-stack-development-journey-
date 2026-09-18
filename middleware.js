const express = require("express");

const app = express();
let requestcount=0;
function requestincreaser(req,res,next){
    requestcount=requestcount+1;
    console.log(`total number of request is ${(requestcount)}`);
      console.log("Before next");
    next();
      console.log("after next");
}

 function realsumhandler(req, res) {
    console.log("handler reached");
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
}
app.get("/sum",requestincreaser,realsumhandler);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});