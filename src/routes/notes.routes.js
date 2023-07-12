const { Router } = require("express");
const ensureAuthorization = require("../middlewares/ensureAuthorization");
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAuthorization);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.get("/", notesController.index);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;