import { RegisterUserDto } from './register-user.dto';

export interface RegisterRecruiterDto extends RegisterUserDto {
    companyName: string;
}
