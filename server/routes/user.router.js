const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout(function(err) {
    if (err) {
      console.log('Logout failed:', err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
  
});

router.get('/favorites/:id', (req, res) => {
  const id = req.params.id;
  const queryText= `SELECT * 
  FROM "favorites" WHERE "userId" = $1`;

  pool.query(queryText, [id])
      .then((dRes)=> res.send(dRes.rows))
      .catch((err)=> {
          console.log('Get favorites failed:', err);
          res.sendStatus(500)
      });
});
// put notes - will be used on favorites page
router.put('/favorite/:userId/:favoriteId', (req, res) => {
  const userId = req.params.userId;
  const favoriteId = req.params.favoriteId;
  const notes = req.body.notes;

  const queryText = `UPDATE "favorites"
  SET "notes" = $1
  WHERE "userId" = $2 AND "id" = $3;`;

  pool.query(queryText, [notes, userId, favoriteId])
    .then((dbRes) => res.send(dbRes.rows))
    .catch((err) => {
      console.log('Get favorites failed: ', err);
      res.sendStatus(500);
    });
});

// delete favorite - will be used on favorites page
router.delete('/favorites/:userId/:favoriteId', (req, res) => {
  const userId = req.params.userId;
  const favoriteId = req.params.favoriteId;

  const queryText = `DELETE
  FROM "favorites" WHERE "userId" = $1 and "id" = $2;`;

  pool.query(queryText, [userId, favoriteId])
    .then((dbRes) => res.send(dbRes.rows))
    .catch((err) => {
      console.log('Get favorites failed: ', err);
      res.sendStatus(500);
    });
});
// put user username for account page
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const username = req.body.username;

  const queryText = `UPDATE "user"
  SET "username" = $1
  WHERE "id" = $2;`;

  pool.query(queryText, [username, userId])
    .then((dbRes) => res.send(dbRes.rows))
    .catch((err) => {
      console.log('Put username failed: ', err);
      res.sendStatus(500);
    });
});


module.exports = router;
