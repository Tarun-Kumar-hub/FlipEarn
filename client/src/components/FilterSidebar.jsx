import { X, Filter, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({
  showFilterPhone,
  setShowFilterPhone,
  filters,
  setFilters,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const onChangeSearch = (e) => {
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
      setSearch(e.target.value);
    } else {
      navigate("/marketplace");
      setSearch("");
    }
  };

  const [expandedSections, setExpandedsections] = useState({
    platform: true,
    price: true,
    followers: true,
    niche: true,
    status: true,
  });

  const toggleSection = (section) => {
    setExpandedsections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  /*
  Why we use [section] instead of section:

  section is a variable that holds the name of the key
  Example:
    section = "price"

  If we write:
    section: false

  It creates a key literally named "section" ❌

  Result:
    {
      platform: true,
      price: true,
      followers: true,
      section: false   // wrong key
    }

  But when we write:
    [section]: false

  It dynamically uses the value inside the variable.

  So if:
    section = "price"

  It becomes:
    {
      platform: true,
      price: false,   // correctly toggled
      followers: true
    }

  This feature is called "Computed Property Names" (ES6).

  We also use:
    ...prev

  To copy all previous state values,
  and only update the selected section
  without removing other keys.
*/

  const onClearFilters = () => {
    // If search exists, navigate back to marketplace without query
    if (search) {
      navigate("/marketplace");
    }

    // Reset all filters to default values
    setFilters({
      platform: null,
      maxPrice: 100000,
      minFollowers: 0,
      niche: null,
      verified: false,
      monetized: false,
    });
  };
  const platforms = [
    { value: "youtube", label: "YouTube" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitch", label: "Twitch" },
    { value: "discord", label: "Discord" },
  ];

  const niches = [
    { value: "lifestyle", label: "Lifestyle" },
    { value: "fitness", label: "Fitness" },
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
    { value: "tech", label: "Technology" },
    { value: "gaming", label: "Gaming" },
    { value: "fashion", label: "Fashion" },
    { value: "beauty", label: "Beauty" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "music", label: "Music" },
    { value: "art", label: "Art" },
    { value: "sports", label: "Sports" },
    { value: "health", label: "Health" },
    { value: "finance", label: "Finance" },
  ];

  return (
    <div
      className={`${
        showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"
      } max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll 
      bg-white rounded-lg shadow-sm border border-gray-200 
      h-fit sticky top-24 md:min-w-[300px]`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="size-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            <X
              onClick={() => onClearFilters()}
              className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            />
            <button
              onClick={() => setShowFilterPhone(false)}
              className="sm:hidden text-sm border text-gray-700 px-3 py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <input
            type="text"
            onChange={onChangeSearch}
            value={search}
            placeholder="Search by username, platform, niche, etc."
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md outline-indigo-500"
          />
        </div>

        {/* Platform Filter */}
        <div>
          <button
            onClick={() => toggleSection("platform")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label>Platform</label>
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                expandedSections.platform ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Platforms in Platform Filters */}
          {expandedSections.platform && (
            <div className="flex flex-col gap-2">
              {platforms.map((platform) => (
                <label
                  key={platform.value}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <input
                    type="checkbox"
                    name="platform"
                    /*
            Controlled checkbox:
            - If platform.value exists inside filters.platform array
            - Then checkbox is checked
            - Otherwise unchecked
          */
                    checked={
                      filters.platform?.includes(platform.value) || false
                    }
                    /*
            Runs when user checks or unchecks checkbox
          */
                    onChange={(e) => {
                      const value = platform.value;

                      setFilters((prev) => {
                        const current = prev.platform || [];
                        // Get currently selected platforms
                        // If platform is null/undefined, use empty array

                        return {
                          ...prev,

                          platform: e.target.checked
                            ? [...current, value]
                            : // If checkbox is checked → add value to array (immutably)

                              current.filter((p) => p !== value),
                          // If checkbox is unchecked → remove value from array (immutably)
                        };
                      });
                    }}
                  />
                  <span>{platform.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label>Price Range</label>
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                expandedSections.price ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.price && (
            <div className="space-y-3">
              {/* Range Slider */}
              <input
                type="range"
                min="0" // Minimum price
                max="100000" // Maximum price
                step="100" // Increase/decrease in steps of 100
                value={filters.maxPrice || 100000}
                /*
        When user drags the slider
        - Convert value to number
        - Update filters state
      */
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              {/* Price labels below slider */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                {/* Minimum label */}
                <span>{currency}0</span>

                {/* Maximum selected price formatted nicely */}
                <span>
                  {currency}
                  {(filters.maxPrice || 100000).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Minimum Followers */}
        <div>
          <button
            onClick={() => toggleSection("followers")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label>Minimum Followers</label>
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                expandedSections.followers ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.followers && (
            <select
              value={filters.minFollowers ?? 0}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minFollowers: Number(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 outline-indigo-500"
            >
              <option value="0">Any amount</option>
              <option value="1000">1K+</option>
              <option value="10000">10K+</option>
              <option value="50000">50K+</option>
              <option value="100000">100K+</option>
              <option value="500000">500K+</option>
              <option value="1000000">1M+</option>
            </select>
          )}
        </div>
        {/* Niche Filter */}
        <div>
          <button
            onClick={() => toggleSection("niche")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label>Niche</label>
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                expandedSections.niche ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.niche && (
            <select
              value={filters.niche ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  niche: e.target.value || null,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 outline-indigo-500"
            >
              <option value="">All niches</option>
              {niches.map((niche) => (
                <option key={niche.value} value={niche.value}>
                  {niche.label}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Verification Status */}
        <div>
          <button
            onClick={() => toggleSection("status")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label>Status</label>
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                expandedSections.status ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.status && (
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified || false}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev, // keep other filter values
                      verified: e.target.checked, // update only verified
                    }))
                  }
                />
                <span className="text-sm text-gray-700">
                  Verified accounts only
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.monetized || false}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev, // keep other filter values
                      monetized: e.target.checked, // update only monetized
                    }))
                  }
                />
                <span className="text-sm text-gray-700">
                  Monetized accounts only
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
