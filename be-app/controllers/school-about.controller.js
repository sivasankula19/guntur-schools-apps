

const School = require('../models/school.model');
const SchoolAbout = require('../models/school-about.model');

// Controller function to create and update a new SchoolAbout entry
const createSchoolAbout = async (req, res) => {
  const { schoolId } = req.params;
  const about = req.body;
  try {
    // Use findOneAndUpdate with upsert option
    const options = { new: true, upsert: true };
    const updatedSchoolAbout = await SchoolAbout.findOneAndUpdate(
      { schoolId }, // Filter
      { schoolAbout: about }, // Update
      options // Options
    );

    res.status(200).json(updatedSchoolAbout?.schoolAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to create a new SchoolAbout entry
const getSchoolAbout = async (req, res) => {
  const { schoolId } = req.params;
  try {
    // Query the database for the SchoolAbout document with the given schoolId
    const about = await SchoolAbout.findOne({ schoolId });

    if (!about) {
      return res.status(404).json({ message: 'SchoolAbout not found' });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const createTestinomals = async (req, res) => {

  const { schoolId } = req.params;
  const newTestimonial = req.body;
  console.log("new testinomals", newTestimonial)

  try {
    const about = await SchoolAbout.findOneAndUpdate(
      { schoolId },
      { $push: { "schoolAbout.studentTestinomals": newTestimonial } },
      { new: true, upsert: true }
    );

    if (!about) {
      return res.status(404).send('School not found');
    }

    res.status(201).send(about);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { createSchoolAbout, getSchoolAbout, createTestinomals };

