const Events = require('./eventsModel');

module.exports = {
  addEvent: (req, res, next) => {
    if (req.user.privelage === 'user') {
      return res.sendStatus(401);
    }
    Events.create({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end })
      .then(event => {
        res.sendStatus(201);
      })
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

  getEvents: (req, res, next) => {
    Events.find({})
      .then(events => {
        res.json(events);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
  }
  
};