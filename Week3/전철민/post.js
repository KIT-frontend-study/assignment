const postDetail = document.querySelector("#post-detail");
const commentSection = document.querySelector("#comment-section");

function createCommentItemHtml(comment) {
    return `
        <div class="comment-item">
            <div class="comment-info">
                <strong>${comment.author}</strong>
                <span>${comment.date}</span>
            </div>
            <p>${comment.content}</p>
        </div>
    `;
}

function renderComments(comments) {
    let commentItemsHtml = "";

    for (let i = 0; i < comments.length; i++) {
        commentItemsHtml += createCommentItemHtml(comments[i]);
    }

    commentSection.innerHTML = `
        <h2 class="comment-title">댓글 ${comments.length}</h2>
        ${commentItemsHtml}
    `;
}

function renderPost(post) {
    let contentHtml = "";

    for (let i = 0; i < post.content.length; i++) {
        contentHtml += `<p>${post.content[i]}</p>`;
    }

    postDetail.innerHTML = `
        <div class="category">${post.category}</div>
        <h2 class="post-title">${post.title}</h2>
        <div class="post-info">
            <span>${post.author}</span>
            <span>${post.date}</span>
            <span>조회수 ${post.views}</span>
        </div>
        <div class="post-content">
            ${contentHtml}
        </div>
        <a href="./posts.html" class="btn">목록으로</a>
    `;

    renderComments(post.comments);
}

async function renderPostDetail() {
    const params = new URLSearchParams(window.location.search);

    const postId = Number(params.get("id"));

    const selectedPost = await fetchPostById(postId);

    renderPost(selectedPost);
}

renderPostDetail();
