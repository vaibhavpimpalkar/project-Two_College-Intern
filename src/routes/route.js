const express = require('express');
const router = express.Router();
const CollegeController=require("../Controllers/collegeController")
const internController=require("../Controllers/internController")


router.post("/functionup/colleges",CollegeController.creatCollege)
router.post("/functionup/interns",internController.creatInterns)


module.exports=router;