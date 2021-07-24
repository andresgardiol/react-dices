export const getItem = (key, def) => {
    let item = window.localStorage.getItem(key);
    if (!item) return def;
    return JSON.parse(item);
}
