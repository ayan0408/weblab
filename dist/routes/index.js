"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
var SomeController_1 = __importDefault(require("../controllers/SomeController"));
var redirect_middleware_1 = require("../middlewares/redirect.middleware");
var router = new koa_router_1.default();
router.get('/', redirect_middleware_1.checkAuthorization, SomeController_1.default.MainPage);
router.get('/registration', AuthController_1.default.registrationPage);
router.post('/registration', AuthController_1.default.registration);
router.get('/login', AuthController_1.default.loginPage);
router.post('/login', AuthController_1.default.login);
router.get('/logout', AuthController_1.default.logout);
router.get('/protected', redirect_middleware_1.checkAuthorization, SomeController_1.default.protectedPage);
exports.default = router;
