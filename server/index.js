import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router from './dummyApi/routes/router';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.use((request, response, next) => {
  response.status(404).json({
    status: 404,
    error: 'Endpoint not found',
  });
  next();
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

export default app;
