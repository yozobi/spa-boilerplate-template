import { render, RenderResult } from '@testing-library/react';
import { createModel } from '@xstate/test';
import { GraphQLClient } from 'graphql-request';
import { ReactElement } from 'react';
import { Machine } from 'xstate';
import { getSdk } from './sdk.generated';

type IMachine = {
  initial?: string;
  states?: {
    [state: string]: IMachine;
  };
  on?: {
    [event: string]: string | undefined;
  };
  meta?: {
    test?: (result: RenderResult) => Promise<any> | any;
  };
};

interface Params {
  machine: IMachine;
  component: ReactElement;
  events: {
    [event: string]: (result: RenderResult) => Promise<any> | any;
  };
  testCoverage?: boolean;
}

const testByMachine = ({
  events,
  component,
  machine,
  testCoverage,
}: Params) => {
  const testMachine = Machine({
    initial: machine.initial,
    states: machine.states,
  });
  const model = createModel(testMachine, {
    events,
  });
  const testPlans = model.getSimplePathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(
          path.description,
          async () => {
            const result = render(component);

            await path.test(result);
          },
          10000,
        );
      });
    });
  });
  if (testCoverage) {
    test('coverage', () => {
      model.testCoverage();
    });
  }
};

const sdk = getSdk(
  new GraphQLClient(process.env.REACT_APP_HASURA_ENDPOINT, {
    headers: { 'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET },
  }),
);
const testUtils = {
  testByMachine,
  sdk,
};

export default testUtils;
