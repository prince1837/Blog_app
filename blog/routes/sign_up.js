module.exports=(sign_up,knex)=>{
    sign_up.post("/sign_up",(req,res)=>{
        knex('users')
        .insert({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        })
        .then(()=>{
            console.log("sign_up sucessfully");
            res.send("sign_up sucessfully")
        })
        .catch((err)=>{
            console.log(err.message);
            res.send("err")
        })
    })



}