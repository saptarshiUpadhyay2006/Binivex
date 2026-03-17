'use client';
import { useForm } from 'react-hook-form';
import {Button} from "@/components/ui/button";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors,isSubmitting},
      } = useForm<SignUpFormData>({
        defaultValues: {
          fullName: '',
          email: '',
          password: '',
          country: 'US',
          investmentGoals: 'Growth',
          riskTolerance: 'Medium',
          preferredIndustry: 'Technology'
      },
      mode: 'onBlur'
  }, );
  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
        // const result = await signUpWithEmail(data);
        // if(result.success) router.push('/');
    } catch (e) {
        console.error(e);
        // toast.error('Sign up failed', {
        //     description: e instanceof Error ? e.message : 'Failed to create an account.'
        // })
    }
}
  return (
    <>
        <h1 className='form-title'>Sign Up & Personalize</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
              {isSubmitting?'Creating Account':'Start Your Investing Journey'}
          </Button>
        </form>
    </>
  )
}

export default SignUp