'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import MarketCard from './MarketCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockMarkets, Market } from '@/lib/mockData';
import { Search, Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const Markets = () => {
  const [filter, setFilter] = useState<Market['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredMarkets = mockMarkets.filter((market) => {
    const matchesFilter = filter === 'all' || market.status === filter;
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedMarkets = filteredMarkets.slice(0, displayedCount);
  const hasMore = displayedCount < filteredMarkets.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredMarkets.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, filteredMarkets.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen ">
      {/* Sticky Header with Filters */}
      <div className="sticky top-14    backdrop-blur-sm border-[#01333f] border-b">
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search prediction markets..."
              className="pl-10 bg-card text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
              className="whitespace-nowrap"
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
              size="sm"
              className="whitespace-nowrap"
            >
              Active
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              size="sm"
              className="whitespace-nowrap"
            >
              Pending
            </Button>
            <Button
              variant={filter === 'resolved' ? 'default' : 'outline'}
              onClick={() => setFilter('resolved')}
              size="sm"
              className="whitespace-nowrap"
            >
              Resolved
            </Button>
          </div>
        </div>
      </div>

      {/* Feed-style Markets */}
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="space-y-3 sm:space-y-4">
          {displayedMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {/* Intersection observer target */}
        {hasMore && !isLoading && (
          <div ref={observerTarget} className="h-20" />
        )}

        {/* No results message */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-base sm:text-lg">No markets found</p>
          </div>
        )}

        {/* End of results message */}
        {!hasMore && displayedMarkets.length > 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">You've reached the end</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Markets;
