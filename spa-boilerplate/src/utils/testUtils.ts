import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { getSdk } from './sdk.generated';
import { GraphQLClient } from 'graphql-request';

interface Params {
  initial: string;
  states: {
    [state: string]: {
      on?: {
        [event: string]: string | undefined;
      };
      meta: {
        test: () => Promise<void>;
      };
    };
  };
  events: {
    [event: string]: () => Promise<void>;
  };
  /**
   * The relative URL you want to visit to start the test
   */
  url?: string;
  /** Any additional setup you want to do before each test */
  setupBeforeEach?: () => Promise<void>;
}

const testByMachine = ({
  events,
  initial,
  states,
  url = '/',
  setupBeforeEach,
}: Params) => {
  const machine = Machine({
    initial: initial,
    states,
  });
  const model = createModel(machine, {
    events,
  });
  const testPlans = model.getSimplePathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(
          path.description,
          async () => {
            await page.goto(`${process.env.REACT_APP_PUBLIC_URL}${url}`);
            if (setupBeforeEach) {
              await setupBeforeEach();
            }
            await path.test(page);
          },
          10000,
        );
      });
    });
  });

  it('coverage', () => {
    model.testCoverage();
  });
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
