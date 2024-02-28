import { defineComponent } from 'vue'

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

const decoratorProps = {
  name: String
}

export default defineComponent({
  props: decoratorProps,

  setup() {
    return () => <div></div>
  }
})
