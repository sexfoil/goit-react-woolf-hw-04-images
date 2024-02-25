import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, updateImage }) => {
  return (
    <li className={css['gallery-item']} onClick={() => updateImage(image)}>
      <img
        className={css['gallery-item-img']}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};
