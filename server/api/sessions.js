const router = require("express").Router();

const {
    models: { Session, Order, OrderItem, Product },
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
      const [session, created] = await Session.upsert({'id': req.body.id, 'userId': req.body.userId}, {
        returning: true,
      });
      res.json(session);
    } catch (err) {
      next(err);
    }
  })

  router.get("/:id/cart", async (req, res, next) => {

    try {
        const cart = await Order.findOne({
            where: {
            sessionId: req.params.id,
            },
            include: [
            Session, 
            {
                model: OrderItem,
                include: [Product]
            }
            ]
        });


        if(!cart) {
            res.send("No cart found");
        } else {
            res.json(cart)
        }
    } catch (err) {
        next(err);
    }

  })


  module.exports = router;
