const router = require("express").Router();

const {
    models: { Session, Order, OrderItem, Product, User},
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
        const session = await Session.findByPk(req.params.id);
        const userId = session.userId
        let cart = await Order.findOne({
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

        //if there is no cart for the given session, look for carts from other sessions for this user
        if (!cart) {
            
           const user = await User.findOne({
                where: { id: userId },
                include: {
                  model: Session,
                  include: {
                    model: Order,
                    where: { status: 'cart' },
                    include: {
                      model: OrderItem,
                      include: [Product]
                    }
                  }
                }
              })

            if (user && user.sessions[0] && user.sessions[0].orders) {
                cart = user.sessions[0].orders[0]
            } 
        }

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
