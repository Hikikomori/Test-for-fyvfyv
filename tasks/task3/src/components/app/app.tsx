import {connect} from 'react-redux';
import {Operation} from '../../reducer';
import {Router, Switch, Route} from "react-router-dom";
import history from "../../history";

import Library from "../library/library";
import BookPage from "../book-page/book-page";
import Error404 from "../error-404/error-404";

const {init} = Operation;

interface Props {
  isApplicationReady: boolean
  init: () => void
}

class App extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {isApplicationReady} = this.props;

    if (isApplicationReady) {
      return (
        <Router history={history}>
          <Switch>
            <Route path="/" exact render={() => {
              return <>
                <Library/>
              </>;
            }}/>
            <Route path="/404" exact render={() => {
              return <>
                <Error404/>
              </>;
            }}/>
            <Route path="/:slug" render={({match}) => {
              return <>
                <BookPage
                  slug = {match.params.slug}
                />
              </>
          }}/>
          </Switch>
        </Router>
      );
    }

    return null;
  }

  componentDidMount() {
    const {
      isApplicationReady,
      init} = this.props;

    if (!isApplicationReady) {
      init();
    }
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isApplicationReady: state.isApplicationReady
});

const mapDispatchToProps = {
  init
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
