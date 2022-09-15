import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {Toolbar} from 'primereact/toolbar';
import './TableUser.css';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {
    deleteUserAsync,
    editStatus,
    saveUserForEdit,
    selectToogle,
    selectUsers,
    selectUsersInternal, toogleStatus
} from "../store/user/userSlice";
import {Link} from "react-router-dom";

export interface Props {
    userExternal: boolean;
}

const TableUser = (props: Props) => {
    const usersState = useAppSelector(selectUsers);
    const toogleState = useAppSelector(selectToogle);
    const usersStateInternal = useAppSelector(selectUsersInternal);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [reload, setReload] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setReload(true)
    },[toogleState, usersStateInternal])

    const editUser = (row: any) => {
        dispatch(saveUserForEdit(row))
        dispatch(editStatus(true))
    }

    const confirmDeleteUser = (row: any) => {
        dispatch(deleteUserAsync(row))
        dispatch(toogleStatus(!toogleState))
    }

    const exportCSV = () => {
        // @ts-ignore
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {

    }

    const openNew = () => {

    }

    const leftToolbarTemplate = () => {

        return (
            <React.Fragment>
                <Link
                    to={`/form`}
                    state={{ type: "new" }}
                >
                    <Button label="Nuevo Usuario" icon="pi pi-plus" className="p-button-success mr-2"/>
                </Link>

            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Link
                    to={`/form/${rowData.id}`}
                    state={{ editUser: "rowData" }}
                >
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => editUser(rowData)}/>
                </Link>
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => confirmDeleteUser(rowData)}
                />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Administracion de usuarios</h5>
        </div>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast}/>
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={ props.userExternal? usersState:  usersStateInternal }
                    selection={selectedUsers}
                    onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}} exportable={false}/>
                    <Column field="email" header="Email"/>
                    <Column field="first" header="Nombre" />
                    <Column field="last" header="Apellido"/>
                    <Column field="company" header="Compañia"/>
                    <Column field="country" header="Pais"/>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}/>
                </DataTable>
            </div>
        </div>
    );
    }
export default TableUser
