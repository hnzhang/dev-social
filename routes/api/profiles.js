
const express =  require("express");
const router = express.Router();

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (request, response)=>{
	response.json({msg:  "users work"});
});

module.exports = router;
