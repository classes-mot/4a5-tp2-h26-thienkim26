import HttpError from '../util/http-error.js';
import { Jeu } from '../models/jeu.js';
import { User } from '../models/user.js';
import { validationResult } from 'express-validator';

//Post
export const createJeu = async (req, res, next) => {
    const userId = req.userData.userId;
    //Validation des champs
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return next( new HttpError('Données saisies invalides, veuillez bien vérifier..', 422));
    }

    //Extraction des données
    const { title, description, nbJoueur, duration } = req.body;

    //Création de l'objet Mongoose
    const createJeu = new Jeu({
        title,
        description,
        nbJoueur,
        duration,
        owner: userId
    });

    //Vérifier si l'utilisateur existe
    let user;

    try {
        user = await User.findById(userId);
    } catch (e) {
        console.log(e);
        const err = new HttpError('Une erreur BD est survenue', 500);
        return next(err);
    }

    if(!user) {
        const err = new HttpError('Utilisateur non trouvé', 404);
        return next(err);
    }

    //Sauvegard dans MongoDB
    try {
        await createJeu.save();
        user.jeux.push(createJeu);
        await user.save();
    } catch (e) {
        console.log(e.message);
        const err = new HttpError('Création dans la BD échouée..', 500);
        return next(err);
    }

    res.status(201).json({ jeu: createJeu });
};

//Get all jeux
const getJeux = async (req, res, next) => {
    let jeux;

    try {
        jeux = await Jeu.find().populate('owner', '-password');
    } catch (e) {
        console.log(e);
        const err = new HttpError('Erreur BD est arrivé..', 500);
        return next(err);
    }

    res.json({
        jeux : jeux.map((jeu) => jeu.toObject({ getters : true })),
    });
};

//Get jeu id
const getJeuById = async (req, res, next) => {
    const jeuId = req.params.jid;

    let jeu;

    try {
        jeu = await Jeu.findById(jeuId);
    } catch (e) {
        console.log(e);
        const err = new HttpError('Erreur BD est arrivé..', 500);
        return next(err);
    }
}

//Patch MAJ Jeu
export const updateJeu = async ( req, res, next) => {
    const jeuId = req.params.jid;
    const jeuUpdates = req.body;

    try {
        const updateJeu = await Jeu.findByIdAndUpdate(jeuId, jeuUpdates, {
            new: true,
        });

        if (!updateJeu) {
            return res.status(404).json({message : "Le jeu n'est pas trouvé.."});
        }

        res.status(200).json({
            jeu : updateJeu.toObject({ getters : true }),
        });
    } catch (err) {
        res.status(500).json({message : 'Erreur a lieu lors de la mise à jour du jeu..'});
    }
};

//Supprimer Jeu
const deleteJeu = async (req, res, next) => {
    const jeuId = req.params.jid;

    try {
        const jeu = await Jeu.findById(jeuId).populate('owner');
        if (!jeu) {
            return res.status(404).json({ message : "Le jeu n'est pas trouvé.." });
        }

        await jeu.deleteOne();

        jeu.owner.jeux.pull(jeu._id);
        await jeu.owner.save();

        res.status(200).json({ message : 'Le jeu a été supprimé.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message : 'Erreur a eu lieu lorsque le jeu a été supprimer..' })
    }
};

export default {
    createJeu,
    getJeux,
    getJeuById,
    updateJeu,
    deleteJeu,
};