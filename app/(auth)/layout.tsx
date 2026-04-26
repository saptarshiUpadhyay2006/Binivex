import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { getAuth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const auth = await getAuth();
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
                        width={200}
                        height={56}
                        className="h-10 w-auto lg:h-12"
                    />
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>
            <section className="auth-right-section">
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
                            {[1, 2, 3, 4, 5].map((star) => (
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

                <div className="flex-1 relative w-full mt-8 overflow-hidden rounded-l-2xl shadow-2xl border-l border-t border-white/5">
                    <Image
                        src="/assets/images/dashboard.png"
                        alt="Dashboard Preview"
                        fill
                        priority
                        className="object-cover object-left-top"
                    />
                </div>
            </section>
        </main>
    )
}
export default Layout;