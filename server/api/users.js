const router = require("express").Router();
const {
  models: { User, Session, Order, OrderItem, Product },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    //see if the provided session ID has a user ID that matches the user ID used in authentication
    //if session ID does not have a user ID, skip this validation and let the user modify based solely on session ID (to allow for guest experience)
    const authToken = req.headers.authorization;
    const session = await Session.findByPk(req.headers.sessionid);
    if (session.userId !== null) {
      const tokenUser = await User.findByToken(authToken);
      if (tokenUser.id !== session.userId) {
        throw new Error("Unauthorized");
      }
    }


    const user = await User.findByPk(req.params.id, {
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ["id", "username", "isAdmin"],
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
      }
    });


    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/toggleAdmin", async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.body.sessionId);
    const user = await User.findByPk(session.userId);
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});
