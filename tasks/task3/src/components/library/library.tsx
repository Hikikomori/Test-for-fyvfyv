import {connect} from "react-redux";
import {BookType} from "../../types";

interface Props {
  books: Array<BookType>
}

interface State {
  filteredBooks: Array<BookType>,
  activePage: number
}

import Heading from "../heading/heading";
import Filter from "../filter/filter";
import BooksList from "../books-list/books-list";
import Pagination from "../pagination/pagination";

const BOOKS_PER_PAGE = 3;

class Library extends React.PureComponent<Props, State>{
  constructor(props) {
    super(props);

    this.state = {
      filteredBooks: this.props.books,
      activePage: 1
    }
  }

  render() {
    const {books} = this.props;

    return <section className="library app__library">
      <Heading/>
      <Filter
        onFilterBooks={(filter: string) => {
          this.setState({
            filteredBooks: books.filter((book:BookType) => {
              return book.title.toLowerCase().includes(filter.toLowerCase()) ||
                book.synopsis.toLowerCase().includes(filter.toLowerCase())
            }),
            activePage: 1
          });
        }}
      />
      {this.state.filteredBooks.length ?
        <BooksList
          books = {
            this.state.filteredBooks.slice(
              (this.state.activePage * BOOKS_PER_PAGE - BOOKS_PER_PAGE), (this.state.activePage * BOOKS_PER_PAGE)
            )
          }
        />:
        <p>
          No matching books found. Try changing your search query.
        </p>
      }
      <Pagination
        booksCount={this.state.filteredBooks.length}
        step={BOOKS_PER_PAGE}
        activePage={this.state.activePage}
        onSetPage={(page:number) => {
          this.setState({
            activePage: page
          })
        }}
      />
    </section>;
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  books: state.booksData.books
});

export {Library};

export default connect(mapStateToProps, null)(Library);

