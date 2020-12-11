const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("./../model/user");

exports.signup_user = (req, res, next) => {
    User.find({ result: req.body.result })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    result: req.body.result
                });
                user
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "User Created"
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });   
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.user_login = (req, res, next) => {
    User.find({ result: req.body.result })
        .exec()
        .then(user => {
            const token = jwt.sign({
                result: user[0].result,
                userId: user[0]._id
            },
            "secret", {
                expiresIn: "1h" 
            }
            );
            res.status(200).json({
                message: 'Auth Successful',
                token: token
            });   
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_dashboard = (req, res, next) => {
    console.log(req.userData);
    res.json({user:req.userData, message:"welcome user"});
}
