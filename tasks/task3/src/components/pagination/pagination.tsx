interface Props {
  booksCount: number,
  step: number,
  activePage: number,
  onSetPage: (page:number) => void
}

const Pagination:React.FC<Props> = (props) => {
  const {
    booksCount,
    step,
    activePage,
    onSetPage} = props;

  return <div className="pagination library__pagination">
    <p className="pagination__title">
      Pages:
    </p>
    <ul className="pagination__list">
      {Array.from(Array(Math.ceil(booksCount / step)).keys()).map((elem:number) => {
        ++elem;

        return <li className="pagination__item" key={elem}>
          <button className={`pagination__button ${activePage === elem ? 'pagination__button--active':''}`} onClick={() => {
            onSetPage(elem);
          }}>
            {elem}
          </button>
        </li>
      })}
    </ul>
  </div>
};

export default Pagination;
