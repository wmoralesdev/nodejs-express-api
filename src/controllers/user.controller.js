const userModel = require('../models/user.model');

exports.createUser = async (req, res) => {
    const { body } = req;

    try {
        // Logica de negocio
        const existingUser = await userModel.findOne({ email: body.email });

        // Fail fast (tomar en cuenta los escenarios especiales primero)
        if (existingUser)
            throw { message: 'User already exists' };

        const newUser = new userModel(body);
        await newUser.save();

        return res.status(201).json(newUser);
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(400).send(err);
    }
}

exports.getById = async (req, res) => {
    const { params } = req;
    
    try {
        const user = await userModel.findOne({ _id: params.id });

        return res.status(user ? 200 : 404).json(user);
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(400).send(err);
    }
}

exports.findByName = async (req, res) => {
    const { query } = req;
    
    try {
        const users = await userModel.find({ name: query.name });

        return res.status(users ? 200 : 404).json(users);
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(400).send(err);
    }
}

exports.getAllUsers = async (req, res) => {
    const { query } = req;
    const { page, limit } = query;
    
    const users = await userModel.find().limit(+(limit));

    return res.status(200).json(users);
}