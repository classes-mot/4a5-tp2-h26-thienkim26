import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async ()=> {
    if (isConnected) return;

    let uri = 'mongodb://localhost:27017/Tp2-Nguyen';

    try{
        await mongoose.connect(uri);
        isConnected = true;
        console.log('La connexion à la BD est réussie!');
    } catch (err) {
        console.log('Erreur lors de la connexion BD', err);
        process.exit(1);
    }
};