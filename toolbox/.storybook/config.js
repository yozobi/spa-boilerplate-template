import 'react-toastify/dist/ReactToastify.css';
import '../src/tailwind.css';
import { addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(StoryRouter());
addDecorator(withA11y);
