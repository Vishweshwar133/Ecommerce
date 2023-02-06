import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
    const [orders, setOrders] = useState([])
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState([])
    const [status, setStatus] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const handleInput = (e) => {
        setStatus({ ...status, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // setErrors(uservalidation(user)) 
        setSubmitted(true)
    }
    useEffect(() => {
        axios.get("http://localhost:8080/api/orders")
            .then(resp => {
                console.log(resp.data)
                setOrders(resp.data.data)
            })
    }, []);

    const showDetails = (orderid) => {
        axios.get("http://localhost:8080/api/orders/" + orderid)
            .then(resp => {
                console.log(resp.data)
                setDetails(resp.data.data.details)
            })
        setShow(true)
    }

    return (
        <div className="container-fluid text-black">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="p-2 text-center text-black">Purchased Orders</h4>
                    <table className="table table-bordered table-sm table-light table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Order Date</th>
                                <th>Amount</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(x => (
                                <tr key={x.orderid}>
                                    <td>{x.orderid}</td>
                                    <td><Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment></td>
                                    <td>&#8377; {x.payment.amount}</td>
                                    <td>{x.customer.name}</td>
                                    <td>{x.status}</td>
                                    <td><button onClick={e => showDetails(x.orderid)} className="btn btn-primary btn-sm">Show Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-5">
                    {show ? <>
                        <h4 className="p-2">Order Details</h4>
                        <table className="table table-bordered table-light table-hover table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map(x => (
                                    <tr key={x.product.prodid}>
                                        <td>{x.product.prodid}</td>
                                        <td><img className="mr-2 float-left" src={"http://localhost:8080/" + x.product.photo} width="100" />
                                            {x.product.pname}<br />
                                            {x.product.cat}
                                        </td>
                                        <td>{x.product.price}</td>
                                        <td>{x.qty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </> : ''}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="status-form">
                <h4 className="p-2 text-center">Change Delivery Status</h4>
                <div className="form-group form-row">
                    <label className="pr-3">Enter Order ID :</label>
                    <div className="pr-3"><input type="number" name="status" value={status} onChange={handleInput} className="form-control"/></div>
                    <button className="btn btn-primary btn-sm">Search</button>
                </div>
            </form>
        </div>
    )
}

export default Orders;