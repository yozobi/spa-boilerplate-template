import React, { Suspense } from 'react';
import '../src/tailwind.css';

const PlayroomFrameComponent = ({ children }) => {
  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PlayroomFrameComponent;
