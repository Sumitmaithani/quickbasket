"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { CatalogService } from "@/network/services/catalogService";
import { Category } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CatalogService.getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Categories" />
      <div className="px-4 py-4 space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
              <p className="text-xs text-green-600 mt-1">{cat.itemCount} items</p>
            </div>
            <span className="text-gray-300 text-lg">&rsaquo;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
