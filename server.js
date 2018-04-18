let express = require('express');
let methods = require('./methods');
const bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.json());
app.use('/static', express.static('public'));


app.post('/login',(req,res) =>{
    let user = methods.login(req.body.login, req.body.password);
    user ? res.send(user): res.send(404,"Incorrect login or password");
});


app.listen(3000,()=>{
    console.log("Server is running...");
});
