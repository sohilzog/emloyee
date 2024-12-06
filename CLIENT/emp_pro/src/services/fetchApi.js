import commonApi from "./commonApi";



export const userRegister=(data)=>{
    return commonApi("POST",data,"http://127.0.0.1:8000/register/","")
}
export const userLogin=(data)=>{
    
    return commonApi("POST",data,"http://127.0.0.1:8000/token","")
}
export const listEmp=(header)=>{
    
    return commonApi("GET","","http://127.0.0.1:8000/employee/",header)
}



export const addEmployee=(data,header)=>{
  return commonApi("POST",data,"http://127.0.0.1:8000/employee/",header)
}
export const detailEmployee=(id,header)=>{
  return commonApi("GET","",`http://127.0.0.1:8000/employee/${id}/`,header)
}
export const empDelete=(id,header)=>{
    
  return commonApi("DELETE","",`http://127.0.0.1:8000/employee/${id}/`,header)
}
export const empUpdate=(id,data,header)=>{
  return commonApi("PUT",data,`http://127.0.0.1:8000/employee/${id}/`,header)
}
export const viewProfile=(header)=>{
    
  return commonApi("GET","","http://127.0.0.1:8000/profile/",header)
}
export const changePassword = (data, header) => {
  return commonApi("PUT", data, "http://127.0.0.1:8000/change-password/", header);
};


// form builder

export const createForm = (data, header) => {
  return commonApi("POST", data, "http://127.0.0.1:8000/forms/", header);
};

export const getAllForms = (header) => {
  return commonApi("GET", "", "http://127.0.0.1:8000/forms/", header);
};