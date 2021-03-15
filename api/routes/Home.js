const router = express.Router(),
  Home = require('../controllers/HomeController');

router.get('/', Home.startPage);

module.exports = router;
