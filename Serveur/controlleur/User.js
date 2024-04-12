//Cette classe permet comme son nom l'indique de controler l'utilisateur. On peut supprimer/avoir des infos/Follow...
const UserModel = require('../model/User');
const ObjectID = require('mongoose').Types.ObjectId; //MongoDB crée par défaut une propriété _id sur chaque document qui est de type ObjectId. On l'utilise souvent pour vérifier si une id est correct ou non

//Fonction Affichage Utilisateurs
module.exports.getAllUsers = async (req, res) => {
	const users = await UserModel.find().select('-password'); //on cherche dans la table (avec UserModel) il cherche (find) et il prend tout (select) sans les mot de passe (-password)
	res.status(200).json(users);
}

//Fonction Information Utilisateur
module.exports.userInfo = (req, res) => {
	//.params ce sont les paramètre qu'on met dans l'url -> permet de voir l'id qu'on a mis
	//Ce qu'on peut remplir dans les formulaires comme les inputs la ca serait req.body
	//sinon c'est des paramètres dans l'url donc la c'est req.params
	if (!ObjectID.isValid(req.params.id)) //On vérifie si l'id de l'utilisateur passé en parametre, req.params, existe
		return res.status(400).send('ID unknow : ' + req.params.id)

	UserModel.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs); //s'il n'y a pas d'erreurs alors on envoit les données (ici l'id)
		else console.log('ID unknow : ' + err);
	}).select('-password');
};

module.exports.updateUser = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))   //On vérifie si l'id de l'utilisateur passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await UserModel.findOneAndUpdate(   //recherche l'utilisateur dont l'id est passé en parametre, req.params, et on le met à jour
			{ _id: req.params.id },
			{
				$set: {
					bio: req.body.bio,      //bio prend la valeur de bio qui se trouve dans le req.body
				},
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				if (err) return res.status(500).send({ message: err });
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

module.exports.deleteUser = async (req, res) => {

	if (!ObjectID.isValid(req.params.id))   //On vérifie si l'id de l'utilisateur passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await UserModel.remove({ _id: req.params.id }).exec();  //retire l'utilisateur dont l'id correspond à celui passé en parametre, req.params
		res.status(200).json({ message: "Bien supprimé" });

	} catch (err) {
		return res.status(500).json({ message: err });
	}

};

//Fonction Abonnement
module.exports.follow = async (req, res) => {
	if (
		!ObjectID.isValid(req.params.id) || //On vérifie si l'id de l'utilisateur passé en parametre, req.params, existe
		!ObjectID.isValid(req.body.idToFollow)  //On vérifie si l'id de l'utilisateur qu'on veut follow passé en parametre, req.body, existe
	)
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		// on ajoute à la liste des followers
		await UserModel.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { following: req.body.idToFollow } },//$addToSet est un opérateur qui ajoute dans une liste la valeur. Si la valeur est déjà présente, ca ne fait rien
			{ new: true, upsert: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs);
				else return res.status(400).json(err);
			}
		);

		//la on ajoute dans la personne qui vient de se faire follow, son nouvel abonné
		await UserModel.findByIdAndUpdate(
			req.body.idToFollow,
			{ $addToSet: { followers: req.params.id } },
			{ new: true, upsert: true },
			(err, docs) => {
				if (err) return res.status(400).json(err);
			}
		)

	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

//Fonction Desabonnement
module.exports.unfollow = async (req, res) => {
	if (
		!ObjectID.isValid(req.params.id) || //On vérifie si l'id de l'utilisateur passé en parametre, req.params, existe
		!ObjectID.isValid(req.body.idToUnFollow)    //On vérifie si l'id de l'utilisateur qu'on veut unfollow passé en parametre, req.body, existe
	)
		return res.status(400).send("ID unknown : " + req.params.id + " " + req.body.idToUnfollow);

	try {
		// on retire à la liste des followers
		await UserModel.findByIdAndUpdate(
			req.params.id,
			{ $pull: { following: req.body.idToUnFollow } }, //pull c'est une méthode qui permet de retirer
			{ new: true, upsert: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs);
				else return res.status(400).json(err);
			}
		);

		//On retire dans l'autre utilisateur l'utilisateur qui ne le follow plus
		await UserModel.findByIdAndUpdate(
			req.body.idToUnFollow,
			{ $pull: { followers: req.params.id } },//pull retire un élément de la liste
			{ new: true, upsert: true },
			(err, docs) => {
				if (err) return res.status(400).json(err);
			}
		)

	} catch (err) {
		return res.status(500).json({ message: err });
	}

};
