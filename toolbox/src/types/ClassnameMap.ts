export type OneVariantClassnameMap<T extends string> = {
  [K in T]: string;
};

export type TwoVariantClassnameMap<T extends string, T2 extends string> = {
  [K in T]: {
    [K2 in T2]: string;
  };
};

export type ThreeVariantClassnameMap<
  T extends string,
  T2 extends string,
  T3 extends string
> = {
  [K in T]: {
    [K2 in T2]: {
      [K3 in T3]: string;
    };
  };
};
