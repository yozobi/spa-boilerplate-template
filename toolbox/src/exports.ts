import React from 'react';

/**
 * We use lazy imports to stop bundle size creep,
 * this will mean our bundle sizes stay super-small by default
 */
export const ButtonBase = React.lazy(
  () => import('./components/ButtonBase/ButtonBase'),
);

export { declareMakeMutationForm } from './utils/declareMakeMutationForm';

export const Flex = React.lazy(() => import('./components/Flex/Flex'));

export const TextInput = React.lazy(
  () => import('./components/TextInput/TextInput'),
);

export const UrqlWrapper = React.lazy(
  () => import('./components/UrqlWrapper/UrqlWrapper'),
);

export const HeroIconAnnouncement = React.lazy(
  () => import('./components/HeroIcons/HeroIconAnnouncement'),
);

export const HeroIconArchive = React.lazy(
  () => import('./components/HeroIcons/HeroIconArchive'),
);

export const HeroIconArrowDown = React.lazy(
  () => import('./components/HeroIcons/HeroIconArrowDown'),
);

export const HeroIconArrowLeft = React.lazy(
  () => import('./components/HeroIcons/HeroIconArrowLeft'),
);

export const HeroIconArrowRight = React.lazy(
  () => import('./components/HeroIcons/HeroIconArrowRight'),
);

export const HeroIconArrowUp = React.lazy(
  () => import('./components/HeroIcons/HeroIconArrowUp'),
);

export const HeroIconAtSymbol = React.lazy(
  () => import('./components/HeroIcons/HeroIconAtSymbol'),
);

export const HeroIconBook = React.lazy(
  () => import('./components/HeroIcons/HeroIconBook'),
);

export const HeroIconBookmark = React.lazy(
  () => import('./components/HeroIcons/HeroIconBookmark'),
);

export const HeroIconBriefcase = React.lazy(
  () => import('./components/HeroIcons/HeroIconBriefcase'),
);

export const HeroIconBrowser = React.lazy(
  () => import('./components/HeroIcons/HeroIconBrowser'),
);

export const HeroIconBuilding = React.lazy(
  () => import('./components/HeroIcons/HeroIconBuilding'),
);

export const HeroIconCalander = React.lazy(
  () => import('./components/HeroIcons/HeroIconCalander'),
);

export const HeroIconCallIncoming = React.lazy(
  () => import('./components/HeroIcons/HeroIconCallIncoming'),
);

export const HeroIconCallOutgoing = React.lazy(
  () => import('./components/HeroIcons/HeroIconCallOutgoing'),
);

export const HeroIconCall = React.lazy(
  () => import('./components/HeroIcons/HeroIconCall'),
);

export const HeroIconCamera = React.lazy(
  () => import('./components/HeroIcons/HeroIconCamera'),
);

export const HeroIconCart = React.lazy(
  () => import('./components/HeroIcons/HeroIconCart'),
);

export const HeroIconChat = React.lazy(
  () => import('./components/HeroIcons/HeroIconChat'),
);

export const HeroIconCheckCircle = React.lazy(
  () => import('./components/HeroIcons/HeroIconCheckCircle'),
);

export const HeroIconCheveronDown = React.lazy(
  () => import('./components/HeroIcons/HeroIconCheveronDown'),
);

export const HeroIconCheveronLeft = React.lazy(
  () => import('./components/HeroIcons/HeroIconCheveronLeft'),
);

export const HeroIconCheveronRight = React.lazy(
  () => import('./components/HeroIcons/HeroIconCheveronRight'),
);

export const HeroIconCheveronUp = React.lazy(
  () => import('./components/HeroIcons/HeroIconCheveronUp'),
);

export const HeroIconClip = React.lazy(
  () => import('./components/HeroIcons/HeroIconClip'),
);

export const HeroIconClipboard = React.lazy(
  () => import('./components/HeroIcons/HeroIconClipboard'),
);

export const HeroIconClock = React.lazy(
  () => import('./components/HeroIcons/HeroIconClock'),
);

