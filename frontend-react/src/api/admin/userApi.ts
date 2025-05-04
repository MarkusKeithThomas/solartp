import { apiGet, apiPost } from '../apiClient';
import { User } from '../../type/admin/user';
export const userApi = {
    getListUserAdminStaff:(): Promise<User[]> => {
        return apiGet<User[]>("/tai-khoan/list-users");
    },
    updatedUserRole:(userId:number,newRole:string) => {
        return apiPost<User>("/tai-khoan/update-user-role",{
            userId,
            role: newRole
        })
    },
    createNewUserAdmin:(user:User) => {
        return apiPost<string>("/tai-khoan/register-admin",user)
    }
}