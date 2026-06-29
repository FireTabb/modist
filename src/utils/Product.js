class Products {
  items = [0, 1, 2, 3, 4];
  getAll() {
    return this.items;
  }
  get(num) {
    let p = this.items.find((item) => item === num);
    if (!p) {
      return "محصولی یافت نشد";
    }
    return p;
  }
}
export default new Products();
