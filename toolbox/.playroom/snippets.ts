type Snippet = {
  group: string;
  name: string;
  code: string;
};

const snippets: Snippet[] = [
  {
    group: 'Nav Bar',
    name: 'Primary',
    code: `
      <div className="p-4 px-6 bg-primary-700">
        <Flex className="w-full" justifyContent="space-between" alignItems="center">
          <h2 className="text-white tracking-tighter font-bold">App</h2>
          <ButtonBase className="bg-blue-600"><HeroIconMenu className="h-4 w-4 text-white"/></ButtonBase>
        </Flex>
      </div>
    `,
  },
];

export default snippets;
