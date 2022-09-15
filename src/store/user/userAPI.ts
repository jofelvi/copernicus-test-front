import axios from "axios";
import {URLBACKEND, URLREMOTESERVICES } from "../../env";
import { IUser } from "../../models/UserInterface";

export const getUsers = async()=> {
    return await axios.get(URLREMOTESERVICES)
      .then(response => {
          return response.data.slice(0,100)
      })
      .catch(e => {
        console.log("error", e)
      })
}


export const getOurUsers = async()=> {
    return await axios.get(URLBACKEND+"/Users")
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log("error", e)
        })
}

export const getUserById = async(id :number)=> {
    return await
        axios.get(URLBACKEND+"/Users",{
            params: {
                id: id
            }
         }).then(response => {
             console.log(response)
            return response.data
        })
        .catch(e => {
            // Capturamos los errores
        })
}

export const createUser = async(user :any)=> {
    console.log("usuario", user)
    return await
        axios.post(
            URLBACKEND+"/Users",
            user
        ).then(response => {
            return response
        })
        .catch(e => {
            console.log("error", e)
        })
}

export const updateUser = async(user :any)=> {
    return await
        axios.put(
            `${URLBACKEND}/Users/${user.id}`,user
        ).then(response => {
            return response
        }).catch(e => {
                console.log("error", e)
        })
}

export const deleteUser = async(user :any)=> {
    console.log("deleteUser", user)
    return await
        axios.delete(
            `${URLBACKEND}/Users/${user.id}`,user
        ).then(response => {
            return response
        }).catch(e => {
            console.log("error", e)
        })
}

