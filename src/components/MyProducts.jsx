import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProducts() {
    const sellerid = sessionStorage.getItem("id");
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/products?sellerid=" + sellerid)
            .then(resp => {
                console.log(resp.data)
                setProducts(resp.data.data)
                console.log(products)
            })
    }, [])
    const notify = (message)=>{
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
    const deleteProduct = (prodid) => {
        let resp = window.confirm('Are you sure to delete this product ?');
        if (resp) {
            axios.delete("http://localhost:8080/api/products/" + prodid)
                .then(resp => {
                    notify("Product deleted successfully")
                    axios.get("http://localhost:8080/api/products?sellerid=" + sellerid)
                        .then(resp => {
                            console.log(resp.data)
                            setProducts(resp.data.data)
                            console.log(products)      
                        })
                })
        }
    }

    return (
        <div className="container">
            <div className="card shadow bg-transparent text-black">
                <div className="card-body">
                    <h4>My Products</h4>
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Brand Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {products.map(x => (
                                <tr key={x.prodid}>
                                    <td><img width="100" src={"http://localhost:8080/" + x.photo} className="img-thumnail pr-2" />{x.pname}</td>
                                    <td>{x.pcat}</td>
                                    <td>{x.subcat}</td>
                                    <td>{x.brand}</td>
                                    <td>{x.price}</td>
                                    <td>
                                        <Link to={"/edit/" + x.prodid} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                        <button onClick={() => deleteProduct(x.prodid)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <ToastContainer/>
        </div>
    )
}

export default MyProducts;