module.exports = function(mongoose, app) {
  const User = mongoose.model('User');
  // Ger list users
  app.get('/api/users', (req, res, next) => {
    User.find({}, (err, users) => {
      return res.json(users);
    });
  });
  // Create new user
  app.post('/api/users', (req, res, next) => {
    delete req.body._id;
    console.log('Server > POST /users > user', req.body);
    User.create(req.body, (err, user) => {
      if (err) return res.json(err);
      else return res.json(user);
    });
  });
  // Destroy User
  app.delete('/api/users/:id', (req, res, next) => {
    console.log("Server > DELETE '/users/:id' > id ", req.params.id);
    User.deleteOne({ _id: req.params.id }, (err, rawData) => {
      if (err) return res.json(err);
      else return res.json(true);
    });
  });
  // Update user
  app.put('/api/users/:id', (req, res, next) => {
    User.update({ _id: req.params.id }, req.body, (err, rawData) => {
      if (err) return res.json(err);
      else return res.json(true);
    });
  });
};
