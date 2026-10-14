import React, { createContext, useContext, useState, useMemo } from "react";
import { Job } from "../types";
import { sampleJobs } from "../data/sampleJobs";
import { useAuth } from "./AuthContext";
import { checkJobEligibility } from "../utils/eligibility";

interface JobsContextType {
  jobs: Job[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedAgency: string;
  setSelectedAgency: (agency: string) => void;
  selectedQualification: string;
  setSelectedQualification: (qualification: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  onlyEligible: boolean;
  setOnlyEligible: (val: boolean) => void;
  filteredJobs: Job[];
  getJobById: (id: string) => Job | undefined;
  resetFilters: () => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("All");
  const [selectedQualification, setSelectedQualification] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [onlyEligible, setOnlyEligible] = useState(false);

  const { user } = useAuth();

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesDept = job.department.toLowerCase().includes(q);
        const matchesAgency = job.agency.toLowerCase().includes(q);
        const matchesAdvt = job.notificationNumber.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDept && !matchesAgency && !matchesAdvt && !matchesDesc) {
          return false;
        }
      }

      // 2. Agency Filter
      if (selectedAgency !== "All" && job.agency !== selectedAgency) {
        return false;
      }

      // 3. Qualification Filter
      if (selectedQualification !== "All") {
        if (selectedQualification === "Graduate" && job.qualificationRequired !== "Graduate") {
          return false;
        }
        if (selectedQualification === "12th" && job.qualificationRequired !== "12th") {
          return false;
        }
        if (selectedQualification === "10th" && job.qualificationRequired !== "10th") {
          return false;
        }
      }

      // 4. Location
      if (selectedLocation !== "All") {
        if (!job.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // 5. Only Eligible
      if (onlyEligible && user) {
        const eligibility = checkJobEligibility(user, job);
        if (!eligibility.isEligible) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, searchQuery, selectedAgency, selectedQualification, selectedLocation, onlyEligible, user]);

  const getJobById = (id: string) => {
    return jobs.find((j) => j.id === id);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedAgency("All");
    setSelectedQualification("All");
    setSelectedLocation("All");
    setOnlyEligible(false);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        searchQuery,
        setSearchQuery,
        selectedAgency,
        setSelectedAgency,
        selectedQualification,
        setSelectedQualification,
        selectedLocation,
        setSelectedLocation,
        onlyEligible,
        setOnlyEligible,
        filteredJobs,
        getJobById,
        resetFilters,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used within a JobsProvider");
  return context;
};
