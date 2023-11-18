import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;

// connect to mongodb before starting the server
mongoose
  .connect(process.env.DATABSE_CONNECTION_URL!)
  .then((): void => {
    app.listen(port, (): void =>
      console.log(`Server listening on Port ${port}`)
    );
  })
  .catch(err => {
    console.log('db connection failered', err);
  });
