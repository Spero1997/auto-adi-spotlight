
import React from 'react';
import { Helmet } from 'react-helmet';

const AdminStats = () => {
  return (
    <>
      <Helmet>
        <title>Statistiques | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Statistiques</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-gray-500">
            Cette fonctionnalité est en cours de développement.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminStats;
