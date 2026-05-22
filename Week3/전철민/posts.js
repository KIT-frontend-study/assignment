const postList = document.querySelector("#post-list");

function createPostItemHtml(post) {
    return `
        <article class="post-item">
            <div class="post-item-category">${post.category}</div>
            <h3 class="post-item-title">
                <a href="./post.html?id=${post.id}">${post.title}</a>
            </h3>
            <p class="post-item-summary">${post.summary}</p>
            <div class="post-item-info">
                <span>${post.author}</span>
                <span>${post.date}</span>
                <span>조회수 ${post.views}</span>
            </div>
        </article>
    `;
}

async function renderPostList() {
    const posts = await fetchPosts();

    let postItemsHtml = "";

    for (let i = 0; i < posts.length; i++) {
        postItemsHtml += createPostItemHtml(posts[i]);
    }

    postList.innerHTML = postItemsHtml;
}

renderPostList();
