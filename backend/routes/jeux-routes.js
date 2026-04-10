import express from 'express';
import { check } from 'express-validator';
import jeuxController from '../controllers/jeux-controller.js';

const router = express.Router();

//Route d'ajouter un nouveau jeu, en faisant la vérification avant l'ajout
router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 10 }),
        check('nbJoueur').not().isEmpty(),
        check('duration').not().isEmpty()
    ],
    jeuxController.createJeu
);

//Route pour obtenir list des jeux
router.get('/', jeuxController.getJeux);
//Route pour obtenir les jeux par son Id
router.get('/:jid', jeuxController.getJeuById);

//Route pour mettre à jour un jeu
router.patch('/:jid', jeuxController.updateJeu);
//Route pour supprimer un jeu
router.delete('/:jid', jeuxController.deleteJeu);

export default router;