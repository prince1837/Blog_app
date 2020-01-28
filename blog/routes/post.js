module.exports = (post,knex,jwt,s_key)=>{
  post.post('/post',(req,res)=>{
    var cookie1 = req.headers.cookie.slice(0,-10);
    jwt.verify(cookie1,s_key,(err,data)=>{
      console.log(data)
      knex('post')
      .insert({
        'user_id' : data["user_id"],
        'comment' : req.body.comment,
        "Description" : req.body.Description
      })
      .then(()=>{
          console.log('data fecthed');
          res.send('data fecthed!')
        })
      .catch((err)=>{
          console.log(err);
        })
    })  
  })


  post.get('/get_post',(req,res)=>{
    knex('post')
    .select('*')
    .then((data)=>{
      var ne_arry = data.reverse();
      res.send(ne_arry);
      console.log(ne_arry);
      
      
      
      
      
    })
    .catch((err)=>{
      res.send(err)
    })

  })
}