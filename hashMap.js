 class HashMap {
    constructor() {
        this.bucket = new Array(16);
        this.loadFactor = 0.75;
        this.length = 0;
    }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) %  this.bucket.length
    }
    return hashCode;
} 

  set(key, value) {
     let index = this.hash(key);
     if(!this.bucket[index]) this.bucket[index] = [];
     this.bucket[index].push({key, value})
     this.length += 1;
     this.grow()
  }

  get(key) {
   let index = this.hash(key)
   if (this.bucket[index] != undefined) {
    for (let i = 0; i < this.bucket[index].length; i++) {
        if (this.bucket[index][i].key == key) {
            return this.bucket[index][i].value
        }
      }
  } else return null;
 }

  has(key) {
    let get = this.get(key);
     if (get != null) return true;
     return false;
 }

  remove(key) {
    let index = this.hash(key)
    if (this.bucket[index] != undefined) {
     for (let i = 0; i < this.bucket[index].length; i++) {
         if (this.bucket[index][i].key == key) {
            this.bucket[index].splice([i], 1);
            this.length--
            return true;
         }
       }
   }
   return false;     
 }

  length() {
    return this.length;
 }
  clear () {
    this.bucket = new Array(16);
    this.length = 0;
  }
  keys() {
    let total = []
    this.bucket.forEach(array => array.forEach(item => total.push(item.key)))
    return total
  }
  values() {
    let total = []
    this.bucket.forEach(array => array.forEach(item => total.push(item.value)))
    return total
  }
  entries() {
    let total = []
    this.bucket.forEach(array => array.forEach(item => total.push([item.key, item.value])))
    return total
  }
  grow() {
    if (this.length > this.bucket.length * this.loadFactor) {
      let clone = this.bucket;
      this.bucket = new Array(this.bucket.length * 2);
      this.length = 0;
      clone.forEach(array => array.forEach(item => this.set(item.key, item.value)));
    }
  }
}
//let test = new HashMap()
//test.set('apple', 'red')
//test.set('banana', 'yellow')
//test.set('carrot', 'orange')
//test.set('dog', 'brown')
//test.set('elephant', 'gray')
//test.set('frog', 'green')
//test.set('grape', 'purple')
//test.set('hat', 'black')
//test.set('ice cream', 'white')
//test.set('jacket', 'blue')
//test.set('kite', 'pink')
//test.set('lion', 'golden')
//test.set('moon', 'silver')

//console.log(test.bucket)
