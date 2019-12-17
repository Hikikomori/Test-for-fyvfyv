import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {BookType} from "../../types";
import {ActionCreator, Operation} from '../../reducer';

const {setBookLoadedFlag} = ActionCreator;
const {loadBook} = Operation;

interface Props {
  slug: string,
  loadBook: (slug: string) => void,
  book: BookType,
  isBookLoaded: boolean,
  setBookLoadedFlag: (flag:boolean) => void
}

const RATING_MULTIPLIER = 10;

class BookPage extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.props.setBookLoadedFlag(false);
  }

  render(){
    const {
      book,
      isBookLoaded} = this.props;

    if (isBookLoaded) {
      return <div className="book-page">
        <Link to="/" className="book-page__return">
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlnsXlink="http://www.w3.org/1999/xlink"
               x="0px" y="0px"
               viewBox="0 0 206.108 206.108"
               xmlSpace="preserve"
               width="20"
               height="20"
               className="book-page__return-icon">
            <path d="M152.774,69.886H30.728l24.97-24.97c3.515-3.515,3.515-9.213,0-12.728c-3.516-3.516-9.213-3.515-12.729,0L2.636,72.523
              c-3.515,3.515-3.515,9.213,0,12.728l40.333,40.333c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636
              c3.515-3.515,3.515-9.213,0-12.728l-24.97-24.97h122.046c19.483,0,35.334,15.851,35.334,35.334s-15.851,35.334-35.334,35.334H78.531
              c-4.971,0-9,4.029-9,9s4.029,9,9,9h74.242c29.408,0,53.334-23.926,53.334-53.334S182.182,69.886,152.774,69.886z"/>
          </svg>
          Return to library
        </Link>
        <div className="book-page__info">
          <div className="book-page__image-wrap">
            <img src={book.cover} alt={`Book ${book.title} by ${book.author}`} className="book-page__image"/>
          </div>
          <div className="book-page__about">
            <p className="book-page__author">
              {book.author}
            </p>
            <h1 className="book-page__title">
              {book.title}
            </h1>
            <p className="book-page__description">
              {book.synopsis}
            </p>
            <div className="book-page__rating" title={`Rating: ${book.rating}`}>
              <p className="book-page__rating-title">
                Rating:
              </p>
              <span className="book-page__rating-stars">
              <span className="book-page__rating-stars-fill" style={{width: Number(book.rating) * RATING_MULTIPLIER + `%`}}/>
            </span>
              <p className="book-page__rating-value">
                {book.rating}
              </p>
            </div>
            <div className="book-page__upvote">
              <button className={`book-page__upvote-button ${book.upvoted ? 'book-page__upvote-button--active':''}`} title={`Book ${book.upvoted ? 'upvoted':'not upvoted'}`}>
                <svg version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     x="0px" y="0px"
                     viewBox="0 0 478.2 478.2"
                     xmlSpace="preserve"
                     width="20"
                     height="20"
                     className="book-page__upvote-icon">
                  <path d="M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5
                c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1
                c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7
                c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61
                c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3
                c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3
                c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1
                c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4
                c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8
                c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2
                c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9
                c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7
                c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3
                c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3
                C444.875,295.3,440.675,304.4,431.975,313.4z"/>
                </svg>
              </button>
              <p className="book-page__upvote-value" title={`Book upvoted ${book.upvotes} times`}>
                {book.upvotes}
              </p>
            </div>
          </div>
        </div>
      </div>
    }

    return null;
  }

  componentDidMount() {
    const {
      slug,
      loadBook} = this.props;

    loadBook(slug);
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  book: state.bookData,
  isBookLoaded: state.isBookLoaded
});

const mapDispatchToProps = {
  loadBook,
  setBookLoadedFlag
};

export {BookPage};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
