import React from 'react';
import { ResponsiveSankey, SankeyDataNode, SankeyDataLink } from '@nivo/sankey';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and no chart will be rendered.
// examples showcase many properties,
// you'll often use just a few of them.
const SankeyDiagram = (props: {
  data: {
    nodes: SankeyDataNode[];
    links: SankeyDataLink[];
  };
}) => (
  <ResponsiveSankey
    data={props.data}
    margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
    align="justify"
    colors={{ scheme: 'category10' }}
    nodeOpacity={1}
    nodeThickness={21}
    nodeInnerPadding={3}
    nodeSpacing={24}
    nodeBorderWidth={0}
    nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
    linkOpacity={0.5}
    linkHoverOthersOpacity={0.1}
    enableLinkGradient={true}
    labelPosition="outside"
    labelOrientation="vertical"
    labelPadding={16}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        translateX: 130,
        itemWidth: 100,
        itemHeight: 14,
        itemDirection: 'right-to-left',
        itemsSpacing: 2,
        itemTextColor: '#999',
        symbolSize: 14,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

export default SankeyDiagram;
