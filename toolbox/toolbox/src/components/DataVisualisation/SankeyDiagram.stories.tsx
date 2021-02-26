import React from 'react';
import SankeyDiagram from './SankeyDiagram';
import { fakeData } from './fakeData';

export default { title: 'SankeyDiagram' };

export const ResponsiveSankeyDiagram = () => (
  <div className="h-screen">
    <SankeyDiagram data={fakeData} />
  </div>
);
