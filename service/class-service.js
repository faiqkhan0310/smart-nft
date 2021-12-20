/* eslint-disable */

export const addClass = async (body) => {
  try {
    const res = await fetch("/api/class", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateClass = async (id, body) => {
  try {
    console.log(id, body);
    const res = await fetch(`/api/class/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const addProductToClass = async (classId, body) => {
  try {
    const res = await fetch(`/api/class/${classId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getClasses = async (body) => {
  try {
    const res = await fetch("/api/class", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOneClass = async (id) => {
  try {
    const res = await fetch(`/api/class/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delClass = async (id) => {
  try {
    const res = await fetch(`/api/class/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const userObj = await res.json();
    return userObj;
  } catch (error) {
    console.log(error);
    return error;
  }
};
