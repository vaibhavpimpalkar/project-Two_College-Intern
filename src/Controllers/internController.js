
const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')


const createIntern = async function (req, res) {

    try {

        let data = req.body

        let { name, email, mobile, collegeName } = data

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

        //.............regex for mobile............

        let regMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;

        if (!regMobile.test(mobile)) {

            return res.status(400).send({ message: "Please enter valid Mobile Number" })
        }

        let mobData = await internModel.findOne({ mobile: mobile })

        //.............when mobile number is already in use............

        if (mobData) return res.status(400).send({ status: false, msg: 'Duplicate mobile' })

        const collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeData) {
            return res.status(400).send({ status: false, msg: "Invalid College Name" })
        }
        const collegeId = collegeData._id
        
        const dataOfIntern = { name, email, mobile, collegeId } 

        let savedData = await internModel.create(dataOfIntern)
        return res.status(201).send({
            status: true,
            data: {
                isDeleted: savedData.isDeleted == false,
                name: savedData.name,
                email: savedData.email,
                mobile: savedData.mobile,
                collegeId: savedData.collegeId
            }
        })

    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

// ______________________GETCOLLEGEDETAI ______________________

let getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please Enter collegeName" })
        }
      
        let getCollegeName = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!getCollegeName) { return res.status(404).send({ status: false, msg: "CollegeName does not exist" }) }

        let data = { name: getCollegeName.name, fullName: getCollegeName.fullName, logoLink: getCollegeName.logoLink }

        let intern = await internModel.find({ collegeId: getCollegeName._id, isDeleted: false }).select('_id name email mobile')

        if (!intern) {return  res.status(404).send({ status: false, msg: "No Intern Available in this College" }) }
        else {
            data.intern = intern
            return res.status(200).send({ status: true, data: data })
        }
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}



module.exports = { createIntern, getCollegeDetails }