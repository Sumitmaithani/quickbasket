"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ItemCard } from "@/components/shared/ItemCard";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { useAuthStore } from "@/store/authStore";
import { CatalogService } from "@/network/services/catalogService";
import { Category, Item, Banner } from "@/types";

export default function HomePage() {
  const { addresses, selectedAddressId } = useAuthStore();
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [frequentItems, setFrequentItems] = useState<Item[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [cats, freq, bans] = await Promise.all([
        CatalogService.getCategories(),
        CatalogService.getFrequentlyBought(),
        CatalogService.getBanners(),
      ]);
      setCategories(cats);
      setFrequentItems(freq);
      setBanners(bans);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      const results = await CatalogService.searchItems(searchQuery);
      setSearchResults(results);
      setSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-white">
      {/* Address bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-2">
        <Link href="/location" className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">
                {selectedAddress?.label || "Select Address"}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 truncate">
              {selectedAddress
                ? `${selectedAddress.line1}, ${selectedAddress.city}`
                : "Tap to set delivery location"}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3 text-green-600" />
            <span className="text-xs font-medium text-green-700">18 min</span>
          </div>
        </Link>

        {/* Search */}
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search for groceries, essentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Search Results Overlay */}
      {searchQuery.trim() && (
        <div className="px-4 py-4">
          {searching ? (
            <p className="text-sm text-gray-500 text-center py-8">Searching...</p>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No results for &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-500">{searchResults.length} items found</p>
              {searchResults.map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main content — hide when searching */}
      {!searchQuery.trim() && (
        <>
          {/* Banners */}
          <div className="px-4 py-3">
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {banners.map((banner) => (
                <Link key={banner.id} href={banner.linkTo} className="flex-shrink-0">
                  <div
                    className="w-72 h-32 rounded-xl p-4 flex flex-col justify-end"
                    style={{ backgroundColor: banner.bgColor }}
                  >
                    <h3 className="text-base font-bold text-gray-900">
                      {banner.title}
                    </h3>
                    <p className="text-xs text-gray-600">{banner.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 py-3">
            <h2 className="text-base font-semibold mb-3">Shop by Category</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                  <span className="text-[10px] text-center font-medium text-gray-700 leading-tight">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Reorder / Frequently bought */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold">Buy Again</h2>
              <Badge variant="secondary" className="text-[10px]">
                Based on your orders
              </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {frequentItems.slice(0, 6).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="px-4 py-3 mb-4">
            <h2 className="text-base font-semibold mb-3">Trending Now</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {frequentItems.slice(6, 10).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
