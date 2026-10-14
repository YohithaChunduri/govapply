import React from "react";
import { Search, RotateCcw, Filter, CheckSquare, Square } from "lucide-react";
import { useJobs } from "../../context/JobsContext";
import { useAuth } from "../../context/AuthContext";

export const JobFilter: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedAgency,
    setSelectedAgency,
    selectedQualification,
    setSelectedQualification,
    onlyEligible,
    setOnlyEligible,
    resetFilters,
  } = useJobs();

  const { isAuthenticated } = useAuth();

  const agencies = ["All", "SSC", "RRB", "IBPS", "Police", "State PSC", "Defence"];
  const qualifications = ["All", "Graduate", "12th", "10th"];

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 space-y-3.5 shadow-xs text-left">
      {/* Search Input Bar */}
      <div className="relative">
        <label htmlFor="search-jobs" className="sr-only">
          Search jobs, departments, exams
        </label>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="search-jobs"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs, departments, exams (e.g., CGL, Railways, PO, Police)..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2546] focus-visible:bg-white transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Row: Agency / Board + Qualification + Eligibility Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Recruitment Agency Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold uppercase text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Board:
          </span>
          {agencies.map((agency) => (
            <button
              key={agency}
              type="button"
              onClick={() => setSelectedAgency(agency)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                selectedAgency === agency
                  ? "bg-[#0B2546] text-white font-semibold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {agency}
            </button>
          ))}
        </div>

        {/* Qualification Filter & Profile Match Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase text-slate-500">Min Edu:</span>
            <select
              value={selectedQualification}
              onChange={(e) => setSelectedQualification(e.target.value)}
              className="text-xs border border-slate-300 rounded px-2 py-1 bg-white text-slate-800 focus-visible:outline-none"
            >
              {qualifications.map((q) => (
                <option key={q} value={q}>
                  {q === "All" ? "All Levels" : q}
                </option>
              ))}
            </select>
          </div>

          {/* Eligibility Toggle */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setOnlyEligible(!onlyEligible)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border cursor-pointer transition-colors ${
                onlyEligible
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {onlyEligible ? (
                <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>Eligible for my profile</span>
            </button>
          )}

          {/* Reset Filters */}
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors ml-auto cursor-pointer"
            title="Reset all search filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
