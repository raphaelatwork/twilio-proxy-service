// index.ts
import app from './app.js';
import http from 'http';
http.createServer({}, app).listen(8000, () => {
  console.log('Listening on http://localhost:8000...');
});
