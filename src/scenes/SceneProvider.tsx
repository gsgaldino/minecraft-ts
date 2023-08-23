import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { KeyboardControls } from '@react-three/drei'
import { Crosshair } from '@/components'

import { store } from '@/store'

interface SceneProviderProps extends PropsWithChildren {}

export const SceneProvider = (props: SceneProviderProps) => {
  return (
    <Provider store={store}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'openMenu', keys: ['e', 'E']}
        ]}
      >
        {props.children}
      </KeyboardControls>
      <Crosshair />
    </Provider>
  )
}
