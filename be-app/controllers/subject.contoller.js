const Subject = require("../models/subject.model")

const getSubject=async(req,res)=>{
    try {
        const data=await Subject.find()
    res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message:error})  
    }
    
}
const createSubject=async(req,res)=>{
    try {
       const {schoolId,name,subject_id}=req.body
        const data=await new Subject({schoolId,name,subject_id})
        await data.save()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message:error}) 
    }
}
module.exports={getSubject,createSubject}