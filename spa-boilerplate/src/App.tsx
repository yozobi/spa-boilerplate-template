import React, { Suspense } from 'react';
import { UrqlWrapper } from 'toolbox';
import { Routes } from './Routes';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-700">
      <Suspense fallback={null}>
        <UrqlWrapper
          endpoint={process.env.REACT_APP_HASURA_ENDPOINT}
          superAdminKey={process.env.REACT_APP_HASURA_SECRET}
        >
          <main className="max-w-4xl px-6 py-8 mx-auto text-gray-100 font-mono">
            <Routes />
          </main>
        </UrqlWrapper>
      </Suspense>
    </div>
  );
};
export default App;
