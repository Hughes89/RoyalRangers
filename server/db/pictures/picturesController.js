const Pictures = require('./picturesModel');
const helpers = require('./helpers.js');

module.exports = {
  addAlbum: (req, res, next) => {
    const code = helpers.addTargetBlank(req.body.code);
    Pictures.create({
      title: req.body.title,
      code: code
    })
      .then(picture => res.json(picture))
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
    Pictures.update({_id: id}, {title: req.body.title, code: req.body.code}, {new: true})
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