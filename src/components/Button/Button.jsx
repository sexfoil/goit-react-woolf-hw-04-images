import css from './Button.module.css';

export const Button = ({ loadMore }) => {
  return (
    <button onClick={loadMore} type="button" className={css.button}>
      Load more
    </button>
  );
};
