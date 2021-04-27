import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

/**
 * @param buttonLabel Label for button to open each blog item
 * @param ref for using toggleVisibility outside the component
 */
export const Togglable = React.forwardRef((props, ref) => {
  const [visible, setvisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setvisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible} className="togglable">
        <Button
          variant="contained"
          color="primary"
          id="openTogglable"
          className="button"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible} className="togglable">
        {/* Create new form and button */}
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          className="button cancel"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
