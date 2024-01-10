const db = require('../../database');
const { post } = require('../routes/post.server.routes');
const addNewPost = (post, done) => {
    const sql = "INSERT INTO posts (text, date_published, author_id) VALUES (?, ?, ?)";
    const values = [post.text, Date.now(), post.user_id]; 

    db.run(sql, values, function (err) {
        if (err) return done(err);
        return done(null, this.lastID);
    });
};
const getSinglePost = (post_id, done) => {
    const sql = `
    SELECT
        p.post_id,
        p.date_published,
        p.text AS post_text,
        u.user_id AS post_author_id,
        u.first_name AS post_author_first_name,
        u.last_name AS post_author_last_name,
        u.username AS post_author_username,
        COUNT(DISTINCT CASE WHEN l.post_id = p.post_id THEN l.user_id END) AS like_count,
        COUNT(DISTINCT CASE WHEN c.post_id = p.post_id THEN c.user_id END) AS comment_count,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.user_id || ',' || lu.first_name || ',' || lu.last_name END) AS like_user_ids,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.first_name END) AS like_user_first_names,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.last_name END) AS like_user_last_names,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.username END) AS like_user_usernames
    FROM
        posts p
    JOIN
        users u ON p.author_id = u.user_id
    LEFT JOIN
        likes l ON l.post_id = p.post_id
    LEFT JOIN
        comments c ON c.post_id = p.post_id
    LEFT JOIN
        users lu ON l.user_id = lu.user_id
    WHERE
        p.post_id = ${post_id}
    GROUP BY
        p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username
    ORDER BY
        p.date_published DESC;
`;

const posts = [];

const postPromises = [];

db.each(
    sql,
    (err, row) => {
        if (err) {
            console.error(err);
            
            return;
        }

        const post = {
            id: row.post_id,
            date: row.date_published,
            text: row.post_text,
            author: {
                user_id: row.post_author_id,
                first_name: row.post_author_first_name,
                last_name: row.post_author_last_name,
                username: row.post_author_username,
            },
            likes: row.like_count,
            comment_count: row.comment_count,
            like_user_usernames: row.like_user_usernames,
            comments: [],
        };

        const commentSql = `
            SELECT
                c.comment_id,
                c.user_id AS comment_author_id,
                cu.first_name AS comment_author_first_name,
                cu.last_name AS comment_author_last_name,
                cu.username AS comment_author_username,
                c.text AS comment_text
            FROM
                comments c
            LEFT JOIN
                users cu ON c.user_id = cu.user_id
            WHERE
                c.post_id = ${row.post_id};
        `;

    
        const commentPromise = new Promise((resolve, reject) => {
            db.all(commentSql, (commentErr, commentRows) => {
                if (commentErr) {
                    console.error(commentErr);
                   
                    resolve([]);
                } else {
                    const comments = commentRows.map(comment => ({
                        id: comment.comment_id,
                        author: {
                            user_id: comment.comment_author_id,
                            first_name: comment.comment_author_first_name,
                            last_name: comment.comment_author_last_name,
                            username: comment.comment_author_username,
                        },
                        text: comment.comment_text,
                    }));
                    resolve(comments);
                }
            });
        });

  
        postPromises.push(commentPromise);

       
        commentPromise.then(comments => {
            post.comments = comments;
        });

     
        posts.push(post);
    },
    (err, num_rows) => {
        if (err) {
            console.error(err);
          
            return done(err);
        }


        Promise.all(postPromises).then(() => {
           
            return done(null, posts);
        });
    }
);
};
const getMyPosts = (user_id, done) => {
    const sql = `
    SELECT
        p.post_id,
        p.date_published,
        p.text AS post_text,
        u.user_id AS post_author_id,
        u.first_name AS post_author_first_name,
        u.last_name AS post_author_last_name,
        u.username AS post_author_username,
        COUNT(DISTINCT CASE WHEN l.post_id = p.post_id THEN l.user_id END) AS like_count,
        COUNT(DISTINCT CASE WHEN c.post_id = p.post_id THEN c.user_id END) AS comment_count,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.user_id || ',' || lu.first_name || ',' || lu.last_name END) AS like_user_ids,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.first_name END) AS like_user_first_names,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.last_name END) AS like_user_last_names,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.username END) AS like_user_usernames
    FROM
        posts p
    JOIN
        users u ON p.author_id = u.user_id
    LEFT JOIN
        likes l ON l.post_id = p.post_id
    LEFT JOIN
        comments c ON c.post_id = p.post_id
    LEFT JOIN
        users lu ON l.user_id = lu.user_id
    WHERE
        p.author_id = ${user_id}
    GROUP BY
        p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username
    ORDER BY
        p.date_published DESC;
`;

const posts = [];

const postPromises = [];

db.each(
    sql,
    (err, row) => {
        if (err) {
            console.error(err);
            
            return;
        }

        const post = {
            id: row.post_id,
            date: row.date_published,
            text: row.post_text,
            author: {
                user_id: row.post_author_id,
                first_name: row.post_author_first_name,
                last_name: row.post_author_last_name,
                username: row.post_author_username,
            },
            likes: row.like_count,
            comment_count: row.comment_count,
            like_user_usernames: row.like_user_usernames,
            comments: [],
        };

        const commentSql = `
            SELECT
                c.comment_id,
                c.user_id AS comment_author_id,
                cu.first_name AS comment_author_first_name,
                cu.last_name AS comment_author_last_name,
                cu.username AS comment_author_username,
                c.text AS comment_text
            FROM
                comments c
            LEFT JOIN
                users cu ON c.user_id = cu.user_id
            WHERE
                c.post_id = ${row.post_id};
        `;

     
        const commentPromise = new Promise((resolve, reject) => {
            db.all(commentSql, (commentErr, commentRows) => {
                if (commentErr) {
                    console.error(commentErr);
                   
                    resolve([]);
                } else {
                    const comments = commentRows.map(comment => ({
                        id: comment.comment_id,
                        author: {
                            user_id: comment.comment_author_id,
                            first_name: comment.comment_author_first_name,
                            last_name: comment.comment_author_last_name,
                            username: comment.comment_author_username,
                        },
                        text: comment.comment_text,
                    }));
                    resolve(comments);
                }
            });
        });

     
        postPromises.push(commentPromise);

       
        commentPromise.then(comments => {
            post.comments = comments;
        });

    
        posts.push(post);
    },
    (err, num_rows) => {
        if (err) {
            console.error(err);
          
            return done(err);
        }

        
        Promise.all(postPromises).then(() => {
           
            return done(null, posts);
        });
    }
);
}

