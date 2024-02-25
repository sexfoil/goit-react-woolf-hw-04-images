import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = (image, setImage) => {
  useEffect(() => {
    const onEscPress = evt => {
      if (evt.code === 'Escape') {
        console.log('Esc pressing...');
        setImage(null);
      }
    };

    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
  }, [setImage]);

  const onClick = evt => {
    if (evt.target === evt.currentTarget) {
      console.log('Overlay clicking...');
      setImage(null);
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

export default Modal;
