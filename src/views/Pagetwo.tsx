import React, {useEffect, useState} from 'react';
import TableUser from "../components/TableUser";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getOurUsersAsync, selectToogle, selectUsers} from "../store/user/userSlice";
import UserForm from "../components/UserForm";


const Pagetwo = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const toogleState = useAppSelector(selectToogle);
    const usersState = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        callApiUser()
    }, [toogleState]);

    const callApiUser = async () =>{
        await dispatch(getOurUsersAsync())
        // @ts-ignore
        setUsers(usersState)
    }


    return (
        <div>
            <label>
                Formulario de Usuarios
            </label>

          {/* <UserForm />*/}

            <TableUser
                userExternal={false}
            />
        </div>
    )
}
export default Pagetwo;
