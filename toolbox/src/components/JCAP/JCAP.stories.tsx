import classNames from 'classnames';
import React from 'react';
import Flex from '../Flex/Flex';
import HeroIconMenu from '../HeroIcons/HeroIconMenu';
import HeroIconNotification from '../HeroIcons/HeroIconNotification';
import HeroIconUser from '../HeroIcons/HeroIconUser';

export default { title: 'JCAP' };

export const Menu = () => {
  return (
    <div
      className={classNames(
        'flex bg-white h-16 items-center justify-between',
        'px-6',
        'sm:border-b',
      )}
    >
      <a className={classNames('inline-block')} href="#" title="Home">
        <img
          src="https://jcap.co.uk/wp-content/uploads/2014/04/jcap-home-logo.png"
          className={classNames('h-8', 'w-18', 'object-fit')}
          alt="JCAP Logo"
        ></img>
      </a>
      <nav>
        <Flex alignItems="center" mx={4}>
          <button
            className={classNames(
              'focus:outline-none',
              'bg-warning-400',
              'focus:bg-warning-500',
              'text-warning-900',
              'font-semibold',
              'px-4',
              'sm:px-6',
              'sm:pl-5',
              'rounded-lg',
              'py-1',
              'text-xs',
              'inline-flex',
              'items-center',
            )}
          >
            <HeroIconNotification className="h-4 w-4"></HeroIconNotification>
            <span className="ml-1 sm:ml-2">
              1 <span className="hidden sm:inline-block">Alert</span>
            </span>
          </button>
          <button
            className={classNames(
              'focus:outline-none',
              'text-primary-900',
              'bg-primary-300',
              'focus:bg-primary-400',
              'font-semibold',
              'px-4',
              'sm:px-6',
              'sm:pl-5',
              'rounded-lg',
              'py-1',
              'text-xs',
              'inline-flex',
              'items-center',
            )}
          >
            <HeroIconMenu className="h-4 w-4"></HeroIconMenu>
            <span className="hidden sm:block ml-2">Menu</span>
          </button>
        </Flex>
      </nav>
    </div>
  );
};

export const ProfilePhotoButton = () => {
  return (
    <button
      className={classNames(
        'w-20',
        'h-20',
        'border-4',
        'rounded-full',
        'focus:outline-none',
        'focus:border-gray-500',
        'focus:shadow-lg',
        'flex',
        'border-gray-400',
        'flex-col',
        'justify-end',
        'items-stretch',
        'overflow-hidden',
        'group',
      )}
    >
      <div
        className={classNames('flex', 'justify-center')}
        style={{ transform: 'translateY(6px)' }}
      >
        <HeroIconUser
          className={classNames('h-12', 'w-12', 'text-center', 'text-gray-400')}
        ></HeroIconUser>
      </div>
      <span
        className={classNames(
          'bg-gray-400',
          'w-full',
          'flex',
          'justify-center',
          'h-6',
          'items-center',
          'uppercase',
          'text-white',
          'text-xs',
          'tracking-wider',
        )}
      >
        Add
      </span>
    </button>
  );
};
