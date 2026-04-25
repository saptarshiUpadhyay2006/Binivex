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
        <div className="dashboard-card p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/5 cursor-pointer group h-full">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    {icon && <div className="text-gray-400 group-hover:text-yellow-500 transition-colors">{icon}</div>}
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-wider">{title}</span>
                </div>
                <div className={cn(
                    "flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm",
                    isUp ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20" : "bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/20"
                )}>
                    {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                </div>
            </div>

            <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-100 tracking-tight group-hover:text-white transition-colors">{value}</span>
                <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.2em] font-bold group-hover:text-gray-500 transition-colors">Live Market Data</span>
            </div>
        </div>
    )

    if (href) {
        return <Link href={href} className="block h-full">{CardContent}</Link>
    }

    return CardContent
}

export default StatCard
