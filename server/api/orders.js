const router = require("express").Router();

const {
  models: { Order, OrderItem, Product, Session, User },
} = require("../db");

router.post("/cartadd", async (req, res, next) => {
  try {
    // check if there is available quantity, if not throw an error
    const product = await Product.findByPk(req.body.productId);
    if (!product || product.quantity <= 0) {
      throw new Error("Product not available");
    }

    //see if the provided session ID has a user ID that matches the user ID used in authentication
    //if session ID does not have a user ID, skip this validation and let the user modify based solely on session ID (to allow for guest experience)
    const authToken = req.headers.authorization;
    const session = await Session.findByPk(req.body.sessionId);
    if (session.userId !== null) {
      const tokenUser = await User.findByToken(authToken);
      if (tokenUser.id !== session.userId) {
        throw new Error("Unauthorized");
      }
    }

    let cart;

    //see if there is a current cart for the provided session ID (only if user is logged in)
    if (session.userId != null) {
      cart = await User.findOne({
        where: { id: session.userId },
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
    } else {
      cart = await Order.findOne({
        where: { sessionId: session.id, status: "cart" },
      });
    }

    console.log("CART", cart);
    if (cart && cart.sessions && cart.sessions.length > 0) {
      cart = cart.sessions[0].orders[0];
    }

    if (cart && cart.sessions && cart.sessions.length == 0) {
      cart = null;
    }

    //if there is no cart, create one
    if (!cart) {
      cart = await Order.create({
        sessionId: req.body.sessionId,
        status: "cart",
      });
    }

    //check if there is an orderItem for the cart and provided product
    let orderItem = await OrderItem.findOne({
      where: {
        orderId: cart.id,
        productId: req.body.productId,
      },
    });

    //if there is an orderItem, increment the quantity
    if (orderItem) {
      await OrderItem.update(
        {
          quantity: orderItem.quantity + 1,
        },
        {
          where: {
            id: orderItem.id,
          },
        }
      );
    }

    //if there is no orderItem, create one and set the quantity to 1
    if (!orderItem) {
      orderItem = await OrderItem.create({
        orderId: cart.id,
        productId: req.body.productId,
        quantity: 1,
      });
    }

    //deduct 1 from the available quantity of the product
    await product.update({
      quantity: product.quantity - 1,
    });

    res.json({ cartId: cart.id });
  } catch (err) {
    next(err);
  }
});

router.post("/cartremove", async (req, res, next) => {
  try {
    //see if the provided session ID has a user ID that matches the user ID used in authentication
    //if session ID does not have a user ID, skip this validation and let the user modify based solely on session ID (to allow for guest experience)
    const authToken = req.headers.authorization;
    const session = await Session.findByPk(req.body.sessionId);
    if (session.userId !== null) {
      const tokenUser = await User.findByToken(authToken);
      if (tokenUser.id !== session.userId) {
        throw new Error("Unauthorized");
      }
    }

    let cart;

    //see if there is a current cart for the provided session ID (only if user is logged in)
    if (session.userId != null) {
      cart = await User.findOne({
        where: { id: session.userId },
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
    } else {
      cart = await Order.findOne({
        where: { sessionId: session.id, status: "cart" },
      });
    }

    console.log("CART", cart);
    if (cart && cart.sessions && cart.sessions.length > 0) {
      cart = cart.sessions[0].orders[0];
    }

    if (cart && cart.sessions && cart.sessions.length == 0) {
      cart = null;
    }

    //if there is no cart, throw an error
    if (!cart) {
      throw "no cart";
    }

    //if there is a cart, see if there is an orderItem for the cart and provided product
    let orderItem = await OrderItem.findOne({
      where: {
        orderId: cart.id,
        productId: req.body.productId,
      },
    });

    //if there is no orderItem, throw an error
    if (!orderItem) {
      throw "no orderItem";
    }

    //if there is an orderItem and the quantity is one, delete the orderItem
    if (orderItem.quantity === 1) {
      await OrderItem.destroy({
        where: {
          id: orderItem.id,
        },
      });
    }

    //if there is an orderItem and the quantity > 1, decrement the quantity
    if (orderItem.quantity > 1) {
      await OrderItem.update(
        {
          quantity: orderItem.quantity - 1,
        },
        {
          where: {
            id: orderItem.id,
          },
        }
      );
    }

    //add 1 to the available quantity of the product
    const product = await Product.findByPk(req.body.productId);
    await product.update({
      quantity: product.quantity + 1,
    });

    res.json({ cartId: cart.id });
  } catch (err) {
    next(err);
  }
});

//checkout cart
router.put("/checkout", async (req, res, next) => {
  // check if there is a current cart for the sessionId
  try {
    //see if the provided session ID has a user ID that matches the user ID used in authentication
    //if session ID does not have a user ID, skip this validation and let the user modify based solely on session ID (to allow for guest experience)
    const authToken = req.headers.authorization;
    const session = await Session.findByPk(req.body.sessionId);
    if (session.userId !== null) {
      const tokenUser = await User.findByToken(authToken);
      if (tokenUser.id !== session.userId) {
        throw new Error("Unauthorized");
      }
    }

    const cart = await Order.findOne({
      where: {
        sessionId: req.body.sessionId,
        status: "cart",
      },
    });

    // if went directly to /checkout no cart, throw error
    if (!cart) {
      throw new Error("No cart found for the provided session ID");
    }

    await cart.update({ status: "placed" });
    await cart.update({ completedAt: new Date() });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
