const jwt = require('jsonwebtoken');
const UserModel = require ('../model/User');

//Fonction qui test si l'utilisateur est bien connecté
//Pour voir si tout au long de sa navigation sur le site, à chaque page, on fait un middlware. On regarde le token de l'utilisateur pour voir si on le connait

module.exports.checkUser = (req,res,next)  =>{//le next est important, car après l'execution de la middleware, il faut qu'on continue
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,async(err,decodedToken) =>{
            if(err){
                res.locals.user = null;
                next();
            }else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }

};

//il faut un middleware pour la premiere fois qu'on se connecte
   
module.exports. requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,async(err,decodedToken) =>{
            if(err){
                console.log(err); //on s'arrete la, on voit qu'il y a une erreur donc on arrete
            } else {
                console.log(decodedToken.id); 
                next();
            }
        });
    } else {
        console.log('pas de token');
    }

}