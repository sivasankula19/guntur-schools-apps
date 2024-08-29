const express = require('express');
const connectToDatabase = require('./db');
const schools = require('./routes/schools.route');
const schoolAbout = require('./routes/school-about.route');
const schoolCourses = require('./routes/courses-route');
const schoolContacts = require('./routes/contacts.routes');
const schoolComeptitions = require('./routes/competitions.routes');
const schoolAchievements = require('./routes/achievements.routes')

const app = express();
app.use(express.json());
connectToDatabase();

app.use('/api/schools', schools);
app.use('/api/schools', schoolAbout);
app.use('/api/schools', schoolCourses);
app.use('/api/schools', schoolContacts);
app.use('/api/schools', schoolComeptitions);
app.use('/api/schools', schoolAchievements);

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
