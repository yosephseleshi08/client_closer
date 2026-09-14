import React from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-[1728px] mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#161c28]/90 border border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c0c1ff]/20 flex items-center justify-center text-[#c0c1ff] border border-[#c0c1ff]/30">
            <BarChart3 className="w-5 h-5 text-[#c0c1ff]" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3]">
              Insights & Telemetry Analytics
            </h2>
            <p className="text-[13px] text-[#c7c4d7]/70">
              Cross-Platform Attenuation, Reply Acceleration, and Close Velocity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-telemetry text-[12px] text-[#4cd7f6] bg-[#009eb9]/20 px-3 py-1.5 rounded-lg border border-[#4cd7f6]/30">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+18.4% 7-Day Velocity Surge</span>
        </div>
      </div>

      {/* Metric Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-xl bg-[#161c28]/80 border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase font-bold">AVG TIME TO FIRST REPLY</span>
            <Clock className="w-4 h-4 text-[#4cd7f6]" />
          </div>
          <div className="my-3">
            <span className="font-display text-3xl font-bold text-[#dde2f3]">18.5 hrs</span>
            <span className="text-[12px] text-[#4cd7f6] block mt-1 font-telemetry">
              -3.4 hrs faster than benchmark
            </span>
          </div>
          <div className="w-full bg-[#080e1a] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#4cd7f6] h-full w-[82%]"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-xl bg-[#161c28]/80 border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase font-bold">MOCKUP-TO-CONTRACT RATIO</span>
            <TrendingUp className="w-4 h-4 text-[#c0c1ff]" />
          </div>
          <div className="my-3">
            <span className="font-display text-3xl font-bold text-[#c0c1ff]">31.6%</span>
            <span className="text-[12px] text-[#c7c4d7]/70 block mt-1 font-telemetry">
              68 signed contracts from 215 delivered mockups
            </span>
          </div>
          <div className="w-full bg-[#080e1a] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#c0c1ff] h-full w-[68%]"></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-xl bg-[#161c28]/80 border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase font-bold">ANNUAL REVENUE PIPELINE RUNWAY</span>
            <DollarSign className="w-4 h-4 text-[#e9ddff]" />
          </div>
          <div className="my-3">
            <span className="font-display text-3xl font-bold text-[#e9ddff]">$594,000</span>
            <span className="text-[12px] text-[#e9ddff]/80 block mt-1 font-telemetry">
              Extrapolated FY2025 at current deal trajectory
            </span>
          </div>
          <div className="w-full bg-[#080e1a] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#e9ddff] h-full w-[94%]"></div>
          </div>
        </div>

      </div>

      {/* Platform Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Instagram DM Channel */}
        <div className="p-5 rounded-xl bg-[#161c28]/80 border border-white/[0.08] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-[16px] text-[#dde2f3]">
              Instagram DM Channel Efficiency
            </span>
            <span className="px-2 py-0.5 rounded bg-[#009eb9]/20 text-[#4cd7f6] font-telemetry text-[11px]">
              614 Active Leads
            </span>
          </div>

          <div className="space-y-3 font-telemetry text-[12px]">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#c7c4d7]">Open / Seen Rate</span>
                <span className="text-[#dde2f3] font-bold">78.2%</span>
              </div>
              <div className="w-full bg-[#080e1a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4cd7f6] h-full w-[78.2%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#c7c4d7]">Reply / Inbound Conversion</span>
                <span className="text-[#dde2f3] font-bold">32.4%</span>
              </div>
              <div className="w-full bg-[#080e1a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#c0c1ff] h-full w-[32.4%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#c7c4d7]">Demo Mockup Approval</span>
                <span className="text-[#dde2f3] font-bold">41.0%</span>
              </div>
              <div className="w-full bg-[#080e1a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#8083ff] h-full w-[41%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* TikTok DM Channel */}
        <div className="p-5 rounded-xl bg-[#161c28]/80 border border-white/[0.08] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-[16px] text-[#dde2f3]">
              TikTok Direct Channel Efficiency
            </span>
            <span className="px-2 py-0.5 rounded bg-[#571bc1]/30 text-[#e9ddff] font-telemetry text-[11px]">
              278 Active Leads
            </span>
          </div>

          <div className="space-y-3 font-telemetry text-[12px]">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#c7c4d7]">Open / Seen Rate</span>
                <span className="text-[#dde2f3] font-bold">64.5%</span>
              </div>
              <div className="w-full bg-[#080e1a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#d0bcff] h-full w-[64.5%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#c7c4d7]">Reply / Inbound Conversion</span>
                <span className="text-[#dde2f3] font-bold">21.8%</span>
              </div>
              <div className="w-full bg-[#080e1a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#8083ff] h-full w-[21.8%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#c7c4d7]">Demo Mockup Approval</span>
                <span className="text-[#dde2f3] font-bold">28.5%</span>
              </div>
              <div className="w-full bg-[#080e1a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#c4abff] h-full w-[28.5%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
