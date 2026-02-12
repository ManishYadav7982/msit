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
    // 1. Personal
    fullName: '', gender: '', dob: '', maritalStatus: '', bloodGroup: '', nationality: '', aadhaar: '',
    // 2. Contact
    mobile: '', altPhone: '', email: '', address: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    // 3. ID
    patientId: '', opdNumber: '', admissionDate: '', referringDoctor: '', arrivalMode: '',
    // 4. Insurance
    insuranceProvider: '', policyNumber: '', policyHolder: '', tpa: '', employer: '', paymentMode: '',
    // 5. Medical History
    chiefComplaint: '', illnessDesc: '', allergies: '', medications: '', lifestyleHabits: '',
    // 6. Female
    lmp: '', pregnancy: '', obstetric: '', breastfeeding: '',
    // 7. Clinical
    height: '', weight: '', bp: '', pulse: '', temp: '', spo2: '',
    // 8. Consent
    consentTreatment: false, consentData: false, organDonation: '',
    // 9. Minor
    guardianName: '', guardianRelation: '', guardianId: '',
    // 10. Admission
    wardType: '', bedNumber: '', attendingDoctor: '', advanceAmount: ''
  });

  // Define mandatory fields required for submission
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
    const relevantFields = sections
      .filter(s => s.condition !== false)
      .flatMap(s => s.fields);
    
    const filledFields = relevantFields.filter(field => {
      const val = formData[field];
      return val !== '' && val !== false && val !== undefined;
    });

    return Math.round((filledFields.length / relevantFields.length) * 100);
  }, [formData, sections]);

  // Check if mandatory fields are filled
  const isSubmissionReady = useMemo(() => {
    return REQUIRED_FIELDS.every(field => {
      const val = formData[field];
      return val !== '' && val !== false && val !== undefined;
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const renderField = (label, name, type = "text", options = null) => {
    const isChecked = type === 'checkbox' ? formData[name] : false;
    const isRequired = REQUIRED_FIELDS.includes(name);
    
    return (
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm font-semibold text-slate-700">
          {label} {isRequired && <span className="text-red-500 font-bold">*</span>}
        </label>
        {options ? (
          <select 
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className={`p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${isRequired && !formData[name] ? 'border-slate-200' : 'border-slate-200'}`}
          >
            <option value="">Select Option</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : type === 'checkbox' ? (
          <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border transition-all ${isRequired && !isChecked ? 'border-amber-100 bg-amber-50/30' : 'border-transparent'}`}>
            <input 
              type="checkbox" 
              name={name} 
              checked={isChecked} 
              onChange={handleInputChange}
              className="w-5 h-5 accent-blue-600 rounded"
            />
            <span className="text-sm text-slate-600">Acknowledged / Yes</span>
          </label>
        ) : (
          <input 
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className="p-2.5 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder={`Enter ${label}`}
          />
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    if (isSubmissionReady) {
      // Logic for successful submission box or action
      const message = `Patient Record for ${formData.fullName} has been initialized successfully. Total completion: ${progress}%`;
      console.log("Form Submitted:", formData);
      // In a real app, we would send this to an API
      alert(message); // Using placeholder for visual feedback
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="animate-pulse" /> 
                Patient Registration Portal
              </h1>
              <p className="text-blue-100 text-sm mt-1">Please provide accurate medical and personal data.</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
              Form Progress: {progress}%
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-blue-900/30 h-3 rounded-full overflow-hidden border border-blue-400/20">
            <div 
              className="h-full bg-emerald-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-3">
          {sections.map((section, idx) => {
            if (section.condition === false) return null;
            
            const isOpen = activeSection === idx;
            const isCompleted = section.fields.every(f => {
              const val = formData[f];
              return val !== '' && val !== false && val !== undefined;
            });

            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition-all duration-300 ${isOpen ? 'border-blue-300 shadow-md ring-1 ring-blue-50' : 'border-slate-200 hover:border-blue-200'}`}
              >
                <button 
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors flex items-center justify-center ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-700'}`}>
                        {idx + 1}. {section.title}
                      </h3>
                      {isCompleted && !isOpen && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold uppercase tracking-wider">
                          <CheckCircle2 size={12} /> Complete
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 border-t border-slate-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 mt-4">
                      {idx === 0 && (
                        <>
                          {renderField("Full Name (as per ID)", "fullName")}
                          {renderField("Gender", "gender", "select", ["Male", "Female", "Other"])}
                          {renderField("Date of Birth", "dob", "date")}
                          {renderField("Marital Status", "maritalStatus", "select", ["Single", "Married", "Divorced", "Widowed"])}
                          {renderField("Blood Group", "bloodGroup", "select", ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])}
                          {renderField("Nationality", "nationality")}
                          {renderField("Aadhaar Number", "aadhaar")}
                          <div className="sm:col-span-2">
                             <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors cursor-pointer group">
                                <div className="flex justify-center mb-2 text-slate-400 group-hover:text-blue-500">
                                  <Camera size={32} />
                                </div>
                                <p className="text-xs text-slate-500">Upload Patient Photograph</p>
                             </div>
                          </div>
                        </>
                      )}

                      {idx === 1 && (
                        <>
                          {renderField("Mobile Number", "mobile", "tel")}
                          {renderField("Email ID", "email", "email")}
                          <div className="sm:col-span-2">{renderField("Residential Address", "address")}</div>
                          {renderField("Emergency Contact Person", "emergencyName")}
                          {renderField("Relationship", "emergencyRelation")}
                          {renderField("Emergency Phone Number", "emergencyPhone", "tel")}
                        </>
                      )}

                      {idx === 2 && (
                        <>
                          {renderField("Patient ID", "patientId")}
                          {renderField("OPD/IPD Number", "opdNumber")}
                          {renderField("Admission Date", "admissionDate", "datetime-local")}
                          {renderField("Arrival Mode", "arrivalMode", "select", ["Self", "Ambulance", "Referral"])}
                        </>
                      )}

                      {idx === 3 && (
                        <>
                          {renderField("Insurance Provider", "insuranceProvider")}
                          {renderField("Policy Number", "policyNumber")}
                          {renderField("Policy Holder Name", "policyHolder")}
                          {renderField("Payment Mode", "paymentMode", "select", ["Cash", "Card", "UPI", "Insurance"])}
                        </>
                      )}

                      {idx === 4 && (
                        <>
                          <div className="sm:col-span-2">{renderField("Chief Complaint", "chiefComplaint")}</div>
                          <div className="sm:col-span-2">{renderField("History of Present Illness", "illnessDesc")}</div>
                          {renderField("Allergies", "allergies")}
                          {renderField("Current Medications", "medications")}
                        </>
                      )}

                      {idx === 5 && (
                        <>
                          {renderField("Last Menstrual Period", "lmp", "date")}
                          {renderField("Pregnancy Status", "pregnancy", "select", ["Yes", "No", "N/A"])}
                          {renderField("Obstetric History", "obstetric")}
                        </>
                      )}

                      {idx === 6 && (
                        <>
                          {renderField("Height (cm)", "height", "number")}
                          {renderField("Weight (kg)", "weight", "number")}
                          {renderField("Blood Pressure", "bp")}
                          {renderField("Pulse Rate (bpm)", "pulse", "number")}
                          {renderField("Temperature (°F)", "temp", "number")}
                          {renderField("Oxygen Saturation (%)", "spo2", "number")}
                        </>
                      )}

                      {idx === 7 && (
                        <div className="sm:col-span-2 space-y-2">
                          {renderField("Consent for Treatment", "consentTreatment", "checkbox")}
                          {renderField("Data Privacy Consent", "consentData", "checkbox")}
                          {renderField("Organ Donation Preference", "organDonation", "select", ["Yes", "No", "Undecided"])}
                        </div>
                      )}

                      {idx === 8 && (
                        <>
                          {renderField("Guardian Name", "guardianName")}
                          {renderField("Relationship", "guardianRelation")}
                          {renderField("Guardian ID Proof", "guardianId")}
                        </>
                      )}

                      {idx === 9 && (
                        <>
                          {renderField("Ward Type", "wardType", "select", ["General", "Private", "ICU", "Emergency"])}
                          {renderField("Attending Doctor", "attendingDoctor")}
                          {renderField("Advance Deposit", "advanceAmount", "number")}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            {isSubmissionReady ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={16} /> Ready for submission
              </span>
            ) : (
              <span className="text-amber-600 flex items-center gap-1">
                <AlertCircle size={16} /> Fill mandatory (*) fields to submit
              </span>
            )}
          </div>
          <button 
            onClick={handleSubmit}
            disabled={!isSubmissionReady}
            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${isSubmissionReady ? 'bg-blue-600 hover:bg-blue-700 text-white transform active:scale-95' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
          >
            Submit Patient Record
            {isSubmissionReady && <CheckCircle2 size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;