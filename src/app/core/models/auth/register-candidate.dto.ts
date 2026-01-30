import { RegisterUserDto } from './register-user.dto';

export interface RegisterCandidateDto extends RegisterUserDto {
    description: string;
    cv?: string;
}
