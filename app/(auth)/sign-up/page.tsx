'use client';
import { useForm } from 'react-hook-form';
import {Button} from "@/components/ui/button";
import InputField from '@/components/forms/InputField';
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import SelectField from '@/components/forms/SelectField';
import {CountrySelectField} from '@/components/forms/CountrySelectField';
import FooterLink from '@/components/forms/FooterLink';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signUpWithEmail } from '@/lib/actions/auth.actions';
import { Github, Mail, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/better-auth/auth-client';

const SignUp = () => {
    const router=useRouter();
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
      const result = await signUpWithEmail(data);
      if(result?.success) {
        toast.success('Account created successfully');
        router.refresh(); 
        router.push('/');
      } else {
        toast.error(result?.error || 'Sign up failed');
      }
  } catch (e) {
      console.error(e); 
      toast.error('Sign up failed', {
          description: e instanceof Error ? e.message : 'Failed to create an account.'
      })
  }
}
    return (
    <>
        <h1 className='form-title'>Sign Up & Personalize</h1>

        <div className="flex flex-col gap-4 mb-8">
            <Button 
                variant="outline" 
                className="social-btn"
                onClick={async () => {
                    try {
                        console.log("GitHub login initiated");
                        toast.info("Connecting to GitHub...");
                        await authClient.signIn.social({
                            provider: "github",
                            callbackURL: "/",
                        });
                    } catch (error) {
                        console.error("GitHub login error:", error);
                        toast.error("Could not connect to GitHub");
                    }
                }}
            >
                <Github size={20} />
                Continue with GitHub
            </Button>
            <Button 
                variant="outline" 
                className="social-btn"
                onClick={async () => {
                    try {
                        console.log("Google login initiated");
                        toast.info("Connecting to Google...");
                        await authClient.signIn.social({
                            provider: "google",
                            callbackURL: "/",
                        });
                    } catch (error) {
                        console.error("Google login error:", error);
                        toast.error("Could not connect to Google");
                    }
                }}
            >
                <Mail size={20} />
                Continue with Google
            </Button>
        </div>

        <div className="divider-container">
            <div className="divider-line" />
            <span className="divider-text">OR CONTINUE WITH EMAIL</span>
            <div className="divider-line" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 mt-6'>
          <InputField
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            register={register}
            error={errors.fullName}
            validation={{required:'Full Name is required',minLength:2}}
          />

          <InputField
            name="email"
            label="Email"
            placeholder="doe@gmail.com"
            register={register}
            error={errors.email}
            validation={{ 
              required: 'Email is required', 
              pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
              }
          }}
          />
          <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
          />

          <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectField
                        name="investmentGoals"
                        label="Investment Goals"
                        placeholder="Select Goal"
                        options={INVESTMENT_GOALS}
                        control={control}
                        error={errors.investmentGoals}
                        required
            />
            <SelectField
                        name="riskTolerance"
                        label="Risk Tolerance"
                        placeholder="Select Risk"
                        options={RISK_TOLERANCE_OPTIONS}
                        control={control}
                        error={errors.riskTolerance}
                        required
            />
          </div>

          <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
           />
          <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
              {isSubmitting ? (
                  <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      Creating Account...
                  </div>
              ) : 'Start Your Investing Journey'}
          </Button>

          <FooterLink text="Already have an account?" linkText='Sign in' href='/sign-in'/>
        </form>
    </>
  )
}

export default SignUp