import { ArrowLeftIcon, FilterIcon, Verified } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import FilterSidebar from "../components/FilterSidebar";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const navigate = useNavigate();
  const [showFilterPhone, setShowFilterPhone] = useState(false);
  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monetized: false,
  });
  const { listings } = useSelector((state) => state.listing);

  {
    /*Filters logic*/
  }
  const filteredListings = listings.filter((listing) => {
    // Platform filter
    if (filters.platform && filters.platform.length > 0) {
      if (!filters.platform.includes(listing.platform)) return false;
    }

    // Maximum price filter
    if (filters.maxPrice) {
      if (listing.price > filters.maxPrice) return false;
    }

    // Minimum followers filter
    if (filters.minFollowers) {
      if (listing.followers_count < filters.minFollowers) return false;
    }

    // Niche filter
    if (filters.niche && listing.niche !== filters.niche) {
      return false;
    }
    // Verified filter
    if (filters.verified && listing.verified !== filters.verified) {
      return false;
    }

    // Monetized filter
    if (filters.monetized && listing.monetized !== filters.monetized) {
      return false;
    }

    //search
    if (search) {
      const trimmed = search.trim().toLowerCase();

      if (
        !listing.title?.toLowerCase().includes(trimmed) &&
        !listing.username?.toLowerCase().includes(trimmed) &&
        !listing.description?.toLowerCase().includes(trimmed) &&
        !listing.platform?.toLowerCase().includes(trimmed) &&
        !listing.niche?.toLowerCase().includes(trimmed)
      ) {
        return false;
      }
    }
    return true; // If all conditions pass, include listing
  });
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center justify-between text-slate-500">
        <button
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 py-5"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Home
        </button>
        <button
          onClick={() => setShowFilterPhone(true)}
          className="flex sm:hidden items-center gap-2 py-5"
        >
          <FilterIcon className="size-4" /> Filters
        </button>
      </div>
      <div className="relative flex items-start justify-between gap-8 pb-8">
        <FilterSidebar
          setFilters={setFilters}
          filters={filters}
          setShowFilterPhone={setShowFilterPhone}
          showFilterPhone={showFilterPhone}
        />
        <div className="flex-1 grid xl:grid-cols-2 gap-4">
          {filteredListings
            .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
            .map((listing, index) => (
              <ListingCard listing={listing} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

/*
========================================
ARRAY.SORT() – CONCEPT NOTES
========================================

1️⃣ What is .sort()?

- .sort() is a JavaScript array method.
- It arranges elements in an array.
- It MUTATES (changes) the original array.

----------------------------------------

2️⃣ Basic Syntax

array.sort((a, b) => {
   // return value decides order
})

----------------------------------------

3️⃣ How Compare Function Works

When comparing two items (a, b):

Return < 0  → a comes before b
Return > 0  → b comes before a
Return 0    → keep original order

----------------------------------------

4️⃣ Example – Number Sorting

Ascending:

[5, 2, 9, 1].sort((a, b) => a - b);

Explanation:
If result is negative → a placed first
If positive → b placed first

----------------------------------------

5️⃣ Sorting Objects

Example Object:

{
  title: "House",
  featured: true
}

Goal:
Show featured listings first.

----------------------------------------

6️⃣ Sorting by Boolean Property

.sort((a, b) => {
   if (a.featured && !b.featured) return -1;
   if (!a.featured && b.featured) return 1;
   return 0;
});

Logic:
If a is featured → put a first
If b is featured → put b first
Otherwise keep order

----------------------------------------

7️⃣ Cleaner Professional Way

.sort((a, b) => Number(b.featured) - Number(a.featured))

Why this works:
true  → 1
false → 0

So:
1 - 0 = positive  → b first
0 - 1 = negative  → a first

----------------------------------------

8️⃣ IMPORTANT – Redux Safety Rule

.sort() mutates original array ❌

If using Redux state:

WRONG:
listings.sort(...)

CORRECT:
[...listings].sort(...)

Always copy array before sorting.

----------------------------------------

9️⃣ Mental Model

Sort compares TWO elements at a time and decides:

"Who should come first?"

Return negative → first wins
Return positive → second wins
Return 0 → no change

========================================
END OF CONCEPT
========================================
*/
