//Ici on gère toutes les erreurs possible, que ce soit avec les pseudos deja utlisé...

module.exports.signUpErrors = (err) => {
	let errors  = {pseudo :'',email: '', password :''}

	if(err.message.includes('pseudo'))
		errors.pseudo = "Pseudo incorrect / déjà pris";

	if(err.message.includes('email'))
		errors.email = 'Email incorrect';
			
	if(err.message.includes('password'))
		errors.password = 'mot de passe trop court';

	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
		errors.pseudo = "Ce pseudo est déjà pris";

	if (err.code === 11000  && Object.keys(err.keyValue)[0].includes("email"))
		errors.email = 'email déjà prise';
	return errors;
};

module.exports.signInErrors = (err) => {
	let errors = {email: '',password:''}
	
	if (err.message.includes('email')){
		errors.email = 'Email inconnu';
	} 	
		
	if (err.message.includes('password')){
		errors.password = 'Le mot de passe ne correspond pas';
	}	
	
	return errors;
};

module.exports.uploadErrors = (err) => {
	let errors = { format: '', maxSize: ""};
		
	if (err.message.includes('invalid file')){
		errors.format = "Format incompatabile";
	}
		
	if (err.message.includes('max size')){
		errors.maxSize = "Le fichier dépasse 500ko";
	}
		
	return errors;
};