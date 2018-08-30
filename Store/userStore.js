import { observable, action } from "mobx";
import axios from "../config/Axios/axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import isEmpty from "../utils/isEmpty";
import Router from "../routes";

class UserStore {
  @observable
  isAuth = false;
  @observable
  errors = {};
  @observable
  user = {};
  @observable
  successfullyReset = false;

  constructor() {
    if (typeof localStorage !== "undefined" && localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.logoutUser();
      } else {
        setAuthToken(localStorage.jwtToken);
        this.setCurrentUser(decoded);
      }
    }
  }

  @action
  registerUser = user => {
    axios
      .post("/register", user)
      .then(res => {
        this.errors = {};
        Router.pushRoute("/login");
      })
      .catch(err => {
        this.errors = { ...err.response.data };
      });
  };

  @action
  loginUser = (user, redirectPath) => {
    axios
      .post("/login", user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        this.setCurrentUser(decoded);
        this.refreshToken(3000 * 1000);
        if (redirectPath && redirectPath !== "") {
          this.errors = {};
          Router.pushRoute(redirectPath);
        } else {
          this.errors = {};
          Router.pushRoute("/");
        }
      })
      .catch(err => {
        this.errors = { ...err.response.data };
      });
  };

  @action
  setCurrentUser = decoded => {
    this.user = { ...decoded };
    this.isAuth = !isEmpty(decoded);
  };

  @action
  logoutUser = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.setCurrentUser({});
    Router.pushRoute("/login");
  };

  @action
  changePassword = data => {
    axios
      .post("/resetpassword", data)
      .then(() => {
        this.errors = {};
        this.successfullyReset = true;
        setTimeout(() => {
          this.successfullyReset = false;
        }, 6000);
      })
      .catch(err => {
        this.errors = { ...err.response.data };
      });
  };

  refreshToken = (interval = 600 * 1000) => {
    setInterval(() => {
      axios
        .get("/refreshtoken")
        .then(res => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
        })
        .catch(err => {
          this.errors = { ...err.response.data };
        });
    }, interval);
  };
}

const Store = new UserStore();

export default Store;
