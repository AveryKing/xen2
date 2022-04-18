
const service = require('../../posts/posts.service');
const posts = [
    {post: 1, creator: 1, content: 'This is the first post', likes:[]},
    {post: 2, creator: 1, content: 'This is the second post', likes:[]},
    {post: 3, creator: 2, content: 'This is the third post', likes:[5]}
]

module.exports = posts;