import express from 'express';
import usersController from "../controllers/users-controller.js";

const router = express.Router();

//Route à l'inscription
router.post('/register', usersController.registerUser);
//Route au connexion
router.post('/login', usersController.login);

export default router;
