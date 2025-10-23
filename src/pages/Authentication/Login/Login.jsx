import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back</h1>
          <p className="py-6">Login with Pakjet</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', {
                validate: value =>
                  value.includes('@') || 'Please enter a valid email ID.',
              })}
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
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
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </div>
    </>
  );
};
export default Login;
