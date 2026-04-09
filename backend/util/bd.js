import moogoose from "mongoose";

let isConnected = false;

export const connectDB = async ()=> {
    if (isConnected) return;

    let uri = '';

    try{
        await mongoose.connect(uri);
        isConnected = true;
        console.log('La connexion à la BD est réussie!');
    } catch (err) {
        console.log('Erreur lors de la connexion BD', err);
        process.exit(1);
    }
};