const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
    console.log("userAuthenticationRoute", req.user);
    console.log("req.params.id", req.params.id);
    res.json({status: 'success', message: 'Welcome to the user profile route', user: req.user});
});

module.exports = router;