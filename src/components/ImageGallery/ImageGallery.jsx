import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, toggleCurrentImage }) => {
  return (
    <ul className={css.gallery}>
      {images.map(img => {
        return (
          <ImageGalleryItem
            key={nanoid()} // змінив з id картинки на nanoid томущо в респонсі при пагінації на різних сторінках трапляються однакові картинки з однаковими id (пимилка в консолі)
            image={img}
            toggleCurrentImage={toggleCurrentImage}
          />
        );
      })}
    </ul>
  );
};
