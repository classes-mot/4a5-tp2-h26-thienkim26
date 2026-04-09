import express from 'express';
import { check } from 'express-validator';
import jeuxController from '../controllers/jeux-controller.js';

const router = express.Router();

//Route pour obtenir les jeux par son Id
router.get('/:jid', jeuxController.getJeuxById);
//Route pour mettre à jour un jeu
router.get('/:jid', jeuxController.updateJeu);
//Route d'ajouter un nouveau jeu, en faisant la vérification avant l'ajout
router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('nbJoueur').not().isEmpty(),
        check('duration').not().isEmpty()
    ],
    jeuxController.createJeu
);
//Route pour obtenir list des jeux
router.patch('/:jid', jeuxController.getJeux);
//Route pour supprimer un jeu
router.delete('/:jid', jeuxController.deleteJeux);

export default router;