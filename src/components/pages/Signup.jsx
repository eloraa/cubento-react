import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import { GoogleIcon } from '../utils/SvgIcon';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../providers/authProviders';
import { toast } from 'react-toastify';

export const Signup = () => {
  const warning = useRef(null);
  const { createUser, user, googleSignin } = useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  
  const hadnleGoogleLogin = () => {
    googleSignin()
    .then(() => {
      toast('Signed in successfully.')
      navigate(location?.state ? location.state : '/')
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found') toast('The user not found.');
      if (err.code === 'auth/invalid-login-credentials') toast('Your password or email might be wrong.');
      else toast('An error occurred. Please try again later.');
    });
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    let email, password;

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/.test(e.target.password.value)) password = e.target.password.value;

    if (email && password) {
        createUser(email, password)
         .then(() => {
            toast('User Created Successfully')
            navigate(location?.state ? location.state : '/')
          })
         .catch(err => {
            if(err.code === 'auth/email-already-in-use') toast('This email address is already in use.')
            else toast('An error occurred. Please try again later.')
        })
    }
  };

  const validatePassword = e => {
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/.test(e.target.value)) {
      warning.current.style.display = 'none';
    } else {
      warning.current.style.display = 'block';
      if (e.target.value.length <= 6) warning.current.querySelector('.short').style.display = 'inline';
      else warning.current.querySelector('.short').style.display = 'none';

      if (!/[A-Z]/.test(e.target.value)) {
        warning.current.querySelector('.sep').style.display = 'inline';
        warning.current.querySelector('.capital').style.display = 'inline';
      } else {
        warning.current.querySelector('.capital').style.display = 'none';
        warning.current.querySelector('.sep').style.display = 'none';
      }

      if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(e.target.value)) {
        warning.current.querySelector('.sep').style.display = 'inline';
        warning.current.querySelector('.special').style.display = 'inline';
      } else {
        warning.current.querySelector('.special').style.display = 'none';
        warning.current.querySelector('.sep').style.display = 'none';
      }
    }

    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$/.test(e.target.value)) {
      warning.current.querySelector('.mst').style.display = 'inline';
      warning.current.querySelector('.sep2').style.display = 'inline';
    } else {
      warning.current.querySelector('.mst').style.display = 'none';
      warning.current.querySelector('.sep2').style.display = 'none';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-16 md:pt-0">
      <div className=" max-md:order-1">
        <Header className="max-md:fixed w-full top-0 bg-white"></Header>
        <div className="py-6 md:px-10 px-5 my-12">
          <div className="flex justify-between">
            <h1 className="font-semibold">Fill with appropriate Info</h1>
            <button className="flex items-center gap-2" onClick={hadnleGoogleLogin}>
              <span className="w-5 h-5 block">
                <GoogleIcon></GoogleIcon>
              </span>
              Continue with Google
            </button>
          </div>
          <form onSubmit={handleFormSubmit} className="mt-16 grid gap-4">
            <div className="w-full">
              <input className="w-full py-4 outline-none border-b border-black" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full">
              <input onChange={validatePassword} className="w-full py-4 outline-none border-b border-black" type="password" name="password" placeholder="Password" required />
            </div>
            <div>
              <h4 className="text-sm hidden" ref={warning}>
                The password{' '}
                <span className="short font-medium">
                  should be at least 6 characters <span className="font-normal sep2">and</span>
                </span>{' '}
                <span className="mst">must contain</span> <span className="capital font-medium">a capital letter</span> <span className="sep">and</span>{' '}
                <span className="special font-medium">a special character</span>.
              </h4>
            </div>
            <div className="w-full">
              <button className="bg-black py-4 md:px-24 w-full px-0 mt-6 text-white font-bold rounded active:scale-[.99] transition-transform">Sign Up</button>
            </div>
            <div>
              <h4 className="text-sm">
                By signing up you&apos;re agreeing to our{' '}
                <a href="#" className="font-semibold">
                  Terms of Service
                </a>
              </h4>
            </div>
          </form>
          <h4 className="mt-10 text-sm">
            Already have an Account?{' '}
            <Link className="font-semibold" to="/signin">
              Sign In
            </Link>
          </h4>
        </div>
        <Footer></Footer>
      </div>
      <div className="lg:min-h-screen">
        <img src="/signin-compressed.png" className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
};
