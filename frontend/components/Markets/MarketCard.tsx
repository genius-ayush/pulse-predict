// import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, DollarSign, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { Market } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface MarketCardProps {
  market: Market;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const getStatusColor = (status: Market['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'resolved':
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Card className=" overflow-hidden bg-[#172626] border-[#294040] text-white">
      {/* Header with creator info */}
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-[#294040]">
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarFallback className=" text-xs sm:text-sm">
            {market.question.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs sm:text-sm truncate">Prediction Market</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(Date.now() - Math.random() * 86400000), { addSuffix: true })}
          </p>
        </div>
        <Badge className={getStatusColor(market.status)} variant="outline">
          <span className="text-xs">{market.status}</span>
        </Badge>
      </div>

      {/* Main Content */}
      <Link href={`/markets/${market.id}`}>
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 cursor-pointer hover:bg-accent/5 transition-colors">
          <h3 className="text-base sm:text-lg font-semibold leading-snug">
            {market.question}
          </h3>

          {/* Price Display - Social Media Style */}
          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                  <span className="text-xs font-medium text-muted-foreground">YES</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-success">
                  ${market.yesPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(market.yesPrice * 100).toFixed(0)}% chance
                </p>
              </div>
              
              <div className="w-px h-12 sm:h-16 bg-border" />
              
              <div className="flex-1 space-y-1 text-right">
                <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                  <span className="text-xs font-medium text-muted-foreground">NO</span>
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-destructive rotate-180" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-destructive">
                  ${market.noPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(market.noPrice * 100).toFixed(0)}% chance
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Engagement Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-3 sm:px-4 py-2 sm:py-3 border-t border-[#294040] text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>${(market.volume / 1000).toFixed(1)}K volume</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{Math.floor(Math.random() * 500 + 50)} traders</span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{formatDistanceToNow(market.resolutionDate, { addSuffix: true })}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 px-3 sm:px-4 pb-3 sm:pb-4 text-black">
        <Button variant="outline" className="flex-1" size="sm" asChild>
          <Link href={`/markets/${market.id}`}>
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="text-xs sm:text-sm">Trade</span>
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className='bg-white'>
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default MarketCard;
