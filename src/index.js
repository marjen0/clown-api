const express = require('express');
const cors = require('cors');
const downloadRoutes = require('./routes/download');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));

const whitelist = ['http://0.0.0.0:8080', 'https://clown-client.vercel.app'];
app.use(cors());
/*app.use(
  cors({
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api/download', downloadRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at port ${PORT}`);
});
