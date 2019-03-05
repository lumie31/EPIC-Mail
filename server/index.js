import express from 'express';
import bodyParser from 'body-parser';
import router from './dummyApi/routes/router';

const app = express();

const port = 8000 || process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

export default app;
