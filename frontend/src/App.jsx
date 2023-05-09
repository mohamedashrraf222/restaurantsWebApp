import { Route, Routes, Link,useParams } from "react-router-dom";
import React from "react";
import Login from "./components/login";
import AddReview from "./components/add-review";
import Restaurant from "./components/restauranst";
import RestaurantsList from "./components/restaurants-list";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  function RestaurantWraper(){
    const {id} = useParams()
    return <Restaurant id={id} user={user}/>
  }

  function AddReviewWraper() {
    const {id} = useParams()
    return <AddReview id={id} user={user}/>
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route element={<RestaurantsList />} path="/" />
          <Route element={<RestaurantsList />} path="/restaurants" />
          <Route path="/login" Component={() => <Login user={user} login={login}/>} />
          <Route path="/restaurants/:id/review" element={<AddReviewWraper />} />
          {/* note that we needed to create a wraper for the component restaurant to pass through it the id using useParams parameter */}
          <Route path="/restaurants/:id" element={<RestaurantWraper />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
