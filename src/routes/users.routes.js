const { Router } = require("express");
const multer = require("multer");
const uploadConfigFile = require("../config/upload");
const ensureAuthorization = require("../middlewares/ensureAuthorization")
const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController");

const usersRoutes = Router()
const upload = multer(uploadConfigFile.MULTER)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController();

usersRoutes.post('/', usersController.create);
usersRoutes.put("/", ensureAuthorization, usersController.update);
usersRoutes.patch("/avatar", ensureAuthorization, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;