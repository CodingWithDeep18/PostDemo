const usersUrl = "https://jsonplaceholder.typicode.com/users";
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(posts => {
        fetch(usersUrl)
            .then(response => response.json())
            .then(users => {
                displayPosts(posts, users);
            });
    });
function displayPosts(posts, users) {
    var postsContainer = document.getElementById("posts");
    posts.forEach(post => {
        var postElement = document.createElement("div");
        postElement.classList.add("post");
        var postContent = `<h1>POST : ${post.id}</h1>
            <h2>POST TITLE: ${post.title}</h2>
            <h4>User Name: ${getUserName(users, post.userId)}</h4>
            <p>POST BODY: ${post.body}</p>
            <button class="comments-button" data-post-id="${post.id}">Comments</button>
            <ul class="comments-list" id="comments-${post.id}"></ul><hr>`;
        postElement.innerHTML = postContent;
        postsContainer.appendChild(postElement);
        var commentsButton = postElement.querySelector(".comments-button");
        commentsButton.addEventListener("click", function() {
            toggleComments(post.id);
        });
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(response => response.json())
            .then(comments => {
                displayComments(post.id, comments);
            });
    });
}
function getUserName(users, userId) {
    const user = users.find(user => user.id === userId);
    return user ? user.name : "Unknown User";
}
function displayComments(postId, comments) {
    var commentsContainer = document.getElementById(`comments-${postId}`);
    commentsContainer.classList.add("comments-show-container");
    comments.forEach(comment => {
        var commentElement = document.createElement("li");
        commentElement.classList.add("comments-show");
        commentElement.innerHTML = `<h4>${comment.email}</h4><b>${comment.name}</b> - ${comment.body}`;
        commentsContainer.appendChild(commentElement);
    });
}
function toggleComments(postId) {
    var commentsList = document.getElementById(`comments-${postId}`);
    commentsList.classList.toggle("show-comments");
}
