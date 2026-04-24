"use client"
import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export default function Hero3DModel({ containerRef }) {
  const group = useRef()
  
  const HOME_X = 0.5
  const WALK_LAMBDA = 3
  
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile('ontouchstart' in window || window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scene, animations, nodes } = useGLTF('/models/pet-transformed.glb')
  
  useMemo(() => {
    if (animations.length > 0) {
      animations.forEach(clip => {
        clip.tracks = clip.tracks.filter(track => {
          const name = track.name.toLowerCase()
          return !(name.includes('.position') && (
            name.includes('root') || name.includes('hips') || name.includes('armature') || 
            name.includes('mixamorig') || name.includes('pelvis')
          ))
        })
      })
    }
  }, [animations])

  const { actions, names } = useAnimations(animations, group)
  const currentAnim = useRef(names[0])

  useMemo(() => {
    scene.traverse((child) => {
      if (child.name.includes('Grass_lawn') || child.name.includes('diorama') || child.name.includes('lawn') || child.name.includes('RootNode')) {
        child.visible = false
      }
      if (child.isMesh) {
        const name = child.name.toLowerCase()
        if (name.includes('grass') || name.includes('ground') || name.includes('floor') || name.includes('plane') || name.includes('terrain')) {
          child.visible = false
        }
        const isPuppyPart = child.isSkinnedMesh || child.type === 'SkinnedMesh' || name.includes('rover')
        if (!isPuppyPart && child.visible) child.visible = false
      }
    })
    return true
  }, [scene])

  useEffect(() => {
    const handleAction = () => {
      const jumpAnim = names.find(n => n.toLowerCase().includes('jump'))
      if (jumpAnim && actions[jumpAnim]) {
        actions[currentAnim.current]?.fadeOut(0.2)
        actions[jumpAnim].reset().setLoop(THREE.LoopOnce).fadeIn(0.2).play()
        const timer = setTimeout(() => {
          actions[jumpAnim]?.fadeOut(0.2)
          actions[currentAnim.current]?.reset().fadeIn(0.2).play()
        }, actions[jumpAnim].getClip().duration * 1000)
        return () => clearTimeout(timer)
      }
    }
    const el = containerRef?.current
    if (el) {
      el.addEventListener('click', handleAction)
      return () => el.removeEventListener('click', handleAction)
    }
  }, [names, actions, containerRef])

  useFrame((state, delta) => {
    if (!isMobile) {
      if (actions[names[0]] && !actions[names[0]].isRunning()) actions[names[0]].play()
      if (group.current) {
        group.current.position.x = THREE.MathUtils.damp(group.current.position.x, HOME_X, WALK_LAMBDA, delta)
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, 0, 4, delta)
      }
    }
    if (group.current) {
      group.current.position.y = -1.0
      group.current.position.z = 0
    }
    if (nodes.Rover_Skeleton) {
      nodes.Rover_Skeleton.position.x = nodes.Rover_Skeleton.position.z = 0
    }
  })

  return (
    <group ref={group} scale={1.15} position={[0.5, -1.0, 0]} dispose={null}>
      <primitive object={scene} />
      <ContactShadows position={[0, -0.01, 0]} scale={40} blur={2} far={1} opacity={0.2} resolution={512} />
    </group>
  )
}
