import css from './Button.module.css';

export const Button = ({ page, setPage }) => {
  return (
    <button
      onClick={() => setPage(page + 1)}
      type="button"
      className={css.button}
    >
      Load more
    </button>
  );
};
