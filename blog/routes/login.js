module.exports=(login,knex,jwt,S_key)=>{
    login.post("/log_in",(req,res)=>{
       var email = req.body.email
       var password=req.body.password
       knex.select('*').from('users').where({"email":email,"password":password})
       .then((data)=>{
           if (data[0].email==email){
               if (data[0].password==password){
                   jwt.sign({'user_id':data[0].user_id},S_key,(err,data)=>{
                       if(!err){
                           res.cookie(data)
                           res.send('login sucessfully')
                       }
                       else{
                           res.send(err.text)
                       }
                   })
               }
               else{
                res.send('your password is not correct please put your correct password ')
               }
           }
           else{
               res.send('your email is not correct please put your correct email ')
           }
       })
    })
}