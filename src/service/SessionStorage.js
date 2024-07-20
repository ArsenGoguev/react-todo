export const setItemInStorage = (key, value) => sessionStorage.setItem(key, value)
export const setArrayInStorage = (key, value) => setItemInStorage(key, JSON.stringify(value))
export const getItemFromStorage = (key) => sessionStorage.getItem(key)
export const getArrayFromStorage = (key) => JSON.parse(getItemFromStorage(key))
export const removeItemFromStorage = (key) => sessionStorage.removeItem(key)
export const removeItemsFromStorage = (id, keys) => {
  keys.forEach((key) => sessionStorage.removeItem(`${id}_${key}`))
}
export const clearStorage = () => sessionStorage.clear()
