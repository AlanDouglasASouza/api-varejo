const service = require("../services/usersService.js");

exports.userControllers = {
    getUsers: async (req, res) => {
        const users = await service.get();

        if (users.error != null) {
            res.status(500).json({
                message: `Server error in the fetch process => ${users.error}`,
            });

            return;
        }

        res.status(200).json(users.data.response);
    },
    insertUser: async (req, res) => {
        const body = req.body;

        const createUser = await service.create(body);

        if (createUser.status > 300) {
            res.status(createUser.status).json({
                message: createUser.error,
            });

            return;
        }
        res.status(201).json({ message: "User created" });
    },
    updateUser: async (req, res) => {
        const body = req.body;
        body.id = req.params.id;

        const updateUser = await service.update(body);

        if (updateUser.status > 300) {
            res.status(updateUser.status).json({
                message: updateUser.error,
            });

            return;
        }
        res.status(204).send();
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;

        const delUser = await service.delete(id);

        if (delUser.status > 300) {
            res.status(delUser.status).json({
                message: `Server error in the fetch process => ${delUser.error}`,
            });
            console.error(delUser.error);

            return;
        }
        res.status(204).send();
    },
};
