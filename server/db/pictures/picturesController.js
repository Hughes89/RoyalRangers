const Pictures = require('./picturesModel');

module.exports = {
  addAlbum: (req, res, next) => {
    Pictures.create({
      title: req.body.title,
      href: req.body.href,
      src: req.body.src
    })
      .then(picture => res.sendStatus(201))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(400);
      });
  },

  getAlbums: (req, res, next) => {
    Pictures.find({})
      .then(pictures => res.json(pictures))
      .catch(err => {
        if (err) console.log(err);
        res.sendStatus(404);
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
  }
};