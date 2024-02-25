import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ image, updateImage }) => {
  useEffect(() => {
    const onEscPress = evt => {
      if (evt.code === 'Escape') {
        console.log('Esc pressing...');
        updateImage(null);
      }
    };

    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
  }, [updateImage]);

  const onClick = evt => {
    if (evt.target === evt.currentTarget) {
      console.log('Overlay clicking...');
      updateImage(null);
    }
  };

  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};
