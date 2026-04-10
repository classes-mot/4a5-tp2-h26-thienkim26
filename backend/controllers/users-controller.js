import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

//Inscription des novueaux utilisateurs
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    //Try et catch, si l'utilisateur exist déjà via le courriel
    let existantUser;

    try {
        existantUser = await User.findOne({email: email});
    } catch (err) {
        console.error(err);
        const error = new HttpError('Enregistrement échouée, veuillez réessayer..', 500);
        return next(error);
    }
    if(existantUser) {
        res.status(422).json({message : 'Cet courriel a déjà été pris.'});
        return;
    }

    //Try et catch : la création d'un nouveau utilisateur 
    // avec un message d'erreur et un message de succès
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

const connexion = async ( req, res, next) => {
    const {email, password} = req.body;

    let existantUser;

    try {
        existantUser = await User.findOne({ email : email});
    } catch (err) {
        console.error(err);
        const error = new HttpError('Connexion échouée, veuillez réessayer..', 401);
        return next(error);
    }

    if(!existantUser || existantUser.password !== password) {
        const error = new HttpError('Veuillez vérifier votre courriel ou votre mot de passe..', 401);
        return next(error);
    }
};