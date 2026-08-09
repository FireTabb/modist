import categoryModel from "../../../new-js/models/category/categoryModel"
import productsModel from "../../../new-js/models/products/productsModel"

const init=async()=>{
    const url=new URL(location.href)
    const search=url.searchParams.get('category_id')
    const data= await categoryModel.getSubWithProducts(search)
data.forEach(async (element) => {
    const products=await productsModel.getByCategory(element.id)
    console.log(products);
});
}
init()