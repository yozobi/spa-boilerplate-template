import React, { Suspense } from 'react';
import { UrqlWrapper } from './UrqlWrapper';
import { Routes } from './Routes';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-700">
      <Suspense fallback={null}>
        <UrqlWrapper>
          <main className="max-w-4xl px-6 py-8 mx-auto font-mono text-gray-100">
            <Routes />
          </main>
        </UrqlWrapper>
      </Suspense>
    </div>
  );
};
export default App;
