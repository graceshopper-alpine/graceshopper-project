const router = require("express").Router();

const {
    models: { Session },
  } = require("../db");
  

  router.post("/create", async (req, res, next) => {
    try {
      const session = await Session.create(req.body);
      res.json(session);
    } catch (err) {
      next(err);
    }
  })

  router.put("/update", async (req, res, next) => {
    try {
    console.log('req body', req.body)
      const session = await Session.update({'userId': req.body.userId}, {
        where: {
          id: req.body.id,
        },
      });
      res.json(session);
    } catch (err) {
      next(err);
    }
  })


  module.exports = router;
