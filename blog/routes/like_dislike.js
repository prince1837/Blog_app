module.exports = (like_dislike, knex, jwt,s_key) => {

    ///////////////////////////////// LIKE///////////////////////////////

    like_dislike.post('/like', (req, res) => {
        var cookie1 = req.headers.cookie.slice(0, -10);
        jwt.verify(cookie1, s_key, (err, data) => {
            knex('Likedislike')
                .select('*')
                .where({
                    "post_id": req.body.post_id,
                    "user_id": data["user_id"]
                })
                .then((data1) => {


                    if (data1.length > 0) {
                        knex('Likedislike')
                            .update({
                                'Like': 'Yes',
                                'Dislike': "no"
                            })
                            .where({
                                'post_id': req.body.post_id,
                                'user_id': data['user_id']
                            }).then(() => {
                                res.send('Liked')
                            }).catch((err) => {
                                res.send(err)
                            })


                    } else {
                        knex('Likedislike')
                            .insert({
                                'post_id': req.body.post_id,
                                'user_id': data['user_id'],
                                'Like': 'yes',
                                'Dislike': "no"

                            })
                            .then(() => {
                                res.send('Liked')
                            })
                            .catch((err) => {
                                res.send(err)
                            })

                    }

                })


        })

    })
    ///////////////////////////// DISLIKE/////////////////////////////////////

    like_dislike.post('/dislike', (req, res) => {
        var cookie1 = req.headers.cookie.slice(0, -10);
        jwt.verify(cookie1, s_key, (err, data) => {

            knex('Likedislike')
                .select('*')
                .where({
                    "post_id": req.body.post_id,
                    "user_id": data["user_id"]
                })
                .then((data1) => {


                    if (data1.length > 0) {
                        knex('Likedislike')
                            .update({
                                'Like': 'no',
                                'Dislike': "Yes"
                            })
                            .where({
                                'post_id': req.body.post_id,
                                'user_id': data['user_id']
                            }).then(() => {
                                res.send('Dislked')
                            }).catch((err) => {
                                res.send(err)
                            })


                    } else {
                        knex('Likedislike')
                            .insert({
                                'post_id': req.body.post_id,
                                'user_id': data['user_id'],
                                'Like': 'no',
                                'Dislike': "Yes"

                            })
                            .then(() => {
                                res.send('Disliked')
                            })
                            .catch((err) => {
                                res.send(err)
                            })

                    }

                })

        })

    })

    //////////////Get LIKE_DISLIKE ///////////////

    like_dislike.get('/like_dislike', (req, res) => {
        const cookie1 = req.headers.cookie.slice(0, -10);
        jwt.verify(cookie1, s_key, (err, data) => {
            knex('Likedislike')
                .select('*')
                .where({
                    "post_id": req.body.post_id,
                    "Like": "yes"
                })
                .then((data) => {
                    const like = (data.length)
                    knex('Likedislike')
                        .select('*')
                        .where({
                            "post_id": req.body.post_id,
                            "Dislike": "yes"
                        })
                        .then((data1) => {
                            const dislike = data1.length
                            res.send({ "like": like, "dislike": dislike })
                        })
                        .catch((err) => {
                            res.send(err)
                        })

                })
                .catch((err) => {
                    res.send(err)
                })
        })
    })




}





