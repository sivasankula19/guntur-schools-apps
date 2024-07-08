const express = require( 'express');
const connectToDatabase = require ('./db');
const schools = require('./routes/schools.route');
const schoolAbout = require('./routes/school-about.route');
const schoolCourses = require('./routes/courses-route');
const schoolContacts = require('./routes/contacts.routes');
const  classRoute  = require('./routes/school-class.route');
const subjectRoute = require('./routes/subject.route');
const timetableRoute = require('./routes/timetable.route');

const app = express();
app.use(express.json());
connectToDatabase();

app.use('/api/schools', schools);
app.use('/api/schools', schoolAbout);
app.use('/api/schools', schoolCourses);
app.use('/api/schools', schoolContacts)
app.use('/api/schools', classRoute)
app.use('/api/schools', subjectRoute)
app.use('/api/schools', timetableRoute)

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
