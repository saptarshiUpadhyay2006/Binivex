'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<{ email: string }>({
        defaultValues: {
            email: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: { email: string }) => {
        try {
            // Simulate API call for password reset
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSubmitted(true);
            toast.success('Reset link sent', {
                description: 'If an account exists for this email, you will receive a reset link shortly.'
            });
        } catch (e) {
            console.error(e);
            toast.error('Failed to send reset link');
        }
    }

    if (isSubmitted) {
        return (
            <div className="flex flex-col gap-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-500/20">
                    <Loader2 className="text-yellow-500 animate-spin-slow" size={32} />
                </div>
                <h1 className="form-title mb-0">Check your email</h1>
                <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                    We've sent a password reset link to your email address. Please follow the instructions to reset your password.
                </p>
                <div className="mt-4">
                    <Link href="/sign-in">
                        <Button className="yellow-btn w-full">
                            Back to Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Link 
                href="/sign-in" 
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest mb-8 group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
            </Link>

            <h1 className="form-title">Reset Password</h1>
            <p className="form-subtitle mb-8">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-2">
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={18} />
                            Sending Link...
                        </div>
                    ) : 'Send Reset Link'}
                </Button>

                <FooterLink text="Remembered your password?" linkText="Sign in instead" href="/sign-in" />
            </form>
        </>
    );
};

export default ForgotPassword;
