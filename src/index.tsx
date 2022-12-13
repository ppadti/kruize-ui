import React from 'react';
import ReactDOM from 'react-dom';
import App from '@app/index';
import '@patternfly/react-core/dist/styles/base.css';
import { setDiagnosticsOptions } from 'monaco-yaml';
import * as monaco from 'monaco-editor';
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired

setDiagnosticsOptions({
  enableSchemaRequest: true,
  hover: true,
  completion: true,
  validate: true,
  format: true,
  schemas: []
});

if (process.env.NODE_ENV !== 'production') {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false
      }
    ]
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000, config);
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
