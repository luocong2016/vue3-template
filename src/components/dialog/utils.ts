import { getCurrentInstance, reactive, type Component, createApp } from 'vue'

export const extend = Object.assign

export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance()
  if (instance) {
    extend(instance.props as object, apis)
  }
}

export function usePopupState() {
  const state = reactive<{
    show: boolean
    [key: string]: any
  }>({ show: false })

  const toggle = (show?: boolean) => {
    state.show = show ?? !state.show
  }

  const open = (props: Record<string, any>) => {
    extend(state, props, { transitionAppear: true })
    toggle(true)
  }

  const close = () => toggle(false)

  return {
    state,
    open,
    close,
    toggle
  }
}

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    }
  }
}
