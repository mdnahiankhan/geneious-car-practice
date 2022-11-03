import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);
    const handlePlaceholder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstname.value}${form.lastname.value}`;
        const phone = form.phone.value;
        const email = user?.email || "unregistered";
        const feedback = form.feedback.value;
        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            feedback
        }
        // fetch('http://localhost:5000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(order)
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.log(error));
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch(error => console.error(error))
    }
    return (
        <div>
            <form onSubmit={handlePlaceholder}>
                <h2 className='text-4xl'> Your ordered is{title}</h2>
                <h4>You have to pay: {price}$</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <input name="firstname" type="text" placeholder="First Name" className="input input-bordered w-full" />
                    <input name="lastname" type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name="phone" type="text" placeholder="Your phone" className="input input-bordered w-full" required />
                    <input name="email" type="text" defaultValue={user?.email} placeholder="Your Email" className="input input-bordered w-full" readOnly />
                </div>
                <textarea name="feedback" className="textarea mt-5 w-full textarea-bordered" placeholder="Your feedback"></textarea>
                <input type="submit" className='btn btn-success' value="place your order" />
            </form>
        </div>
    );
};

export default Checkout;