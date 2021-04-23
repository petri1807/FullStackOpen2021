import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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
      <div style={hideWhenVisible}>
        <button
          id="openTogglable"
          className="button"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="button cancel" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
