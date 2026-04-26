import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialModal from "@/components/TutorialModal";
import AIChat from "@/components/AIChat";
import { headers } from 'next/headers';
import { getAuth } from '@/lib/better-auth/auth';
import { redirect } from 'next/navigation';

const Layout =async ({children}:{children:React.ReactNode}) => {
  const auth = await getAuth();
  const session=await auth.api.getSession({
    headers:await headers()
  });

  if(!session?.user)
    redirect('/sign-in');

  const user={
    id:session.user.id,
    name:session.user.name,
    email:session.user.email,
  }
  return (
    <div className='min-h-screen flex flex-col text-gray-400'>
        <Header user={user}/>
        <main className='flex-1 container py-10'>
            {children}
        </main>
        <Footer />
        <TutorialModal />
        <AIChat />
    </div>
  )
}

export default Layout