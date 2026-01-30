import { base_api } from "./base-api"

export const JOB_POST_API = {
    base: `${base_api}/job-posts`,
    create: `${base_api}/job-posts`,
    findAll: `${base_api}/job-posts`,
    findOne: (id: string) => `${base_api}/job-posts/${id}`,
    update: (id: string) => `${base_api}/job-posts/${id}`,
    delete: (id: string) => `${base_api}/job-posts/${id}`,
    findAndMatchCandidates: (id: string) => `${base_api}/job-posts/${id}/find-and-match-candidates`,
    addCandidate: (id: string) => `${base_api}/job-posts/${id}/add-candidate`,
    getCandidates: (id: string) => `${base_api}/job-posts/${id}/candidates`,
}
