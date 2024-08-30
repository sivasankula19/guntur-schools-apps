const SchoolAbout = require('../models/school-about.model');

const createCompetition = async (req, res) => {
    const { schoolId } = req.params;
    const competitionsObj = req.body
    const { category } = req.body;

    if (!schoolId) {
        return res.status(404).send('School not found');
    }

    try {
        const updateQuery = {
            $addToSet: { [`competitions.${category}`]: competitionsObj }
        };
        // const updateQuery = { $push: { [`competitions.${category}`]: competitionsObj } };
        // const setOnInitialCategory = { $setOnInsert: { [`competitions.${category}`]: [] } };

        const competition = await SchoolAbout.findOneAndUpdate(
            { schoolId },
            updateQuery,
            // {...updateQuery , ...setOnInitialCategory},
            { new: true, upsert: true }

        )

        // const competition = await SchoolAbout.findOneAndUpdate(
        //     { schoolId },
        //     { ...updateQuery, ...setOnInitialCategory },
        //     { new: true, upsert: true }

        // )
        return res.status(201).json(competition)

        //commited for future use
        // if (category === 'education') {

        //     const educationCompetition = await SchoolAbout.findOneAndUpdate(
        //         { schoolId },
        //         { $push: { "competitions.education": competitionsObj } },
        //         { new: true, upsert: true }
        //     )
        //     return res.status(201).json(educationCompetition);

        // }
        // else if (category === 'sports') {
        //     const sportsCompetition = await SchoolAbout.findOneAndUpdate(
        //         { schoolId },
        //         { $push: { "competitions.sports": competitionsObj } },
        //         { new: true, upsert: true }
        //     )

        //     return res.status(201).json(sportsCompetition)
        // }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

const getCompetitions = async (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(404).send('School not found');
    }

    try {
        const competitions = await SchoolAbout.findOne({ schoolId })
        return res.status(201).json(competitions?.competitions)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { createCompetition, getCompetitions }