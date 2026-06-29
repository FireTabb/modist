import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from "path"
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build:{
    rollupOptions:{
      input:{
        main:resolve(__dirname,'index.html'),
        categories:resolve(__dirname,'categories.html'),
        productspage:resolve(__dirname,'products.html'),
        shoppingCart:resolve(__dirname,'shopping-cart.html'),

        searchPage:resolve(__dirname,'search-page.html'),
        filterPage:resolve(__dirname,'filter-page.html'),
        
        personalInfo:resolve(__dirname,'personal-info.html'),

        profileSignin:resolve(__dirname,'profile-signin.html'),
        profileSignup:resolve(__dirname,'profile-signup.html'),
        
        producsFemaleCategorie:resolve(__dirname,'producs-female-category.html'),
        producsFemaleMantos:resolve(__dirname,'producs-female-mantos.html'),
        
        productInfo:resolve(__dirname,'product-info.html'),
      }
    }
  }
})