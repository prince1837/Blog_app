module.exports=(knex)=>{
    knex.schema.hasTable('users').then(function(exist){
        if(!exist){
            return knex.schema.createTable('users',function(t){
                t.increments('user_id').primary();
                t.string('email', 30);
                t.string('name',15);
                t.string('password', 20);
            })
        }
    })

    knex.schema.hasTable('post').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('post', function (data) {
                data.increments('post_id').primary();
                data.string("user_id", 30);
                data.string('comment', 30);
                data.string('Description', 30);
            })
        } 
    })
}