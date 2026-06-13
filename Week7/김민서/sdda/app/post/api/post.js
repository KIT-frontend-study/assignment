export async function getPosts() {
    const res = await fetch("http://localhost:4000/posts");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.json();
}

export async function getPost(id) {
    const res = await fetch(`http://localhost:4000/posts/${id}`);
    return res.json();
}

export async function createPost(post) {
    const res = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    return res.json();
}

export async function deletePost(id) {
    const res = await fetch(`http://localhost:4000/posts/${id}`, {
        method: "DELETE",
    });
    return res.json();
}