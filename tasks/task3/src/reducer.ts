const initialState = {
  booksData: [],
  bookData: {},
  isApplicationReady: false,
  isBookLoaded: false
};

const ActionCreator = {
  saveBooksData: (data: []) => {
    return {
      type: `SAVE_BOOKS_DATA`,
      payload: data,
    };
  },

  saveBookData: (bookData: []) => {
    return {
      type: `SAVE_BOOK_DATA`,
      payload: bookData,
    };
  },

  setAppReadyFlag: (flag: boolean) => {
    return {
      type: `SET_APP_READY_FLAG`,
      payload: flag
    }
  },

  setBookLoadedFlag: (flag: boolean) => {
    return {
      type: `SET_BOOK_LOADED_FLAG`,
      payload: flag
    }
  }
};

const Operation = {
  loadBooksData: () => (_dispatch, _getState, api) => {
    return api.get(`/books`)
      .then((response) => {
        return response.data;
      });
  },

  loadBookData: (slug) => (_dispatch, _getState, api) => {
    return api.get(`/books/${slug}`)
      .then((response) => {
        return response.data;
      });
  },

  loadBook: (slug) => (dispatch) => {
    dispatch(Operation.loadBookData(slug))
      .then (
        (bookData) => {
          dispatch(ActionCreator.saveBookData(bookData));
          dispatch(ActionCreator.setBookLoadedFlag(true));
        }
      )
  },

  init: () => (dispatch) => {
    dispatch(Operation.loadBooksData())
      .then (
        (data) => {
          dispatch(ActionCreator.saveBooksData(data));
          dispatch(ActionCreator.setAppReadyFlag(true));
        }
      )
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SAVE_BOOKS_DATA`: return Object.assign({}, state, {
      booksData: action.payload
    });

    case `SAVE_BOOK_DATA`: return Object.assign({}, state, {
      bookData: action.payload
    });

    case `SET_APP_READY_FLAG`: return Object.assign({}, state, {
      isApplicationReady: action.payload
    });

    case `SET_BOOK_LOADED_FLAG`: return Object.assign({}, state, {
      isBookLoaded: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  reducer
};
