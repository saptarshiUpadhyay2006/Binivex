import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (session?.user)
        redirect('/')
        
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
            <Link href="/" className="auth-logo">
                <Image
                    src="/assets/icons/logo.svg"
                    alt="Binivex logo"
                    width={140}
                    height={32}
                />
            </Link>

                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>
            <section className="auth-right-section flex flex-col">
                <div className="z-10 relative lg:mt-2 lg:mb-4 ">
                    <blockquote className="auth-blockquote text-sm">
                        Binivex completely transformed how I track the market. The live prices and lightning-fast search make it incredibly easy to use, but the real standout is the AI insights and news summaries. I can analyze trends and make decisions so much faster than before. Plus, the automated price alerts and custom watchlists mean I never miss a market move. It’s an incredibly reliable and smooth platform.
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">- Harry Styles</cite>
                            <p className="max-md:text-xs text-gray-500">Angel Investor</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((star) => (
                                <Image 
                                    src="/assets/icons/star.svg" 
                                    alt="Star" 
                                    key={star} 
                                    width={20} 
                                    height={20} 
                                    className="w-5 h-5" 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* FIX 2: Replaced 'h-[400px] lg:h-full' with 'min-h-[400px] flex-1' to avoid height: 0px collapse */}
                {/* Change the classes on this wrapper div */}
                <div className="flex-1 relative overflow-hidden min-h-[400px]">
                    <Image
                        src="/assets/images/dashboard.png"
                        alt="Dashboard Preview"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </section>
        </main>
    )
}
export default Layout;