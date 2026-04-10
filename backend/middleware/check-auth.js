import jwt from 'jsonwebtoken';
import HttpError from '../util/http-error.js';

//Valider le jeton
const checkAuth = (req, res, next) => {
    try {
        // Gérer bug avec les requêtes de type OPTION
        if(req.method === 'OPTIONS'){
            return next();
        }
        const token = req.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN'
        if(!token){
            throw new Error("Erreur d'authentification..");
        }
        const decodedaToken = jwt.verify(token, 'cleSuperSecrete!');
        req.userData = { userId : decodedaToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Erreur d'authentification..", 401);
        return next(error);
    }
};

export default checkAuth;