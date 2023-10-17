const express = require('express');
const router = express.Router();
const controller = require('../controllers/members');

router.post('/', controller.create);
router.get('/', controller.list);

// Define otras rutas según tus necesidades.

module.exports = router;
