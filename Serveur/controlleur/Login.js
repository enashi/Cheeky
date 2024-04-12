//Ici on gère tout ce qui est authentification d'un utilisateur -> création d'un compte...
const UserModel = require('../model/User');//on récupère notre schema
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utilitaire/errors.utils');

//On parle de la notion de token
//Token : chaque fois qu'il y a un requète qui est faite, l'utilisateur le présente à chaque fois au serveur,
//le serveur identifie ce token, avec la clé privée, il retrouve l'id de cette personne et peut confirmer si cette personne existe vraiment et que c'est bien elle
//cette fonction créer un token si on à une clé secrete

const maxAge = 9*24*60*60*1000; //nombre de temps que le cookie est valide 

const createToken = (id) =>{
	return jwt.sign({id},process.env.SECRET_TOKEN,{ //1er param : id de la personne qu'on veut, 2ème : clé secrete -> pour décoder ce token
		expiresIn : maxAge                                    //3eme param : Le nombre de temps que le cookie est valide 9jours ici 
	})
};

//req est un objet contenant des informations sur la requête HTTP qui a déclenché l'événement. En réponse à req, on utilise res pour renvoyer la réponse HTTP souhaitée.

//Fonction Inscription
module.exports.signUp = async(req,res) => {		//req.body sera composé de pseudo, email et password
	console.log(req.body);
	const {pseudo,email,password} = req.body	//On recupere les données contenu dans req.body et on les attribus à pseudo email password

	try{
		const user = await UserModel.create({pseudo, email,password});
		res.status(201).json({user : user._id});
	}
	catch(err){
		const errors = signUpErrors(err);
		res.status(200).send({errors })
	}
};

//Fonction Connexion
module.exports.signIn = async (req,res) => {	//req.body sera composé de email et password
	const {email,password} = req.body			//On recupere les données contenu dans req.body et on les attribus à email et password

	try {
		const user = await UserModel.login(email, password); //on recupère email et password dans la db et on stock dans user
		const token = createToken(user._id); //pour récupérer l'id de notre l'utilisateur --> créer un jeton unique, pour qu"il soit identifiable et pour savoir qui c'est
		res.cookie('jwt',token,{httpOnly: true, maxAge});//Premier param : c'est le nom du cookie, 2eme : le token, 3eme : les caractéristiques qu'aura cette mise en place, c'est pour la sécurité du token
		res.status(200).json({user: user._id})
	} catch (err){
		const errors = signInErrors(err);
		res.status(200).json({errors});
	}
};
	
//Fonction Logout
module.exports.logout = async (req,res) => {
	res.cookie('jwt','',{maxAge:1}); //pour que le cookie dure qu'1 ms
	res.redirect('/'); // c'est pour que la requète aboutisse
}