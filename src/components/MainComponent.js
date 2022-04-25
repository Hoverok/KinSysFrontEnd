import DishDetail from './DishdetailComponent';
import { Component } from 'react/cjs/react.production.min';
import Menu from './MenuComponent';
import Search from './SearchComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { postComment, postDish, putDish, deleteDish, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  
  postDish: (sessionActivity, name, healthHistoryNr, personalId, dateOfBirth, gender, address, tel, email, illnessDescription, diagnosis) => dispatch(postDish(sessionActivity, name, healthHistoryNr, personalId, dateOfBirth, gender, address, tel, email, illnessDescription, diagnosis)),
  putDish: (dishid, sessionActivity, name, healthHistoryNr, personalId, dateOfBirth, gender, address, tel, email, illnessDescription, diagnosis) => dispatch(putDish(dishid, sessionActivity, name, healthHistoryNr, personalId, dateOfBirth, gender, address, tel, email, illnessDescription, diagnosis)),
  deleteDish: (dishid) => dispatch(deleteDish(dishid)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) }

});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentserrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          postDish={this.props.postDish}
          putDish={this.props.putDish}
          deleteDish={this.props.deleteDish}
        />
      );
    }

    return (
      <div>
        <Header postDish={this.props.postDish}/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={200}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Search dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
