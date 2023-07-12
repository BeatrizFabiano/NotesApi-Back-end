const { Router } = require("express")
const ensureAuthorization = require("../middlewares/ensureAuthorization");
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();
const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuthorization, tagsController.index)

module.exports = tagsRoutes;