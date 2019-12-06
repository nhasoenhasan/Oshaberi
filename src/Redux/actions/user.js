export const setUser = (id, name, email,image,latitude,longitude) => ({
    type : "SET_USER",
    payload : {id, name, email,image,latitude,longitude}
})

export const setUserNull = () => ({
    type : "SET_USER",
    payload : {}
})  