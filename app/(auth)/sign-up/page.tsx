import React from 'react'
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<SignUpFormData>()
    //   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <>
        <h1 className='form-title'>Sign Up & Personalize</h1>
    </>
  )
}

export default SignUp