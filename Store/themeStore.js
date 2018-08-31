import { observable, action } from "mobx";

let Store = undefined;

class ThemeStore {
  THEMES = {
    BLUE: "blue",
    RED: "red"
  };
  STARS = {
    BLUE: "rgba(5, 200, 200, .8)",
    RED: "rgba(200, 5, 5, .8)"
  };
  LINES = {
    BLUE: "rgba(10, 222, 222, .8)",
    RED: "rgba(255, 71, 26, .8)"
  };
  BG = {
    BLUE: "cat1.png",
    RED: "Wickedity.png"
  };
  // BG = {
  //   BLUE: '/0.png',
  //   RED: '/0.png',
  // };

  @observable
  headerColor = "";
  @observable
  themeToggle = null;
  @observable
  imageUrl = "";
  @observable
  star = "rgba(5, 200, 200, .8)";
  @observable
  line = "rgba(10, 222, 222, .8)";
  @observable
  dropdownMenuOpen = false;

  constructor() {
    const localStorageThemeColor =
      localStorage && localStorage.getItem("theme");
    if (localStorageThemeColor === this.THEMES.RED) {
      this.headerColor = this.THEMES.RED;
      this.themeToggle = false;
      this.star = this.STARS.RED;
      this.line = this.LINES.RED;
      this.imageUrl = this.BG.RED;
    } else {
      this.headerColor = this.THEMES.BLUE;
      this.themeToggle = true;
      this.star = this.STARS.BLUE;
      this.line = this.LINES.BLUE;
      this.imageUrl = this.BG.BLUE;
    }
  }

  @action
  toggleTheme = () => {
    this.themeToggle = !this.themeToggle;
    this.headerColor = this.themeToggle ? this.THEMES.BLUE : this.THEMES.RED;
    this.imageUrl = this.themeToggle ? this.BG.BLUE : this.BG.RED;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", this.headerColor);
    }
  };

  @action
  toggleDropdown = () => {
    this.dropdownMenuOpen = !this.dropdownMenuOpen;
  };

  @action
  checkLocalStorage = () => {
    const localStorageThemeColor = localStorage.getItem("theme");
    if (localStorageThemeColor === this.THEMES.RED) {
      this.headerColor = this.THEMES.RED;
      this.themeToggle = false;
      this.star = this.STARS.RED;
      this.line = this.LINES.RED;
      this.imageUrl = this.BG.RED;
    } else {
      this.headerColor = this.THEMES.BLUE;
      this.themeToggle = true;
      this.star = this.STARS.BLUE;
      this.line = this.LINES.BLUE;
      this.imageUrl = this.BG.BLUE;
    }
  };
}

export function initStore() {
  if (Store === undefined) {
    Store = new ThemeStore();
  }
  return Store;
}

export default initStore;
