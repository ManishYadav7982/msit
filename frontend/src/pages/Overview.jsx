import { useNavigate } from "react-router-dom";
import { Heart, Navigation, Users, MapPin, Clock, CheckCircle, Search, Phone } from "lucide-react";

const Overview = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Navigation,
      title: "Smart Wayfinding",
      description: "Step-by-step indoor navigation to departments and services"
    },
    {
      icon: Clock,
      title: "Wait Time Tracking",
      description: "Real-time updates on wait times and availability"
    },
    {
      icon: Users,
      title: "Check-In System",
      description: "Seamless check-in with digital forms and confirmations"
    },
    {
      icon: MapPin,
      title: "Hospital Maps",
      description: "Interactive floor plans and department locations"
    },
    {
      icon: Phone,
      title: "Quick Support",
      description: "Connect with staff and find support services instantly"
    },
    {
      icon: Heart,
      title: "Patient Care",
      description: "Organized information for better healthcare experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Soft background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-slate-200/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-slate-800">LifeLine</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Content */}
            <div className="space-y-8 animate-smooth-fade">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-slate-800">
                  Hospital
                  <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                    Wayfinding
                  </span>
                  Made Easy
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  Navigate hospitals with confidence. LifeLine guides you to the right place, at the right time, with real-time information.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 flex-wrap pt-4 hidden">
                <button
                  onClick={() => navigate("/user")}
                  className="px-8 py-4 rounded-2xl bg-orange-400 text-white font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: 'hsl(11, 87%, 79%)' }}
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/admin")}
                  className="px-8 py-4 rounded-2xl neomorph-raised font-bold text-lg text-slate-700 hover:text-orange-500 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="neomorph-raised p-5">
                  <div className="text-2xl font-bold text-orange-500">100+</div>
                  <div className="text-sm text-slate-600 mt-1">Hospitals</div>
                </div>
                <div className="neomorph-raised p-5">
                  <div className="text-2xl font-bold text-orange-600">500K+</div>
                  <div className="text-sm text-slate-600 mt-1">Patient Visits</div>
                </div>
                <div className="neomorph-raised p-5">
                  <div className="text-2xl font-bold text-orange-700">24/7</div>
                  <div className="text-sm text-slate-600 mt-1">Available</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-slide-in">
              <div className="neomorph-raised p-10">
                <div className="grid grid-cols-2 gap-5">
                  {features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="neomorph-raised p-6 text-center">
                      <feature.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                      <div className="text-sm font-bold text-slate-800 mb-1">{feature.title}</div>
                      <div className="text-xs text-slate-500">{feature.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Choose Role Section - MOVED UP */}
          <div className="space-y-12 mb-24">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Get Started</h2>
              <p className="text-lg text-slate-600">Sign up as a patient or hospital administrator</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 auto-rows-fr">
              {[
                {
                  title: "👤 Patient Signup",
                  description: "Find departments, check wait times, and complete digital forms before arrival.",
                  benefits: [
                    "Scan QR code or search for your appointment",
                    "Get instant navigation to your location",
                    "Real-time wait time information",
                    "Digital check-in and forms"
                  ],
                  color: "from-orange-50 to-amber-50",
                  accentColor: "border-orange-200",
                  buttonColor: "from-orange-400 to-orange-500",
                  path: "/user"
                },
                {
                  title: "🏥 Hospital Signup",
                  description: "Manage hospital data, optimize operations, and improve patient flow.",
                  benefits: [
                    "Update department locations and availability",
                    "Monitor patient flow and wait times",
                    "Manage check-in workflows",
                    "Generate analytics and reports"
                  ],
                  color: "from-amber-50 to-orange-50",
                  accentColor: "border-amber-200",
                  buttonColor: "from-amber-400 to-orange-400",
                  path: "/admin"
                }
              ].map((role, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(role.path)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className={`bg-gradient-to-br ${role.color} rounded-3xl border-2 ${role.accentColor} p-10 neomorph-raised hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col`}>
                    <div className="mb-6 flex-grow">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{role.title}</h3>
                      <p className="text-slate-600">{role.description}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {role.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-3 rounded-2xl text-white font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 mt-auto`} style={{ backgroundColor: 'hsl(11, 87%, 79%)' }}>
                      {role.title.includes("Patient") ? "Patient Signup" : "Hospital Signup"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Intelligent Features</h2>
              <p className="text-lg text-slate-600">Everything you need for a seamless hospital experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="neomorph-raised p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="neomorph-raised p-12 text-center">
              <Navigation className="w-24 h-24 text-orange-400 mx-auto mb-6 opacity-80" />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-6">Why LifeLine?</h2>
                <div className="space-y-4">
                  {[
                    { title: "Calm Environment", desc: "Soft design and smooth transitions create a soothing experience" },
                    { title: "Accessible Design", desc: "Bold, clear headings and easy navigation for all users" },
                    { title: "Professional Interface", desc: "Organized and intuitive system for hospitals and patients" },
                    { title: "Real-Time Updates", desc: "Always know wait times, locations, and availability" }
                  ].map((item, i) => (
                    <div key={i} className="neomorph-raised p-5 text-left">
                      <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="neomorph-raised bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-12 text-center mb-20">
            <Heart className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Vision</h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform hospital navigation into a calm, organized, and life-affirming experience. We believe every patient deserves clarity, confidence, and compassionate guidance through their healthcare journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Professional", "Organized", "Accessible", "Life-Affirming"].map((vision, idx) => (
                <span key={idx} className="neomorph-raised px-5 py-2 text-slate-700 font-semibold">
                  {vision}
                </span>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Ready to Navigate with Confidence?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Start your LifeLine journey today and experience hospital navigation reimagined.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate("/user")}
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: 'hsl(11, 87%, 79%)' }}
              >
                Patient Signup
              </button>
              <button
                onClick={() => navigate("/admin")}
                className="px-8 py-4 rounded-2xl neomorph-raised font-bold text-lg text-slate-700 hover:bg-slate-50 transition-all duration-300"
              >
                Hospital Signup
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200/50 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-600">
            <p className="font-semibold text-slate-800 mb-2">LifeLine - Hospital Wayfinding & Check-In</p>
            <p className="text-sm">Transforming patient navigation into a calm, organized experience</p>
            <p className="text-xs mt-4 text-slate-500">© 2026 LifeLine. Navigating care, together.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Overview;
