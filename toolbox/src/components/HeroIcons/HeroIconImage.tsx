import React, { SVGAttributes } from 'react';

function HeroIconImage(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm16 8.59V6H4v6.59l4.3-4.3a1 1 0 011.4 0l5.3 5.3 2.3-2.3a1 1 0 011.4 0l1.3 1.3zm0 2.82l-2-2-2.3 2.3a1 1 0 01-1.4 0L9 10.4l-5 5V18h16v-2.59zM15 10a1 1 0 110-2 1 1 0 010 2z"></path>
    </svg>
  );
}

export default HeroIconImage;
