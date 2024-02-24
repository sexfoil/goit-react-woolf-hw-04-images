import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, toggleCurrentImage }) => {
  return (
    <li
      className={css['gallery-item']}
      onClick={() => toggleCurrentImage(image)}
    >
      <img
        className={css['gallery-item-img']}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};
