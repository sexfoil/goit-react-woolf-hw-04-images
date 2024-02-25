import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getPixabayImages } from 'api/PixabayAPI';
import Modal from './Modal/Modal';

import css from './App.module.css';

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

        const data = await getPixabayImages(query, page);
        const updatedImages = prev => [...prev, ...data.hits];

        setImages(updatedImages);
        setLoadMore(updatedImages.length < data.totalHits);
      } catch (error) {
        console.log(`Something went wrong... Cause: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    console.log('query>>', query);
    if (query) {
      console.log('searching... ', page);

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

  return (
    <div className={css.app}>
      <Searchbar onSearchSubmit={onSearchSubmit} />
      {images && <ImageGallery images={images} setImage={setCurrentImage} />}
      {loading && <Loader />}
      {loadMore && <Button loadMore={onLoadMoreClick} />}
      {currentImage && (
        <Modal image={currentImage} setImage={setCurrentImage} />
      )}
    </div>
  );
};

export default App;
