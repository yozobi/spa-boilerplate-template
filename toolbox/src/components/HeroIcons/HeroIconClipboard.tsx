import React, { SVGAttributes } from 'react';

function HeroIconClipboard(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M8 4c0-1.1.9-2 2-2h4a2 2 0 012 2h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2h2zm0 2H6v14h12V6h-2a2 2 0 01-2 2h-4a2 2 0 01-2-2zm2-2v2h4V4h-4z"></path>
    </svg>
  );
}

export default HeroIconClipboard;
