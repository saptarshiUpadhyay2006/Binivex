import React, { useState } from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({name,label,placeholder,type="text",register,error,validation,disabled,value}:FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className='space-y-2.5 transition-all duration-300'>
        <div className="flex justify-between items-center">
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
        </div>
        <div className="relative group">
            <Input
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn(
                    'form-input pr-10',
                    error ? 'border-red-500/50 focus:!border-red-500/50 focus:ring-red-500/10' : '',
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                )}
                {...register(name,validation)}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            )}
        </div>
        {error && <p className='text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-300'>{error.message}</p>}
    </div>
  )
}

export default InputField