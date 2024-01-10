const express = require('express');
const router = express.Router();
const posts = require('./../controllers/post.server.controllers');


router.post('/', posts.add_post);
router.get('/', posts.get_all_post);
router.get('/mypost/:user_id', posts.get_mypost);
router.get('/:post_id', posts.get_post);
router.patch('/:post_id', posts.update_post);
router.delete('/:post_id', posts.delete_post);
router.post('/:post_id/like', posts.add_like);
router.delete('/:post_id/like', posts.remove_like);
router.post('/:post_id/comment',  posts.addComment);
router.get('/:post_id/comment',  posts.getComments);

// Export the router
module.exports = router;
