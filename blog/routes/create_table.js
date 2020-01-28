module.exports = (knex)=>{
knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('users', function (t) {
            t.increments('user_id').primary();
            t.string('email', 30);
            t.string('password', 20);
        });
    } else {
        console.log("USERS__TABLE ALREADY EXIST!");

    }
});


knex.schema.hasTable('post').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('post', function (data) {
            data.increments('post_id').primary();
            data.string("user_id", 30);
            data.string('comment', 30);
            data.string('Description', 30);
        })
    } else {
        console.log('POST TABLE ALREADY EXISTS!');

    }
})



knex.schema.hasTable('Likedislike').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('Likedislike', function (data) {
            data.increments('id').primary();
            data.string('user_id', 30)
            data.string("post_id", 30);
            data.string('Like', 30);
            data.string('Dislike', 30);
        })
    } else {
        console.log('Like&dislike__table ALREADY EXIST!');

    }
})
}
