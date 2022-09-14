
const collegeModel=require("../models/collegeModel")
//const internModel=require("../models/collegeModel")



const createCollege= async function (req,res){
    try{
      let data = req.body

      const {name , fullName , logoLink} = data

      if(!name){
        return res.status(400).send({status : false , msg : "Please provide valid name"})
      }
    //   if (!(/^[a-zA-Z][a-zA-Z\s]{2,6}[a-zA-Z]$/).test(name)) {
    //     return res.status(400).send({ status: false, msg: "please provide valid name regex" })
    // }
    let nameVerify = await internModel.findOne({ name: name })

        if (nameVerify) {
            return res.status(400).send({ status: false, msg: "this name already exists please provide another name" })
        }

      if(!fullName){
        return res.status(400).send({status : false , msg : "Please provide valid Full Name"})
      }
      if (!(/^([A-Za-z]+[,]?[ ]?|[A-Za-z]+['-]?)+$/).test(fullName)) {
        return res.status(400).send({ status: false, msg: "please provide valid fullName regex" })
    }

      if(!logoLink){
        return res.status(400).send({status : false , msg : "Please provide logoLink"})
      }
      if (!(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(logoLink)) {
        return res.status(400).send({ status: false, msg: "please provide valid logoLink regex" })
    }
     
      let collegeData = await collegeModel.create(data)
       
    res.status(201).send({ status  :  true , msg : collegeData})

    }
 catch (error) {
    res.status(500).send({ status: false, message: error.message })
}


}
module.exports={createCollege}
