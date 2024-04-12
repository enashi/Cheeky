//UserModel permet de voir comment ce compose un utilisateur avec son mail/pseudo... tout ce qui compose un utilisateur

const mongoose = require('mongoose');
const { isEmail } = require('validator'); //permet de confirmer que c'est une adresse mail valide.
const bcrypt = require('bcrypt');//Permet de rendre le mot de passe impossible à lire pour un utlisateur random qui cherche a voir le mot de passe de quelqu'un. C'est pour plus de sécurité

const userSchema = new mongoose.Schema(
    //Schema permet de créer un "schéma" de données qui contient les champs qu'on veut avoir. Ici pour un utilisateur
    //Avec mongoose, on pas besoin d'insérer un champ id. Mongoose le fait tout seul.
    //A la fin on exporte ce schema pour qu'il puisse être utiliser par les autres classes.
    {
      
        pseudo : {
            type: String,
            required : true,
            minLength :3,
            maxLength :55,
            unique: true,
            trim:  true   /*  Ca permet de supprimer les espaces à la fin du speudo : Alex__ -> Alex */
        },

        email: {
            type: String,
            required : true,
            validate : [isEmail],
            lowercase: true,
            trim: true,
            unique : true,
        },

        password:{
            type: String,
            required: true,
            max: 1024,
            minlength: 4
        },

        picture :{
            type : String,
            default: "./uploads/profil/random-user.png"
        },

        bio: {
            type : String,
            max : 1024,    
        },

        followers: {
            type: [String]
        },

        following: {
            type: [String]
        },

        likes: {
            type :[String]
        }
    },
    {
        timestamps: true,  //C'est pour voir quand l'utilisateur c'est connecté

    }
);

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
}); //permet de rendre le mdp anonyme avant la save des données (le .pre permet de faire ca). 
//bcrypt est une bibliothèque qui va rendre le mdp incompréhensible pour nous avec des caractères spéciaux 

//Cette fonction permet que quand on se log, de retranscrire notre mdp en quelque chose de compréhensible pour pouvoir comparer avec le mot de passe tapé par l'utilisateur pour le login
//Si c'est la même chose alors il peut se connecter sinon y a une erreur
userSchema.statics.login = async function(email,password){ //quand on va tenter de ce loger, on recup l'email et le password
    const user = await this.findOne({email}); //les emails sont uniques donc on cherche dans la db l'email correspondante
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if (auth) {
            return user;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Email incorrect')
};

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;