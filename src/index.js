const Router = require('router');
const authController = require('../auth');
const someController = require('../controller');

const { checkAuthorization } = require('../redirect');

const router = new Router();

router.get('/', checkAuthorization, someController.MainPage);

router.get('/registration', authController.registrationPage);
router.post('/registration', authController.registration);
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/protected', checkAuthorization, someController.protectedPage);

module.exports = router.routes();
