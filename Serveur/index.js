const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');//Permet de creer des middlewares --> remplis la propriété req.body //sans ca on ne peut pas lire le req.body
//Un middleware permet d'améliorer l'efficacité des développeurs qui créent les applications. Il joue le rôle de lien entre les applications, les données et les utilisateurs.
const cookieParser = require('cookie-parser'); //Si on veut lire un cookie avec node js  il nous faut cookie-parser
const userRoutes = require('./routes/User');
const postRoutes = require('./routes/Post');
const  {checkUser,requireAuth} = require('./middleware/Login');
require('dotenv').config({path: './configurationDB/.env'}) /* Chemin pour dire ou sont les variables d'environnements */
const cors = require('cors');
const app = express();

//Connect to db
mongoose.connect(
	process.env.DB_CONNECT,
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
.then(() => console.log('Connected to db !'))
.catch((err) => console.log('Error', err));

const corsOption = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	'allowedHeaders': ['sessionId', 'Content-type'],
	'exposedHeaders': ['sessionId'],
	'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
	'preflightContinue': false
}

app.use(cors(corsOption));

//permet de lier le middleware niveau application à une instance de l’objet app object en utilisant les fonctions app.use
app.use(bodyParser.json()); //permet de lire le body
app.use(bodyParser.urlencoded({extended: true})); //C'est ce qui permet de faire transiter la data d'un point A à un point B . Permet de lire les URL
app.use(cookieParser()); //lire les cookies

//jwt
app.get('*', checkUser); // * veut dire n'importe quelle route
 //à chaque fois qu'on fait une requète on appelle cette méthode qui vérifie donc

//dès qu'un utilisateur ce connectera sur le site, on regarde si on connait son token et le connecte automatiquement.
app.get('/jwtid', requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id)
});

//routes
//Lorsque notre application reçoit une requête web, elle frappe d'abord app.use('/api', routes). Si la requête a été envoyée à un endpoint correspondant à quelque chose comme '/api/blah/blah',
//elle correspondra à app.use('/api', routes) et de là, sera acheminée vers notre routeur de sous-application, qui contient le reste de nos routes.
app.use('/api/user', userRoutes); //api ici sert pour le chemin
app.use('/api/post', postRoutes);

app.listen(4000, () => console.log('Server up and running'));