
"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ParticleMesh() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // ১. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    camera.position.z = 400

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

  
    const gridSize = 7
    const particleCount = gridSize * gridSize * gridSize
    
    const geometry = new THREE.BufferGeometry()
    const randomPositions = new Float32Array(particleCount * 3)
    const gridPositions = new Float32Array(particleCount * 3)
    const currentPositions = new Float32Array(particleCount * 3)

    let index = 0
    const spacing = 45 //

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
        
          gridPositions[index] = (x - (gridSize - 1) / 2) * spacing
          gridPositions[index + 1] = (y - (gridSize - 1) / 2) * spacing
          gridPositions[index + 2] = (z - (gridSize - 1) / 2) * spacing

         
          randomPositions[index] = (Math.random() - 0.5) * 800
          randomPositions[index + 1] = (Math.random() - 0.5) * 600
          randomPositions[index + 2] = (Math.random() - 0.5) * 500

         
          currentPositions[index] = randomPositions[index]
          currentPositions[index + 1] = randomPositions[index + 1]
          currentPositions[index + 2] = randomPositions[index + 2]

          index += 3
        }
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3))


    const material = new THREE.PointsMaterial({
      size: 3.5,
      color: 0x06b6d4, 
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)


    let mouseX = 0, mouseY = 0
    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001
    }
    window.addEventListener("mousemove", onMouseMove)


    const transitionObject = { progress: 0 }
    
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body, 
      start: "top top",
      end: "bottom center",
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.to(transitionObject, {
          progress: self.progress * 2.5, 
          duration: 0.1,
          overwrite: "auto",
          onUpdate: () => {
            const currentProgress = Math.min(transitionObject.progress, 1)
            const posAttr = geometry.attributes.position
            
            for (let i = 0; i < particleCount * 3; i++) {
              posAttr.array[i] = THREE.MathUtils.lerp(
                randomPositions[i],
                gridPositions[i],
                currentProgress
              )
            }
            posAttr.needsUpdate = true
          }
        })
      }
    })


    const animate = () => {
      requestAnimationFrame(animate)

      particleSystem.rotation.y += (mouseX - particleSystem.rotation.y) * 0.05 + 0.001
      particleSystem.rotation.x += (mouseY - particleSystem.rotation.x) * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", handleResize)
      scrollTriggerInstance.kill()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}

export default ParticleMesh;
