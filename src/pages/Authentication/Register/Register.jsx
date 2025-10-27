import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onRegister = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        updateUser(data.name, data?.photo)
          .then(result => {
            console.log(result?.user);
            navigate(location?.state?.from || '/', { replace: true });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Create an Account</h1>
        <p className="pt-2 pb-10">Register with Pakjet</p>
      </div>
      <div className="max-w-80">
        <form onSubmit={handleSubmit(onRegister)}>
          <fieldset className="fieldset">
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input"
              placeholder="Full Name"
            />
            {errors.name?.type === 'required' && (
              <p className="text-red-500">Full name is required !</p>
            )}
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500">Email is required !</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && (
              <p className="text-red-500">Password is required !</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">
                Password must be 6 characters or longer !
              </p>
            )}

            {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
          </fieldset>
          {/* <button className="btn bg-[#CAEB66] mt-4">Register</button> */}
          <button className="btn btn-block btn-primary text-black mt-4">
            Register
          </button>
          <p className="mt-4">
            <small>
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary font-extrabold tracking-widest capitalize hover:underline ml-2"
              >
                login
              </Link>
            </small>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};
export default Register;
