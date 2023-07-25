const router = require("express").Router();
const { models } = require("../db");
const { User, Order, Product, OrderItem, Session } = models;

// Middleware to authenticate users based on token in request headers
async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    try {
      const user = await User.findByToken(token);
      console.log(user.username);
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

// Middleware to restrict access to admin users only
function adminOnly(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
}

router.use(authenticateUser);

// Get all users (admin only)
router.get("/users", adminOnly, async (req, res, next) => {
  try {
    //get all users
    const users = await User.findAll({
      attributes: ["id", "username", "isAdmin"],
      include: [
        {
          model: Session,
          attributes: ["id", "createdAt", "updatedAt"],
          include: [
            {
              model: Order,
              attributes: ["status", "completedAt", "createdAt", "updatedAt"],
              include: [
                {
                  model: OrderItem,
                  attributes: ["quantity"],
                  include: [
                    {
                      model: Product,
                      attributes: [
                        "name",
                        "price",
                        "image_url",
                        "description",
                        "category",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get user by ID (admin only)
router.get("/users/:id", adminOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "isAdmin", "email", "phone"],
      include: [
        {
          model: Session,
          attributes: ["id", "createdAt", "updatedAt"],
          include: [
            {
              model: Order,
              attributes: [
                "id",
                "status",
                "completedAt",
                "createdAt",
                "updatedAt",
              ],
              include: [
                {
                  model: OrderItem,
                  attributes: ["id", "quantity", "createdAt", "updatedAt"],
                  include: [
                    {
                      model: Product,
                      attributes: [
                        "id",
                        "name",
                        "price",
                        "image_url",
                        "description",
                        "category",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Get products in cart of user by ID (admin only)
router.get("/users/:id/cart", adminOnly, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.id, status: "cart" },
      include: [
        {
          model: OrderItem,
          attributes: ["quantity"],
          include: [
            {
              model: Product,
              attributes: [
                "name",
                "price",
                "image_url",
                "description",
                "category",
              ],
            },
          ],
        },
      ],
    });
    if (!order) {
      res.sendStatus(404);
      return;
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
