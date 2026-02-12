import React, { useState, useMemo } from 'react';
import { 
  User, 
  Phone, 
  IdCard, 
  ShieldCheck, 
  Stethoscope, 
  Venus, 
  Activity, 
  FileText, 
  Baby, 
  Bed,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Camera,
  AlertCircle
} from 'lucide-react';

const PatientRegistration = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', gender: '', dob: '', mobile: '', chiefComplaint: '', consentTreatment: false,
    maritalStatus: '', bloodGroup: '', nationality: '', aadhaar: '',
    email: '', address: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    patientId: '', opdNumber: '', admissionDate: '', arrivalMode: '',
    insuranceProvider: '', policyNumber: '', policyHolder: '', paymentMode: '',
    illnessDesc: '', allergies: '', medications: '', lifestyleHabits: '',
    lmp: '', pregnancy: '', obstetric: '',
    height: '', weight: '', bp: '', pulse: '', temp: '', spo2: '',
    consentData: false, organDonation: '',
    guardianName: '', guardianRelation: '', guardianId: '',
    wardType: '', attendingDoctor: '', advanceAmount: ''
  });

  // Mandatory fields for submission
  const REQUIRED_FIELDS = ['fullName', 'mobile', 'chiefComplaint', 'consentTreatment'];

  const sections = [
    { title: 'Personal Information', icon: <User size={20} />, fields: ['fullName', 'gender', 'dob', 'maritalStatus', 'bloodGroup', 'nationality', 'aadhaar'] },
    { title: 'Contact Details', icon: <Phone size={20} />, fields: ['mobile', 'email', 'address', 'emergencyName', 'emergencyPhone'] },
    { title: 'Identification & Registration', icon: <IdCard size={20} />, fields: ['patientId', 'opdNumber', 'admissionDate', 'arrivalMode'] },
    { title: 'Insurance / Payment', icon: <ShieldCheck size={20} />, fields: ['insuranceProvider', 'policyNumber', 'paymentMode'] },
    { title: 'Medical History', icon: <Stethoscope size={20} />, fields: ['chiefComplaint', 'illnessDesc', 'allergies', 'medications'] },
    { title: 'For Female Patients', icon: <Venus size={20} />, fields: ['lmp', 'pregnancy', 'obstetric'], condition: formData.gender === 'Female' },
    { title: 'Clinical Assessment', icon: <Activity size={20} />, fields: ['height', 'weight', 'bp', 'pulse', 'temp', 'spo2'] },
    { title: 'Consent & Legal Forms', icon: <FileText size={20} />, fields: ['consentTreatment', 'consentData'] },
    { title: 'For Minor Patients', icon: <Baby size={20} />, fields: ['guardianName', 'guardianRelation'], condition: formData.dob ? (new Date().getFullYear() - new Date(formData.dob).getFullYear()) < 18 : false },
    { title: 'Admission Details', icon: <Bed size={20} />, fields: ['wardType', 'attendingDoctor', 'advanceAmount'] },
  ];

  const progress = useMemo(() => {
    const relevantFields = sections.filter(s => s.condition !== false).flatMap(s => s.fields);
    const filledFields = relevantFields.filter(f => formData[f] !== '' && formData[f] !== false && formData[f] !== undefined);
    return Math.round((filledFields.length / relevantFields.length) * 100);
  }, [formData, sections]);

  const isSubmissionReady = useMemo(() => {
    return REQUIRED_FIELDS.every(field => formData[field] !== '' && formData[field] !== false && formData[field] !== undefined);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleSection = (index) => setActiveSection(activeSection === index ? null : index);

  const renderField = (label, name, type = "text", options = null) => {
    const isRequired = REQUIRED_FIELDS.includes(name);
    return (
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm font-semibold text-slate-700">
          {label} {isRequired && <span className="text-red-500 font-bold">*</span>}
        </label>
        {options ? (
          <select name={name} value={formData[name]} onChange={handleInputChange} className="p-2.5 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Option</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : type === 'checkbox' ? (
          <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border transition-all ${isRequired && !formData[name] ? 'border-amber-100 bg-amber-50/30' : 'border-transparent'}`}>
            <input type="checkbox" name={name} checked={formData[name]} onChange={handleInputChange} className="w-5 h-5 accent-blue-600 rounded" />
            <span className="text-sm text-slate-600">Acknowledged / Yes</span>
          </label>
        ) : (
          <input type={type} name={name} value={formData[name]} onChange={handleInputChange} className="p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder={`Enter ${label}`} />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mt-6">
      <div className="bg-blue-600 p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Activity className="animate-pulse" /> Patient Registration</h1>
            <p className="text-blue-100 text-sm mt-1">Capture essential patient data for smart routing.</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">Progress: {progress}%</div>
        </div>
        <div className="w-full bg-blue-900/30 h-2.5 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {sections.map((section, idx) => {
          if (section.condition === false) return null;
          const isOpen = activeSection === idx;
          const isCompleted = section.fields.every(f => formData[f] !== '' && formData[f] !== false);
          return (
            <div key={idx} className={`border rounded-xl transition-all ${isOpen ? 'border-blue-300 shadow-md ring-1 ring-blue-50' : 'border-slate-200 hover:border-blue-100'}`}>
              <button onClick={() => toggleSection(idx)} className="w-full flex items-center justify-between p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{section.icon}</div>
                  <div>
                    <h3 className={`font-bold ${isOpen ? 'text-blue-700' : 'text-slate-700'}`}>{idx + 1}. {section.title}</h3>
                    {isCompleted && !isOpen && <span className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1"><CheckCircle2 size={12} /> Complete</span>}
                  </div>
                </div>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-50 animate-in fade-in slide-in-from-top-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-4">
                    {idx === 0 && (
                      <>
                        {renderField("Full Name", "fullName")}
                        {renderField("Gender", "gender", "select", ["Male", "Female", "Other"])}
                        {renderField("Date of Birth", "dob", "date")}
                        {renderField("Marital Status", "maritalStatus", "select", ["Single", "Married", "Divorced", "Widowed"])}
                        {renderField("Blood Group", "bloodGroup", "select", ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])}
                        {renderField("Aadhaar Number", "aadhaar")}
                        <div className="sm:col-span-2 pt-2">
                           <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 cursor-pointer text-slate-400"><Camera className="mx-auto mb-1" /> <span className="text-xs">Upload Photo</span></div>
                        </div>
                      </>
                    )}
                    {idx === 1 && (
                      <>
                        {renderField("Mobile Number", "mobile", "tel")}
                        {renderField("Email ID", "email", "email")}
                        <div className="sm:col-span-2">{renderField("Address", "address")}</div>
                      </>
                    )}
                    {idx === 4 && <div className="sm:col-span-2">{renderField("Chief Complaint", "chiefComplaint")}</div>}
                    {idx === 7 && <div className="sm:col-span-2">{renderField("Consent for Treatment", "consentTreatment", "checkbox")}</div>}
                    {/* Add other indices similarly if needed */}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="text-sm font-medium">
          {isSubmissionReady ? <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 size={16} /> Ready</span> : <span className="text-amber-600 flex items-center gap-1"><AlertCircle size={16} /> Fill mandatory (*) fields</span>}
        </div>
        <button onClick={() => alert("Submitted!")} disabled={!isSubmissionReady} className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${isSubmissionReady ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>Submit Record</button>
      </div>
    </div>
  );
};

export default PatientRegistration;