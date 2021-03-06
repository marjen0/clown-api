const express = require('express');
const cors = require('cors');
const downloadRoutes = require('./routes/download');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  Allow form-data parsing

app.use(express.static('public'));

/*app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode).send(err.message);
});*/

app.use('/download', downloadRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at port ${PORT}`);
});
