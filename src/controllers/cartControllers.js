const service = require("../services/cartService.js");

exports.cartControllers = {
    getCarts: async (req, res) => {
        const id = req.params.id;
        const carts = await service.get(id);

        if (carts.error != null) {
            res.status(500).json({
                message: `Server error in the fetch process => ${carts.error}`,
            });

            return;
        }

        res.status(200).json(carts.data.response);
    },
    insertCarts: async (req, res) => {
        const body = req.body;

        const createCart = await service.create(body);

        if (createCart.status > 300) {
            res.status(createCart.status).json({
                message: createCart.error,
            });

            return;
        }
        res.status(201).json({ message: "User created" });
    },
    getTotalCart: async (req, res) => {
        const id = req.params.id;

        const getTotalCart = await service.getQuantity(id);

        if (getTotalCart.status > 300) {
            res.status(getTotalCart.status).json({
                message: getTotalCart.error,
            });

            return;
        }
        res.status(200).send(getTotalCart.data.response);
    },
    getTotalPrice: async (req, res) => {
        const id = req.params.id;

        const getTotalPrice = await service.getTotalPrice(id);

        if (getTotalPrice.status > 300) {
            res.status(getTotalPrice.status).json({
                message: getTotalPrice.error,
            });

            return;
        }
        res.status(200).send(getTotalPrice.data.response);
    },
    deleteCart: async (req, res) => {
        const id = req.params.id;

        const delCart = await service.delete(id);

        if (delCart.status > 300) {
            res.status(delCart.status).json({
                message: `Server error in the fetch process => ${delCart.error}`,
            });
            console.error(delCart.error);

            return;
        }
        res.status(204).send();
    },
};
