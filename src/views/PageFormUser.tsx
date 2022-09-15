import React, {useEffect, useState} from 'react';
import TableUser from "../components/TableUser";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getOurUsersAsync, getUsersAsync, selectUsers} from "../store/user/userSlice";
import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

const PageFormUser = () => {

    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const usersState = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        callApiUser().then()
    }, [reload]);

    const callApiUser = async () =>{
        await dispatch(getOurUsersAsync())
        // @ts-ignore
        setUsers(usersState)
    }

    return (
        <div>
            <UserForm  />
        </div>
    )
}
export default PageFormUser;
