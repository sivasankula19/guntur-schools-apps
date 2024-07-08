const schoolClasses=require('../models/school-class.model')
const getClass=async (req,res)=>{
    try {
        const data=await schoolClasses.find()
       res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message:error})
    }
}
const createClass=async (req,res)=>{
    try {
        const{name,section,class_id}=req.body
        const data=await new schoolClasses({name,section,class_id})
         await data.save()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({Message:error})  
    }
}
module.exports={getClass,createClass}