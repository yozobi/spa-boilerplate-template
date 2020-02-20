export const fakeData = {
  nodes: [
    {
      id: 'John',
      color: 'hsl(111, 70%, 50%)',
    },
    {
      id: 'Raoul',
      color: 'hsl(212, 70%, 50%)',
    },
    {
      id: 'Jane',
      color: 'hsl(183, 70%, 50%)',
    },
    {
      id: 'Marcel',
      color: 'hsl(146, 70%, 50%)',
    },
    {
      id: 'Ibrahim',
      color: 'hsl(80, 70%, 50%)',
    },
    {
      id: 'Junko',
      color: 'hsl(122, 70%, 50%)',
    },
  ],
  links: [
    {
      source: 'Ibrahim',
      target: 'Raoul',
      value: 81,
    },
    {
      source: 'Jane',
      target: 'Marcel',
      value: 18,
    },
    {
      source: 'Jane',
      target: 'Junko',
      value: 33,
    },
    {
      source: 'Junko',
      target: 'Marcel',
      value: 109,
    },
    {
      source: 'Raoul',
      target: 'Marcel',
      value: 111,
    },
    {
      source: 'Raoul',
      target: 'John',
      value: 82,
    },
    {
      source: 'Raoul',
      target: 'Jane',
      value: 20,
    },
    {
      source: 'John',
      target: 'Marcel',
      value: 54,
    },
  ],
};
