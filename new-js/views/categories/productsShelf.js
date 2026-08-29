import View from "./../View";

export class productsShelf extends View {
  _parent = document.querySelector("#products-wrpaer");

  // searchNotFound() {
  //   this._parent.insertAdjacentHTML("beforeend", `
  //       <div
  //         class="bg-primary-50 absolute top-0 right-0 bottom-0 left-0 z-200"
  //       >
  //         <i
  //           class="iconsax return__icon return__icon--header absolute top-0 right-0 m-4"
  //           icon-name="arrow-right"
  //         ></i>

  //         <div class="flex h-full flex-col items-center justify-center gap-6">
  //           <img src="images/notfound.png" alt="" />
  //           <p class="t-5-bold">متاسفانه نتیجه ای یافت نشد</p>
  //         </div>
  //       </div>
  //     </div>
  //     `);
  // }
  
  _generateMarkup() {
    return this.cardMarkup;
  }
}

export default new productsShelf();
