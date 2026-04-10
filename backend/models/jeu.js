import mongoose from "mongoose";

const jeuSchema = new mongoose.Schema({
    title : { type : String, required : true},
    description : { type : String, required : true},
    nbJoueur : { type : Number, required : true},
    duration : { type : Number, required : true},
    owner : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User',
    },
});

export const Jeu = mongoose.model('Jeu', jeuSchema)