import React, { useState, useCallback } from 'react'
import { Vector3 } from 'three'
import { Cube } from './Cube'

interface ICube {
  id: number;
  position: [number, number, number]
}

export const Cubes = () => {
  const ground: ICube[] = []
  for (let x = 0; x < 20; x++) {
    for (let z = 0; z < 20; z++) {
      ground.push({ id: ground.length, position: [x, -1, z] })
    }
  }

  const [cubes, setCubes] = useState<ICube[]>(
    ground.concat([
      { id: ground.length, position: [1, 0, 0]},
      {id: ground.length + 1, position: [2, 0, 0]}
    ])
  )

  const addCube = useCallback((cube: ICube) => {
    setCubes((oldState) => ([
      ...oldState,
      cube,
    ]))
  }, [])

  const onCubeClick = useCallback((position: Vector3, clickedFace: number) => {
    const newCubeId = cubes.length + 1
    switch (clickedFace) {
      case 0: addCube({ id: newCubeId, position: [position.x + 1, position.y, position.z] }); break;
      case 1: addCube({ id: newCubeId, position: [position.x - 1, position.y, position.z] }); break;
      case 2: addCube({ id: newCubeId, position: [position.x, position.y + 1, position.z] }); break;
      case 3: addCube({ id: newCubeId, position: [position.x, position.y - 1, position.z] }); break;
      case 4: addCube({ id: newCubeId, position: [position.x, position.y, position.z + 1] }); break;
      case 5: addCube({ id: newCubeId, position: [position.x, position.y, position.z - 1] }); break;
      default: addCube({ id: newCubeId, position: [position.x + 1, position.y, position.z] }); break;
    }
  }, [addCube, cubes.length])

  return cubes.map((cube) => <Cube key={cube.id} onCubeClick={onCubeClick} position={cube.position} />)
}
