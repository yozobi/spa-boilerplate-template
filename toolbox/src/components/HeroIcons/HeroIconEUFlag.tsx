import React, { SVGAttributes } from 'react';

function HeroIconEUFlag(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      {...props}
    >
      <defs>
        <g id="prefix__d">
          <g id="prefix__b">
            <path id="prefix__a" d="M0-1l-.3 1 .5.1z" />
            <use transform="scale(-1 1)" xlinkHref="#prefix__a" />
          </g>
          <g id="prefix__c">
            <use transform="rotate(72)" xlinkHref="#prefix__b" />
            <use transform="rotate(144)" xlinkHref="#prefix__b" />
          </g>
          <use transform="scale(-1 1)" xlinkHref="#prefix__c" />
        </g>
      </defs>
      <path fill="#039" d="M0 0h640v480H0z" />
      <g fill="#fc0" transform="translate(320 242.3) scale(23.7037)">
        <use width="100%" height="100%" y={-6} xlinkHref="#prefix__d" />
        <use width="100%" height="100%" y={6} xlinkHref="#prefix__d" />
        <g id="prefix__e">
          <use width="100%" height="100%" x={-6} xlinkHref="#prefix__d" />
          <use
            width="100%"
            height="100%"
            transform="rotate(-144 -2.3 -2.1)"
            xlinkHref="#prefix__d"
          />
          <use
            width="100%"
            height="100%"
            transform="rotate(144 -2.1 -2.3)"
            xlinkHref="#prefix__d"
          />
          <use
            width="100%"
            height="100%"
            transform="rotate(72 -4.7 -2)"
            xlinkHref="#prefix__d"
          />
          <use
            width="100%"
            height="100%"
            transform="rotate(72 -5 .5)"
            xlinkHref="#prefix__d"
          />
        </g>
        <use
          width="100%"
          height="100%"
          transform="scale(-1 1)"
          xlinkHref="#prefix__e"
        />
      </g>
    </svg>
  );
}

export default HeroIconEUFlag;