const getAllPosts = (done) => {

const sql = `
    SELECT
        p.post_id,
        p.date_published,
        p.text AS post_text,
        u.user_id AS post_author_id,
        u.first_name AS post_author_first_name,
        u.last_name AS post_author_last_name,
        u.username AS post_author_username,
        COUNT(DISTINCT CASE WHEN l.post_id = p.post_id THEN l.user_id END) AS like_count,
        COUNT(DISTINCT CASE WHEN c.post_id = p.post_id THEN c.user_id END) AS comment_count,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.user_id || ',' || lu.first_name || ',' || lu.last_name END) AS like_user_ids,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.first_name END) AS like_user_first_names,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.last_name END) AS like_user_last_names,
        GROUP_CONCAT(DISTINCT CASE WHEN l.post_id = p.post_id THEN lu.username END) AS like_user_usernames
    FROM
        posts p
    JOIN
        users u ON p.author_id = u.user_id
    LEFT JOIN
        likes l ON l.post_id = p.post_id
    LEFT JOIN
        comments c ON c.post_id = p.post_id
    LEFT JOIN
        users lu ON l.user_id = lu.user_id
    GROUP BY
        p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username
    ORDER BY
        p.date_published DESC;
`;

const posts = [];

const postPromises = [];

db.each(
    sql,
    (err, row) => {
        if (err) {
            console.error(err);
         
            return;
        }

        const post = {
            id: row.post_id,
            date: row.date_published,
            text: row.post_text,
            author: {
                user_id: row.post_author_id,
                first_name: row.post_author_first_name,
                last_name: row.post_author_last_name,
                username: row.post_author_username,
            },
            likes: row.like_count,
            comment_count: row.comment_count,
            like_user_usernames: row.like_user_usernames,
            comments: [],
        };

        const commentSql = `
            SELECT
                c.comment_id,
                c.user_id AS comment_author_id,
                cu.first_name AS comment_author_first_name,
                cu.last_name AS comment_author_last_name,
                cu.username AS comment_author_username,
                c.text AS comment_text
            FROM
                comments c
            LEFT JOIN
                users cu ON c.user_id = cu.user_id
            WHERE
                c.post_id = ${row.post_id};
        `;

        
        const commentPromise = new Promise((resolve, reject) => {
            db.all(commentSql, (commentErr, commentRows) => {
                if (commentErr) {
                    console.error(commentErr);
                  
                    resolve([]);
                } else {
                    const comments = commentRows.map(comment => ({
                        id: comment.comment_id,
                        author: {
                            user_id: comment.comment_author_id,
                            first_name: comment.comment_author_first_name,
                            last_name: comment.comment_author_last_name,
                            username: comment.comment_author_username,
                        },
                        text: comment.comment_text,
                    }));
                    resolve(comments);
                }
            });
        });


        postPromises.push(commentPromise);

    
        commentPromise.then(comments => {
            post.comments = comments;
        });

       
        posts.push(post);
    },
    (err, num_rows) => {
        if (err) {
            console.error(err);
          
            return done(err);
        }

        
        Promise.all(postPromises).then(() => {
         
            return done(null, posts);
        });
    }
);
};
const updatePost = (postId, newText, done) => {
    const sql = "UPDATE posts SET text = ?, date_published = ? WHERE post_id = ?";
    const values = [newText, Date.now(), postId];

    db.run(sql, values, function (err) {
        if (err) {
            return done(err);
        }

       
        if (this.changes === 0) {
            return done({ status: 404, message: "Post not found" });
        }

        return done(null, { status: 200, message: "Post updated successfully" });
    });
};
const deletePost = (postId, done) => {
    const sql = "DELETE FROM posts WHERE post_id = ?";
    
    db.run(sql, [postId], function (err) {
        if (err) {
            return done(err);
        }

        return done(null, { message: 'Post deleted successfully' });
    });
};
const checkLikePost = (postId, userId, done) =>
{
    const checkSql = "SELECT * FROM likes WHERE post_id = ? AND user_id = ?";
    
    db.get(checkSql, [postId, userId], (checkErr, existingLike) => {
        if (checkErr) {
            return done(checkErr);
        }

        if (existingLike) {
          
            return done(null, { like: true });
        } else {
           
            return done(null, { like: false });
        }
    });
};

