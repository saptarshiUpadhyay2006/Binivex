import Link from 'next/link'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
    title: string
    value: string
    change: string
    isUp: boolean
    icon?: React.ReactNode
    href?: string
}

const StatCard = ({ title, value, change, isUp, icon, href }: StatCardProps) => {
    const CardContent = (
        <div className="dashboard-card p-6 flex flex-col gap-4 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-500/5 cursor-pointer group h-full border-white/5 hover:border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.01] rounded-full -mr-8 -mt-8 transition-all group-hover:scale-150 group-hover:bg-yellow-500/[0.02]" />
            
            <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-2.5">
                    {icon && <div className="text-gray-600 group-hover:text-yellow-500 transition-colors duration-500">{icon}</div>}
                    <span className="text-[10px] font-black text-gray-500 group-hover:text-white transition-colors duration-500 uppercase tracking-[0.3em]">{title}</span>
                </div>
                <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl transition-all duration-500",
                    isUp 
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 group-hover:bg-emerald-500/20" 
                        : "bg-red-500/10 text-red-500 border border-red-500/10 group-hover:bg-red-500/20"
                )}>
                    {isUp ? <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> : <ArrowDownRight size={12} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />}
                    {change}
                </div>
            </div>

            <div className="flex flex-col relative z-10">
                <span className="text-3xl font-black text-white tracking-tighter group-hover:text-yellow-500 transition-colors duration-500">{value}</span>
                <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black group-hover:text-gray-500 transition-colors">Live Pulse</span>
                </div>
            </div>
        </div>
    )

    if (href) {
        return <Link href={href} className="block h-full">{CardContent}</Link>
    }

    return CardContent
}

export default StatCard
