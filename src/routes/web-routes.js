const { Router } = require('express');
const { index, realtime } = require('../controllers/web-controllers');

const router = new Router();

router.get('/', index);

router.get('/realtimeproducts', realtime);

module.exports = router;
