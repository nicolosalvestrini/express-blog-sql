const express = require("express");
const router = express.Router();
const postController = require('./../controllers/postController')


// INDEX → lista
router.get("/", postController.index );

// SHOW → dettaglio
router.get("/:id", postController.show);

// STORE → crea
router.post("/", postController.store);

// UPDATE → sostituisce tutto
router.put("/:id", postController.update);

// PATCH → modifica parziale
router.patch("/:id", postController.patch);

// DESTROY → elimina
router.delete("/:id", postController.destroy);

module.exports = router;
