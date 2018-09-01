import { observable, action } from "mobx";
import axios from "../config/Axios/axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import isEmpty from "../utils/isEmpty";
import { Router } from "../routes";
let Store = undefined;

class UserStore {
  @observable
  isAuth = false;
  @observable
  errors = {};
  @observable
  user = {};
  @observable
  successfullyReset = false;
  email = "";

  constructor() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.logoutUser();
      } else {
        setAuthToken(localStorage.jwtToken);
        this.setCurrentUser(decoded);
        this.refreshToken(3600 * 1000);
      }
    }
  }

  @action
  registerUser = user => {
    axios
      .post("/register", user)
      .then(res => {
        this.errors = {};
        Router.push("/login");
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
          Router.push(redirectPath);
        } else {
          this.errors = {};
          Router.push("/");
        }
      })
      .catch(err => {
        if (err.response) {
          this.errors = { ...err.response.data };
        }
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
    Router.push("/login");
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

export function initUserStore() {
  if (Store === undefined) {
    Store = new UserStore();
  }
  return Store;
}
export default initUserStore;
