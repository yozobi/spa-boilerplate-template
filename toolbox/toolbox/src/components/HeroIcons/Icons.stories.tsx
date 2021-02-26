import React, { Suspense } from 'react';
import * as allExports from '../../exports';
import ToastContainer from '../ToastContainer/ToastContainer';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const heroIconRegex = /^Hero/;

const heroIcons = Object.entries(allExports).filter(([key, value]) =>
  heroIconRegex.test(key),
);

export default {
  title: 'HeroIcons',
};

export const Icons = () => {
  const copyToClipboard = useCopyToClipboard({
    onSuccess: (name) => {
      toast(`Copied ${name} to clipboard!`);
    },
    onError: () => {
      toast.error(`Could not copy to clipboard...`);
    },
  });
  return (
    <>
      <div className="grid max-w-3xl grid-cols-4 gap-6 p-6">
        {heroIcons.map(([name, Icon]: any[]) => {
          return (
            <div className="flex justify-center" key={name}>
              <button
                className="flex flex-col items-center px-4 py-2 focus:outline-none focus:bg-gray-200 hover:bg-gray-100"
                style={{ cursor: 'copy' }}
                onClick={() => copyToClipboard(`<${name} />`)}
              >
                <Suspense fallback={null}>
                  <Icon className="w-8 h-8 text-gray-600" />
                </Suspense>
                <p
                  className="mt-2 font-mono text-xs tracking-wider text-gray-700"
                  id={name}
                >
                  {name}
                </p>
              </button>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};
