import testUtils from '../utils/testUtils';

describe('Home Page and 404', () => {
  // let userId: string;
  testUtils.testByMachine({
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHANGE_TO_404: '404',
        },
        meta: {
          test: async () => {
            await page.waitFor('[data-testid="hello-world"]');
          },
        },
      },
      '404': {
        meta: {
          test: async () => {
            await page.waitFor('[data-testid="404-message"]');
          },
        },
      },
    },
    events: {
      CHANGE_TO_404: async () => {
        await page.goto(process.env.REACT_APP_PUBLIC_URL + '/123jhb123kjb1h23');
      },
    },
    // setupBeforeEach: async () => {
    //   const { Users } = await testUtils.sdk.Users();
    //   if (Users?.[0]) {
    //     userId = Users[0].id;
    //   } else {
    //     const { insert_Users } = await testUtils.sdk.SuperAdminCreateUser({
    //       name: 'Matt Pocock',
    //     });
    //     userId = insert_Users?.returning[0].id;
    //   }
    // },
  });
});
