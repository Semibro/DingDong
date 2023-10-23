import { useRef, useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { gsap } from "gsap"
import { useRecoilValue } from "recoil"
import { isHouseVisibleAtom } from "../../../atom/HouseAtom"

function House() {
  const housePosition = [5, -4, 2]
  const isHouseVisible = useRecoilValue(isHouseVisibleAtom)
  const gltf = useLoader(GLTFLoader, "assets/models/house.glb")
  const meshRef = useRef()

  useEffect(() => {
    if (isHouseVisible) {
      gsap.to(meshRef.current.position, {
        y: -0.7,
        duration: 1,
        ease: "power2.out",
      })
    } else {
      gsap.to(meshRef.current.position, {
        y: housePosition[1],
        duration: 1,
        ease: "power2.out",
      })
    }
  }, [isHouseVisible, housePosition])
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.1
    }
  }, [meshRef])

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={housePosition}
      castShadow
    />
  )
}

export default House
