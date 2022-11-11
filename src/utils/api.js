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

export const getFriendsForUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/profile/${userId}/friends`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    const filtered = parseRes.filter((friend) => friend.id !== Number(userId));
    return filtered;
  } catch (error) {
    throw error;
  }
};

export const getIncomingRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/me/friends/incoming`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  }
};

export const removeFriend = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/profile/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  }
};

export const getOutgoingRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/me/friends/outgoing`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  }
};

export const acceptFriendRequest = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/profile/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  }
};

export const sendFriendRequest = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/profile/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  }
};

export const updateAvatar = async (userId, avatarUrl) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(
      `http://localhost:5000/users/profile/${userId}/avatar`,
      {
        body: JSON.stringify({
          avatar: avatarUrl,
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

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/`, {
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

export const addInterests = async (interests) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/me/interests`, {
      method: "POST",
      body: JSON.stringify({interests}),
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const removeInterest = async (interest) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/me/interests`, {
      method: "DELETE",
      body: JSON.stringify({interest}),
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getMyInterests = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/me/interests`, {
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

export const getInterestsForAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/interests`, {
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

export const checkOnboarding = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/me/onboarding`, {
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
export const setOnboarding = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/me/onboarding`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const getPostTags = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/feed/tags`, {
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

