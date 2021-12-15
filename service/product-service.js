/* eslint-disable */

export const addProduct = async (body) => {
  try {
    const res = await fetch("/api/product", {
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

export const getProducts = async (body) => {
  try {
    const res = await fetch("/api/product ", {
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

export const delProduct = async (id) => {
  try {
    const res = await fetch(`/api/product/${id}`, {
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
