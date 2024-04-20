import React, { useEffect } from 'react';
import css from './index.module.css';

const Modal = ({ largeImageURL, tags, onCloseModal }) => {
  useEffect(() => {
    const handleKeyEvt = ({ key }) => {
      key === 'Escape' && onCloseModal();
    };
    window.addEventListener('keydown', handleKeyEvt);

    return () => {
      window.removeEventListener('keydown', handleKeyEvt);
    };
  }, [onCloseModal]);

  const onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={onBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;

/* 
The Modal component is now a functional comp-t that takes props as input.
Lifecycle logic (componentDidMount/WillUnmount is replaced with `useEffect` to add an eventListener for 'Escape' key on mount / remove on unmount. The `onCloseModal` f - as dependency to `useEffect` hook to update eventListener when f changes
 */
