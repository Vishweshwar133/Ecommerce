import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import LoginRegisterMenu from "./LoginRegisterMenu"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoleNavbar=({isLoggedIn})=>{
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
        toast.success("Logged out Successfully !!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    const state=useSelector((state)=>state);
    const history=useHistory()
    const dispatch=useDispatch()
    console.log(sessionStorage.getItem("role"),isLoggedIn)
    if(!isLoggedIn) {
         return (
        <LoginRegisterMenu/>
        )
    }
    else if(sessionStorage.getItem("role")==="customer"){
    return (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
            <Link className="nav-link" to="/cart">View Cart {state.cart.length===0 ? '' : 
            <span className="badge badge-danger p-2">{state.cart.map(x=>x.qty).reduce((a,b)=>parseInt(a)+parseInt(b))}</span>}</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/cprofile">Profile</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/myorders">My Orders</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" onClick={logout} to="#">Logout</Link>
        </li>        
        </ul>
    )
    }
    else if(sessionStorage.getItem("role")==="seller"){
        return (
            <ul className="navbar-nav ml-auto"> 
            <li className="nav-item active">
                <Link className="nav-link" to="/sprofile">Profile</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/add-product">Add Product</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/myproducts">Products</Link>
            </li>          
            <li className="nav-item active">
                <Link className="nav-link" onClick={logout} to="#">Logout</Link>
            </li>        
            </ul>
        )
    }
    return (
        <ul className="navbar-nav ml-auto">             
        <li className="nav-item active">
            <Link className="nav-link" to="/aprofile">Profile</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/sellers">Sellers</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/customers">Customers</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/orders">Orders</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" onClick={logout} to="#">Logout</Link>
        </li>        
        </ul>
    )

}



export default RoleNavbar;