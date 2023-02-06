import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function AdminProfile(){
    const userid=sessionStorage.getItem("userid")
    const uname=sessionStorage.getItem("uname")
    const [user,setUser]=useState({
        "uname":uname,
        "userid":userid,
        "pwd":""        
    })

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const notifySuccess = (message)=>{
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const notifyError = (message)=>{
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    const handleSubmit=(e)=>{
        e.preventDefault() 
        axios.post("http://localhost:8080/api/admin",user)
        .then(resp=>{
            console.log(resp)
            notifySuccess("Profile updated successfully")  
            sessionStorage.setItem("uname",user.uname)         
        })
        .catch(error=>console.log("Error",error))   
    }

    return (
        <div className="container-fluid">
            <h4 className="p-2 text-black text-center">Welcome {user.uname}</h4>
            <div className="row">
                <div className="col-sm-5 mx-auto">
                    <div className="card shadow bg-transparent">
                        <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">User ID</label>
                                <div className="col-sm-8">
                                    <input type="text" name="userid" readOnly value={user.userid} onChange={handleInput} className="form-control" />                            
                                </div>                        
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">User Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="uname" value={user.uname} onChange={handleInput} className="form-control" />                            
                                </div>                        
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />                            
                                </div>                        
                            </div>
                            <button className="btn btn-primary float-right">Update Profile</button>
                        </form>
                        </div>
                    </div>
                
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AdminProfile;
