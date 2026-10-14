import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  ShieldCheck,
  FolderOpen,
  Edit,
  Lock,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit form state
  const [name, setName] = useState(user?.fullName || "");
  const [father, setFather] = useState(user?.fatherName || "");
  const [mother, setMother] = useState(user?.motherName || "");
  const [mobileNum, setMobileNum] = useState(user?.mobile || "");
  const [emailAddr, setEmailAddr] = useState(user?.email || "");

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <Button variant="primary" size="sm" onClick={() => onNavigate("/login")}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: name,
      fatherName: father,
      motherName: mother,
      mobile: mobileNum,
      email: emailAddr,
    });
    setIsEditModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded bg-[#0B2546] text-white flex items-center justify-center font-bold text-lg uppercase shadow-2xs">
            {user.fullName.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.fullName}</h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Verified Dossier
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              GovApply Registration ID: {user.id} • Category: {user.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setName(user.fullName);
              setFather(user.fatherName);
              setMother(user.motherName);
              setMobileNum(user.mobile);
              setEmailAddr(user.email);
              setIsEditModalOpen(true);
            }}
            leftIcon={<Edit className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPasswordModalOpen(true)}
            leftIcon={<Lock className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Change Password
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              logout();
              onNavigate("/");
            }}
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Profile particulars updated and saved to your permanent candidate dossier.</span>
        </div>
      )}

      {/* SECTION 1: Personal Particulars */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <User className="w-4 h-4 text-[#0B2546]" />
          Personal Particulars
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Candidate Name</span>
            <span className="font-bold text-slate-900 text-sm">{user.fullName}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Father's Name</span>
            <span className="font-medium text-slate-800">{user.fatherName}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Mother's Name</span>
            <span className="font-medium text-slate-800">{user.motherName}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Date of Birth</span>
            <span className="font-medium text-slate-800">{user.dob}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Gender</span>
            <span className="font-medium text-slate-800">{user.gender}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Aadhaar (Identity)</span>
            <span className="font-mono text-slate-800">{user.aadhaarNumber}</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Contact & Address */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <Phone className="w-4 h-4 text-[#0B2546]" />
          Contact & Address Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Mobile Number</span>
            <span className="font-medium text-slate-800">{user.mobile}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Email Address</span>
            <span className="font-medium text-slate-800">{user.email}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Permanent Address</span>
            <span className="font-medium text-slate-800">
              {user.permanentAddress.street}, {user.permanentAddress.city}, {user.permanentAddress.district},{" "}
              {user.permanentAddress.state} - {user.permanentAddress.pincode}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: Education Records */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <GraduationCap className="w-4 h-4 text-[#0B2546]" />
          Educational Credentials
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr className="divide-x divide-slate-200">
                <th className="p-2">Level</th>
                <th className="p-2">Qualification Title</th>
                <th className="p-2">Board / Institution</th>
                <th className="p-2 text-center">Year</th>
                <th className="p-2 text-right">Percentage / CGPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {user.education.map((edu, idx) => (
                <tr key={idx} className="divide-x divide-slate-200">
                  <td className="p-2 font-bold">{edu.level}</td>
                  <td className="p-2">{edu.degreeName}</td>
                  <td className="p-2 text-slate-600">{edu.boardOrUniversity}</td>
                  <td className="p-2 text-center font-mono">{edu.passingYear}</td>
                  <td className="p-2 text-right font-bold text-emerald-800">{edu.percentageOrCgpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: Category & Reservation */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-[#0B2546]" />
          Category, Reservation & Domicile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Social Category</span>
            <span className="font-bold text-slate-900">{user.category}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Certificate Number</span>
            <span className="font-mono text-slate-800">{user.categoryCertificateNo || "N/A"}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-semibold">Domicile State</span>
            <span className="font-medium text-slate-800">{user.domicileState}</span>
          </div>
        </div>
      </div>

      {/* SECTION 5: Preferences */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <Bell className="w-4 h-4 text-[#0B2546]" />
          Notification & Alert Preferences
        </h2>

        <div className="space-y-2 text-xs text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#0B2546] border-slate-300" />
            <span>Send SMS alerts when new matching SSC, RRB or Banking notifications are announced.</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#0B2546] border-slate-300" />
            <span>Send deadline reminders 7 days before application closing date.</span>
          </label>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Candidate Information"
        subtitle="Update particulars in your permanent dossier"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-left text-xs">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Father's Name" value={father} onChange={(e) => setFather(e.target.value)} required />
          <Input label="Mother's Name" value={mother} onChange={(e) => setMother(e.target.value)} required />
          <Input label="Mobile Number" value={mobileNum} onChange={(e) => setMobileNum(e.target.value)} required />
          <Input label="Email Address" value={emailAddr} onChange={(e) => setEmailAddr(e.target.value)} required />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
        subtitle="Secure your GovApply account"
        maxWidth="sm"
      >
        <div className="space-y-4 text-left text-xs">
          <Input label="Current Password" type="password" placeholder="••••••••" required />
          <Input label="New Password (Min 8 chars)" type="password" placeholder="••••••••" required />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" required />
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert("Password updated successfully.");
                setIsPasswordModalOpen(false);
              }}
            >
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
