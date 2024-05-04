import React from "react";

export async function postPage(postId) {
  const post = await getPost(postId);

  const comments = await getPostComments(postId);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <ul>
        {comments.map((comment) => (
          <li>{comment.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default postPage;
