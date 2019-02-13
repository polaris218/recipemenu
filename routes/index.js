"use strict";

const profileController = require('../controllers/profile.controller');
const companyController = require('../controllers/company.controller');
const mealController = require('../controllers/meal.controller');
const mealImageController = require('../controllers/meal-image.controller');
const languageController = require('../controllers/language.controller');
const branchController = require('../controllers/branch.controller');
const subscriptionController = require('../controllers/subscription.controller');
const categoryController = require('../controllers/category.controller');
const categoryStandardController = require('../controllers/category-standard.controller');
const categoryCustomController = require('../controllers/category-custom.controller');
const currencyController = require('../controllers/currency.controller');
const cuisineController = require('../controllers/cuisine.controller');
const menuController = require('../controllers/menu.controller');
const menuCategoryController = require('../controllers/menu-category.controller');
const menuLanguageController = require('../controllers/menu-language.controller');
const branchLanguageController = require('../controllers/branch-language.controller');
const branchCurrencyController = require('../controllers/branch-currency.controller');
const branchCuisineController = require('../controllers/branch-cuisine.controller');
const branchImageController = require('../controllers/branch-image.controller');
const branchContactController = require('../controllers/branch-contact.controller');
const flagController = require('../controllers/flag.controller');
const imageUploadController = require('../controllers/image-upload.controller');

const mealTranslationController = require('../controllers/meal-translation.controller');
const menuTranslationController = require('../controllers/menu-translation.controller');
const menuCategoryTranslationController = require('../controllers/menu-category-translation.controller');
const translationCallbackController = require('../controllers/translation-callback.controller');

const analyticsController = require('../controllers/analytics.controller');

const authController = require('../controllers/auth.controller');
const signupController = require('../controllers/signup.controller')
const forgotPasswordController = require('../controllers/forgot-password.controller')
const checkResetCodeController = require('../controllers/check-reset-code.controller')
const authMiddleware = require('../middlewares/auth.middleware');

let Routes = class {
    constructor(router) {
        ////////////
        // Public Routes
        ////////////
        router.get('/language', languageController.get);
        router.post('/translation-callback', translationCallbackController.post);
        router.post('/analytics', analyticsController.post);
        router.post('/auth', authController.post);
        router.post('/signup', signupController.post);
        router.post('/forgotPassword', forgotPasswordController.post)
        router.post('/checkResetCode', checkResetCodeController.post)
        router.put('/updatePassword', checkResetCodeController.put)
        router.use(authMiddleware);

        ////////////
        // Private Routes (require auth)
        ////////////

        router.post('/image-upload', imageUploadController.post);
        router.put('/image-upload', imageUploadController.put);

        router.get('/profile', profileController.get);
        router.put('/profile', profileController.put);

        router.get('/company', companyController.get);
        router.post('/company', companyController.post);
        router.put('/company', companyController.put);

        router.post('/language', languageController.post);
        router.put('/language', languageController.put);

        router.get('/branch-language', branchLanguageController.get);
        router.post('/branch-language', branchLanguageController.post);
        router.put('/branch-language', branchLanguageController.put);
        router.delete('/branch-language', branchLanguageController.remove);

        router.get('/branch-currency', branchCurrencyController.get);
        router.post('/branch-currency', branchCurrencyController.post);
        router.put('/branch-currency', branchCurrencyController.put);
        router.delete('/branch-currency', branchCurrencyController.remove);

        router.get('/branch', branchController.get);
        router.post('/branch', branchController.post);
        router.put('/branch', branchController.put);
        router.delete('/branch', branchController.remove);

        router.get('/subscription', subscriptionController.get);
        router.post('/subscription', subscriptionController.post);
        router.put('/subscription', subscriptionController.put);
        router.delete('/subscription', subscriptionController.remove);

        router.get('/cuisine', cuisineController.get);
        router.post('/cuisine', cuisineController.post);
        router.put('/cuisine', cuisineController.put);
        router.delete('/cuisine', cuisineController.remove);

        router.get('/branch-cuisine', branchCuisineController.get);
        router.post('/branch-cuisine', branchCuisineController.post);
        router.put('/branch-cuisine', branchCuisineController.put);
        router.delete('/branch-cuisine', branchCuisineController.remove);

        router.get('/branch-image', branchImageController.get);
        router.post('/branch-image', branchImageController.post);
        router.put('/branch-image', branchImageController.put);
        router.delete('/branch-image', branchImageController.remove);

        router.get('/branch-contact', branchContactController.get);
        router.post('/branch-contact', branchContactController.post);
        router.put('/branch-contact', branchContactController.put);
        router.delete('/branch-contact', branchContactController.remove);

        router.get('/category', categoryController.get);
        router.post('/category', categoryController.post);
        router.put('/category', categoryController.put);
        router.delete('/category', categoryController.remove);

        router.get('/category-standard', categoryStandardController.get);
        router.post('/category-standard', categoryStandardController.post);
        router.put('/category-standard', categoryStandardController.put);
        router.delete('/category-standard', categoryStandardController.remove);

        router.get('/category-custom', categoryCustomController.get);
        router.post('/category-custom', categoryCustomController.post);
        router.put('/category-custom', categoryCustomController.put);
        router.delete('/category-custom', categoryCustomController.remove);

        router.get('/currency', currencyController.get);
        router.post('/currency', currencyController.post);
        router.put('/currency', currencyController.put);
        router.delete('/currency', currencyController.remove);

        router.get('/menu', menuController.get);
        router.post('/menu', menuController.post);
        router.put('/menu', menuController.put);
        router.delete('/menu', menuController.remove);

        router.get('/menu-category', menuCategoryController.get);
        router.post('/menu-category', menuCategoryController.post);
        router.put('/menu-category', menuCategoryController.put);
        router.put('/menu-category-remove', menuCategoryController.removeAll);
        router.delete('/menu-category', menuCategoryController.remove);

        router.get('/menu-language', menuLanguageController.get);
        router.post('/menu-language', menuLanguageController.post);
        router.put('/menu-language', menuLanguageController.put);
        router.delete('/menu-language', menuLanguageController.remove);

        router.get('/meal', mealController.get);
        router.post('/meal', mealController.post);
        router.put('/meal', mealController.put);
        router.put('/meal-remove', mealController.removeAll);
        router.delete('/meal', mealController.remove);

        router.get('/meal-image', mealImageController.get);
        router.post('/meal-image', mealImageController.post);
        router.put('/meal-image', mealImageController.put);
        router.delete('/meal-image', mealImageController.remove);

        router.get('/translate-menu-category', menuCategoryTranslationController.get);
        router.post('/translate-menu-category', menuCategoryTranslationController.post);
        router.put('/translate-menu-category', menuCategoryTranslationController.put);
        router.delete('/translate-menu-category', menuCategoryTranslationController.remove);

        router.get('/translate-meal', mealTranslationController.get);
        router.post('/translate-meal', mealTranslationController.post);
        router.put('/translate-meal', mealTranslationController.put);
        router.delete('/translate-meal', mealTranslationController.remove);

        router.get('/translate-menu', menuTranslationController.get);
        router.post('/translate-menu', menuTranslationController.post);
        router.put('/translate-menu', menuTranslationController.put);
        router.delete('/translate-menu', menuTranslationController.remove);

        router.get('/analytics', analyticsController.get);

        this.router = router;
    }
};

module.exports = Routes;