import { SceneProvider, FlatWorld } from '@/scenes'
import './styles.css';

export default function App() {
  return (
    <SceneProvider>
      <FlatWorld />
    </SceneProvider>
  )
}
