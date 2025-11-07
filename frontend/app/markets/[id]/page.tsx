'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { mockMarkets } from '@/lib/mockData'
import { ArrowLeft, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { toast } from 'sonner'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Markets/Navbar'

const MarketDetail = () => {
  const { id } = useParams()
  const market = mockMarkets.find((m) => m.id === id)
  const [amount, setAmount] = useState('')

  if (!market) {
    return (
      <div className="min-h-screen bg-[#0B2B29]  flex items-center justify-center">
        <div className="text-center text-[#E9F7F6]">
          <h2 className="text-2xl font-bold mb-4">Market not found</h2>
          <Link href="/markets">
            <Button className="bg-[#0F3532] text-[#E9F7F6] border border-[#1A4743] rounded-xl px-4 py-2">
              Back to Markets
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleTrade = (position: 'yes' | 'no', action: 'buy' | 'sell') => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    toast.info('Connect your wallet to trade', {
      description: 'This is a demo interface. Connect a Web3 wallet to enable trading.',
    })
  }

  return (
    <div className="min-h-screen bg-[#0B2B29] text-[#E9F7F6] ">
        <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/markets">
          <Button className="mb-6 gap-2 flex items-center text-[#E9F7F6] bg-transparent hover:bg-[#0D2F2D] rounded-xl px-3 py-2 border border-[#1A4743]">
            <ArrowLeft className="w-4 h-4 text-[#7AA3A1]" /> Back to Markets
          </Button>
        </Link>

        {/* Header */}
        <Card className="mb-8 bg-[#0F3532] border border-[#1A4743] rounded-xl">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-4 text-[#E9F7F6]">
                  {market.question}
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-[#7AA3A1]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#7AA3A1]" />
                    Closes {formatDistanceToNow(market.resolutionDate, { addSuffix: true })}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[#7AA3A1]" />
                    ${(market.volume / 1000).toFixed(1)}K volume
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-[#7AA3A1]" />
                    {market.category}
                  </div>
                </div>
              </div>

              <Badge className="bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 rounded-xl px-3 py-1">
                {market.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-[#7AA3A1]">{market.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <Card className="lg:col-span-2 bg-[#0F3532] border border-[#1A4743] rounded-xl">
            <CardHeader>
              <CardTitle className="text-[#E9F7F6]">Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={market.priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A4743" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    stroke="#7AA3A1"
                  />
                  <YAxis stroke="#7AA3A1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F3532',
                      border: '1px solid #1A4743',
                      borderRadius: '10px',
                      color: '#E9F7F6',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="yesPrice" stroke="#16A34A" strokeWidth={2} name="YES" />
                  <Line type="monotone" dataKey="noPrice" stroke="#DC2626" strokeWidth={2} name="NO" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trade Box */}
          <Card className="bg-[#0F3532] border border-[#1A4743] h-fit rounded-xl sticky top-24">
            <CardHeader>
              <CardTitle className="text-[#E9F7F6]">Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#E9F7F6]">
                  Amount (ETH)
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#0D2F2D] text-[#E9F7F6] border border-[#1A4743] rounded-xl"
                />
              </div>

              <div className="space-y-4">
                {/* YES */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 text-white rounded-xl bg-gradient-to-br from-[#16A34A] to-[#11c55c] hover:opacity-90"
                    onClick={() => handleTrade('yes', 'buy')}
                  >
                    Buy YES ${market.yesPrice.toFixed(2)}
                  </Button>
                  <Button
                    className="flex-1 rounded-xl border border-[#1A4743] bg-[#0B2B29] text-[#7AA3A1] hover:border-[#2b6d68]"
                    onClick={() => handleTrade('yes', 'sell')}
                  >
                    Sell YES
                  </Button>
                </div>

                {/* NO */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 text-white rounded-xl bg-gradient-to-br from-[#DC2626] to-[#f03d3d] hover:opacity-90"
                    onClick={() => handleTrade('no', 'buy')}
                  >
                    Buy NO ${market.noPrice.toFixed(2)}
                  </Button>
                  <Button
                    className="flex-1 rounded-xl border border-[#1A4743] bg-[#0B2B29] text-[#7AA3A1] hover:border-[#2b6d68]"
                    onClick={() => handleTrade('no', 'sell')}
                  >
                    Sell NO
                  </Button>
                </div>
              </div>

              {amount && parseFloat(amount) > 0 && (
                <div className="p-4 rounded-xl bg-[#0D2F2D] space-y-2 mt-4 border border-[#1A4743]">
                  <div className="flex justify-between text-sm text-[#7AA3A1]">
                    <span>Est. Shares (YES)</span>
                    <span className="text-[#E9F7F6] font-medium">
                      {(parseFloat(amount) / market.yesPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-[#7AA3A1]">
                    <span>Est. Shares (NO)</span>
                    <span className="text-[#E9F7F6] font-medium">
                      {(parseFloat(amount) / market.noPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MarketDetail
