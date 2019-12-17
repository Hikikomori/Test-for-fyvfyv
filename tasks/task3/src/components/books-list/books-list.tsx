import {BookType} from "../../types";
import Book from "../book/book";

interface Props {
  books: Array<BookType>
}

const BooksList: React.FC<Props> = (props) => {
  const {books} = props;

  return <ul className="books-list library__books-list">
    {books.map((book:BookType, i:number) => {
      return <Book
        book = {book}
        key = {i}
      />
    })}
  </ul>
};

export default BooksList;
