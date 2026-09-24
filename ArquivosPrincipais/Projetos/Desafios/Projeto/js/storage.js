const Storage = { key:'orbita.v1', load(){ try{return JSON.parse(localStorage.getItem(this.key))||{events:[],participants:[],favorites:[],notifications:[],theme:'dark',logged:false}}catch{return {events:[],participants:[],favorites:[],notifications:[],theme:'dark',logged:false}} }, save(data){localStorage.setItem(this.key,JSON.stringify(data))} };
let state = Storage.load();
const persist = () => Storage.save(state);
