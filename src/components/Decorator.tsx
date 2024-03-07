/* --start--- */

/* 类的装饰
```typescript
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
```

*/
function testable<T extends { isTestable?: boolean }>(isTestable: boolean = false) {
  return function (target: T) {
    target.isTestable = isTestable
  }
}
@testable(true)
class MyClass {
  static isTestable: boolean
}
console.log(MyClass.isTestable)

// 属性
function testable2<T>(target: new () => T): void {
  target.prototype.isTestable = true
}

interface MyTestableClass {
  isTestable: boolean
}

@testable2
class MyTestableClass {}

const obj = new MyTestableClass()
console.log(obj.isTestable)

const xx = 'ssss'

// 类装饰器
function logged<T extends new (...args: any[]) => any>(target: T) {
  return class extends target {
    constructor(...args: any[]) {
      super(...args)
      console.log(`constructing an instance of ${name} with arguments ${args.join(', ')}`)
    }
  } as unknown as T
}

@logged
class C {
  constructor(public name: string) {}
}

const c = new C('lutz')

console.log(c.name)

/* ---end--- */

import { defineComponent } from 'vue'

const decoratorProps = {
  name: String
}

export default defineComponent({
  props: decoratorProps,

  setup() {
    return () => <div>Decoator</div>
  }
})
