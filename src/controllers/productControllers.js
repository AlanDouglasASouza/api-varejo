const service = require("../services/productService.js");

exports.productsControllers = {
    getProducts: async (req, res) => {
        const params = req.query;
        const products = await service.get(params);

        if (products.error != null) {
            res.status(500).json({
                message: `Server error in the fetch process => ${products.error}`,
            });

            return;
        }

        res.status(200).json(products.data.response);
    },
    insertProduct: async (req, res) => {
        const body = req.body;

        const createProduct = await service.create(body);

        if (createProduct.status > 300) {
            res.status(createProduct.status).json({
                message: createProduct.error,
            });

            return;
        }
        res.status(201).json({ message: "Product created" });
    },
    updateProduct: async (req, res) => {
        const body = req.body;
        body.id = req.params.id;

        const updateProduct = await service.update(body);

        if (updateProduct.status > 300) {
            res.status(updateProduct.status).json({
                message: updateProduct.error,
            });

            return;
        }
        res.status(204).send();
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id;

        const delProduct = await service.delete(id);

        if (delProduct.status > 300) {
            res.status(delProduct.status).json({
                message: `Server error in the fetch process => ${delProduct.error}`,
            });
            console.error(delProduct.error);

            return;
        }
        res.status(204).send();
    },
};
