---
to: src/components/<%= name %>/index.tsx
---

import React from 'react';
import PropTypes from 'prop-types';
import  Styled<%= name %> from './style.ts';
function <%= name %>({ children, ...rest }) {
    return (
        <Styled<%= name %> {...rest}>
           {children}
        </Styled<%= name %>>
    );
}

<%= name %>.propTypes = {
   children:PropTypes.any
};

export default <%= name %>;
