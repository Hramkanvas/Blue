let express = require('express');
let methods = require('./methods');

let app = express();

app.get('/login',(req,res) =>{
    let user = methods.login(req.query.login,req.query.password);
    user ? res.send(user): res.send(404,"Incorrect login or password");
});



app.listen(3000,()=>{
    console.log("Server is running...");
});
