import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    signIn(data.email, data.password)
      .then(res => {
        console.log(res?.user);
        navigate(location?.state?.from || '/', { replace: true });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back</h1>
          <p className="pt-2 pb-10">Login with Pakjet</p>
        </div>
        <div className="max-w-80">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register(
                  'email',
                  { required: true }
                  //     {
                  //     validate: value =>
                  //       value.includes('@') || 'Please enter a valid email ID.',
                  //   }
                )}
                className="input"
                placeholder="Email"
              />
              {/* {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )} */}
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

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
            </fieldset>
            <button className="btn btn-block btn-primary text-black mt-4">
              Login
            </button>
            <p className="mt-4">
              <small>
                Don't have any account?{' '}
                <Link
                  to="/register"
                  className="text-primary font-bold tracking-widest capitalize hover:underline ml-2"
                >
                  register
                </Link>
              </small>
            </p>
          </form>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};
export default Login;
