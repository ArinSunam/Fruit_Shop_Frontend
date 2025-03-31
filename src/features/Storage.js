export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const getUser = () => {
  const data = localStorage.getItem("user")
  return data === null ? null : JSON.parse(data)
}

export const clearAllData = () => {
  localStorage.clear()
}

export const setCart = (carts) => {
  localStorage.setItem("carts", JSON.stringify(carts));
};

export const getCart = () => {
  const carts = localStorage.getItem("carts");
  return carts === null ? [] : JSON.parse(carts);
};

export const cartClear = () => {
  localStorage.removeItem("carts");
};

