const service = require("../services/index.js");

exports.orderControllers = {
    getOrders: async (req, res) => {
        const orders = await service.get();

        if (orders.error != null) {
            res.status(500).json({
                message: `Server error in the fetch process => ${orders.error}`,
            });

            return;
        }

        res.status(200).json(orders.data.response);
    },
    insertOrder: async (req, res) => {
        const body = req.body;

        const createOrder = await service.create(body);

        if (createOrder.status > 300) {
            res.status(createOrder.status).json({
                message: createOrder.error,
            });

            return;
        }
        res.status(201).json({ message: "User created" });
    },
};
