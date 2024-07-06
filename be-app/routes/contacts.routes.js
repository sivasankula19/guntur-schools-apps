

const express = require('express');
const router = express.Router();
const { createPrincipalContact ,  createSchoolContact , createRequestListComments , getContactInfo } = require('../controllers/contact.controller');

router.post('/:schoolId/createPrincipalContact', createPrincipalContact);
router.post('/:schoolId/createSchoolContact', createSchoolContact);
router.post('/:schoolId/createRequestListComments', createRequestListComments);
router.get('/:schoolId/getContact', getContactInfo)

module.exports = router;
