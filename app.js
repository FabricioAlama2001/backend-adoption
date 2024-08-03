const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const adminRoutes = require('./routes/adminRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/forms', formRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api', loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
