import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { makeAuthRouting } from './app/routing';

import './i18n/i18n';

ReactDOM.render(makeAuthRouting(), document.getElementById('root'));
