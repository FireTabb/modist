import productsModel from "../../models/products/productsModel";
import brandsModel from "../../models/brands/brandsModel";

const brandSetter = async function (products) {
  try {
    if (Array.isArray(products)) {
      
      const brandedProducts = [];
      for (const pro of products) {
        pro.brand_info = await brandsModel.getOne(pro.brandId);
        brandedProducts.push(pro);
      }
      return brandedProducts;
    } else {
      const productsObj = await productsModel.creatProductObj(products);
      products.brand_info = await brandsModel.getOne(products.brandId);
      return products;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const productsObjCreator = async function (products) {
  try {
    
    if (Array.isArray(products)) {
      const promises = products.map(async (pro) => {
        return await productsModel.creatProductObj(pro);
      });
      const producstObj = await Promise.all(promises);
      return await brandSetter(producstObj);
    } else {
      const productsObj = await productsModel.creatProductObj(products);
      return await brandSetter(products);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default productsObjCreator;
