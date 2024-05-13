import compose from 'compose-function'
import {reduxProvider} from './reduxProvider.tsx'
export const withProviders = compose(reduxProvider)