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

export const getUserInfo = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const parseRes = await response.json();
    console.log(parseRes);
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
    console.log(parseRes);
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
