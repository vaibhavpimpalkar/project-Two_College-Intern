const mongoose = require('mongoose')

const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')




const createIntern = async function (req, res) {

    try {

        let data = req.body

        const { name, email, mobile, collegeId } = data

        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter Details" })
        }

        if (!(name)) {
            return res.status(400).send({ status: false, msg: "please enter Name" })
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, msg: "please enter valid E-mail" })
        }

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(mobile)) {
            res.status(400).send({ status: false, msg: "Please provide valid Number.." })
        }

        // if(!(mongoose.Schema.Types.isValid(ObjectId)(collegeId))){
        let clgid = await collegeModel.findById({ _id: collegeId })
        if (!clgid) {
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




module.exports = { createIntern, getCollegeDetails}