const Events = require('./eventsModel');

module.exports = {
  addEvent: (req, res, next) => {
    if (req.user.privelage === 'user') {
      return res.sendStatus(401);
    }
    Events.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      start: req.body.start,
      end: req.body.end })
      .then(event => res.sendStatus(201))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  deleteEvent: (req, res, next) => {
    if (req.user.privelage === 'user') {
      return res.sendStatus(401);
    }
    const id = req.body.id;
    Events.findById(id)
      .remove()
      .exec((err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  },

  editEvent: (req, res, next) => {
    console.log(req.body);
    const id = req.body.id;
    Events.update({ _id: id}, 
      {title: req.body.title,
      description: req.body.description,
      location: req.body.location},
      {new: true})
      .then(event => res.sendStatus(200))
      .catch(err => res.sendStatus(404));
  },

  getEvents: (req, res, next) => {
    Events.find({})
      .then(events => res.json(events))
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
  }
  
};