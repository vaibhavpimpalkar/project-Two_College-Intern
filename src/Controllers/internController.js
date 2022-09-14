const mongoose = require('mongoose')

const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')

const isValidObjectId = function (ObjectId) { return mongoose.Types.ObjectId.isValid(ObjectId) }



const createIntern = async function (req, res) {

    try {

        let data = req.body

        const { name, email, mobile, collegeId } = data
        let id = await collegeModel.findById(collegeId)


        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter Details" })
        }

        if (!(name)) {
            return res.status(400).send({ status: false, msg: "please enter Name" })
        }

        if (!(/^[a-zA-z]+([\s][a-zA-Z]+)+$/).test(name)) { return res.status(400).send({ status: false, msg: "Please enter valid name" }) }

        

        //------------------------------------email validation----------------------------------------------//
        if (!email) {
            return res.status(400).send({ status: false, msg: "Email should be mandatory" })
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "please provide valid email" })
        }

        let emailVerify = await internModel.findOne({ email: email })

        if (emailVerify) {
            return res.status(400).send({ status: false, msg: "this email already exists please provide another email" })
        }

        //------------------------------------mobile validation----------------------------------------------//

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(mobile)) {
            res.status(400).send({ status: false, msg: "Please provide valid Mobile Number.." })
        }
        let mobileVerify = await internModel.findOne({ mobile: mobile })

        if (mobileVerify) {
            return res.status(400).send({ status: false, msg: "this mobile already exists please provide another mobile" })
        }
        let collegeIdVerify = await collegeModel.findOne({ _id: collegeId })
        if (!collegeIdVerify) {
            return res.status(400).send({ status: false, msg: "collegeId is not valid" })
        }


        if (!isValidObjectId(collegeId)) {

            res.status(400).send({ status: false, msg: "Please provide valid CollegeId" })
        }


        let intern = await internModel.create(data)
        return res.status(200).send({ status: false, msg: intern })

    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}



const getCollegeDetails = async function (req, res) {

    try {
        let data = req.query.collegeName

        if (!data) {
            return res.status(400).send({ status: false, msg: "college Name is not found......" })
        }

        let college = await internModel.findOne({ name: collegeName })
        res.status(200).send({ status: true, msg: college })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}




module.exports = { createIntern, getCollegeDetails }