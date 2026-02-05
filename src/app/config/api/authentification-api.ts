import { base_api } from "./base-api"

export const AUTHENTIFICATION_API = {
    registerCandidate: `${base_api}/auth/register-candidate`,
    registerRecruiter: `${base_api}/auth/register-recruiter`,
    login: `${base_api}/auth/login`,
    verifyEmail: `${base_api}/auth/verify`,
    profile: `${base_api}/auth/profile`,
    updateProfile: `${base_api}/auth/profile`,
}
