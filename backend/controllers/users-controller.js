import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existantUser;

    try {
        existantUser = await User.findOne({email: email});
    } catch (err) {
        console.error(err);
        const error = new HttpError('Enregistrement échouée...', 500);
        return next(error);
    }
    if(existantUser) {
        res.status(422).json({message : 'Cet courriel a déjà été pris.'});
        return;
    }

    const creerUser = new User ({
        name, email, password, jeux
    });

    try {
        await creerUser.save()
    } catch (err) {
        console.error(err);
        const error = new HttpError('Enregistrement échouée..', 500);
        return next(error);
    }
    console.log('Enregistrer!');
    res.status(201).json({ user : creerUser.toObject({getters : true}) });
};