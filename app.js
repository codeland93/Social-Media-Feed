// Select the necessary elements
const postButton = document.getElementById('postButton');
const postContent = document.getElementById('postContent');
const postImageInput = document.getElementById('postImage');
const feed = document.getElementById('feed');

// Function to create a post
function createPost(content, imageFile) {
    const post = document.createElement('div');
    post.classList.add('post');
    post.setAttribute('data-likes', 0); // Set initial like count

    // Create header section
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    postHeader.innerHTML = `
        <img src="alien.jpg" alt="User Avatar">
        <div>
            <div class="username">User Name</div>
            <div class="time">${new Date().toLocaleTimeString()}</div>
        </div>
    `;

    // Create post body
    const postBody = document.createElement('div');
    postBody.classList.add('post-body');
    postBody.innerHTML = content;

    // Handle the post image if present
    if (imageFile) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imageFile);
        img.classList.add('post-media');
        postBody.appendChild(img);
    }

    // Create post footer with like and comment functionality
    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');
    postFooter.innerHTML = `
        <button class="like-button">Like (0)</button>
        <button class="comment-button">Comment</button>
    `;

    // Comment section
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');
    commentsSection.innerHTML = `
        <div class="comment-form">
            <input type="text" placeholder="Add a comment..." class="comment-input">
            <button class="comment-submit">Post</button>
        </div>
    `;

    // Add like functionality
    const likeButton = postFooter.querySelector('.like-button');
    likeButton.addEventListener('click', () => {
        const likeCount = parseInt(post.getAttribute('data-likes')) + 1;
        post.setAttribute('data-likes', likeCount);
        likeButton.textContent = `Like (${likeCount})`;
    });

    // Add comment functionality
    const commentButton = postFooter.querySelector('.comment-button');
    const commentForm = commentsSection.querySelector('.comment-form');
    const commentInput = commentForm.querySelector('.comment-input');
    const commentSubmit = commentForm.querySelector('.comment-submit');

    commentButton.addEventListener('click', () => {
        commentsSection.classList.toggle('comments-visible');
    });

    commentSubmit.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const comment = document.createElement('div');
            comment.classList.add('comment');
            comment.textContent = `User: ${commentText}`;
            commentsSection.appendChild(comment);
            commentInput.value = '';
        }
    });

    // Add post elements to post div
    post.appendChild(postHeader);
    post.appendChild(postBody);
    post.appendChild(postFooter);
    post.appendChild(commentsSection);

    // Add post to feed
    feed.prepend(post);

    // Reset post input
    postContent.value = '';
    postImageInput.value = '';
}

// Add event listener to the post button
postButton.addEventListener('click', () => {
    const content = postContent.value.trim();
    const imageFile = postImageInput.files[0];

    if (content || imageFile) {
        createPost(content, imageFile);
    }
});
