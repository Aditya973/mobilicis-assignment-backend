const express = require('express');
const userController = require('../controllers/user-controller');
const profileController = require('../controllers/profile-controller')
const experienceController = require('../controllers/experience-controller');
const certificateController = require('../controllers/certificate-controller')
const educationController = require('../controllers/education-controller');

const { AuthRequestValidator, IsAdminRequestValidator} = require('../middlewares/index')
const router = express.Router();

//signUp and login routes
router.post('/signup',AuthRequestValidator.validateUserAuth,userController.signUp);
router.post('/login',AuthRequestValidator.validateUserAuth,userController.signIn);

//add and remove connections routes
router.post('/connect/:userId',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,userController.connect);
router.post('/disconnect/:userId',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,userController.disconnect);

//user routes
router.get('/user/:id',userController.get);
router.delete('/user/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAdmin,userController.destroy);
router.patch('/user/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,userController.update);

//profile routes
router.post('/profile',profileController.create);
router.get('/profile/:userId',profileController.getByUserId);
router.patch('/profile/:id',profileController.update);

//auth routes
router.get('/isAuthenticated',userController.isAuthenticated);
router.get('/isAdmin', IsAdminRequestValidator.validateIsAdminRequest,userController.isAdmin);

// education routes
router.post('/education',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,educationController.create);
router.get('/education/:userId',educationController.getByUserId);
router.patch('/education/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,educationController.update);
router.get('/education/:id',educationController.get);
router.delete('/education/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,educationController.destroy);

// experience routes
router.post('/experience',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,experienceController.create);
router.get('/experience/:userId',experienceController.getByUserId);
router.patch('/experience/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,experienceController.update);
router.get('/experience/:id',experienceController.get);
router.delete('/experience/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,experienceController.destroy);

//certificate routes
router.post('/certificate',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,certificateController.create);
router.get('/certificate/:userId',certificateController.getByUserId);
router.get('/certificate/:id',certificateController.get);
router.patch('/certificate/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,certificateController.update);
router.delete('/certificate/:id',AuthRequestValidator.isAuthenticated,AuthRequestValidator.isAuthorized,certificateController.destroy);

module.exports = router;