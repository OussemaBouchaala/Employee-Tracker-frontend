
import { base_api } from "./base-api";

export const USER_MANAGEMENT_API = {
    getAllUsers: `${base_api}/user/all`,
    deleteUser: (id: string) => `${base_api}/user/${id}`,
    updateUser: (id: string) => `${base_api}/user/${id}`,
    getUser: (id: string) => `${base_api}/user/${id}`,
};
