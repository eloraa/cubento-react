import { toast } from 'react-toastify';
import { AuthContext } from '../providers/authProviders';
import { useContext, useEffect, useRef } from 'react';
import { Header } from '../shared/Header';
import { GoogleIcon } from '../utils/SvgIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../shared/Footer';

export const SignIn = () => {
  const { signIn, user, googleSignin, resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null)

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    googleSignin()
      .then(() => {
        toast('Signed in successfully.');
        navigate(location?.state ? location.state : '/');
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') toast('The user not found.');
        if (err.code === 'auth/invalid-login-credentials') toast('Your password or email might be wrong.');
        else toast('An error occurred. Please try again later.');
      });
  };

  const handleResetPassword = () => {
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formRef.current.email.value)) toast('Enter an Email to the field to reset the password.')
    else resetPassword(formRef.current.email.value).then(() => toast('Check your email to reset your Password.')).catch(err => err.code === 'auth/too-many-requests' ? toast('Try verifying after a little while.') : toast('Something went wrong.'))
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    let email,
      password = e.target.password.value;

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;

    if (email) {
      signIn(email, password)
        .then(() => {
          toast('Signed in successfully.');
          navigate(location?.state ? location.state : '/');
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') toast('The user not found.');
          if (err.code === 'auth/invalid-login-credentials') toast('Your password or email might be wrong.');
          else toast('An error occurred. Please try again later.');
        });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-16 md:pt-0">
      <div className=" max-md:order-1">
        <Header className="max-md:fixed w-full top-0 bg-white"></Header>
        <div className="py-6 md:px-10 px-5 my-12">
          <div className="flex justify-between">
            <h1 className="font-semibold">Login to Continue</h1>
            <button className="flex items-center gap-2" onClick={handleGoogleLogin}>
              <span className="w-5 h-5 block">
                <GoogleIcon></GoogleIcon>
              </span>
              Continue with Google
            </button>
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit} className="mt-16 grid gap-4">
            <div className="w-full">
              <input className="w-full py-4 outline-none border-b border-black" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full">
              <input className="w-full py-4 outline-none border-b border-black" type="password" name="password" placeholder="Password" required />
            </div>
            <div className="w-full">
              <button className="bg-black py-4 md:px-24 w-full px-0 mt-6 text-white font-bold rounded active:scale-[.99] transition-transform">Sign In</button>
            </div>
          </form>
          <div className="mt-10 text-sm flex items-center justify-between">
            <h4>
              Don&apos;t have an Account?{' '}
              <Link state={location?.state} className="font-semibold" to="/signup">
                Sign Up
              </Link>
            </h4>
            <button className='underline' onClick={handleResetPassword}>Reset Password</button>
          </div>
        </div>
        <Footer></Footer>
      </div>
      <div className="lg:min-h-screen">
        <img src="/signin-compressed.png" className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
};
