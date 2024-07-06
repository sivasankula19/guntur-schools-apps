const mongoose = require('mongoose')
const SchoolAbout = require('../models/school-about.model')

const createPrincipalContact = async (req,res) => {
    const {schoolId} = req.params;
    const principalContactDetails = {...req.body, schoolId}
    console.log("principalContactDetails", principalContactDetails)

    try{

         await SchoolAbout.findOneAndUpdate(
            { schoolId },
            { principalContact : principalContactDetails },
            { new: true, upsert: true }
          );
          const doc = await SchoolAbout.findOne({ schoolId });
          return res.status(201).json(doc.principalContact);
      

    }catch (err) {
    return res.status(500).json({message : err.message})
    }
}

const createSchoolContact = async(req,res) => {
    const {schoolId} = req.params;
    const schoolContact = req.body

    try{

        await SchoolAbout.findOneAndUpdate(
            { schoolId },
            { schoolContact : schoolContact },
            { new: true, upsert: true }
          );

          const doc = await SchoolAbout.findOne({ schoolId });
          return res.status(201).json(doc.schoolContact);
      

    }catch (err) {
    return res.status(500).json({message : err.message})
    }
}

const createRequestListComments = async(req,res) => {
    const {schoolId} = req.params;
    const requestListItem = [req.body]

    try{

        await  SchoolAbout.findOneAndUpdate(
            { schoolId },
            { $push: { requestList: { $each: requestListItem } } },
            { new: true, upsert: true }
          );

          const doc = await SchoolAbout.findOne({ schoolId });
          return res.status(201).json(doc.requestList);
      

    }catch (err) {
    return res.status(500).json({message : err.message})
    }
}

const getContactInfo = async (req,res) => {
    const {schoolId} = req.params;
    try{
        const schoolInfo = await SchoolAbout.find({ schoolId })
        return res.status(200).json(schoolInfo)
    }catch (err) {
        return res.status(500).json({message : err.message})
        }
}



module.exports = {createPrincipalContact ,  createSchoolContact , createRequestListComments , getContactInfo}
