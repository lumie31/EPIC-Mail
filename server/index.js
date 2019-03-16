import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './dummyApi/routes';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.status(200).json({
    status: 200,
    message: 'Welcome to EPIC Mail',
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes.userRouter);
app.use('/api/v1', routes.messageRouter);


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
