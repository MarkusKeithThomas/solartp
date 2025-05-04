import { FormState, JobList } from "../type/job";
import { apiGet, apiPost, apiPostFormData } from "./apiClient";


export const jobApi = {
    getListJob: (): Promise<JobList[]> => {
        return apiGet<JobList[]>("/job/get-list-job");
    },
    getJobDetail:(slug:string): Promise<JobList> => {
        return apiGet<JobList>(`/job/${slug}`)
    },
    addFormApplication :(formdata:FormData): Promise<any> => {
        return apiPostFormData<any>("/job/ung-tuyen",formdata)
    }

}