
//les routes permet quand on a une requète de les transmettre aux fonctions appropriées du controleur
const router = require("express").Router(); 
const authController = require("../controlleur/Login");
const userController = require('../controlleur/User');
const uploadController = require('../controlleur/Upload');
const multer = require('multer');
const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout',authController.logout);

//user db
router.get('/',userController.getAllUsers);
router.get('/:id',userController.userInfo);
router.put("/:id",userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.patch('/follow/:id',userController.follow);
router.patch('/unfollow/:id',userController.unfollow);// Patch :permet de mettre a jour le tableau d'un utilisateur

//upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);



module.exports = router;