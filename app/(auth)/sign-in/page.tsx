'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import { Github, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/better-auth/auth-client';

const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if(result?.success) {
                toast.success('Signed in successfully');
                router.push('/');
                router.refresh();
            } else {
                toast.error(result?.error || 'Failed to sign in');
            }
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }

    return (
        <>
            <h1 className="form-title">Welcome back</h1>

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@email.com"
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

                <div className="relative">
                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ required: 'Password is required', minLength: 8 }}
                    />
                    <Link 
                        href="/forgot-password" 
                        className="absolute right-0 top-0 text-xs font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-2">
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={18} />
                            Signing In...
                        </div>
                    ) : 'Sign In'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    );
};
export default SignIn;