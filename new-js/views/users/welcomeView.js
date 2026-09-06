import View from "../View";
import changeTranslateX from "../../behaviors/functionalities/changeX";

export class SignupView extends View {
  _parent = document.querySelector('#username__wrapper span');
  _generateMarkup() {
    return this._data;
  }
}
export default new SignupView();
