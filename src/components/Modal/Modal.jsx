import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = evt => {
    if (evt.code === 'Escape') {
      this.props.toggleCurrentImage(null);
    }
  };

  onClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.toggleCurrentImage(null);
    }
  };

  render() {
    const { image } = this.props;
    return (
      <div className={css.overlay} onClick={this.onClick}>
        <div className={css.modal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
