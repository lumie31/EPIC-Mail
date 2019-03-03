import express from 'express';
import bodyParser from 'body-parser';
import UserController from './dummyApi/controllers/userController';

const app = express();

const port = 8000 || process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello limue');
});

app.post('/user', UserController.createUser);

app.listen(port, () => {
  console.log('server started');
});
