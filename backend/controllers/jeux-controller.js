import { Jeu } from '../models/jeu.js';
import { User } from '../models/user.js';

//Post
export const ajoutJeu = async (req, res, next) => {
    const userId = req.userData.userId;
    //Validation des champs
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return next( new HttpError('Données saisies invalides, veuillez bien vérifier..', 422));
    }

    //Extraction des données
    const { title, description, nbJoueur, duration } = req.body;

    //Création de l'objet Mongoose
    const ajoutJeu = new Jeu({
        title,
        description,
        nbJoueur,
        duration,
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
        await ajoutJeu.save();
        user.jeux.push(ajoutJeu);
        await user.save();
    } catch (e) {
        console.log(e.message);
        const err = new HttpError('Création dans la BD échouée..', 500);
        return next(err);
    }

    res.status(201).json({ jeu: ajoutJeu });
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

//Supprimer Jeu