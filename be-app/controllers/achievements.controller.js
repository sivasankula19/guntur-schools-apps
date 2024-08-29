const mongoose = require('mongoose');
const SchoolAbout = require('../models/school-about.model');

const createAchievement = async (req, res) => {
    const { schoolId } = req.params;
    const AchievementsObj = req.body
    const { category , subCategory} = req.body;

    if (!schoolId) {
        return res.status(404).send('School not found');
    }

    try {

        const updateQuery = {
            $addToSet: { [`achievements.${category}.${subCategory}`]: AchievementsObj }
          };

        // const updateQuery = { $push : {[`achievements.${category}.${subCategory}`]: AchievementsObj  } };
        // const setOnInitialCategory = {$setOnInsert : {[`competitions.${category}.${subCategory}`] : []}};
        const achievement = await SchoolAbout.findOneAndUpdate(
            {schoolId},
            updateQuery,
            // {...updateQuery , ...setOnInitialCategory},
            { new: true, upsert: true }

        )
        return res.status(201).json(achievement)

        //commented for future use
        // if (category === 'education') {
        //     if(subCategory === 'schoolLevel'){
        //         console.log("ABC-->")
        //         const schoolAchievement = await SchoolAbout.findOneAndUpdate(
        //             { schoolId },
        //             { $push: { "achievements.education.schoolLevel": AchievementsObj } },
        //             { new: true, upsert: true }
        //         )
        //         return res.status(201).json(schoolAchievement);
        //     } else if(subCategory === 'districtLevel'){
        //         const schoolAchievement = await SchoolAbout.findOneAndUpdate(
        //             { schoolId },
        //             { $push: { "achievements.education.districtLevel": AchievementsObj } },
        //             { new: true, upsert: true }
        //         )
        //         return res.status(201).json(schoolAchievement);
        //     } else if(subCategory === 'mandalLevel'){
        //         const schoolAchievement = await SchoolAbout.findOneAndUpdate(
        //             { schoolId },
        //             { $push: { "competitions.education.mandalLevel": AchievementsObj } },
        //             { new: true, upsert: true }
        //         )
        //         return res.status(201).json(schoolAchievement);
        //     }

        // }
        // else if (category === 'sports') {
        //     if(subCategory === 'schoolLevel'){
        //         const schoolAchievement = await SchoolAbout.findOneAndUpdate(
        //             { schoolId },
        //             { $push: { "achievements.sports.schoolLevel": AchievementsObj } },
        //             { new: true, upsert: true }
        //         )
        //         return res.status(201).json(schoolAchievement);
        //     } else if(subCategory === 'districtLevel'){
        //         const schoolAchievement = await SchoolAbout.findOneAndUpdate(
        //             { schoolId },
        //             { $push: { "achievements.sports.districtLevel": AchievementsObj } },
        //             { new: true, upsert: true }
        //         )
        //         return res.status(201).json(schoolAchievement);
        //     } else if(subCategory === 'mandalLevel'){
        //         const schoolAchievement = await SchoolAbout.findOneAndUpdate(
        //             { schoolId },
        //             { $push: { "competitions.sports.mandalLevel": AchievementsObj } },
        //             { new: true, upsert: true }
        //         )
        //         return res.status(201).json(schoolAchievement);
        //     }
        // }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports = { createAchievement }