import { Component } from "react";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={
                        this.state.promotions.filter(
                            (promo) => promo.featured
                        )[0]
                    }
                    leader={
                        this.state.leaders.filter(
                            (leader) => leader.featured
                        )[0]
                    }
                />
            );
        };

        const DishWithId = ({ match }) => {
            const numberFormat = 10;

            return (
                <DishDetail
                    dish={
                        this.state.dishes.filter(
                            (dish) =>
                                dish.id === parseInt(match.params.dishId, numberFormat)
                        )[0]
                    }
                    comments={this.state.comments.filter(
                        (comment) =>
                            comment.dishId === parseInt(match.params.dishId, numberFormat)
                    )}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route
                        exact
                        path="/menu"
                        component={() => <Menu dishes={this.state.dishes} />}
                    />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
