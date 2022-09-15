export interface IUser {
    id?: number;
    email: string;
    first: string;
    last: string;
    company: string;
    created_at?: string;
    country: string;
}

export type UserState = {
    user: IUser;
    status: 'idle' | 'loading' | 'failed';
    users?: IUser[],
    usersInternal?: IUser[],
    editBtn?: boolean
    toogle?: boolean
};

export type UserTypeArray = IUser[];

export type UserAction = {
    type: string;
    payload: IUser;
};
