import React, {useEffect, useState} from 'react';
import TableUser from "../components/TableUser";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getUsersAsync, selectToogle, selectUsers} from "../store/user/userSlice";


const PageOne = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const toogleState = useAppSelector(selectToogle);
    const usersState = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        callApiUser()
    }, [toogleState]);

    const callApiUser = async () =>{
        await dispatch(getUsersAsync())
        console.log("Primer efecto",usersState)
        // @ts-ignore
        setUsers(usersState)
    }

    return (
        <div>
            <label>
                Lista de Usuarios
            </label>

           <TableUser
               userExternal={true}
           />
        </div>
    )
}
export default PageOne;
