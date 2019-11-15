export const setUser = (id, name, email) => ({
    type : "SET_USER",
    payload : {id, name, email}
})

export const setUserNull = () => ({
    type : "SET_USER",
    payload : {}
})