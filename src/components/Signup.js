import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {storage } from '../service/firebase';

const validate = values => {
    const errors = {};
  
    if (!values.fullName) {
      errors.fullName = 'FullName is Required';
    }

    if (!values.password) {
      errors.password = 'Password is Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or greater';
    }
  
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };
const SignUp = () => {
    const {signUp,updateUserData} = useContext(UserContext);
    const [uploading,setUploading] = useState(false);
    const formik = useFormik({
        initialValues: {
            photoURL:'',
            image:'',
            fullName:'',
            email: '',
            password: '',
          },
        validate,
        onSubmit: values => {
          signUp(values.email,values.password).then(user=>{
            console.log(user)
            updateUserData({displayName:values.fullName,photoURL:values.photoURL});
          });
        },
      });
      
    const handleUpload = async(e) =>{
      setUploading(true)
      let file = e.target.files[0];
      console.log(file)
      var storageRef = storage.ref();
      await storageRef.child('profileImage/' + file.name).put(file);
      let url = await storage.ref("profileImage").child(file.name).getDownloadURL();
      formik.values.photoURL=url;
      setUploading(false)
    }
    return (
        <div className="mx-auto m-10 w-4/6 border-2 border-blue-500 p-5 shadow">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col border">
                    <input type="file" accept="image/*" onChange={handleUpload} className="focus:outline-none p-2" id="image" name="image"  placeholder="Select Image"/>
                    {uploading && <button type="button" disabled>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      </svg>
                      Uploading...
                    </button>}
                </div>
                <div className="flex flex-col border">
                    <label htmlFor="fullName">FullName</label>
                    <input type="text" value={formik.values.fullName} onChange={formik.handleChange} className="focus:outline-none p-2" id="fullName" name="fullName"  placeholder="Type Full Name"/>
                    {formik.errors.fullName ? <div className="text-red-700">{formik.errors.fullName}</div> : null}
                </div>
                <div className="flex flex-col border">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={formik.values.email} onChange={formik.handleChange} className="focus:outline-none p-2" id="email" name="email" aria-describedby="emailHelp" placeholder="Type email"/>
                    {formik.errors.email ? <div className="text-red-700">{formik.errors.email}</div> : null}
                </div>
                <div className="flex flex-col border">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={formik.values.password} onChange={formik.handleChange}   className="focus:outline-none p-2" id="password" name="password" placeholder="Password"/>
                    {formik.errors.password ? <div className="text-red-700">{formik.errors.password}</div> : null}
                </div>
                <button type={"submit"} className="bg-blue-700 text-white p-2 hover:bg-green-700">Register</button>
            </form>
            <div className="py-4">
                <p>Have an Acccount <Link to="/login" className="hover:text-green-700 hover:underline">Signin</Link> </p>
            </div>
        </div>
    )
}

export default SignUp;