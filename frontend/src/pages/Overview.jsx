import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-6 w-96">
        <h1 className="text-2xl font-bold text-slate-800">
          HealthConnect Portal
        </h1>

        <p className="text-slate-500 text-sm">
          Select your role to continue
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/user")}
            className="py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            User Portal
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
