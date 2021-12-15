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
