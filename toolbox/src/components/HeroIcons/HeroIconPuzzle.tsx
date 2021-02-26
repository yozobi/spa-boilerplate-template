import React, { SVGAttributes } from 'react';

function HeroIconPuzzle(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M17 22a2 2 0 01-2-2v-1a1 1 0 00-1-1 1 1 0 00-1 1v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-3H5a3 3 0 110-6h1V8a2 2 0 012-2h3V5a3 3 0 116 0v1h3a2 2 0 012 2v3a2 2 0 01-2 2h-1a1 1 0 00-1 1 1 1 0 001 1h1a2 2 0 012 2v3a2 2 0 01-2 2h-3zm3-2v-3h-1a3 3 0 110-6h1V8h-3a2 2 0 01-2-2V5a1 1 0 00-1-1 1 1 0 00-1 1v1a2 2 0 01-2 2H8v3a2 2 0 01-2 2H5a1 1 0 00-1 1 1 1 0 001 1h1a2 2 0 012 2v3h3v-1a3 3 0 116 0v1h3z"></path>
    </svg>
  );
}

export default HeroIconPuzzle;
