import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Fragment } = require("react");

function NavBar(){
    const state=useSelector((state)=>state);
    console.log("LoggedIn ",state.loggedin)
    console.log("Cart ",state.cart) 
    return (
        <Fragment>
            {/* <div className="clearfix"></div> */}
            <nav className="navbar navbar-expand-lg navbar-dark position-sticky mb-0" style={{top:0,zIndex:"1000",backgroundColor:"#2874f0"}}>
                <Link className="navbar-brand" to="/">PSL E-Shop</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    </ul>
                    <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />                    
                </div>
                </nav>
        </Fragment>
    )
}

export default NavBar;
