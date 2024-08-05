const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const loginRoutes = require('./routes/loginRoutes');
const {join} = require("path");
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/forms', formRoutes);
app.use('/api', loginRoutes);
app.use(express.static(path.join(process.cwd(), 'assets')));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
