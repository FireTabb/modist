import { AJAX } from "../../src/js/helper"

export default class Model{
    fetch=null;
    constructor(){
        this.fetch=AJAX
    }
    async get(url){
        return await this.fetch(url)
    }
}