export const HeroIconCode = React.lazy(
  () => import('./components/HeroIcons/HeroIconCode'),
);

export const HeroIconCog = React.lazy(
  () => import('./components/HeroIcons/HeroIconCog'),
);

export const HeroIconComment = React.lazy(
  () => import('./components/HeroIcons/HeroIconComment'),
);

export const HeroIconCompass = React.lazy(
  () => import('./components/HeroIcons/HeroIconCompass'),
);

export const HeroIconCurrencyDollar = React.lazy(
  () => import('./components/HeroIcons/HeroIconCurrencyDollar'),
);

export const HeroIconDashboard = React.lazy(
  () => import('./components/HeroIcons/HeroIconDashboard'),
);

export const HeroIconDesktop = React.lazy(
  () => import('./components/HeroIcons/HeroIconDesktop'),
);

export const HeroIconDiscount = React.lazy(
  () => import('./components/HeroIcons/HeroIconDiscount'),
);

export const HeroIconDownload = React.lazy(
  () => import('./components/HeroIcons/HeroIconDownload'),
);

export const HeroIconDuplicate = React.lazy(
  () => import('./components/HeroIcons/HeroIconDuplicate'),
);

export const HeroIconEdit = React.lazy(
  () => import('./components/HeroIcons/HeroIconEdit'),
);

export const HeroIconEmotionHappy = React.lazy(
  () => import('./components/HeroIcons/HeroIconEmotionHappy'),
);

export const HeroIconEmotionSad = React.lazy(
  () => import('./components/HeroIcons/HeroIconEmotionSad'),
);

export const HeroIconExclamation = React.lazy(
  () => import('./components/HeroIcons/HeroIconExclamation'),
);

export const HeroIconExternalLink = React.lazy(
  () => import('./components/HeroIcons/HeroIconExternalLink'),
);

export const HeroIconFileBlank = React.lazy(
  () => import('./components/HeroIcons/HeroIconFileBlank'),
);

export const HeroIconFileMinus = React.lazy(
  () => import('./components/HeroIcons/HeroIconFileMinus'),
);

export const HeroIconFilePlus = React.lazy(
  () => import('./components/HeroIcons/HeroIconFilePlus'),
);

export const HeroIconFile = React.lazy(
  () => import('./components/HeroIcons/HeroIconFile'),
);

export const HeroIconFilm = React.lazy(
  () => import('./components/HeroIcons/HeroIconFilm'),
);

export const HeroIconFilter = React.lazy(
  () => import('./components/HeroIcons/HeroIconFilter'),
);

export const HeroIconFlag = React.lazy(
  () => import('./components/HeroIcons/HeroIconFlag'),
);

export const HeroIconFolderMinus = React.lazy(
  () => import('./components/HeroIcons/HeroIconFolderMinus'),
);

export const HeroIconFolderPlus = React.lazy(
  () => import('./components/HeroIcons/HeroIconFolderPlus'),
);

export const HeroIconFolder = React.lazy(
  () => import('./components/HeroIcons/HeroIconFolder'),
);

export const HeroIconGlobe = React.lazy(
  () => import('./components/HeroIcons/HeroIconGlobe'),
);

export const HeroIconGraphBar = React.lazy(
  () => import('./components/HeroIcons/HeroIconGraphBar'),
);

export const HeroIconGrid = React.lazy(
  () => import('./components/HeroIcons/HeroIconGrid'),
);

export const HeroIconGroup = React.lazy(
  () => import('./components/HeroIcons/HeroIconGroup'),
);

export const HeroIconHashtag = React.lazy(
  () => import('./components/HeroIcons/HeroIconHashtag'),
);

export const HeroIconHeart = React.lazy(
  () => import('./components/HeroIcons/HeroIconHeart'),
);

export const HeroIconHelp = React.lazy(
  () => import('./components/HeroIcons/HeroIconHelp'),
);

export const HeroIconHome = React.lazy(
  () => import('./components/HeroIcons/HeroIconHome'),
);

export const HeroIconImage = React.lazy(
  () => import('./components/HeroIcons/HeroIconImage'),
);

