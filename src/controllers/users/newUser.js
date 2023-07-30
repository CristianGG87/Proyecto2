const insertUserModel = require('../../models/users/insertUserModel');

const newUser = async (req, res, next) => {
    try {
        //obtenemos los datos necesarios del body.
        const { userName, email, password } = req.body;

        // si falta algún campo lanzamos un error.
        if (!userName || !email || !password) {
            const err = new Error('Faltan campos por rellenar');
            err.httpStatus = 400;
            throw err;
        }

        // Inseertamos el usuario.
        await insertUserModel(userName, email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
