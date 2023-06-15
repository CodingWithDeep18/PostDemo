const usersUrl = "https://jsonplaceholder.typicode.com/users";
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(function(response) {
        return response.json();
    })
    .then((posts) => {
        fetch(usersUrl)
            .then(function(response) {
                return response.json();
            })
            .then((users) => {
                displayPosts(posts, users);
            });
    });
function displayPosts(posts, users) {
    var postsContainer = document.getElementById("posts");
    posts.forEach((post) => {
        var postElement = document.createElement("div");
        postElement.innerHTML = `<h1>POST : ${post.id}</h1>
            <p>User Name: ${getUserName(users, post.userId)}</p>
            <h2>POST TITLE: ${post.title}</h2>
            <p>POST BODY: ${post.body}</p>
            <h3>Comments:</h3>
            <ul id="comments-${post.id}"></ul> <hr> `;
        postsContainer.appendChild(postElement);
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(function(response) {
                return response.json();
            })
            .then((comments) => {
                displayComments(post.id, comments);
            });
    });
}
function getUserName(users, userId) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
}
function displayComments(postId, comments) {
    var commentsContainer = document.getElementById(`comments-${postId}`);
    comments.forEach((comment) => {
        var commentElement = document.createElement("li");
        commentElement.innerHTML = `<h4>${comment.email}</h4><b>${comment.name}</b> - ${comment.body} `;
        commentsContainer.appendChild(commentElement);
    });
}
