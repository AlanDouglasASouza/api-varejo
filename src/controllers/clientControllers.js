const service = require("../services/clientService.js");

exports.clientControllers = {
    getClients: async (req, res) => {
        const clients = await service.get();

        if (clients.error != null) {
            res.status(500).json({
                message: `Server error in the fetch process => ${clients.error}`,
            });

            return;
        }

        res.status(200).json(clients.data.response);
    },
    insertClient: async (req, res) => {
        const body = req.body;

        const createClient = await service.create(body);

        if (createClient.status > 300) {
            res.status(createClient.status).json({
                message: createClient.error,
            });

            return;
        }
        res.status(201).json({ message: "Client created" });
    },
    updateClient: async (req, res) => {
        const body = req.body;
        body.id = req.params.id;

        const updateClient = await service.update(body);

        if (updateClient.status > 300) {
            res.status(updateClient.status).json({
                message: updateClient.error,
            });

            return;
        }
        res.status(204).send();
    },
    deleteClient: async (req, res) => {
        const id = req.params.id;

        const delClient = await service.delete(id);

        if (delClient.status > 300) {
            res.status(delClient.status).json({
                message: `Server error in the fetch process => ${delClient.error}`,
            });
            console.error(delClient.error);

            return;
        }
        res.status(204).send();
    },
};
