import { Route, Routes, Link, useParams } from "react-router-dom";
import React from "react";
import Login from "./components/login";
import SignUp from './components/signup'
import AddReview from "./components/add-review";
import Restaurant from "./components/restauranst";
import RestaurantsList from "./components/restaurants-list";

function App() {
  // this is the user state
  const [user, setUser] = React.useState(null);

  // login function is user to setUser state
  async function login(user = null) {
    setUser(user);
  }

  // logout will setUser to null as logging out
  async function logout() {
    setUser(null);
  }

  // for both next wraper functions
  // this is a wraper to get the parameters from the url and pass it to the component
  // we used useParams hook to get the id then give it in the parameters
  // we also are passing the user which will be null or the user info if logged in
  function RestaurantWraper() {
    const { id } = useParams();
    return <Restaurant id={id} user={user} />;
  }

  function AddReviewWraper() {
    const { id } = useParams();
    return <AddReview id={id} user={user} />;
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Restaurants
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  sign Up
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route element={<RestaurantsList />} path="/" />
          <Route
            path="/login"
            Component={() => <Login user={user} login={login} />}
          />
          <Route
            path="/signup"
            Component={() => <SignUp user={user} login={login} />}
          />
          <Route path="/restaurants/:id/review" element={<AddReviewWraper />} />
          {/* note that we needed to create a wraper for the component restaurant to pass through it the id using useParams parameter */}
          <Route path="/restaurants/:id" element={<RestaurantWraper />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
