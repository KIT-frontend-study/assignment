async function fetchPosts() {
    const response = await fetch("./posts.json");

    return response.json();
}

async function fetchPostById(postId) {
    const posts = await fetchPosts();

    const post = posts.find((post) => post.id === postId);

    return post;
}
