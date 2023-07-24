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
      },
      include: [
        Session,
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

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

router.get("/:id/merge", async (req, res, next) => {
  try {
    const currentSessionId = req.params.id; // id of current session
    const currentCart = await Order.findOne({
      // looks for cart associated with
      where: {
        sessionId: currentSessionId,
      },
      include: {
        model: OrderItem,
      },
    });

    // no cart found returns 404
    if (!currentCart) {
      return res.status(404).json({ message: "Current cart not found" });
    }

    // gets productId of the cart items and maps them
    const currentCartItems = currentCart.orderItems.map(
      (item) => item.productId
    );

    const session = await Session.findByPk(currentSessionId);
    const userId = session.userId;

    // look for users existing cart
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Session,
        include: {
          model: Order,
          where: { status: "cart" },
          include: {
            model: OrderItem,
          },
        },
      },
    });

    if (!user || !user.sessions[0] || !user.sessions[0].orders[0]) {
      // User has no existing cart, no need to merge
      return res.json({ message: "No existing cart to merge" });
    }

    const existingCart = user.sessions[0].orders[0];
    const existingCartItems = existingCart.orderItems.map(
      (item) => item.productId
    );

    // Merge the cart items
    const mergedCartItems = [
      ...new Set([...currentCartItems, ...existingCartItems]),
    ];

    // Remove the current cart
    await Order.destroy({
      where: {
        sessionId: currentSessionId,
      },
    });

    // Create a new cart with the merged cart items
    const mergedCart = await Order.create({
      sessionId: currentSessionId,
      status: "cart",
    });

    // Add the merged cart items to the new cart
    await OrderItem.bulkCreate(
      mergedCartItems.map((productId) => ({
        orderId: mergedCart.id,
        productId,
        quantity: 1,
      }))
    );

    res.json({ message: "Carts merged successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
