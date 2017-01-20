const Pictures = require('./picturesModel');

module.exports = {
  addAlbum: (req, res, next) => {
    Pictures.create({
      title: req.body.title,
      code: req.body.code
    })
      .then(picture => res.sendStatus(201))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(400);
      });
  },

  deleteAlbum: (req, res, next) => {
    const id = req.body.id;
    Pictures.findById(id)
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

  editAlbum: (req, res, next) => {
    const id = req.body.id;
    Pictures.update({id: id}, {title: req.body.title, code: req.body.code}, {new: true})
      .then(picture => res.sendStatus(200))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(404);
      });
  },

  getAlbums: (req, res, next) => {
    Pictures.find({})
      .then(pictures => res.json(pictures))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(404);
      });
  }
};