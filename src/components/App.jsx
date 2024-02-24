import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getPixabayImages } from 'api/PixabayAPI';
import Modal from './Modal/Modal';

import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    loadMore: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages(this.state.query, this.state.page);
    }
  }

  onSearchSubmit = query => {
    this.setState({
      images: [],
      query: query,
      page: 1,
      loadMore: false,
    });
  };

  onLoadMoreClick = () => {
    this.setState(prev => {
      return { page: prev.page + 1 };
    });
  };

  toggleCurrentImage = image => {
    this.setState({ currentImage: image });
  };

  getImages = async (query, page) => {
    try {
      this.setState({ loading: true, loadMore: false });
      const data = await getPixabayImages(query, page);
      this.setState(prev => {
        const images = [...prev.images, ...data.hits];
        return {
          images: images,
          loadMore: images.length < data.totalHits,
        };
      });
    } catch (error) {
      console.log(`Something went wrong... Cause: ${error}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSearchSubmit={this.onSearchSubmit} />
        {this.state.images && (
          <ImageGallery
            images={this.state.images}
            toggleCurrentImage={this.toggleCurrentImage}
          />
        )}
        {this.state.loading && <Loader />}
        {this.state.loadMore && <Button loadMore={this.onLoadMoreClick} />}
        {this.state.currentImage && (
          <Modal
            image={this.state.currentImage}
            toggleCurrentImage={this.toggleCurrentImage}
          />
        )}
      </div>
    );
  }
}

export default App;
