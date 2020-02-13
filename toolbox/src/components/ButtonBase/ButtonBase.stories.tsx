import React from 'react';
import { ButtonBase } from './ButtonBase';

export default { title: 'ButtonBase' };

export const withText = () => (
  <div className="p-6">
    <ButtonBase>Hello ButtonBase</ButtonBase>
  </div>
);

export const gray = () => (
  <div className="p-6">
    <ButtonBase color="gray">Hello ButtonBase</ButtonBase>
  </div>
);

export const withEmoji = () => (
  <div className="p-6">
    <ButtonBase>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </ButtonBase>
  </div>
);
