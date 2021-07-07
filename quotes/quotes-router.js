const router = require('express').Router();

const Quotes = require('./quotes-model.js');

router.get('/', (req, res) => {
    Quotes.getAll()
      .then(quotes => {
        res.status(200).json(quotes);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
router.post('/', (req, res) => {
    let quote = req.body;
    Quotes.insert(quote)
        .then(saved => {
        res.status(201).json(saved);
        })
        .catch(error => {
        res.status(500).json(error);
        });
}
);

router.delete('/:id', (req, res) => {
    Quotes.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The quote has been nuked' });
        } else {
          res.status(404).json({ message: 'The quote could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the quote',
        });
      });
  });

  router.put('/:id', (req, res) => {
    const changes = req.body;
    Quotes.update(req.params.id, changes)
      .then(quote => {
        if (quote) {
          res.status(200).json(quote);
        } else {
          res.status(404).json({ message: 'The quote could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the quote',
        });
      });
  });

module.exports = router;
