const express = require('express');
const router = express.Router();
const CollegeController=require("../Controllers/collegeController")
const internController=require("../Controllers/internController")

// _____________________________POST APIS_______________________________________//

router.post("/functionup/colleges",CollegeController.createCollege)
router.post("/functionup/interns",internController.createIntern)

// _____________________________GET APIS_________________________________________//

router.get('/functionup/collegeDetails',internController.getCollegeDetails)

module.exports=router;
