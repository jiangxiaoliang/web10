// 类装饰器
function anotationClass(id){
    console.log('anotationClass evaluated', id);
    return (target) => console.log('anotationClass executed', id, target);
}
// 方法装饰器
function anotationMethods(id){
    console.log('anotationMethods evaluated', id);
    return (target, property, descriptor) => console.log('anotationMethods executed', id);
}

@anotationClass(1)
@anotationClass(2)
class Example {
    @anotationMethods(1)
    @anotationMethods(2)
    method(){}
}

// 日志应用和切面实现
console.log('日志应用和切面实现.....')
function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    }
    return descriptor;
}
class Maths {
    @log
    add(a, b) {
        return a + b;
    }
}
const math = new Maths()
math.add(2, 4)

