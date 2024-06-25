

const School = require('../../models/about/school.model');
const SchoolAbout = require('../../models/about/school-about.model');

// Controller function to create and update a new SchoolAbout entry
const createSchoolAbout = async (req, res) => {
  const { schoolId } = req.params;
  const about  = req.body;
  console.log("about", about)

  try {
   // Use findOneAndUpdate with upsert option
   const options = { new: true, upsert: true, useFindAndModify: false };
   const updatedSchoolAbout = await SchoolAbout.findOneAndUpdate(
       { schoolId }, // Filter
       about, // Update
       options // Options
   );

   res.status(200).json(updatedSchoolAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to create a new SchoolAbout entry
const getSchoolAbout = async (req, res) => {
  const { schoolId } = req.params;
  try {
    // Query the database for the SchoolAbout document with the given schoolId
    const schoolAbout = await SchoolAbout.findOne({ schoolId });

    if (!schoolAbout) {
        return res.status(404).json({ message: 'SchoolAbout not found' });
    }

    res.status(200).json(schoolAbout);
} catch (error) {
    res.status(500).json({ message: 'Server Error', error });
}
};

const createTestinomals = async(req,res) => {
 
    const { schoolId } = req.params;
    const newTestimonial = req.body;
  
    try {
      const schoolAbout = await SchoolAbout.findOneAndUpdate(
        { schoolId },
        { $push: { studentTestinomals: newTestimonial } },
        { new: true, useFindAndModify: false }
      );
  
      if (!schoolAbout) {
        return res.status(404).send('School not found');
      }
  
      res.status(201).send(newTestimonial);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


module.exports = { createSchoolAbout, getSchoolAbout, createTestinomals};

