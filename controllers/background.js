const fetch = require('node-fetch');
global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_ACCESS,
  timeout: 1000,
});

exports.getRandomImage = (req, res) => {
  console.log('get random image');
  unsplash.photos.getRandomPhoto({ featured: true, orientation: 'landscape' })
  .then(toJson)
  .then(json => {
    res.send(json);
  }).catch((err) => {
    console.log('error', err);
    res.status(500).send(err);
  });
};

exports.getImageList = (req, res) => {
  const count = req.params.count ? parseInt(req.params.count) : 10;
  unsplash.photos.getRandomPhoto({ featured: true, orientation: 'landscape', collections: [req.params.filter], count })
  .then(toJson)
  .then(json => {
    res.send(json);
  }).catch((err) => {
    console.log('error', err);
    res.status(500).send(err);
  });
};

exports.getImage = (req, res) => {
  console.log('get image');
  unsplash.photos.getPhoto(req.params.id)
  .then(toJson)
  .then(json => {
    res.send(json);
  }).catch((err) => {
    console.log('error', err);
    res.status(500).send(err);
  });
};