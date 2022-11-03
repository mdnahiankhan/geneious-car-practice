
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrder] = useState([])
    console.log(orders);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [user?.email])

    const hanldleDelete = id => {
        const proceed = window.confirm('Are you sure ,you want to cancel this order')
        console.log(id);
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully')
                        const remaining = orders.filter(order => order._id !== id)
                        setOrder(remaining)
                    }
                })
        }
    }
    const handleUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(ord => ord._id !== id);
                    const approving = orders.find(ord => ord._id === id)
                    approving.status = 'Approved'
                    const neworders = [approving, ...remaining]
                    setOrder(neworders);
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl">You have {orders.length} order</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>

                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Message</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow key={order?._id}
                                order={order}
                                hanldleDelete={hanldleDelete}
                                handleUpdate={handleUpdate}
                            ></OrderRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;