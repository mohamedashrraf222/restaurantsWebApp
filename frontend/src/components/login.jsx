import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

function Login(props) {
  const [alert, setAlert] = useState("")

  // defining navigate to use it to navigate to home page after login
  const navigate = useNavigate()

  // this is the initialUserData state
  const initialUserState = {
    name: "",
    id: "",
  };

  // defining state for the user
  const [user, setUser] = useState(initialUserState);

  // handdle change for inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // this function is created to setUser in App.jsx by using login function passed from the props
  // then after setting the user it navigates to the home 
  const login = (event) => {
    event.preventDefault()
    let myUser = null;
    RestaurantDataService.login(user).then((res) => {
      if(res.data == null ){
        setAlert("please enter a valid user")
      }else{
        myUser = {
          name: res.data.username,
          id: res.data.pass,
        };
      props.login(myUser);
      navigate("/");
      }
    });
  };

  return (
    <div className="submit-form">

      <form>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
        {alert}
      </form>
    </div>
  );
}

export default Login;