const addLikeToPost = (postId, userId, done) => {
    const sql = "INSERT INTO likes (post_id, user_id) VALUES (?, ?)";
    
    db.run(sql, [postId, userId], function (err) {
        if (err) {
            return done(err);
        }

        return done(null, { message: 'Like added successfully', likeId: this.lastID });
    });
};
const removeLikeToPost = (postId, userId, done) => {
    const sql = "DELETE FROM likes WHERE post_id = ? AND user_id = ?";
    db.run(sql, [postId, userId], function (err) {
        if (err) return done(err);
        return done(null, { success: true, message: 'Like removed successfully' });
    });
};
const addComment = (postId, userId, text, done) => {
    const sql = "INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)";
    db.run(sql, [postId, userId, text], function (err) {
        if (err) return done(err);
        return done(null, { success: true, commentId: this.lastID });
    });
};
const getComments = (postId, done) => {
    const sql = "SELECT * FROM comments WHERE post_id = ?";
    db.all(sql, [postId], (err, rows) => {
        if (err) return done(err);
        return done(null, rows);
    });
};
module.exports = {
    addNewPost :addNewPost ,
    getSinglePost : getSinglePost ,
    getAllPosts  : getAllPosts , 
    updatePost : updatePost ,
    deletePost :deletePost ,
    addLikeToPost:addLikeToPost,
    removeLikeToPost:removeLikeToPost,
    addComment :addComment ,
    getComments :  getComments ,
    checkLikePost : checkLikePost,
    getMyPosts : getMyPosts
}