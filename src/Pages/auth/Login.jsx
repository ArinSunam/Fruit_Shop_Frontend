import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"
import { useLoginMutation } from "../../features/AuthApi"
import { setUserToLocal } from "../../features/UserSlice"
import { toast } from "react-toastify"


const Login = () => {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const [userLogin, { isLoading }] = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onLogin = async (data) => {
    try {
      const res = await userLogin(data).unwrap()

      dispatch(setUserToLocal(res))
      toast.success("Login Successful")
      nav(-1)
      reset()
    } catch (error) {
      toast.error('Invalid Credentials')
      console.log('login error', error)
    }
  }


  const { register, handleSubmit, reset, formState: { errors } } = useForm()


  return (
    <div className="px-[30px] sm:px-[15px] pt-[100px] pb-[60px] mx-auto w-full sm:w-[570px]">

      <h1 className="text-[25px] sm:text-[40px] text-center font-semibold font-WorkSans  text-[#2f2f2f] pb-8">Login</h1>

      {/* form */}
      <form className="space-y-6" onSubmit={handleSubmit(onLogin)}>

        {/* email */}
        <div className="flex flex-col gap-2 ">
          <label className="font-light">Email</label>
          <input type="text"
            className="form-input"
            placeholder="Email"
            {...register('email')}
          />

          {/* {errors.email && <h1 className="text-red-600">{errors.email.message}</h1>} */}
        </div>

        {/* password */}
        <div className="flex flex-col gap-2 ">
          <label className="font-light">Password</label>
          <div className='relative flex justify-between '>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name="password"
              placeholder='Password'
              className='form-input'
              {...register('password')}
            />

            <button
              type='button'
              className='absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
            </button>
          </div>
          {/* {errors.password && <h1 className="text-red-600">{errors.password.message}</h1>} */}
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          <button type="submit" className="mt-2 py-[10px] px-[35px] rounded-sm bg-blue-900 text-white font-medium"> {isLoading ? "loading" : "Sign In"}</button>

          <Link to="/register" className="underline font-light">New customer? Signup for an account</Link>
        </div>
      </form>




    </div>
  )
}

export default Login