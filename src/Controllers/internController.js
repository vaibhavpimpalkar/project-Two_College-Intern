const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")

const creatInterns= async function (req,res){
    try{
        if (Object.keys(req.query).length == 0) {


        const data = req.body
       
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Please Provide Data" })
        }


    }
} catch (error) {
    res.status(500).send({ status: false, message: error.message })
}
}

module.exports.creatInterns=creatInterns
