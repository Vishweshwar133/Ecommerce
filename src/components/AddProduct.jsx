import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import productvalidation from "./productvalidation";

function AddProduct() {
    const sellerid = sessionStorage.getItem("id")
    const [product, setProduct] = useState({
        "pname": "",
        "pcat": "",
        "price": "",
        "subcat": "",
        "brand": "",
        "sellerId": sellerid
    })
    const [errors, setErrors] = useState({})
    const [photo, setphoto] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()

    const handleInput = e => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleFileInput = e => {
        setphoto(e.target.files[0])
        // console.log(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(productvalidation(product))
        setSubmitted(true)
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
    useEffect(() => {
        console.log(errors)
        if (Object.keys(errors).length === 0 && submitted) {
            const formData = new FormData()
            formData.append("pic", photo)
            formData.append("pname", product.pname)
            formData.append("pcat", product.pcat)
            formData.append("price", product.price)
            formData.append("brand", product.brand)
            formData.append("subcat", product.subcat)
            formData.append("sellerId", sellerid)
            console.log(product)

            console.log(formData)
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.post("http://localhost:8080/api/products", formData, config)
                .then(resp => {
                    let result = resp.data.data;
                    // console.log(result) 
                    notifySuccess("Product added successfully")
                    history.push("/myproducts")
                })
                .catch(error => {
                    console.log("Error", error);
                    notifyError("Error saving product")
                })
        }
    }, [errors])
    return (
        <div className="container">
            <div className="card shadow bg-transparent text-black">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <h4 className="text-center p-2">
                                Add Product Form
                            </h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Product Name</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="pname" value={product.pname} onChange={handleInput} className="form-control" required />
                                        {errors.pname && <small className="text-danger float-right">{errors.pname}</small>}
                                    </div>

                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Category</label>
                                    <div className="col-sm-8">
                                        <select name="pcat" value={product.pcat} onChange={handleInput} className="form-control" required>
                                            <option value="">Select Category</option>
                                            <option>Grocery</option>
                                            <option>Electronics</option>
                                            <option>Fashion</option>
                                            <option>Beauty</option>
                                        </select>
                                        {errors.pname && <small className="text-danger float-right">{errors.pname}</small>}
                                        {errors.pcat && <small className="text-danger float-right">{errors.pcat}</small>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Sub Category</label>
                                    <div className="col-sm-8">
                                        <select name="subcat" value={product.subcat} onChange={handleInput} className="form-control" required>
                                            <option value="">Select Sub Category</option>
                                            <option>Mobiles</option>
                                            <option>DailyNeeds</option>
                                            <option>Beauty</option>
                                            <option>Men</option>
                                            <option>Women</option>
                                        </select>
                                        {errors.subcat && <small className="text-danger float-right">{errors.subcat}</small>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Price</label>
                                    <div className="col-sm-8">
                                        <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" required />
                                        {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Brand</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="brand" value={product.brand} onChange={handleInput} className="form-control" required />
                                        {errors.brand && <small className="text-danger float-right">{errors.brand}</small>}
                                    </div>
                                </div>

                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Photo</label>
                                    <div className="col-sm-8">
                                        <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />
                                    </div>
                                </div>

                                <button className="btn btn-primary float-right">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddProduct;
