import React from 'react';
import { AnimatedButtonBase } from './AnimatedButtonBase';

export default { title: 'AnimatedButtonBase' };

export const withText = () => (
  <div className="p-6">
    <AnimatedButtonBase>Hello AnimatedButtonBase</AnimatedButtonBase>
  </div>
);

export const colors = () => (
  <div className="p-6 flex w-full max-w-2xl justify-between">
    <AnimatedButtonBase>Primary (default)</AnimatedButtonBase>
    <AnimatedButtonBase color="gray">Gray</AnimatedButtonBase>
    <AnimatedButtonBase color="success">Success</AnimatedButtonBase>
    <AnimatedButtonBase color="info">Info</AnimatedButtonBase>
    <AnimatedButtonBase color="warning">Warning</AnimatedButtonBase>
    <AnimatedButtonBase color="danger">Danger</AnimatedButtonBase>
    <AnimatedButtonBase color="smoke">Smoke</AnimatedButtonBase>
  </div>
);

export const withEmoji = () => (
  <div className="p-6">
    <AnimatedButtonBase>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </AnimatedButtonBase>
  </div>
);
