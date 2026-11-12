import axiosInstance from "./axiosinstance";

const apiService= async (httpmethod,url,reqbody)=>{

const reqConfig={
    method:httpmethod,
    url,
    data:reqbody
}
try{
    const res=await axiosInstance(reqConfig)
    return res
}
catch(err){
    return err
}}

export default apiService