const postModel = require("../model/Post");
const PostModel = require("../model/Post");
const UserModel = require('../model/User');
const { uploadErrors } = require("../utilitaire/errors.utils")
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const ObjectID = require('mongoose').Types.ObjectId;//Permet de vérifier que le paramètre, req.params, qu'on passe existe dans notre db

//Fonction Affichage Post
module.exports.readPost = (req, res) => {
	PostModel.find((err, docs) => {		//Cherche les posts
		if (!err) res.send(docs);		//Si on trouve les posts on revoie un document contenant les posts
		else console.log('Error to get data : ' + err);		//Sinon on envoie une erreur
	}).sort({ createdAt: -1 }); //ca va prendre les messages du plus récent au plus anciens
};

//Fonction Nouveau Post
module.exports.createPost = async (req, res) => {
	const newPost = new postModel({		//On crée un nouveau post contenant l'identifiant de celui qui va le poster, ainsi que le message à poster
		posterId: req.body.posterId,
		message: req.body.message,
		likers: [],						//On met les listes des j'aimes et des commentaires à vide à la création
		comments: [],
	});

	try {
		const post = await newPost.save();	//await permet d'attendre la résolution de newPost.save()
		return res.status(201).json(post);	//si le await renvoie le post attendu, on renvoie un json du post
	} catch (err) {
		return res.status(400).send(err);	//si le await ne renvoie pas le post attendu, la résolution de newPost.save() est rejetée, alors on renvoie une erreur
	}
};

//Fonction Modification Post
module.exports.updatePost = (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	const updatedRecord = {
		message: req.body.message	//message prend la valeur du message dans le req.body
	}
	
	PostModel.findByIdAndUpdate(	//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
		req.params.id,
		{ $set: updatedRecord },	//revient à ecrire {$set : {message: req.body.message}}
		{ new: true },
		(err, docs) => {
			if (!err) res.send(docs);
			else console.log("Update error : " + err);
		}
	)
};

//Fonction Suppression Post
module.exports.deletePost = (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	PostModel.findByIdAndRemove(req.params.id, (err, docs) => {	//recherche le post dont l'id est passé en parametre et on le supprime
		if (!err) res.send(docs);
		else console.log("Delete error : " + err);
	});
};

//Fonction Aimer Un Post
module.exports.likePost = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await PostModel.findByIdAndUpdate(	//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
			req.params.id,
			{
				$addToSet: { likers: req.body.id },		//Ajoute à la liste des j'aimes du post l'id de l'utilisateur qui a aimé le post
			},
			{ new: true },
			(err, docs) => {
				if (err) return res.status(400).send(err);
			}
		);
		await UserModel.findByIdAndUpdate(	//recherche l'utilisateur dont l'id est passé dans le req.body et on le met à jour
			req.body.id,
			{
				$addToSet: { likes: req.params.id },	//Ajoute à la liste des j'aimes de l'utilisateur l'id du post qu'il a aimé
			},
			{ new: true },
			(err, docs) => {
				if (!err) res.send(docs);
				else return res.status(400).send(err);
			}
		);
	} catch (err) {		//Si l'un ou les deux await sont rejetées, on renvoie une erreur
		return res.status(400).send(err);
	}
};

//Fonction Ne Plus Aimer Un Post
module.exports.unlikePost = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await PostModel.findByIdAndUpdate(	//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
			req.params.id,
			{
				$pull: { likers: req.body.id },	//Retire à la liste des j'aimes du post l'id de l'utilisateur qui a aimé le post
			},
			{ new: true },
			(err, docs) => {
				if (err) return res.status(400).send(err);
			}
		);
		await UserModel.findByIdAndUpdate(	//recherche l'utilisateur dont l'id est passé dans le req.body et on le met à jour
			req.body.id,
			{
				$pull: { likes: req.params.id }, //Retire à la liste des j'aimes de l'utilisateur l'id du post qu'il a aimé
			},
			{ new: true },
			(err, docs) => {
				if (!err) res.send(docs);
				else return res.status(400).send(err);
			}
		);
	} catch (err) {		//Si l'un ou les deux await sont rejetées, on renvoie une erreur
		return res.status(400).send(err);
	}
};

//Fonction Commenter Un Post
module.exports.commentPost = (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);


	try {
		return PostModel.findByIdAndUpdate(		//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
			req.params.id,
			{
				$push: {						//Ajoute à la liste des commentaires,
					comments: {
						commenterId: req.body.commenterId,		//L'id de l'utilisateur qui commente 
						commenterPseudo: req.body.commenterPseudo,	//Le pseudo de l'utilisateur qui commente
						text: req.body.text,					//Le commentaire 
						timestamp: new Date().getTime()			//La date de la création du commentaire
					}
				}
			},
			{ new: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				else return res.status(400).send(err);
			}
		);
	} catch (err) {
		return res.status(400).send(err);
	}
};


//Fonction Modification Commentaire
module.exports.editCommentPost = (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
	  return res.status(400).send("ID unknown : " + req.params.id);
  
	try {
	  	return PostModel.findById(req.params.id, (err, docs) => {	//recherche le post dont l'id est passé en parametre, req.params
			const theComment = docs.comments.find((comment) =>		//recherche le commentaire dont l'id correspond à l'id du commentaire passé dans le req.body
		  		comment._id.equals(req.body.commentId)
			);  
		 	
			//theComment c'est TOUT le commentaire (donc l'id utilisateur,pseudo,text...)
		 	//la on prend que le texte
			if (!theComment) return res.status(404).send("Comment not found");
			theComment.text = req.body.text;	//On remplace le texte du commentaire dans la base de donnée par le texte passé dans le req.body
  
			return docs.save((err) => {
		  		if (!err) return res.status(200).send(docs);
		  			return res.status(500).send(err);
			});
	  	});
	} catch (err) {
	  	return res.status(400).send(err);
	}
};

//Fonction Suppression Commentaire
module.exports.deleteCommentPost = (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
	  	return res.status(400).send("ID unknown : " + req.params.id);
  
	try {
	  	return PostModel.findByIdAndUpdate(		//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
			req.params.id,
			{
		 		$pull: {
					comments: {
			  			_id: req.body.commentId,	//Retire le commentaire dont l'id correspond à l'id passé dans le req.body
					},
		  		},
			},
			{ new: true },
			(err, docs) => {
		  		if (!err) return res.send(docs);
		  		else return res.status(400).send(err);
			}
	  	);
	} catch (err) {
	  	return res.status(400).send(err);
	}
};

//Fonctionnalite Fakenews
module.exports.fakePost = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		PostModel.findByIdAndUpdate(	//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
			req.params.id,
			{
				$addToSet: { fake: req.body.id },		//Ajoute à la liste des fake du post l'id de l'utilisateur qui a aimé le post
			},
			{ new: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				else return res.status(400).send(err);
			}
		)
	} catch (err) {		//Si l'un ou les deux await sont rejetées, on renvoie une erreur
		return res.status(400).send(err);
	}
};

module.exports.unfakePost = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))	//On vérifie si l'id du post passé en parametre, req.params, existe
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		PostModel.findByIdAndUpdate(	//recherche le post dont l'id est passé en parametre, req.params, et on le met à jour
			req.params.id,
			{
				$pull: { fake: req.body.id },		//Ajoute à la liste des fake du post l'id de l'utilisateur qui a aimé le post
			},
			{ new: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				else return res.status(400).send(err);
			}
		)
	} catch (err) {		//Si l'un ou les deux await sont rejetées, on renvoie une erreur
		return res.status(400).send(err);
	}
};