import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">This area is for site administration. Feature coming soon.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p>Admin settings will be available here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
