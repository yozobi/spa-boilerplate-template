/**
 * A typescript reworking of the npm package activity-detector
 */

const ACTIVE = 'active';
const IDLE = 'idle';

const DEFAULT_INITIAL_STATE = ACTIVE;

const DEFAULT_ACTIVITY_EVENTS = ['focus', 'mousemove'] as const;

const DEFAULT_INACTIVITY_EVENTS = ['blur', 'visibilitychange'];

const DEFAULT_IGNORED_EVENTS_WHEN_IDLE = [] as any[];
const prefixes = ['webkit', 'moz', 'ms'] as const;

let hidden: string;
let visibilityChangeEvent: string;
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChangeEvent = 'visibilitychange';
} else {
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    if (typeof (document as any)[`${prefix}Hidden`] !== 'undefined') {
      hidden = `${prefix}Hidden`;
      visibilityChangeEvent = `${prefix}visibilitychange`;
      break;
    }
  }
}

type State = 'idle' | 'active';

type Listeners = { [S in State]: (() => void)[] };

/**
 * Creates an activity detector instance
 *
 * @param  {Object}   options
 * @param  {string[]} options.activityEvents        Events which force a transition to 'active'
 * @param  {string[]} options.inactivityEvents      Events which force a transition to 'idle'
 * @param  {string[]} options.ignoredEventsWhenIdle Events that are ignored in 'idle' state
 * @param  {number}   options.timeToIdle            Inactivity time in ms to transition to 'idle'
 * @param  {string}   options.initialState          One of 'active' or 'idle'
 * @param  {boolean}  options.autoInit
 * @return {Object}   activity detector instance
 */
const createActivityDetector = ({
  activityEvents = DEFAULT_ACTIVITY_EVENTS,
  inactivityEvents = DEFAULT_INACTIVITY_EVENTS,
  ignoredEventsWhenIdle = DEFAULT_IGNORED_EVENTS_WHEN_IDLE,
  timeToIdle = 30000,
  initialState = DEFAULT_INITIAL_STATE,
  autoInit = true,
}) => {
  const listeners: Listeners = { [ACTIVE]: [], [IDLE]: [] };
  let state: State;
  let timer: number;

  const setState = (newState: State) => {
    clearTimeout(timer);
    if (newState === ACTIVE) {
      timer = setTimeout(() => setState(IDLE), timeToIdle);
    }
    if (state !== newState) {
      state = newState;
      listeners[state].forEach((l) => l());
    }
  };

  const handleUserActivityEvent: EventListener = (event) => {
    if (state === ACTIVE || ignoredEventsWhenIdle.indexOf(event.type) < 0) {
      setState(ACTIVE);
    }
  };

  const handleUserInactivityEvent = () => {
    setState(IDLE);
  };

  const handleVisibilityChangeEvent = () => {
    setState((document as any)[hidden] ? IDLE : ACTIVE);
  };

  /**
   * Starts the activity detector with the given state.
   * @param {string} firstState 'idle' or 'active'
   */
  const init = (firstState = DEFAULT_INITIAL_STATE) => {
    setState(firstState === ACTIVE ? ACTIVE : IDLE);
    activityEvents.forEach((eventName) =>
      window.addEventListener(eventName, handleUserActivityEvent),
    );

    inactivityEvents
      .filter((eventName) => eventName !== 'visibilitychange')
      .forEach((eventName) =>
        window.addEventListener(eventName, handleUserInactivityEvent),
      );

    if (
      inactivityEvents.indexOf('visibilitychange') >= 0 &&
      visibilityChangeEvent
    ) {
      document.addEventListener(
        visibilityChangeEvent,
        handleVisibilityChangeEvent,
      );
    }
  };

  /**
   * Register an event listener for the required event
   * @param {string} eventName 'active' or 'idle'
   * @param {Function} listener
   */
  const on = (eventName: State, listener: () => void) => {
    listeners[eventName].push(listener);
    const off = () => {
      const index = listeners[eventName].indexOf(listener);
      if (index >= 0) {
        listeners[eventName].splice(index, 1);
      }
    };
    return off;
  };

  /**
   * Stops the activity detector and clean the listeners
   */
  const stop = () => {
    listeners[ACTIVE] = [];
    listeners[IDLE] = [];

    clearTimeout(timer);

    activityEvents.forEach((eventName) =>
      window.removeEventListener(eventName, handleUserActivityEvent),
    );

    inactivityEvents.forEach((eventName) =>
      window.removeEventListener(eventName, handleUserInactivityEvent),
    );

    if (visibilityChangeEvent) {
      document.removeEventListener(
        visibilityChangeEvent,
        handleVisibilityChangeEvent,
      );
    }
  };

  if (autoInit) {
    init(initialState);
  }

  return { on, stop, init };
};

export default createActivityDetector;
