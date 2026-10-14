import React, { createContext, useContext, useState, useEffect } from "react";
import { ApplicationDraft, PortalNotification, Job } from "../types";
import { initialApplications, initialNotifications } from "../data/sampleApplications";
import { useAuth } from "./AuthContext";

interface ApplicationContextType {
  applications: ApplicationDraft[];
  notifications: PortalNotification[];
  createDraftForJob: (job: Job) => ApplicationDraft;
  updateApplication: (appId: string, updates: Partial<ApplicationDraft>) => void;
  confirmAndSubmitApplication: (appId: string, paymentMethod: string) => { success: boolean; trackingNumber: string };
  getApplicationById: (appId: string) => ApplicationDraft | undefined;
  markNotificationRead: (notifId: string) => void;
  clearAllNotifications: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<ApplicationDraft[]>(() => {
    const saved = localStorage.getItem("govapply_applications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved applications", e);
      }
    }
    return initialApplications;
  });

  const [notifications, setNotifications] = useState<PortalNotification[]>(() => {
    const saved = localStorage.getItem("govapply_notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }
    return initialNotifications;
  });

  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem("govapply_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("govapply_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const createDraftForJob = (job: Job): ApplicationDraft => {
    // Check if an existing draft exists for this job
    const existing = applications.find((a) => a.jobId === job.id);
    if (existing) {
      return existing;
    }

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `GA-2026-${randomSerial}`;

    // Determine official fee based on candidate category
    let officialFee = job.applicationFee.general;
    if (user) {
      if (user.gender === "Female") {
        officialFee = job.applicationFee.women;
      } else if (user.category === "SC" || user.category === "ST") {
        officialFee = job.applicationFee.reserved;
      }
    }

    // Auto-select documents
    const attachedDocs = [
      { documentId: "doc-photo", name: "Passport Photograph", specStatus: "compliant" as const },
      { documentId: "doc-signature", name: "Digital Signature", specStatus: "compliant" as const },
      { documentId: "doc-10th", name: "Class X DOB Proof", specStatus: "compliant" as const },
      { documentId: "doc-degree", name: "Graduation Degree", specStatus: "compliant" as const },
    ];

    if (user?.category !== "UR") {
      attachedDocs.push({
        documentId: "doc-obc",
        name: `${user?.category || "Category"} Certificate`,
        specStatus: "compliant" as const,
      });
    }

    const newDraft: ApplicationDraft = {
      id: `app-${job.id}-${Date.now()}`,
      trackingNumber,
      jobId: job.id,
      jobTitle: job.title,
      department: job.department,
      agency: job.agency,
      candidateName: user ? user.fullName : "Candidate",
      category: user ? user.category : "UR",
      appliedDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      status: "prepared",
      applicationFee: officialFee,
      platformServiceFee: 40,
      totalPaid: 0,
      paymentStatus: "unpaid",
      attachedDocuments: attachedDocs,
      formSnapshot: {
        personal: user ? { ...user } : {},
        education: user ? [...user.education] : [],
        categoryClaimed: user ? `${user.category} (Relaxation & Quota Claimed)` : "UR",
        declarationSigned: false,
      },
    };

    setApplications((prev) => [newDraft, ...prev]);

    // Push notification
    const newNotif: PortalNotification = {
      id: `notif-${Date.now()}`,
      title: "Application Draft Created",
      message: `Application ${trackingNumber} for ${job.title} has been prepared from your saved profile.`,
      timestamp: "Just now",
      type: "application",
      read: false,
      link: `/apply/${job.id}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newDraft;
  };

  const updateApplication = (appId: string, updates: Partial<ApplicationDraft>) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return { ...app, ...updates };
        }
        return app;
      })
    );
  };

  const confirmAndSubmitApplication = (appId: string, paymentMethod: string) => {
    const timestamp = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const payId = `PAY-SIM-${Date.now().toString().slice(-8)}`;

    let trackingNum = "";
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          trackingNum = app.trackingNumber;
          return {
            ...app,
            status: "submitted",
            paymentStatus: "paid",
            paymentId: payId,
            paymentMethod,
            totalPaid: app.platformServiceFee,
            appliedDate: timestamp,
            formSnapshot: {
              ...app.formSnapshot,
              declarationSigned: true,
            },
          };
        }
        return app;
      })
    );

    const confirmationNotif: PortalNotification = {
      id: `notif-sub-${Date.now()}`,
      title: "Application Lodged Successfully",
      message: `Your assisted application ${trackingNum} has been formally recorded. Reference acknowledgement generated.`,
      timestamp: "Just now",
      type: "application",
      read: false,
      link: `/applications/${appId}`,
    };
    setNotifications((prev) => [confirmationNotif, ...prev]);

    return { success: true, trackingNumber: trackingNum };
  };

  const getApplicationById = (appId: string) => {
    return applications.find((a) => a.id === appId || a.trackingNumber === appId);
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        notifications,
        createDraftForJob,
        updateApplication,
        confirmAndSubmitApplication,
        getApplicationById,
        markNotificationRead,
        clearAllNotifications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error("useApplications must be used within an ApplicationProvider");
  return context;
};
