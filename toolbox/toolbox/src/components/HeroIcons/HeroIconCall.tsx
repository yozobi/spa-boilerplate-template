import React, { SVGAttributes } from 'react';

function HeroIconCall(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M13.04 14.69l1.07-2.14a1 1 0 011.2-.5l6 2A1 1 0 0122 15v5a2 2 0 01-2 2h-2A16 16 0 012 6V4c0-1.1.9-2 2-2h5a1 1 0 01.95.68l2 6a1 1 0 01-.5 1.21L9.3 10.96a10.05 10.05 0 003.73 3.73zM8.28 4H4v2a14 14 0 0014 14h2v-4.28l-4.5-1.5-1.12 2.26a1 1 0 01-1.3.46 12.04 12.04 0 01-6.02-6.01 1 1 0 01.46-1.3l2.26-1.14L8.28 4z"></path>
    </svg>
  );
}

export default HeroIconCall;
