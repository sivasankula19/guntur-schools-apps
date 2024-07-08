const timeTable = require("../models/timetable.model")

const getTimeTable=async (req,res)=>{
    try {
        const filter=req.params.id!=undefined ? {"class_id":req.params.id} : {}
        const data=await timeTable.find(filter)
        res.status(200).send(req.params.id!=undefined ? data[0] :data)
    } catch (error) {
        res.status(400).send({message:error})
    }
}
const createTimeTable=async(req,res)=>{
    try {
        const {schoolId,class_id,data}=req.body
        const x= await new timeTable({schoolId,class_id,data})
        await x.save()
        res.status(200).send(x)
    } catch (error) {
        res.status(400).send({messae:error})
    }
}
const deleteTimeTable=async(req,res)=>{
    try {
        const class_id=req.params.id
        await timeTable.deleteOne({class_id})
      res.status(200).send('TimeTable Deleted for Class : '+class_id)
    } catch (error) {
        res.status(200).send('TimeTable Not Found for Class : '+class_id) 
    }
}
module.exports={getTimeTable,createTimeTable,deleteTimeTable}