export const HeroIconInbox = React.lazy(
  () => import('./components/HeroIcons/HeroIconInbox'),
);

export const HeroIconInformation = React.lazy(
  () => import('./components/HeroIcons/HeroIconInformation'),
);

export const HeroIconKey = React.lazy(
  () => import('./components/HeroIcons/HeroIconKey'),
);

export const HeroIconLink = React.lazy(
  () => import('./components/HeroIcons/HeroIconLink'),
);

export const HeroIconLocation = React.lazy(
  () => import('./components/HeroIcons/HeroIconLocation'),
);

export const HeroIconLockClosed = React.lazy(
  () => import('./components/HeroIcons/HeroIconLockClosed'),
);

export const HeroIconLockOpen = React.lazy(
  () => import('./components/HeroIcons/HeroIconLockOpen'),
);

export const HeroIconMail = React.lazy(
  () => import('./components/HeroIcons/HeroIconMail'),
);

export const HeroIconMap = React.lazy(
  () => import('./components/HeroIcons/HeroIconMap'),
);

export const HeroIconMenu = React.lazy(
  () => import('./components/HeroIcons/HeroIconMenu'),
);

export const HeroIconMicrophone = React.lazy(
  () => import('./components/HeroIcons/HeroIconMicrophone'),
);

export const HeroIconMinusCircle = React.lazy(
  () => import('./components/HeroIcons/HeroIconMinusCircle'),
);

export const HeroIconMinusSquare = React.lazy(
  () => import('./components/HeroIcons/HeroIconMinusSquare'),
);

export const HeroIconMinus = React.lazy(
  () => import('./components/HeroIcons/HeroIconMinus'),
);

export const HeroIconMobile = React.lazy(
  () => import('./components/HeroIcons/HeroIconMobile'),
);

export const HeroIconMoon = React.lazy(
  () => import('./components/HeroIcons/HeroIconMoon'),
);

export const HeroIconMoreHoriz = React.lazy(
  () => import('./components/HeroIcons/HeroIconMoreHoriz'),
);

export const HeroIconMusic = React.lazy(
  () => import('./components/HeroIcons/HeroIconMusic'),
);

export const HeroIconNews = React.lazy(
  () => import('./components/HeroIcons/HeroIconNews'),
);

export const HeroIconNotification = React.lazy(
  () => import('./components/HeroIcons/HeroIconNotification'),
);

export const HeroIconPlusCircle = React.lazy(
  () => import('./components/HeroIcons/HeroIconPlusCircle'),
);

export const HeroIconPlusSquare = React.lazy(
  () => import('./components/HeroIcons/HeroIconPlusSquare'),
);

export const HeroIconPlus = React.lazy(
  () => import('./components/HeroIcons/HeroIconPlus'),
);

export const HeroIconPrint = React.lazy(
  () => import('./components/HeroIcons/HeroIconPrint'),
);

export const HeroIconPuzzle = React.lazy(
  () => import('./components/HeroIcons/HeroIconPuzzle'),
);

export const HeroIconRefresh = React.lazy(
  () => import('./components/HeroIcons/HeroIconRefresh'),
);

export const HeroIconRepeat = React.lazy(
  () => import('./components/HeroIcons/HeroIconRepeat'),
);

export const HeroIconRocket = React.lazy(
  () => import('./components/HeroIcons/HeroIconRocket'),
);

export const HeroIconSearch = React.lazy(
  () => import('./components/HeroIcons/HeroIconSearch'),
);

export const HeroIconServer = React.lazy(
  () => import('./components/HeroIcons/HeroIconServer'),
);

export const HeroIconSpeaker = React.lazy(
  () => import('./components/HeroIcons/HeroIconSpeaker'),
);

export const HeroIconStar = React.lazy(
  () => import('./components/HeroIcons/HeroIconStar'),
);

export const HeroIconStore = React.lazy(
  () => import('./components/HeroIcons/HeroIconStore'),
);

export const HeroIconTablet = React.lazy(
  () => import('./components/HeroIcons/HeroIconTablet'),
);

