import express from 'express';
import bodyParser from 'body-parser';
import { actionHistoryController } from './controllers/actionHistoryController';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/history', actionHistoryController.getUserHistory);
app.post('/history', actionHistoryController.createAction);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
