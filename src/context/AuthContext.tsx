import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, StoredDocument } from "../types";
import { initialUserProfile } from "../data/sampleProfile";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrMobile: string, password?: string) => Promise<boolean>;
  loginWithDemo: () => void;
  logout: () => void;
  register: (data: { fullName: string; email: string; mobile: string }) => Promise<{ success: boolean; requiresOtp: boolean }>;
  verifyOtp: (code: string) => Promise<boolean>;
  updateProfile: (partial: Partial<UserProfile>) => void;
  addDocument: (doc: Omit<StoredDocument, "id" | "uploadDate">) => void;
  removeDocument: (docId: string) => void;
  replaceDocument: (docId: string, fileName: string, fileSize: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("govapply_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved user profile", e);
      }
    }
    // Default to preloaded authenticated sample profile for seamless evaluation
    return initialUserProfile;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("govapply_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("govapply_user");
    }
  }, [user]);

  const login = async (emailOrMobile: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setUser({
      ...initialUserProfile,
      email: emailOrMobile.includes("@") ? emailOrMobile : initialUserProfile.email,
      mobile: !emailOrMobile.includes("@") ? emailOrMobile : initialUserProfile.mobile,
    });
    return true;
  };

  const loginWithDemo = () => {
    setUser(initialUserProfile);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: { fullName: string; email: string; mobile: string }) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    // Temporary staged profile pending OTP
    sessionStorage.setItem(
      "govapply_pending_reg",
      JSON.stringify({
        ...initialUserProfile,
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        profileCompletionPercentage: 40,
      })
    );
    return { success: true, requiresOtp: true };
  };

  const verifyOtp = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsLoading(false);
    if (code.length === 6) {
      const pending = sessionStorage.getItem("govapply_pending_reg");
      if (pending) {
        setUser(JSON.parse(pending));
        sessionStorage.removeItem("govapply_pending_reg");
      } else {
        setUser(initialUserProfile);
      }
      return true;
    }
    return false;
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };
      // Recalculate profile completion
      let score = 50;
      if (updated.education && updated.education.length > 0) score += 20;
      if (updated.documents && updated.documents.length >= 4) score += 20;
      if (updated.categoryCertificateNo || updated.category === "UR") score += 10;
      updated.profileCompletionPercentage = Math.min(100, score);
      return updated;
    });
  };

  const addDocument = (doc: Omit<StoredDocument, "id" | "uploadDate">) => {
    setUser((prev) => {
      if (!prev) return null;
      const newDoc: StoredDocument = {
        ...doc,
        id: `doc-${Date.now()}`,
        uploadDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      };
      const updatedDocs = [...prev.documents, newDoc];
      return {
        ...prev,
        documents: updatedDocs,
      };
    });
  };

  const removeDocument = (docId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        documents: prev.documents.filter((d) => d.id !== docId),
      };
    });
  };

  const replaceDocument = (docId: string, fileName: string, fileSize: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedDocs = prev.documents.map((d) => {
        if (d.id === docId) {
          return {
            ...d,
            fileName,
            fileSize,
            status: "verified" as const,
            uploadDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          };
        }
        return d;
      });
      return {
        ...prev,
        documents: updatedDocs,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithDemo,
        logout,
        register,
        verifyOtp,
        updateProfile,
        addDocument,
        removeDocument,
        replaceDocument,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
