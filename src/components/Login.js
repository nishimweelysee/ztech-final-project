import React, { useContext } from 'react';
import { signInWithGoogle} from '../service/firebase';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const validate = values => {
    const errors = {};
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or greater';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };
  
const Login = () => {
    const {signIn} = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
          },
        validate,
        onSubmit: values => {
          signIn(values.email,values.password)
        },
      });
    return (
        <div className="mx-auto m-10 w-4/6 border-2 border-blue-500 p-5 shadow">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col border">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={formik.values.email} onChange={formik.handleChange} className="focus:outline-none p-2" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    {formik.errors.email ? <div className="text-red-700">{formik.errors.email}</div> : null}
                </div>
                <div className="flex flex-col border">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={formik.values.password} onChange={formik.handleChange}   className="focus:outline-none p-2" id="password" name="password" placeholder="Password"/>
                    {formik.errors.password ? <div className="text-red-700">{formik.errors.password}</div> : null}
                </div>
                <button type={"submit"} className="bg-blue-700 text-white p-2 hover:bg-green-700">Login</button>
            </form>
            <div className="py-4">
                <button className="btn font-weight-bold" onClick={signInWithGoogle}><i className="fab fa-google m-2 text-red-700"></i>Sign in with google</button>
            </div>
            <div className="py-4">
                <p>Don't Have an Acccount <Link to="/register" className="hover:text-green-700 hover:underline">Signup</Link> </p>
            </div>
        </div>
    )
}

export default Login;