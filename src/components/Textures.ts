import { TextureLoader, NearestFilter } from 'three'
import { CubeTexture } from '@/types'

import dirtImage from '@/assets/textures/dirt.jpg'
import grassImage from '@/assets/textures/grass.jpg'

type Textures = {
  [key in CubeTexture]: number
}

const dirtTexture = new TextureLoader().load(dirtImage).magFilter = NearestFilter
const grassTexture = new TextureLoader().load(grassImage).magFilter = NearestFilter

export const textures: Textures = {
  dirt: dirtTexture,
  grass: grassTexture
}
