const School = require('../models/school.model');

const getSchools= async(req,res)=>{
  try {
    const data= await School.find()
    res.status(200).send(data)
  } catch (err) {
    res.status(400).send({ message: err.message  })
  }
}

const createSchool = async (req, res) => {
    console.log("req", req.body)
    const { name } = req.body;
    
    try {
      // Create and save the new School entry
      const newSchool = new School({ name });
      await newSchool.save();
      res.status(201).json(newSchool);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  module.exports = {createSchool,getSchools}
