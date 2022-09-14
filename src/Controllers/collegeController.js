
const collegeModel=require("../models/collegeModel")
//const internModel=require("../models/collegeModel")



const createCollege= async function (req,res){
    try{
      let data = req.body

      const {name , fullName , logoLink} = data

      if(!name){
        return res.status(400).send({status : false , msg : "Please provide valid name"})
      }

      if(!fullName){
        return res.status(400).send({status : false , msg : "Please provide valid Full Name"})
      }

      if(!logoLink){
        return res.status(400).send({status : false , msg : "Please provide logoLink"})
      }
     
      let collegeData = await collegeModel.create(data)
       
    res.status(201).send({ status  :  true , msg : collegeData})

    }
 catch (error) {
    res.status(500).send({ status: false, message: error.message })
}


}
module.exports={createCollege}
