import React, { Suspense } from 'react';
import * as allExports from '../../exports';
import ToastContainer from '../ToastContainer/ToastContainer';
import { toast } from 'react-toastify';

const heroIconRegex = /^Hero/;

const heroIcons = Object.entries(allExports).filter(([key, value]) =>
  heroIconRegex.test(key),
);

export default {
  title: 'HeroIcons',
};

export const Icons = () => {
  const copyToClipboard = (name: string) => {
    navigator.permissions
      .query({ name: 'clipboard-write' } as any)
      .then((result: any) => {
        if (result.state == 'granted' || result.state == 'prompt') {
          navigator.clipboard.writeText(`<${name} />`).then(
            function() {
              toast(`Copied <${name} /> to clipboard!`);
            },
            function() {
              toast.error(`Could not copy to clipboard...`);
            },
          );
        }
      });
  };
  return (
    <>
      <div className="p-6 grid grid-cols-4 gap-6 max-w-3xl">
        {heroIcons.map(([name, Icon]: any[]) => {
          return (
            <div className="flex justify-center" key={name}>
              <button
                className="flex flex-col items-center px-4 py-2 focus:outline-none focus:bg-gray-200 hover:bg-gray-100"
                style={{ cursor: 'copy' }}
                onClick={() => copyToClipboard(name)}
              >
                <Suspense fallback={null}>
                  <Icon className="text-gray-600 w-8 h-8" />
                </Suspense>
                <p
                  className="text-gray-700 font-mono tracking-wider text-xs mt-2"
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
