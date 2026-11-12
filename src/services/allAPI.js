import apiService from "../api/apiService";

//add resume api

export const addResumeAPI=async (reqbody)=>{
    return await apiService('POST','/resumes',reqbody)
}

//get single resume
export const getResumeAPI=async (resumeId)=>{
    return await apiService("GET",`/resumes/${resumeId}`,{})
}

//download API
export const downloadResumeAPI=async(reqbody)=>{
    return await apiService("POST",`/history`,reqbody)
}

//get history 
export const getHistoryAPI=async ()=>{
    return await apiService("GET",`/history/`,{})
}

//delete history 
export const dltHistoryAPI=async (id)=>{
    return await apiService("DELETE",`/history/${id}`,{})
}

//update resume
export const updateResumeAPI=async(id,reqBody)=>{
    return await apiService("PUT",`/resumes/${id}`,reqBody)
}