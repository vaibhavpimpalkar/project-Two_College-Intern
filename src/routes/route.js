const express = require('express');
const router = express.Router();
const CollegeController=require("../Controllers/collegeController")
const internController=require("../Controllers/internController")


router.post("/functionup/colleges",CollegeController.createCollege)
router.post("/functionup/interns",internController.createIntern)


module.exports=router;