import { UserRole } from '../user-role.enum';

export interface RegisterUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    profilePictureUrl?: string;
    phoneNumber?: number;
}
