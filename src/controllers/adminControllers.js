const service = require("../services/adminService.js");

exports.adminControllers = {
    getAdmins: async (req, res) => {
        const admins = await service.get();

        if (admins.error != null) {
            res.status(500).json({
                message: `Server error in the fetch process => ${admins.error}`,
            });

            return;
        }

        res.status(200).json(admins.data.response);
    },
    insertAdmin: async (req, res) => {
        const body = req.body;

        const createAdmin = await service.create(body);

        if (createAdmin.status > 300) {
            res.status(createAdmin.status).json({
                message: createAdmin.error,
            });

            return;
        }
        res.status(201).json({ message: "User created" });
    },
    updateAdmin: async (req, res) => {
        const body = req.body;
        body.id = req.params.id;

        const updateAdmin = await service.update(body);

        if (updateAdmin.status > 300) {
            res.status(updateAdmin.status).json({
                message: updateAdmin.error,
            });

            return;
        }
        res.status(204).send();
    },
    deleteAdmin: async (req, res) => {
        const id = req.params.id;

        const delAdmin = await service.delete(id);

        if (delAdmin.status > 300) {
            res.status(delAdmin.status).json({
                message: `Server error in the fetch process => ${delAdmin.error}`,
            });
            console.error(delAdmin.error);

            return;
        }
        res.status(204).send();
    },
};
