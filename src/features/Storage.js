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

export const setCartsToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
}

export const getCartsFromLocal = () => {
  const carts = localStorage.getItem('carts');
  return carts === null ? [] : JSON.parse(carts);
}

export const clearCartsFromLocal = () => {
  localStorage.getItem('carts');
}
