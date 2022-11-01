import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Contexts/AuthProvider';


const Singup = () => {
    const { createUser } = useContext(AuthContext)
    const handleSignup = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value
        console.log(email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
            })
            .catch(error => console.error(error))
    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content flex-col grid gap-20 md:grid-cols-2 lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={image} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl text-center font-bold">Sign Up!</h1>
                    <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='signup' />
                        </div>
                        <p className='text-center'>Already have an account? please <Link className='text-orange-600 font-bold ' to='/login' >Log In</Link></p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Singup;