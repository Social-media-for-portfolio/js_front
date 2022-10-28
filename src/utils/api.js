export const getAllPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch("http://localhost:5000/feed/posts", {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getMyUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getUserInfo = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/profile/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const createPost = async (content) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch("http://localhost:5000/feed/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({ content: content }),
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const postComment = async (content, id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/feed/posts/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({ content: content }),
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getAllComments = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/posts/${id}/comments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getPost = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/feed/posts/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const deletePost = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/feed/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/posts/${postId}/likes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const unlikePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/posts/${postId}/likes`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const userLikesPost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/posts/${postId}/likes`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const userLikesComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/comments/${commentId}/likes`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const likeComment = async (commentId, postId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/comments/${commentId}/likes`,
      {
        body: JSON.stringify({ postId }),
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const unlikeComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/feed/comments/${commentId}/likes`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getPostsByUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/profile/${userId}/posts`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getPostsWithUserComments = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/profile/${userId}/comments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const updateUserInfo = async (
  userId,
  firstName,
  lastName,
  location,
  birthday,
  bio
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/profile/${userId}/info`,
      {
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          location: location,
          birthday: birthday,
          bio: bio,
        }),
        method: "PUT",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};