export const HeroIconTag = React.lazy(
  () => import('./components/HeroIcons/HeroIconTag'),
);

export const HeroIconThumbDown = React.lazy(
  () => import('./components/HeroIcons/HeroIconThumbDown'),
);

export const HeroIconThumbUp = React.lazy(
  () => import('./components/HeroIcons/HeroIconThumbUp'),
);

export const HeroIconTrash = React.lazy(
  () => import('./components/HeroIcons/HeroIconTrash'),
);

export const HeroIconTrendingDown = React.lazy(
  () => import('./components/HeroIcons/HeroIconTrendingDown'),
);

export const HeroIconTrendingUp = React.lazy(
  () => import('./components/HeroIcons/HeroIconTrendingUp'),
);

export const HeroIconTrophy = React.lazy(
  () => import('./components/HeroIcons/HeroIconTrophy'),
);

export const HeroIconUpload = React.lazy(
  () => import('./components/HeroIcons/HeroIconUpload'),
);

export const HeroIconUserCheck = React.lazy(
  () => import('./components/HeroIcons/HeroIconUserCheck'),
);

export const HeroIconUserMinus = React.lazy(
  () => import('./components/HeroIcons/HeroIconUserMinus'),
);

export const HeroIconUserPlus = React.lazy(
  () => import('./components/HeroIcons/HeroIconUserPlus'),
);

export const HeroIconUser = React.lazy(
  () => import('./components/HeroIcons/HeroIconUser'),
);

export const HeroIconVideo = React.lazy(
  () => import('./components/HeroIcons/HeroIconVideo'),
);

export const HeroIconView = React.lazy(
  () => import('./components/HeroIcons/HeroIconView'),
);

export const HeroIconXCircle = React.lazy(
  () => import('./components/HeroIcons/HeroIconXCircle'),
);

export const HeroIconXSquare = React.lazy(
  () => import('./components/HeroIcons/HeroIconXSquare'),
);

export const HeroIconX = React.lazy(
  () => import('./components/HeroIcons/HeroIconX'),
);

export const HeroIconZoomIn = React.lazy(
  () => import('./components/HeroIcons/HeroIconZoomIn'),
);

export const HeroIconZoomOut = React.lazy(
  () => import('./components/HeroIcons/HeroIconZoomOut'),
);

export const AnimatedButtonBase = React.lazy(
  () => import('./components/AnimatedButtonBase/AnimatedButtonBase'),
);

export const SankeyDiagram = React.lazy(
  () => import('./components/DataVisualisation/SankeyDiagram'),
);

export const Modal = React.lazy(() => import('./components/Modal/Modal'));

export {
  useThrottleUserInput as useThrottle,
  useDeduplicationThrottle,
} from './hooks/useThrottle';

export { usePagination } from './hooks/usePagination';

export const ToastContainer = React.lazy(
  () => import('./components/ToastContainer/ToastContainer'),
);

export { useToast } from './components/ToastContainer/ToastContainer';

export const ProtectedRoute = React.lazy(
  () => import('./components/Auth/ProtectedRoute/ProtectedRoute'),
);

export { useWrappedUrqlMutation } from './hooks/useWrappedUrqlMutation';

export const TableRow = React.lazy(
  () => import('./components/TableRow/TableRow'),
);

export const Alert = React.lazy(() => import('./components/Alert/Alert'));

export const UnderlinedTabs = React.lazy(
  () => import('./components/UnderlinedTabs/UnderlinedTabs'),
);

export const ServiceWorkerProvider = React.lazy(
  () => import('./components/ServiceWorkerProvider/ServiceWorkerProvider'),
);

export { useServiceWorker } from './components/ServiceWorkerProvider/ServiceWorkerProvider';

export const AwsAuthenticator = React.lazy(
  () => import('./components/AwsAuthenticator/AwsAuthenticator'),
);

export const Checkbox = React.lazy(
  () => import('./components/Checkbox/Checkbox'),
);

export const RadioButton = React.lazy(
  () => import('./components/RadioButton/RadioButton'),
);

export const RadioGroup = React.lazy(
  () => import('./components/RadioButton/RadioGroup'),
);

