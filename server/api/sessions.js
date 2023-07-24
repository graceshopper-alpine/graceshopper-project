const router = require("express").Router();

const {
  models: { Session, Order, OrderItem, Product, User },
} = require("../db");

router.post("/create", async (req, res, next) => {
  try {
    const session = await Session.create(req.body);
    res.json(session);
  } catch (err) {
    next(err);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    console.log("req body", req.body);
    const [session, created] = await Session.upsert(
      { id: req.body.id, userId: req.body.userId },
      {
        returning: true,
      }
    );
    res.json(session);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/cart", async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id);
    const userId = session.userId;
    let cart = await Order.findOne({
      where: {
        sessionId: req.params.id,
        status: "cart",
      },
      include: [
        Session,
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    if (cart) {
      //find pre-existing cart based on user id (LOGGED IN USER)
      const preExistingCart = await User.findOne({
        where: { id: userId },
        status: "cart",
        include: {
          model: Session,
          include: {
            model: Order,
            where: { status: "cart" },
            include: {
              model: OrderItem,
              include: [Product],
            },
          },
        },
      });

      // pre existing cart must exist
      if (preExistingCart) {
        console.log("PRE EXISTING CART", preExistingCart.sessions[0].orders[0]);
        if (
          preExistingCart.sessions[0].orders[0] &&
          preExistingCart.sessions[0].orders[0].id != cart.id
        ) {
          const sessionCartItems = cart.order_items;
          console.log("ERROR SESSION CART", sessionCartItems);
          console.log("CART", cart);
          await Promise.all(
            sessionCartItems.map(async (orderItem) => {
              //create new order item with same data and associate it with pre-existing cart
              console.log("ORDER ITEM", orderItem);
              await OrderItem.create({
                orderId: preExistingCart.sessions[0].orders[0].id,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              });
            })
          );

          cart.status = "merged";
          await cart.save();
          cart = preExistingCart.sessions[0].orders[0];
        }
      }
    }

    //if there is no cart for the given session, look for carts from other sessions
    if (!cart) {
      const user = await User.findOne({
        where: { id: userId },
        include: {
          model: Session,
          include: {
            model: Order,
            where: { status: "cart" },
            include: {
              model: OrderItem,
              include: [Product],
            },
          },
        },
      });

      if (user && user.sessions[0] && user.sessions[0].orders) {
        cart = user.sessions[0].orders[0];
      }
    }

    if (!cart) {
      res.send("No cart found");
    } else {
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
