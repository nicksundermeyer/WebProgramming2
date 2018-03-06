import app from './server/app';
import mongoose from 'mongoose';

after(function(done) {
  app.comp3705.on('close', () => done());
  mongoose.connection.close();
  app.comp3705.close();
});
