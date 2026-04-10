import express from 'express';
import jeuxRoutes from './backend/routes/jeux-routes.js';
import usersRoutes from './backend/routes/users-routes.js';
import errorHandler from './backend/handler/error-handler.js';

const app = express();
app.use(express.json());

//Routes utilisées
app.use('/api/jeux', jeuxRoutes);
app.use('/api/users', usersRoutes);
//Route manquant
app.use((req, res, next) => {
    const error = new Error("La route n'est pas trouvée..");
    error.code = 404;
    next(error);
})

//Erreurs globals
app.use(errorHandler);

//Démarrage sur le port 5000
app.listen(5000, () => {
    console.log("Le serveur écoute au", `http://localhost:5000`);
});