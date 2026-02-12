import React, { useState } from 'react';
import { 
  Building, MapPin, Phone, UserCog, HeartPulse, Bed, Droplets, Truck, 
  Wind, ChevronDown, ChevronUp, Settings, Activity,
  Users, Stethoscope, Zap, AlertCircle, CheckCircle2,
  XCircle, MapPinned, Lock, Plus, X
} from 'lucide-react';

const HospitalAdminPortal = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  
  const [hospitalData, setHospitalData] = useState({
    // Section 1: Basic Info
    hospName: '', hospType: '', regNo: '', nabh: '', yearEstablished: '', 
    hospCategory: '',
    
    // Section 2: Location
    street: '', city: '', state: '', pinCode: '', landmark: '', 
    latitude: '', longitude: '', mapsLink: '', serviceRadius: '',
    
    // Section 3: Contact
    hospPhone: '', emergencyPhone: '', email: '', website: '', whatsapp: '',
    
    // Section 4: Admin Account
    adminName: '', adminDesignation: '', adminPhone: '', adminEmail: '', 
    password: '', mfaEnabled: false,
    
    // Section 5: Specialties
    specialties: [],
    customDepartments: [],
    
    // Section 6: Infrastructure
    totalBeds: '', generalBeds: '', icuBeds: '', hduBeds: '', pediatricICU: '',
    nicu: '', isolationBeds: '', ventilators: '',
    
    // Section 7: Blood Bank
    hasBloodBank: false,
    bloodStock: {
      'A+': '', 'A-': '', 'B+': '', 'B-': '', 'O+': '', 'O-': '', 'AB+': '', 'AB-': ''
    },
    plasmaAvailable: false, plateletsAvailable: false,
    
    // Section 8: Ambulance
    hasAmbulance: false, ambulanceCount: '', ambulanceTypes: [],
    avgResponseTime: '', gpsIntegrated: false, ambulanceTiming: '',
    
    // Section 9: Oxygen & Equipment
    centralOxygen: false, oxygenCylinders: '', oxygenPlant: false, 
    oxygenStatus: '',
    
    equipment: {
      ventilators: { total: '', available: '', status: 'green' },
      bipap: { total: '', available: '', status: 'green' },
      defibrillators: { total: '', available: '', status: 'green' },
      cardiacMonitors: { total: '', available: '', status: 'green' },
      dialysisMachines: { total: '', available: '', status: 'green' },
      ctScan: { total: '', available: '', status: 'green' },
      mri: { total: '', available: '', status: 'green' },
      ultrasound: { total: '', available: '', status: 'green' },
      ecg: { total: '', available: '', status: 'green' },
      bloodGasAnalyzer: { total: '', available: '', status: 'green' }
    }
  });

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setHospitalData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleBloodStock = (bloodGroup, value) => {
    setHospitalData(prev => ({
      ...prev,
      bloodStock: { ...prev.bloodStock, [bloodGroup]: value }
    }));
  };

  const handleEquipment = (equipName, field, value) => {
    setHospitalData(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [equipName]: { ...prev.equipment[equipName], [field]: value }
      }
    }));
  };

  const toggleSpecialty = (spec) => {
    setHospitalData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(spec) 
        ? prev.specialties.filter(s => s !== spec) 
        : [...prev.specialties, spec]
    }));
  };

  const toggleAmbulanceType = (type) => {
    setHospitalData(prev => ({
      ...prev,
      ambulanceTypes: prev.ambulanceTypes.includes(type)
        ? prev.ambulanceTypes.filter(t => t !== type)
        : [...prev.ambulanceTypes, type]
    }));
  };

  const addCustomDepartment = (dept) => {
    if (dept && !hospitalData.customDepartments.includes(dept)) {
      setHospitalData(prev => ({
        ...prev,
        customDepartments: [...prev.customDepartments, dept]
      }));
    }
  };

  const allSections = [
    { id: 0, title: 'Basic Hospital Information', icon: <Building size={18}/>, color: 'blue' },
    { id: 1, title: 'Location Details', icon: <MapPin size={18}/>, color: 'emerald' },
    { id: 2, title: 'Contact Information', icon: <Phone size={18}/>, color: 'violet' },
    { id: 3, title: 'Administrator Account', icon: <UserCog size={18}/>, color: 'amber' },
    { id: 4, title: 'Specialties & Departments', icon: <HeartPulse size={18}/>, color: 'rose' },
    { id: 5, title: 'Infrastructure & Bed Capacity', icon: <Bed size={18}/>, color: 'cyan' },
    { id: 6, title: 'Blood Bank Management', icon: <Droplets size={18}/>, color: 'red' },
    { id: 7, title: 'Doctor Management', icon: <Stethoscope size={18}/>, color: 'indigo' },
    { id: 8, title: 'Ambulance Services', icon: <Truck size={18}/>, color: 'orange' },
    { id: 9, title: 'Oxygen & Critical Equipment', icon: <Wind size={18}/>, color: 'teal' },
  ];

  const specialtiesList = [
    "Cardiology", "Neurology", "Orthopedics", "General Medicine", 
    "Emergency & Trauma", "Pediatrics", "Gynecology", "Oncology", 
    "Nephrology", "Gastroenterology", "Dermatology", "ENT", 
    "Psychiatry", "Surgery (General / Laparoscopic)", "ICU & Critical Care"
  ];

  const ambulanceTypesList = [
    "Basic Life Support (BLS)", 
    "Advanced Life Support (ALS)", 
    "Cardiac Ambulance", 
    "Neonatal Ambulance"
  ];

  const equipmentList = [
    { key: 'ventilators', label: 'Ventilators' },
    { key: 'bipap', label: 'BiPAP / CPAP' },
    { key: 'defibrillators', label: 'Defibrillators' },
    { key: 'cardiacMonitors', label: 'Cardiac Monitors' },
    { key: 'dialysisMachines', label: 'Dialysis Machines' },
    { key: 'ctScan', label: 'CT Scan' },
    { key: 'mri', label: 'MRI' },
    { key: 'ultrasound', label: 'Ultrasound' },
    { key: 'ecg', label: 'ECG Machines' },
    { key: 'bloodGasAnalyzer', label: 'Blood Gas Analyzer' }
  ];

  const renderField = (label, name, type = "text", options = null, fullWidth = false, required = false) => (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select 
          name={name} 
          value={hospitalData[name]} 
          onChange={handleInput} 
          className="px-3 py-2.5 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
        >
          <option value="">Select {label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          name={name} 
          value={hospitalData[name]} 
          onChange={handleInput} 
          className="px-3 py-2.5 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium placeholder:text-slate-400" 
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );

  const getColorClasses = (color, active) => {
    const colors = {
      blue: active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-blue-50 text-blue-600',
      emerald: active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-emerald-50 text-emerald-600',
      violet: active ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-violet-50 text-violet-600',
      amber: active ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-amber-50 text-amber-600',
      rose: active ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'bg-rose-50 text-rose-600',
      cyan: active ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-cyan-50 text-cyan-600',
      red: active ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-red-50 text-red-600',
      indigo: active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50 text-indigo-600',
      orange: active ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-orange-50 text-orange-600',
      teal: active ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'bg-teal-50 text-teal-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">HealthConnect</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hospital Administration Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-blue-50 border-2 border-blue-100 rounded-xl flex items-center gap-2">
               <Zap className="text-blue-600" size={16} />
               <span className="text-xs font-black text-blue-700 uppercase tracking-wide">Live Dashboard</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 px-6">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-lg">
            <h3 className="font-black text-slate-900 mb-5 flex items-center gap-2 text-lg">
              <Settings size={20} className="text-blue-600" /> 
              Hospital Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100">
                <span className="text-xs font-black text-slate-600 uppercase tracking-wide">Specialties</span>
                <span className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {hospitalData.specialties.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-100">
                <span className="text-xs font-black text-slate-600 uppercase tracking-wide">Bed Count</span>
                <span className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {hospitalData.totalBeds || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border-2 border-rose-100">
                <span className="text-xs font-black text-slate-600 uppercase tracking-wide">Doctors</span>
                <span className="font-black text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {doctors.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl">
            <h4 className="text-lg font-black mb-2 flex items-center gap-2">
              <Lock size={18} className="text-blue-400" />
              Secure Data
            </h4>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              All entered infrastructure data is synced in real-time with emergency routing systems.
            </p>
            <div className="space-y-2">
               <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                 <CheckCircle2 size={14} className="text-emerald-400" /> End-to-end Encryption
               </div>
               <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                 <CheckCircle2 size={14} className="text-emerald-400" /> Multi-cloud Backup
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="lg:col-span-8 space-y-4">
          {allSections.map(s => (
            <div 
              key={s.id} 
              className={`bg-white border-2 rounded-3xl shadow-lg transition-all ${
                activeSection === s.id 
                  ? 'border-blue-300 ring-4 ring-blue-50' 
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <button 
                onClick={() => setActiveSection(s.id)} 
                className="w-full p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all ${getColorClasses(s.color, activeSection === s.id)}`}>
                    {s.icon}
                  </div>
                  <span className={`font-black text-lg ${activeSection === s.id ? 'text-slate-900' : 'text-slate-600'}`}>
                    {s.title}
                  </span>
                </div>
                {activeSection === s.id ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
              </button>
              
              {activeSection === s.id && (
                <div className="px-6 pb-6 pt-2 border-t-2 border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Render inputs based on section ID */}
                    {s.id === 0 && (
                      <>
                        {renderField("Hospital Name", "hospName", "text", null, true, true)}
                        {renderField("Hospital Type", "hospType", "select", ["Government", "Private", "Trust / NGO"], false, true)}
                        {renderField("Category", "hospCategory", "select", ["Multispeciality", "Clinic", "Trauma Center"], false, true)}
                        {renderField("Reg No.", "regNo", "text", null, false, true)}
                        {renderField("Year Est.", "yearEstablished", "number")}
                      </>
                    )}

                    {s.id === 1 && (
                      <>
                        {renderField("Street", "street", "text", null, true)}
                        {renderField("City", "city")}
                        {renderField("State", "state")}
                        {renderField("PIN Code", "pinCode")}
                      </>
                    )}

                    {s.id === 4 && (
                      <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {specialtiesList.map(spec => (
                          <button 
                            key={spec} 
                            onClick={() => toggleSpecialty(spec)}
                            className={`p-3 rounded-xl border-2 font-bold text-xs transition-all ${
                              hospitalData.specialties.includes(spec)
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'
                            }`}
                          >
                            {spec}
                          </button>
                        ))}
                      </div>
                    )}

                    {s.id === 5 && (
                      <>
                        {renderField("Total Beds", "totalBeds", "number", null, false, true)}
                        {renderField("ICU Beds", "icuBeds", "number")}
                        {renderField("General Beds", "generalBeds", "number")}
                        {renderField("Ventilators", "ventilators", "number")}
                      </>
                    )}

                    {s.id === 6 && (
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border-2 border-rose-100 mb-4 cursor-pointer">
                          <input type="checkbox" name="hasBloodBank" checked={hospitalData.hasBloodBank} onChange={handleInput} className="w-5 h-5 accent-rose-600" />
                          <span className="font-bold text-slate-700">In-house Blood Bank</span>
                        </label>
                        {hospitalData.hasBloodBank && (
                          <div className="grid grid-cols-4 gap-3">
                            {Object.keys(hospitalData.bloodStock).map(bg => (
                              <div key={bg} className="text-center">
                                <label className="text-xs font-black text-rose-600">{bg}</label>
                                <input type="number" onChange={(e) => handleBloodStock(bg, e.target.value)} className="w-full p-2 border-2 border-rose-100 rounded-lg text-center font-bold" placeholder="0" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {s.id === 7 && (
                      <div className="md:col-span-2">
                        <button 
                          onClick={() => setShowAddDoctor(!showAddDoctor)}
                          className="w-full p-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                        >
                          <Plus size={18} /> Add Doctor Profile
                        </button>
                      </div>
                    )}

                    {s.id === 9 && (
                      <div className="md:col-span-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center gap-3 p-4 bg-teal-50 rounded-2xl border-2 border-teal-100">
                            <input type="checkbox" name="centralOxygen" checked={hospitalData.centralOxygen} onChange={handleInput} className="w-5 h-5 accent-teal-600" />
                            <span className="font-bold text-slate-700">Central Oxygen</span>
                          </label>
                          {renderField("Oxygen Status", "oxygenStatus", "select", ["Adequate", "Limited", "Critical"])}
                        </div>
                        <div className="space-y-2 mt-4">
                           <h4 className="font-black text-slate-800 text-sm mb-2">Live Equipment Availability</h4>
                           {equipmentList.slice(0, 4).map(equip => (
                             <div key={equip.key} className="flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl">
                               <span className="font-bold text-slate-600">{equip.label}</span>
                               <div className="flex gap-2">
                                 <input type="number" placeholder="Total" className="w-20 p-2 border rounded-lg text-center text-xs" />
                                 <input type="number" placeholder="Avail" className="w-20 p-2 border rounded-lg text-center text-xs bg-white" />
                               </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Action Footer */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h3 className="text-white font-black text-lg">Update Hospital Record</h3>
              <p className="text-blue-100 text-xs font-medium">Last synced: Just now</p>
            </div>
            <button className="px-8 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-wider text-xs">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdminPortal;