import mongoose from "mongoose";

const jeuSchema = new mongoose.Schema({
    title : { type : String, required : true},
    descrption : { type : String, required : true},
    nbJoueur : { type : Number, required : true},
    duration : { type : Number, required : true}
});

export const Jeu = mongoose.model('Jeu', jeuSchema)