import { useEffect, useState } from 'react';
import { getPixabayImages } from 'api/PixabayAPI';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import css from './App.module.css';

const IMAGES_PER_PAGE = 12;

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);
        setLoadMore(false);

        const data = await getPixabayImages(query, page, IMAGES_PER_PAGE);
        const updatedImages = prev => {
          return [...prev, ...data.hits];
        };

        setImages(updatedImages);
        setLoadMore(page < Math.ceil(data.totalHits / IMAGES_PER_PAGE));
      } catch (error) {
        console.log(`Something went wrong... Cause: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      getImages(query, page);
    }
  }, [query, page]);

  const onSearchSubmit = search => {
    if (query !== search) {
      setImages([]);
      setPage(1);
      setQuery(search);
    }
  };

  const onLoadMoreClick = () => {
    setPage(page + 1);
  };

  // const updateImage = image => {
  //   setCurrentImage(image);
  // };

  // useEffect(() => {
  //   console.log('current image>> ', currentImage);
  // }, [currentImage]);

  return (
    <div className={css.app}>
      <Searchbar onSearchSubmit={onSearchSubmit} />
      {images && <ImageGallery images={images} updateImage={setCurrentImage} />}
      {loading && <Loader />}
      {loadMore && <Button loadMore={onLoadMoreClick} />}
      {currentImage && (
        <Modal image={currentImage} updateImage={setCurrentImage} />
      )}
    </div>
  );
};

export default App;
