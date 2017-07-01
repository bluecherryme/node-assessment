const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const usersCtrl = require('./usersCtrl');

const app = express();
app.use( bodyParser.json() );
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));

app.get('/api/users',usersCtrl.getUsers);
app.get('/api/users/:userId', usersCtrl.getUserByID);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:userType', usersCtrl.getUsersByType);
app.put('/api/users/:userId', usersCtrl.updateUser);
app.post('/api/users',usersCtrl.postUser);
app.delete('/api/users/:userId',usersCtrl.deleteUser);





const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );