// 寄生继承
// 对象增强

function person() {
  const basePerson = new Object({
    name: '123'
  })
  basePerson.sayName = function () {
    console.log(this.name);
  }
}