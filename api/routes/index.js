const express = require('express');
const router = express.Router();

router.get("/",req, res, next => {
    res.json({message:"welcome To Home Page"});
});

module.exports = router;