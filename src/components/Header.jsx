import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header(){
    const state=useSelector((state)=>state);
    console.log("Header ",state.loggedin.Username)
    return (
        <div className="jumbotron p-3 mb-0 rounded-0 bg-transparent text-white">
            <img src={'shop.png'} alt={"logo"} style={{width:"100px"}} className="float-left"/>
            {state.loggedin.IsLoggedIn ?
            <>            
            {/* <h5 className="float-left">Role : {state.loggedin.Role}</h5> */}
            <h5 className="float-right mt-4" style={{color:"#284d5b"}}>Welcome ! {state.loggedin.Username}</h5>
             </>:
            ''}
            
            <h4 className="text-center mt-4" style={{color:"#284d5b"}}>PSL Shopping Portal</h4>
            <div className="clearfix"></div>
            
        </div>
    )
}

export default Header;