const server = require('./src/app');
const { conn } = require('./src/database');

const port = process.env.PORT || 3001

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log('%s listening at 3001'); 
  });
});
