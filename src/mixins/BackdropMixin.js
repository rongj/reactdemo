import React from 'react';
import classNames from 'classnames';
import CSSCore from '../utils/CSSCore';

export default {
  renderBackdrop(children) {
    // window.onhashchange = () => {
    //   let container = document.body;
    //   CSSCore.removeClass(container, 'with-sidemenu-right');
    //   CSSCore.addClass(container, 'with-sidemenu-closing');
    // }
    let onClick = this.handleBackdropClick || null;
    let classSet = {
      [this.setClassNS('modal-backdrop')]: true,
      [this.setClassNS('modal-backdrop-out')]: this.props.isClosing,
    };

    return (
      <span>
        {children}
        <div
          onClick={onClick}
          ref="backdrop"
          className={classNames(classSet)}
        ></div>
      </span>
    );
  },
};
