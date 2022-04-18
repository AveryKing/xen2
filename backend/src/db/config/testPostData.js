
const service = require('../../posts/posts.service');
const posts = [
    {creator: 1, title: 'First Post', content: 'This is the first post', likes:[]},
    {creator: 1, title: 'Second Post', content: 'This is the second post', likes:[]},
    {creator: 1, title: 'Third Post', content: 'This is the third post', likes:[5]}
]

module.exports = posts;