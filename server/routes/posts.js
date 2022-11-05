const express = require('express');
const postOptions = require('../controllers/posts.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, postOptions.getPosts);
router.post('/', auth, postOptions.createPost);
router.patch('/:id', auth, postOptions.updatePost);
router.delete('/:id', auth, postOptions.deletePost);
router.patch('/:id/likePost', auth, postOptions.likePost);

module.exports = router;