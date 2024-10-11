/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import navigation from './components/navigation';

AppRegistry.registerComponent(appName, () => navigation);
