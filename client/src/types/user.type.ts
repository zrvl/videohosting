
export interface IUser {
    id: number;
    name: string;
    email: string;
    verify: boolean;
    status: 'success' | 'loading' | 'idle' | 'error';
    messageError:string|null;
}


export interface IUserRegistration {
    email: string;
    username: string;
    password: string;
}

export interface IUserAuth {
    email: string;
    password: string;
}