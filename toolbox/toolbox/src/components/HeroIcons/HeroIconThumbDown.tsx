import React, { SVGAttributes } from 'react';

function HeroIconThumbDown(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M6.38 14H4a2 2 0 01-2-2V4c0-1.1.9-2 2-2h11.5c1.2 0 2.3.72 2.74 1.79l3.5 7 .03.06A3 3 0 0119 15h-5v5a2 2 0 01-2 2h-1.62l-4-8zM8 12.76L11.62 20H12v-7h7c.13 0 .25-.02.38-.08a1 1 0 00.55-1.28l-3.5-7.02A1 1 0 0015.5 4H8v8.76zM6 12V4H4v8h2z"></path>
    </svg>
  );
}

export default HeroIconThumbDown;
