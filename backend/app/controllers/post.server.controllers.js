
const postModel = require('../models/posts.server.models')

let postsData = [];


const add_post = (req, res) => {
   
    const postData = req.body;

   
    postModel.addNewPost(postData, (err, postId) => {
        if (err) {
          
            return res.status(500).json({ error: 'Internal Server Error' });
        }

      
        return res.status(201).json({ postId });
    });
};
const get_all_post = (req , res)=>{
    postModel.getAllPosts((err, posts) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error'+err });
        }

        return res.status(200).json(posts);
    });
};

function get_post(req, res) {
    const postId = req.params.post_id;
    console.log(postId);
    
    postModel.getSinglePost(postId, (err, post) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' + err });
        }
    
        return res.status(200).json(post);
    });
}
function get_mypost(req, res) {
    const userID = req.params.user_id;
   
    
    postModel.getMyPosts(userID, (err, post) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' + err });
        }
    
        return res.status(200).json(post);
    });
}
function update_post(req, res) {
    const postId = req.params.post_id;
    const newText = req.body.text; 

    postModel.updatePost(postId, newText, (err, result) => {
        if (err) {
            if (err.status && err.message) {
                return res.status(err.status).json({ error: err.message });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

        return res.status(result.status).json({ message: result.message });
    });
}

function delete_post(req, res) {
    const postId = req.params.post_id;

    postModel.deletePost(postId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(result);
    });
}

function add_like(req, res) {
    const postId = req.params.post_id;
    const userId = req.body.user_id;

    postModel.checkLikePost(postId, userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.like) {
            
            return res.status(203).json({ error: 'Like already exists for this post and user' });
        }

        
        postModel.addLikeToPost(postId, userId, (addLikeErr, addLikeResult) => {
            if (addLikeErr) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

           
            return res.status(201).json(addLikeResult);
        });
    });
}

function remove_like(req, res) {
    const postId = req.params.post_id;
    const userId = req.body.user_id; // Assuming user_id is in the request body

    postModel.removeLikeToPost (postId, userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(result);
    });
}
const addComment = (req, res) => {
    const postId = req.params.post_id;
    const userId = req.body.user_id; // Assuming user_id is in the request body
    const text = req.body.text; // Assuming text is in the request body

    postModel.addComment(postId, userId, text, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(201).json(result);
    });
};
const getComments = (req, res) => {
    const postId = req.params.post_id;

    postModel.getComments(postId, (err, comments) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(comments);
    });
};
// Export the controller functions
module.exports = {
    add_post,
    get_post,
    get_mypost,
    get_all_post,
    update_post,
    delete_post,
    add_like,
    remove_like ,
    addComment ,
    getComments
};