// @ts-ignore
export { AwsAuthComponents } from './components/AwsAuthenticator/awsAuthenticatorTypes';

export { useAmplifyQuery } from './hooks/useAmplifyQuery';

export { useCheckForActivity } from './hooks/useCheckForActivity';

export { useSessionTimeout } from './hooks/useSessionTimeout';

export const AwsSetupTotpWrapper = React.lazy(
  () => import('./components/AwsSetupTotpWrapper/AwsSetupTotpWrapper'),
);

export { useAwsChangePassword } from './hooks/useAwsChangePassword';

export { usePaginatedAmplifyQuery } from './hooks/usePaginatedAmplifyQuery';

export { isEmailAddress } from './utils/isEmailAddress';

export { useConfirm } from './hooks/useConfirm';

export { useModal } from './hooks/useModal';

export { useSearchParamsModal } from './hooks/useSearchParamsModal';

export const SelectBase = React.lazy(
  () => import('./components/SelectBase/SelectBase'),
);

export { Pagination } from './components/Pagination/Pagination';

export { useCopyToClipboard } from './hooks/useCopyToClipboard';

export { addComponentSeparator } from './utils/addComponentSeparator';

export { useOnClickOutside } from './hooks/useOnClickOutside';

export const Stack = React.lazy(() => import('./components/Stack/Stack'));

export { useInterval } from './hooks/useInterval';

export { useKeepScrolledToBottom } from './hooks/useKeepScrolledToBottom';

export const AsyncSearchSelect = React.lazy(
  () => import('./components/AsyncSearchSelect/AsyncSearchSelect'),
);

export { useAsyncSearchSelect } from './hooks/useAsyncSearchSelect';

export { validateMutationForm } from './utils/validateMutationForm';

export { useTextInput } from './hooks/useTextInput';
export {
  useSearchParamsTextInput,
  useSearchParamsSelectInput,
} from './hooks/useSearchParamsTextInput';
export { useSearchParams } from './hooks/useSearchParams';
export { makeUseNavigate, makeRouteMap } from './utils/makeUseNavigate';

export const PreventLeavingFormIfTouched = React.lazy(
  () =>
    import(
      './components/PreventLeavingFormIfTouched/PreventLeavingFormIfTouched'
    ),
);

export { useNprogressOnInitialLoad } from './hooks/useNprogressOnInitialLoad';

export { useFetchConversionRates } from './hooks/useFetchConversionRates';

export const PopoverMenu = React.lazy(
  () => import('./components/PopoverMenu/PopoverMenu'),
);

export const Appear = React.lazy(() => import('./components/Appear/Appear'));

export const AuthWrapper = React.lazy(
  () => import('./components/AuthWrapper/AuthWrapper'),
);

export { useSortedTable } from './hooks/useSortedTable';

export { useValueDidUpdate } from './hooks/useValueDidUpdate';

export const ScrollToTop = React.lazy(
  () => import('./components/ScrollToTop/ScrollToTop'),
);

export { useMutationForm } from './hooks/useMutationForm';

export { useLegacyState } from './hooks/useLegacyState';

export { formatCurrency } from './utils/formatCurrency';

export { extractOnlySomeAttributes } from './utils/extractOnlySomeAttributes';

export {
  addFileToStorage,
  getS3Url,
  usePublicS3Url,
} from './utils/addToStorage';

export const CanGoToNextPage = React.lazy(
  () => import('./components/CanGoToNextPage/CanGoToNextPage'),
);

export { useAsyncLoadScript } from './hooks/useAsyncLoadScript';

export { useSearchParamsState } from './hooks/useSearchParamsState';

export { useDataMap, makeMapFromArray } from './hooks/useDataMap';

export const AnimateInHeight = React.lazy(
  () => import('./components/AnimateInHeight/AnimateInHeight'),
);

export { useDataStatuses } from './hooks/useDataStatuses';

export { usePreventCallsWhilePending } from './hooks/usePreventCallsWhilePending';

export { downloadAsCsv } from './utils/downloadAsCsv';
