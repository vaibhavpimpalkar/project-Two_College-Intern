
const collegeModel = require("../models/collegeModel")

const createCollege = async function (req, res) {
  try {
    let data = req.body

    const { name, fullName, logoLink } = data

    if (Object.keys(data) == 0) {
      return res.status(400).send({ status: false, msg: "Please Enter Details" })
    }

    if (!name) {
      return res.status(400).send({ status: false, msg: "Please provide valid name" })
    }

    if (!(/^[a-z]+$/).test(name)) {

      return res.status(400).send({ status: false, msg: "please provide name in valid format only accept lowercase without any space" })
    }

    let nameVerify = await collegeModel.findOne({ name: name })

    if (nameVerify) {
      return res.status(400).send({ status: false, msg: "this name already exists please provide another name" })
    }

    if (!fullName) {
      return res.status(400).send({ status: false, msg: "Please provide valid Full Name" })
    }
    if (!(/^([A-Za-z]+[,]?[ ]?|[A-Za-z]+['-]?)+$/).test(fullName)) {
      return res.status(400).send({ status: false, msg: "please provide valid fullName " })
    }

    if (!logoLink) {
      return res.status(400).send({ status: false, msg: "Please provide logoLink" })
    }
    if (!(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(logoLink)) {
      return res.status(400).send({ status: false, msg: "please provide valid logoLink " })
    }

    let college = await collegeModel.create(data)

        let createCollege={name:college.name, fullName:college.fullName, logoLink:college.logoLink, isDeleted:college.isDeleted}

        return res.status(201).send({ status: true, msg: createCollege })

  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}

module.exports = { createCollege }
