"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Camera, RotateCw, AlertTriangle, Layers, Sliders } from "lucide-react";

interface Intan3DViewerProps {
  compact?: boolean;
  className?: string;
}

export default function Intan3DViewer({ compact = false, className = "" }: Intan3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Viewport & Lighting States
  const [autoTurntable, setAutoTurntable] = useState<boolean>(false);
  const [currentCameraPreset, setCurrentCameraPreset] = useState<string>("still1");

  // Mechanical States
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [servoAngleDeg, setServoAngleDeg] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isHoodOpen, setIsHoodOpen] = useState<boolean>(false);
  const [isCutoffActive, setIsCutoffActive] = useState<boolean>(false);

  // LCD & Telemetry States
  const [tempValue, setTempValue] = useState<string>("571,3 °C");
  const [hysteresisTag, setHysteresisTag] = useState<string>("Ideal (550–600 °C)");
  const [blowerState, setBlowerState] = useState<string>("Aktif (PWM 85%)");
  const [servoState, setServoState] = useState<string>("Posisi 0° (siklus 15 dtk)");

  // Technical HUD Card
  const [hotspotTitle, setHotspotTitle] = useState<string>("INTAN — pemanggang kemplang tunu");
  const [hotspotDesc, setHotspotDesc] = useState<string>(
    "Palung SUS 304, dua blower keong, enam rak U-loop, dan kompartemen servo."
  );

  // References for Three.js engine
  const engineRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    roasterGroup: null as THREE.Group | null,
    studioFloorMesh: null as THREE.Mesh | null,
    drawerLeftGroup: null as THREE.Group | null,
    drawerRightGroup: null as THREE.Group | null,
    servoHoodGroup: null as THREE.Group | null,
    rackPivotGroups: [] as Array<{
      group: THREE.Group;
      kemplang: THREE.Mesh;
      index: number;
      currentAngle: number;
      targetAngle: number;
    }>,
    blowerImpellers: [] as THREE.Group[],
    emberMeshes: [] as THREE.Mesh[],
    emberParticles: [] as THREE.Mesh[],
    airParticles: [] as THREE.Mesh[],
    emberPointLight1: null as THREE.PointLight | null,
    emberPointLight2: null as THREE.PointLight | null,
    studioWarmLight: null as THREE.DirectionalLight | null,
    // Camera orbit parameters (Matching Still 1 initially)
    camTheta: -0.62,
    camPhi: 0.86,
    camRadius: 10.6,
    targetCamTheta: -0.62,
    targetCamPhi: 0.86,
    targetCamRadius: 10.6,
    camLookAt: new THREE.Vector3(0, 0.1, 0),
    targetLookAt: new THREE.Vector3(0, 0.1, 0),
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    // Kinematic targets
    targetDrawerZ: 0,
    targetHoodAngle: 0,
    flipStartTime: 0,
    autoFlipActive: false,
    lastAutoFlip: 0,
    isHysteresisCutoff: false,
    autoTurntable: false,
    reqId: 0,
    textures: [] as THREE.Texture[],
    envTexture: null as THREE.Texture | null,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const eng = engineRef.current;
    eng.scene = new THREE.Scene();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const fitScale = width / height < 1.2 ? 1.55 : width / height < 1.8 ? 1.25 : 1;
    eng.camRadius = 10.6 * fitScale;
    eng.targetCamRadius = eng.camRadius;

    eng.camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

    eng.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    eng.renderer.setSize(width, height);
    eng.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    eng.renderer.shadowMap.enabled = true;
    eng.renderer.shadowMap.type = THREE.PCFShadowMap;
    eng.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    eng.renderer.toneMappingExposure = 0.78;

    // A neutral studio environment gives the brushed stainless something to reflect.
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(eng.renderer);
    eng.envTexture = pmrem.fromScene(room, 0.04).texture;
    eng.scene.environment = eng.envTexture;
    room.dispose();
    pmrem.dispose();

    // -------------------------------------------------------------
    // 1. PROCEDURAL TEXTURES (BRUSHED SUS 304, ASH BED, KEMPLANG)
    // -------------------------------------------------------------
    // Brushed Stainless Steel Bump/Roughness Map
    const metalCanvas = document.createElement("canvas");
    metalCanvas.width = 256;
    metalCanvas.height = 256;
    const mCtx = metalCanvas.getContext("2d");
    if (mCtx) {
      mCtx.fillStyle = "#d4d8dd";
      mCtx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 900; i++) {
        const gray = 190 + Math.floor(Math.random() * 55);
        mCtx.fillStyle = `rgb(${gray},${gray},${gray})`;
        mCtx.fillRect(Math.random() * 256, Math.random() * 256, 28 + Math.random() * 60, 1.2);
      }
    }
    const brushedMetalTex = new THREE.CanvasTexture(metalCanvas);
    brushedMetalTex.wrapS = THREE.RepeatWrapping;
    brushedMetalTex.wrapT = THREE.RepeatWrapping;
    brushedMetalTex.repeat.set(3, 2);
    eng.textures.push(brushedMetalTex);

    // Granular Grey-White Ash Bed Texture
    const ashCanvas = document.createElement("canvas");
    ashCanvas.width = 256;
    ashCanvas.height = 256;
    const aCtx = ashCanvas.getContext("2d");
    if (aCtx) {
      aCtx.fillStyle = "#686b6e";
      aCtx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 6500; i++) {
        const v = 65 + Math.floor(Math.random() * 145);
        aCtx.fillStyle = `rgb(${v},${v},${v})`;
        aCtx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
      }
    }
    const ashTex = new THREE.CanvasTexture(ashCanvas);
    ashTex.wrapS = THREE.RepeatWrapping;
    ashTex.wrapT = THREE.RepeatWrapping;
    ashTex.repeat.set(4, 4);
    eng.textures.push(ashTex);

    // Kemplang Tunu Texture with toasted rim gradient (Still 1, 2, 3)
    const kempCanvas = document.createElement("canvas");
    kempCanvas.width = 256;
    kempCanvas.height = 256;
    const kCtx = kempCanvas.getContext("2d");
    if (kCtx) {
      kCtx.fillStyle = "#f5e1be";
      kCtx.fillRect(0, 0, 256, 256);
      const toastGrad = kCtx.createRadialGradient(75, 128, 15, 130, 128, 130);
      toastGrad.addColorStop(0, "rgba(194, 122, 70, 0.55)");
      toastGrad.addColorStop(0.55, "rgba(235, 205, 160, 0.22)");
      toastGrad.addColorStop(1, "rgba(245, 225, 190, 0)");
      kCtx.fillStyle = toastGrad;
      kCtx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 900; i++) {
        kCtx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.25)" : "rgba(180,140,95,0.18)";
        kCtx.beginPath();
        kCtx.arc(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2.5, 0, Math.PI * 2);
        kCtx.fill();
      }
    }
    const kemplangTex = new THREE.CanvasTexture(kempCanvas);
    eng.textures.push(kemplangTex);

    // -------------------------------------------------------------
    // 2. STUDIO LIGHTING SETUP (MATCHING STILL 1, 2, 3)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    eng.scene.add(ambientLight);

    const mainStudioLight = new THREE.DirectionalLight(0xfffaf0, 1.05);
    mainStudioLight.position.set(7, 13, 8);
    mainStudioLight.castShadow = true;
    mainStudioLight.shadow.mapSize.width = 2048;
    mainStudioLight.shadow.mapSize.height = 2048;
    mainStudioLight.shadow.camera.near = 1;
    mainStudioLight.shadow.camera.far = 30;
    const d = 6.5;
    mainStudioLight.shadow.camera.left = -d;
    mainStudioLight.shadow.camera.right = d;
    mainStudioLight.shadow.camera.top = d;
    mainStudioLight.shadow.camera.bottom = -d;
    mainStudioLight.shadow.bias = -0.0005;
    eng.scene.add(mainStudioLight);

    eng.studioWarmLight = new THREE.DirectionalLight(0xffbfa3, 0.5);
    eng.studioWarmLight.position.set(-6, 8, -7);
    eng.scene.add(eng.studioWarmLight);

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 0.35);
    rimLight.position.set(0, 5, -10);
    eng.scene.add(rimLight);

    const forgeGlow = new THREE.PointLight(0xff6a2a, 0.55, 7, 2);
    forgeGlow.position.set(-1.5, 1.4, 3.2);
    eng.scene.add(forgeGlow);

    // Internal Glowing Charcoal Point Lights
    eng.emberPointLight1 = new THREE.PointLight(0xff3b00, 2.6, 4.8);
    eng.emberPointLight1.position.set(-1.55, 0.05, 0.15);
    eng.scene.add(eng.emberPointLight1);

    eng.emberPointLight2 = new THREE.PointLight(0xff3b00, 2.6, 4.8);
    eng.emberPointLight2.position.set(1.55, 0.05, 0.15);
    eng.scene.add(eng.emberPointLight2);

    // Shadow-Catching Floor Plane
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.32 });
    eng.studioFloorMesh = new THREE.Mesh(floorGeo, floorMat);
    eng.studioFloorMesh.rotation.x = -Math.PI / 2;
    eng.studioFloorMesh.position.y = -1.24;
    eng.studioFloorMesh.receiveShadow = true;
    eng.scene.add(eng.studioFloorMesh);

    // -------------------------------------------------------------
    // 3. PBR MATERIALS (SUS 304, HOOD, CHROME, ASH, BRIQUETTES)
    // -------------------------------------------------------------
    const sus304Mat = new THREE.MeshStandardMaterial({
      color: 0x8b9198,
      map: brushedMetalTex,
      bumpMap: brushedMetalTex,
      bumpScale: 0.004,
      metalness: 0.78,
      roughness: 0.34,
      envMapIntensity: 0.65,
    });

    const hoodBrushedMat = new THREE.MeshStandardMaterial({
      color: 0x7d838a,
      map: brushedMetalTex,
      bumpMap: brushedMetalTex,
      bumpScale: 0.006,
      metalness: 0.72,
      roughness: 0.38,
      envMapIntensity: 0.6,
    });

    const darkChamberMat = new THREE.MeshStandardMaterial({
      color: 0x33383d,
      metalness: 0.45,
      roughness: 0.5,
      envMapIntensity: 0.5,
    });

    const wireClampMat = new THREE.MeshStandardMaterial({
      color: 0xc9d1d8,
      metalness: 0.8,
      roughness: 0.28,
      envMapIntensity: 0.8,
    });

    const blowerChromeMat = new THREE.MeshStandardMaterial({
      color: 0xb8c0c8,
      metalness: 0.8,
      roughness: 0.28,
      envMapIntensity: 0.8,
    });

    const motorDarkMat = new THREE.MeshStandardMaterial({
      color: 0x272a30,
      metalness: 0.45,
      roughness: 0.55,
    });

    const orangeKnobMat = new THREE.MeshStandardMaterial({
      color: 0xea6a15,
      metalness: 0.15,
      roughness: 0.32,
    });

    const kemplangMat = new THREE.MeshStandardMaterial({
      color: 0xe6cda6,
      map: kemplangTex,
      roughness: 0.78,
      metalness: 0.02,
    });

    const ashBedMat = new THREE.MeshStandardMaterial({
      map: ashTex,
      bumpMap: ashTex,
      bumpScale: 0.025,
      roughness: 0.92,
      metalness: 0.05,
    });

    const blackCharcoalMat = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      roughness: 0.65,
      metalness: 0.15,
      bumpMap: ashTex,
      bumpScale: 0.02,
    });

    const glowingCrackMat = new THREE.MeshStandardMaterial({
      color: 0xff2a00,
      emissive: 0xff3b00,
      emissiveIntensity: 2.2,
      roughness: 0.4,
    });

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
    const redRimMat = new THREE.MeshStandardMaterial({ color: 0xd9381e, roughness: 0.35 });

    // -------------------------------------------------------------
    // 4. MAIN ROASTING TROUGH (100 CM TROUGH, 2 CHAMBERS, 124 CM SPAN)
    // -------------------------------------------------------------
    eng.roasterGroup = new THREE.Group();
    eng.scene.add(eng.roasterGroup);

    const bodyWidth = 6.2;
    const bodyHeight = 1.65;
    const bodyDepth = 2.35;
    const wallThick = 0.08;

    // Bottom Plate
    const bottomPlate = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth, wallThick, bodyDepth), sus304Mat);
    bottomPlate.position.set(0, -bodyHeight / 2 + wallThick / 2, 0.22);
    bottomPlate.castShadow = true;
    bottomPlate.receiveShadow = true;
    eng.roasterGroup.add(bottomPlate);

    // Outer Left & Right Walls with Circular Blower Inlet Holes
    [-1, 1].forEach((side) => {
      const sWall = new THREE.Mesh(new THREE.BoxGeometry(wallThick, bodyHeight, bodyDepth), sus304Mat);
      sWall.position.set(side * (bodyWidth / 2 - wallThick / 2), 0, 0.22);
      sWall.castShadow = true;
      sWall.receiveShadow = true;
      eng.roasterGroup?.add(sWall);

      // Chrome rim air inlet
      const airHoleRim = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.11, 24), blowerChromeMat);
      airHoleRim.rotation.z = Math.PI / 2;
      airHoleRim.position.set(side * (bodyWidth / 2 - 0.05), -0.15, -0.25);
      eng.roasterGroup?.add(airHoleRim);

      const airHoleDark = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.12, 24),
        new THREE.MeshBasicMaterial({ color: 0x090a0f })
      );
      airHoleDark.rotation.z = Math.PI / 2;
      airHoleDark.position.set(side * (bodyWidth / 2 - 0.05), -0.15, -0.25);
      eng.roasterGroup?.add(airHoleDark);
    });

    // Central Divider Wall between Left & Right Chambers
    const centerDivider = new THREE.Mesh(new THREE.BoxGeometry(0.08, bodyHeight, bodyDepth - 0.06), sus304Mat);
    centerDivider.position.set(0, 0, 0.22);
    eng.roasterGroup.add(centerDivider);

    // Upper Front Lip Rim
    [-1.56, 1.56].forEach((lx) => {
      const topLip = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.22, wallThick), sus304Mat);
      topLip.position.set(lx, bodyHeight / 2 - 0.11, bodyDepth / 2 + 0.22 - wallThick / 2);
      eng.roasterGroup?.add(topLip);
    });

    // Rear Wall separating Roasting Trough from Servo Compartment
    const troughBackWall = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth, bodyHeight, wallThick), sus304Mat);
    troughBackWall.position.set(0, 0, -bodyDepth / 2 + 0.22);
    eng.roasterGroup.add(troughBackWall);

    // 4 Caster Wheels with Red Rims (10 cm scale)
    const wheelCoords = [
      [-bodyWidth / 2 + 0.32, -1.04, bodyDepth / 2 + 0.05],
      [bodyWidth / 2 - 0.32, -1.04, bodyDepth / 2 + 0.05],
      [-bodyWidth / 2 + 0.32, -1.04, -bodyDepth / 2 - 0.45],
      [bodyWidth / 2 - 0.32, -1.04, -bodyDepth / 2 - 0.45],
    ];
    wheelCoords.forEach((pos) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(pos[0], pos[1], pos[2]);
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.12, 20), tireMat);
      tire.rotation.z = Math.PI / 2;
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.13, 16), redRimMat);
      rim.rotation.z = Math.PI / 2;
      wGroup.add(tire, rim);
      eng.roasterGroup?.add(wGroup);
    });

    // -------------------------------------------------------------
    // 5. SLIDING CHARCOAL DRAWERS + 3 BRIQUETTE LOGS + GLOWING CRACKS
    // -------------------------------------------------------------
    eng.emberMeshes = [];
    function createDetailedDrawer(xCenter: number, logXOffsets: number[]) {
      const dGroup = new THREE.Group();

      const frontFace = new THREE.Mesh(new THREE.BoxGeometry(2.96, 1.32, 0.08), sus304Mat);
      frontFace.position.set(xCenter, -0.14, bodyDepth / 2 + 0.22);
      frontFace.castShadow = true;
      dGroup.add(frontFace);

      const trayBase = new THREE.Mesh(new THREE.BoxGeometry(2.86, 0.08, 2.15), darkChamberMat);
      trayBase.position.set(xCenter, -0.68, 0.22);
      dGroup.add(trayBase);

      const ashBed = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.18, 2.08), ashBedMat);
      ashBed.position.set(xCenter, -0.36, 0.22);
      ashBed.receiveShadow = true;
      dGroup.add(ashBed);

      // Stepped cylindrical orange handle knob
      const knobNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.16, 20), orangeKnobMat);
      knobNeck.rotation.x = Math.PI / 2;
      knobNeck.position.set(xCenter, -0.14, bodyDepth / 2 + 0.3);
      dGroup.add(knobNeck);

      const knobHead = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.12, 24), orangeKnobMat);
      knobHead.rotation.x = Math.PI / 2;
      knobHead.position.set(xCenter, -0.14, bodyDepth / 2 + 0.4);
      dGroup.add(knobHead);

      // 3 Elongated charcoal briquettes with glowing fissure cores
      logXOffsets.forEach((lx, idx) => {
        const logGroup = new THREE.Group();
        logGroup.position.set(lx, -0.16, 0.18);
        logGroup.rotation.y = (idx - 1) * 0.06;

        const charcoalLog = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 1.35, 9), blackCharcoalMat);
        charcoalLog.rotation.x = Math.PI / 2;
        charcoalLog.scale.set(1.05, 0.72, 1.0);
        charcoalLog.castShadow = true;
        logGroup.add(charcoalLog);

        const emberCore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.17, 1), glowingCrackMat);
        emberCore.position.set(-0.06, 0.05, -0.05 + (idx % 2) * 0.12);
        emberCore.scale.set(0.9, 0.65, 1.85);
        logGroup.add(emberCore);
        eng.emberMeshes.push(emberCore);

        dGroup.add(logGroup);
      });

      return dGroup;
    }

    eng.drawerLeftGroup = createDetailedDrawer(-1.54, [-2.18, -1.54, -0.92]);
    eng.drawerRightGroup = createDetailedDrawer(1.54, [0.92, 1.54, 2.18]);
    eng.roasterGroup.add(eng.drawerLeftGroup, eng.drawerRightGroup);

    // -------------------------------------------------------------
    // 6. SIX HAIRPIN U-LOOP WIRE CLAMPS + 1 KEMPLANG TUNU EACH
    // -------------------------------------------------------------
    eng.rackPivotGroups = [];
    const allRackX = [-2.42, -1.52, -0.62, 0.62, 1.52, 2.42];
    allRackX.forEach((rx, idx) => {
      const pivot = new THREE.Group();
      pivot.position.set(rx, 0.46, 0.22);

      // Small rear metallic bearing on the rear wall
      const rearBearing = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.14, 12), wireClampMat);
      rearBearing.rotation.x = Math.PI / 2;
      rearBearing.position.set(rx, 0.46, -bodyDepth / 2 + 0.22);
      eng.roasterGroup?.add(rearBearing);

      // Rear main drive shaft rod entering the servo box
      const driveRod = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.55, 12), wireClampMat);
      driveRod.rotation.x = Math.PI / 2;
      driveRod.position.set(0, 0, -0.88);
      pivot.add(driveRod);

      // Hairpin U-Loop Wire Tongs (Top & bottom frames clamping Kemplang)
      [-0.032, 0.032].forEach((yOff) => {
        [-1, 1].forEach((sideArm) => {
          const armMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.72, 10), wireClampMat);
          armMesh.rotation.x = Math.PI / 2;
          armMesh.rotation.z = sideArm * 0.045;
          armMesh.position.set(sideArm * 0.055, yOff, 0.08);
          armMesh.castShadow = true;
          pivot.add(armMesh);
        });

        // Torus rounded U-loop tip at front
        const uLoopGeo = new THREE.TorusGeometry(0.095, 0.015, 10, 20, Math.PI);
        const uLoopMesh = new THREE.Mesh(uLoopGeo, wireClampMat);
        uLoopMesh.rotation.x = Math.PI / 2;
        uLoopMesh.position.set(0, yOff, 0.94);
        pivot.add(uLoopMesh);
      });

      // 1 Round Kemplang Tunu Disc clamped near the front
      const kemplangDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.042, 32), kemplangMat);
      kemplangDisc.position.set(0, 0, 0.52);
      kemplangDisc.rotation.y = idx === 0 ? 0.2 : Math.PI + idx * 0.5;
      kemplangDisc.castShadow = true;
      kemplangDisc.receiveShadow = true;
      pivot.add(kemplangDisc);

      // Initial angle (slight tilt as in Still 3)
      const initialAngle = 0.22;
      pivot.rotation.z = initialAngle;

      eng.roasterGroup?.add(pivot);
      eng.rackPivotGroups.push({
        group: pivot,
        kemplang: kemplangDisc,
        index: idx,
        currentAngle: initialAngle,
        targetAngle: initialAngle,
      });
    });

    // -------------------------------------------------------------
    // 7. REAR SERVO COMPARTMENT, SLANTED HOOD, LCD & 2 DIMMER KNOBS
    // -------------------------------------------------------------
    const ecuDepth = 1.05;
    const ecuZ = -bodyDepth / 2 + 0.22 - ecuDepth / 2;

    const ecuLowerBox = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth, 1.18, ecuDepth), hoodBrushedMat);
    ecuLowerBox.position.set(0, -0.22, ecuZ);
    ecuLowerBox.castShadow = true;
    ecuLowerBox.receiveShadow = true;
    eng.roasterGroup.add(ecuLowerBox);

    // 6 Internal Servo MG996R Units
    const servoMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3, metalness: 0.2 });
    allRackX.forEach((rx) => {
      const sBlock = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.44), servoMat);
      sBlock.position.set(rx, 0.45, ecuZ + 0.18);
      eng.roasterGroup?.add(sBlock);
    });

    // Hinged Slanted/Beveled Top Cover Hood
    eng.servoHoodGroup = new THREE.Group();
    eng.servoHoodGroup.position.set(0, 0.37, ecuZ - ecuDepth / 2);

    const hoodTop = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth, 0.48, ecuDepth * 0.82), hoodBrushedMat);
    hoodTop.position.set(0, 0.24, ecuDepth * 0.41);
    hoodTop.castShadow = true;
    eng.servoHoodGroup.add(hoodTop);

    const hoodBevel = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth - 0.02, 0.38, 0.34), hoodBrushedMat);
    hoodBevel.position.set(0, 0.16, ecuDepth * 0.84);
    hoodBevel.rotation.x = 0.52;
    eng.servoHoodGroup.add(hoodBevel);

    eng.roasterGroup.add(eng.servoHoodGroup);

    // Blue LCD Screen on Rear Operator Panel
    const lcdFrame = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.38, 0.12), motorDarkMat);
    lcdFrame.position.set(0, 0.05, ecuZ - ecuDepth / 2 - 0.04);
    eng.roasterGroup.add(lcdFrame);

    const lcdGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.25, 0.04),
      new THREE.MeshBasicMaterial({ color: 0x0096ff })
    );
    lcdGlow.position.set(0, 0.05, ecuZ - ecuDepth / 2 - 0.09);
    eng.roasterGroup.add(lcdGlow);

    // 2 Protruding Stepped Cylindrical Dimmer Knobs
    [-0.82, 0.82].forEach((kx) => {
      const knobGroup = new THREE.Group();
      knobGroup.position.set(kx, 0.08, ecuZ - ecuDepth / 2 - 0.06);

      const knobBase = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.16, 24), motorDarkMat);
      knobBase.rotation.x = Math.PI / 2;
      const knobCap = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.12, 24), sus304Mat);
      knobCap.rotation.x = Math.PI / 2;
      knobCap.position.z = -0.1;
      const knobRing = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 24), motorDarkMat);
      knobRing.rotation.x = Math.PI / 2;
      knobRing.position.z = -0.17;

      knobGroup.add(knobBase, knobCap, knobRing);
      eng.roasterGroup?.add(knobGroup);
    });

    // Red Power Switch on Rear
    const redSwitch = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.22, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xdc2626 })
    );
    redSwitch.position.set(-2.45, 0.05, ecuZ - ecuDepth / 2 - 0.04);
    eng.roasterGroup.add(redSwitch);

    // -------------------------------------------------------------
    // 8. DUAL CENTRIFUGAL SNAIL BLOWERS + ROTATING VENT WHEELS + L-PIPES
    // -------------------------------------------------------------
    eng.blowerImpellers = [];
    function createAuthenticSnailBlower(side: "left" | "right") {
      const bGroup = new THREE.Group();
      const dir = side === "left" ? -1 : 1;
      const bX = dir * (bodyWidth / 2 + 0.62);
      const bY = 0.22;
      const bZ = -0.25;

      // Volute Torus Shell
      const voluteTorus = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.26, 20, 32), blowerChromeMat);
      voluteTorus.rotation.y = Math.PI / 2;
      voluteTorus.position.set(bX, bY, bZ);
      voluteTorus.castShadow = true;
      bGroup.add(voluteTorus);

      const voluteCore = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.36, 28), blowerChromeMat);
      voluteCore.rotation.z = Math.PI / 2;
      voluteCore.position.set(bX, bY, bZ);
      bGroup.add(voluteCore);

      // Top Mounting Lugs
      [-0.55, 0, 0.55].forEach((angle) => {
        const lug = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), blowerChromeMat);
        lug.rotation.z = Math.PI / 2;
        lug.position.set(bX, bY + Math.cos(angle) * 0.72, bZ + Math.sin(angle) * 0.72);
        bGroup.add(lug);
      });

      // Domed Intake Cap
      const domeCap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.16, 28), blowerChromeMat);
      domeCap.rotation.z = Math.PI / 2;
      domeCap.position.set(bX + dir * 0.22, bY, bZ);
      bGroup.add(domeCap);

      // Rotating Impeller / 3 Black Sector Vents
      const ventWheel = new THREE.Group();
      ventWheel.position.set(bX + dir * 0.305, bY, bZ);
      for (let v = 0; v < 3; v++) {
        const a1 = v * ((Math.PI * 2) / 3) + 0.18;
        const a2 = a1 + 1.35;
        const sectorGeo = new THREE.RingGeometry(0.07, 0.27, 14, 1, a1, a2 - a1);
        const sectorMat = new THREE.MeshBasicMaterial({ color: 0x0f1318, side: THREE.DoubleSide });
        const sector = new THREE.Mesh(sectorGeo, sectorMat);
        sector.rotation.y = dir * (Math.PI / 2);
        ventWheel.add(sector);
      }
      bGroup.add(ventWheel);
      eng.blowerImpellers.push(ventWheel);

      // Motor Drum
      const motorDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.38, 24), motorDarkMat);
      motorDrum.rotation.z = Math.PI / 2;
      motorDrum.position.set(bX - dir * 0.28, bY, bZ);
      bGroup.add(motorDrum);

      // Bright Green Switch Box
      const greenBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.22, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.35 })
      );
      greenBox.position.set(bX - dir * 0.25, bY + 0.18, bZ - 0.32);
      bGroup.add(greenBox);

      // Curved Black Power Cable to Rear ECU Box
      const cableCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(bX - dir * 0.25, bY + 0.15, bZ - 0.4),
        new THREE.Vector3(bX - dir * 0.15, bY + 0.05, bZ - 0.85),
        new THREE.Vector3(dir * (bodyWidth / 2 - 0.02), 0.0, ecuZ),
      ]);
      const cableGeo = new THREE.TubeGeometry(cableCurve, 16, 0.022, 8, false);
      const cableMesh = new THREE.Mesh(cableGeo, tireMat);
      bGroup.add(cableMesh);

      // 90-Degree Silver L-Elbow Pipe into Chamber Side Wall
      const pipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(bX, bY - 0.42, bZ + 0.22),
        new THREE.Vector3(bX, -0.15, -0.22),
        new THREE.Vector3(dir * (bodyWidth / 2 - 0.02), -0.15, -0.25),
      ]);
      const elbowPipe = new THREE.Mesh(new THREE.TubeGeometry(pipeCurve, 20, 0.21, 20, false), blowerChromeMat);
      elbowPipe.castShadow = true;
      bGroup.add(elbowPipe);

      // Flange Collar on Pipe
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 24), blowerChromeMat);
      collar.position.set(bX, bY - 0.32, bZ + 0.12);
      collar.rotation.x = 0.35;
      bGroup.add(collar);

      // Metal Mounting Bracket Plate
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.05, 0.65), blowerChromeMat);
      bracket.position.set(bX, -0.45, bZ - 0.12);
      bGroup.add(bracket);

      return bGroup;
    }

    eng.roasterGroup.add(createAuthenticSnailBlower("left"));
    eng.roasterGroup.add(createAuthenticSnailBlower("right"));

    // -------------------------------------------------------------
    // 9. PARTICLE SYSTEMS (EMBER SPARKS & BLOWER AIRFLOW)
    // -------------------------------------------------------------
    eng.emberParticles = [];
    const sparkGeo = new THREE.SphereGeometry(0.028, 8, 8);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xff7b00, transparent: true, opacity: 0.85 });
    for (let i = 0; i < 28; i++) {
      const sp = new THREE.Mesh(sparkGeo, sparkMat);
      sp.userData = {
        baseX: (Math.random() - 0.5) * 5.2,
        baseZ: 0.2 + (Math.random() - 0.5) * 1.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.012,
      };
      eng.roasterGroup.add(sp);
      eng.emberParticles.push(sp);
    }

    eng.airParticles = [];
    const airGeo = new THREE.SphereGeometry(0.038, 8, 8);
    const airMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 });
    for (let i = 0; i < 24; i++) {
      const p = new THREE.Mesh(airGeo, airMat);
      p.userData = {
        side: i % 2 === 0 ? -1 : 1,
        progress: Math.random(),
      };
      eng.roasterGroup.add(p);
      eng.airParticles.push(p);
    }

    // -------------------------------------------------------------
    // 10. MOUSE & TOUCH ORBIT CONTROLS
    // -------------------------------------------------------------
    const onMouseDown = (e: MouseEvent) => {
      eng.isDragging = true;
      eng.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      eng.isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!eng.isDragging) return;
      const dx = e.clientX - eng.prevMouse.x;
      const dy = e.clientY - eng.prevMouse.y;
      eng.targetCamTheta -= dx * 0.008;
      eng.targetCamPhi = Math.max(0.12, Math.min(1.48, eng.targetCamPhi - dy * 0.008));
      eng.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        eng.isDragging = true;
        eng.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      eng.isDragging = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!eng.isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - eng.prevMouse.x;
      const dy = e.touches[0].clientY - eng.prevMouse.y;
      eng.targetCamTheta -= dx * 0.008;
      eng.targetCamPhi = Math.max(0.12, Math.min(1.48, eng.targetCamPhi - dy * 0.008));
      eng.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      eng.targetCamRadius = Math.max(5.2, Math.min(16, eng.targetCamRadius + e.deltaY * 0.006));
    };

    const onResize = () => {
      if (!container || !eng.renderer || !eng.camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      eng.camera.aspect = w / h;
      eng.camera.updateProjectionMatrix();
      eng.renderer.setSize(w, h);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    // -------------------------------------------------------------
    // 11. 60 FPS RENDER LOOP
    // -------------------------------------------------------------
    const animate = (now: number) => {
      eng.reqId = requestAnimationFrame(animate);

      // Auto turntable rotation
      if (eng.autoTurntable && !eng.isDragging) {
        eng.targetCamTheta += 0.004;
      }

      // Smooth camera interpolation
      eng.camTheta += (eng.targetCamTheta - eng.camTheta) * 0.08;
      eng.camPhi += (eng.targetCamPhi - eng.camPhi) * 0.08;
      eng.camRadius += (eng.targetCamRadius - eng.camRadius) * 0.08;
      eng.camLookAt.lerp(eng.targetLookAt, 0.08);

      if (eng.camera) {
        eng.camera.position.x = eng.camLookAt.x + eng.camRadius * Math.sin(eng.camPhi) * Math.sin(eng.camTheta);
        eng.camera.position.y = eng.camLookAt.y + eng.camRadius * Math.cos(eng.camPhi);
        eng.camera.position.z = eng.camLookAt.z + eng.camRadius * Math.sin(eng.camPhi) * Math.cos(eng.camTheta);
        eng.camera.lookAt(eng.camLookAt);
      }

      // Animate 6 hairpin wire clamps with staggered delay (30–85 ms)
      eng.rackPivotGroups.forEach((item) => {
        const elapsed = now - eng.flipStartTime - item.index * 85;
        if (elapsed > 0) {
          item.currentAngle += (item.targetAngle - item.currentAngle) * 0.1;
          item.group.rotation.z = item.currentAngle;
        }
      });

      // Spin blower impellers when not cut-off
      if (!eng.isHysteresisCutoff) {
        eng.blowerImpellers.forEach((wheel, idx) => {
          wheel.rotation.x += idx === 0 ? 0.18 : -0.18;
        });
      }

      // Animate sliding charcoal drawers
      if (eng.drawerLeftGroup && eng.drawerRightGroup) {
        eng.drawerLeftGroup.position.z += (eng.targetDrawerZ - eng.drawerLeftGroup.position.z) * 0.1;
        eng.drawerRightGroup.position.z += (eng.targetDrawerZ - eng.drawerRightGroup.position.z) * 0.1;
      }

      // Animate hinged slanted servo hood
      if (eng.servoHoodGroup) {
        eng.servoHoodGroup.rotation.x += (eng.targetHoodAngle - eng.servoHoodGroup.rotation.x) * 0.1;
      }

      // Animate glowing charcoal ember fissures pulsing
      const pulse = 0.78 + Math.sin(now * 0.0045) * 0.22;
      if (eng.emberPointLight1 && eng.emberPointLight2) {
        const intensity = eng.isHysteresisCutoff ? 1.0 : 2.6 * pulse;
        eng.emberPointLight1.intensity = intensity;
        eng.emberPointLight2.intensity = intensity;
      }
      eng.emberMeshes.forEach((em, idx) => {
        const mat = em.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = eng.isHysteresisCutoff ? 0.75 : 1.8 + Math.sin(now * 0.005 + idx) * 0.55;
      });

      // Animate heat sparks
      eng.emberParticles.forEach((sp) => {
        sp.position.y += sp.userData.speed;
        sp.position.x = sp.userData.baseX + Math.sin(now * 0.003 + sp.userData.phase) * 0.08;
        sp.position.z = sp.userData.baseZ;
        if (sp.position.y > 0.52) {
          sp.position.y = -0.15;
        }
      });

      // Animate blower oxygen airflow particles
      eng.airParticles.forEach((p) => {
        p.visible = !eng.isHysteresisCutoff;
        if (!eng.isHysteresisCutoff) {
          p.userData.progress += 0.02;
          if (p.userData.progress > 1) p.userData.progress = 0;
          const t = p.userData.progress;
          const side = p.userData.side;
          p.position.set(side * (3.1 - t * 2.3), -0.15 + Math.sin(t * Math.PI) * 0.28, -0.25 + t * 0.45);
        }
      });

      if (eng.renderer && eng.scene && eng.camera) {
        eng.renderer.render(eng.scene, eng.camera);
      }
    };

    eng.reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(eng.reqId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);

      const disposedMaterials = new Set<THREE.Material>();
      eng.scene?.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if (disposedMaterials.has(material)) return;
          material.dispose();
          disposedMaterials.add(material);
        });
      });

      eng.textures.forEach((texture) => texture.dispose());
      eng.envTexture?.dispose();
      eng.renderer?.dispose();
    };
  }, [compact]);

  // -------------------------------------------------------------
  // CAMERA PRESETS (STILL 1, STILL 2, STILL 3, FRONT, REAR)
  // -------------------------------------------------------------
  const handleSetCamera = (preset: "still1" | "still2" | "still3" | "front" | "rear") => {
    const eng = engineRef.current;
    const el = containerRef.current;
    const aspect = el ? el.clientWidth / el.clientHeight : 1.8;
    const fitScale = aspect < 1.2 ? 1.55 : aspect < 1.8 ? 1.25 : 1;
    setCurrentCameraPreset(preset);
    eng.autoTurntable = false;
    setAutoTurntable(false);

    if (preset === "still1") {
      // Perspective Isometric Studio (Still 1.png)
      eng.targetCamTheta = -0.62;
      eng.targetCamPhi = 0.86;
      eng.targetCamRadius = 10.6 * fitScale;
      eng.targetLookAt.set(0, 0.1, 0);
      setHotspotTitle("Perspektif isometrik");
      setHotspotDesc(
        "Menampilkan bentang total 124 cm, 6 rak penjepit U-loop berporos belakang, kap pelindung miring, laci arang ber-kenop oranye, dan blower keong ganda."
      );
    } else if (preset === "still2") {
      // Orthographic-like Top-Down view (Still 2.png)
      eng.targetCamTheta = 0.0;
      eng.targetCamPhi = 0.14;
      eng.targetCamRadius = 11.2 * fitScale;
      eng.targetLookAt.set(0, 0.0, -0.05);
      setHotspotTitle("Tampak atas simetris 1:1");
      setHotspotDesc(
        "Memperlihatkan 2 kompartemen abu arang, 6 briket membara dengan celah pendaran, 6 kemplang bulat, 2 blower keong + kabel hitam ke ECU, dan 2 kenop dimmer."
      );
    } else if (preset === "still3") {
      // Oblique Close-Up view (Still 3 alpha.png)
      eng.targetCamTheta = -1.08;
      eng.targetCamPhi = 0.92;
      eng.targetCamRadius = 7.2 * fitScale;
      eng.targetLookAt.set(0.2, 0.22, -0.15);
      setHotspotTitle("Detail rak penjepit, bara, dan panel");
      setHotspotDesc(
        "Menyorot lengkungan kawat penjepit kemplang (hairpin U-loop), lubang masuk tiupan udara berbingkai krom pada dinding dalam, layar LCD biru, dan 2 kenop dimmer."
      );
    } else if (preset === "front") {
      eng.targetCamTheta = 0.0;
      eng.targetCamPhi = 1.15;
      eng.targetCamRadius = 10.2 * fitScale;
      eng.targetLookAt.set(0, -0.1, 0.35);
      setHotspotTitle("Tampak depan laci dan penjepit");
      setHotspotDesc("2 kompartemen laci tarik ber-kenop oranye dan zona palung kemplang setinggi total 30 cm.");
    } else if (preset === "rear") {
      eng.targetCamTheta = -2.35;
      eng.targetCamPhi = 1.02;
      eng.targetCamRadius = 8.2 * fitScale;
      eng.targetLookAt.set(0, 0.1, -0.5);
      setHotspotTitle("Tampak belakang panel kendali");
      setHotspotDesc("Layar digital LCD 20×4 I2C, 2 kenop dimmer PWM pengatur blower, dan sakelar daya utama AC 220 V.");
    }
  };

  // -------------------------------------------------------------
  // INTERACTIVE HARDWARE ACTUATION
  // -------------------------------------------------------------
  const handleFlipServo = () => {
    const eng = engineRef.current;
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    const targetDeg = nextFlipped ? 180 : 0;
    setServoAngleDeg(targetDeg);
    eng.flipStartTime = performance.now();
    const targetRad = nextFlipped ? Math.PI : 0.22;
    eng.rackPivotGroups.forEach((item) => {
      item.targetAngle = targetRad;
    });
    setServoState(nextFlipped ? "Posisi 180° (aktif)" : "Posisi 0° (awal)");
    setHotspotTitle("Rotasi enam servo");
    setHotspotDesc("Keenam penjepit kawat berputar 180° bertahap (staggered delay 30–85 ms) untuk meredam beban inrush current.");
  };

  const handleServoSlide = (valStr: string) => {
    const deg = parseInt(valStr, 10);
    setServoAngleDeg(deg);
    const rad = (deg / 180) * Math.PI;
    const eng = engineRef.current;
    eng.rackPivotGroups.forEach((item) => {
      item.targetAngle = rad;
      item.currentAngle = rad;
      item.group.rotation.z = rad;
    });
    setServoState(`Sudut ${deg}°`);
  };

  const handleToggleDrawers = () => {
    const eng = engineRef.current;
    const next = !isDrawerOpen;
    setIsDrawerOpen(next);
    eng.targetDrawerZ = next ? 1.55 : 0;
    if (next) {
      handleSetCamera("front");
      setHotspotTitle("Laci bahan bakar dan bara");
      setHotspotDesc(
        "Dua laci terpisah dengan kenop silinder oranye, hamparan abu arang, dan 3 briket hitam berpendar dengan celah retakan menyala."
      );
    }
  };

  const handleToggleHood = () => {
    const eng = engineRef.current;
    const next = !isHoodOpen;
    setIsHoodOpen(next);
    eng.targetHoodAngle = next ? -1.05 : 0;
    if (next) {
      handleSetCamera("still3");
      setHotspotTitle("Kap servo berengsel");
      setHotspotDesc("Kap miring logam terbuka untuk memperlihatkan deretan 6 motor servo MG996R metal gear berkekuatan torsi 11 kg·cm.");
    }
  };

  const handleToggleCutoff = () => {
    const eng = engineRef.current;
    const next = !isCutoffActive;
    setIsCutoffActive(next);
    eng.isHysteresisCutoff = next;
    if (next) {
      setTempValue("612,4 °C");
      setHysteresisTag("Cut-off ≥ 600 °C");
      setBlowerState("Berhenti (0% PWM)");
      setHotspotTitle("Histeresis aktif: cut-off ≥ 600 °C");
      setHotspotDesc(
        "Termokopel tipe-K mendeteksi suhu melebihi 600 °C (612,4 °C). Mikrokontroler otomatis memutus daya kedua blower keong agar kemplang tidak hangus."
      );
    } else {
      setTempValue("571,3 °C");
      setHysteresisTag("Ideal (550–600 °C)");
      setBlowerState("Aktif (PWM 85%)");
      setHotspotTitle("Pemulihan termal");
      setHotspotDesc("Suhu ruang bakar turun ke rentang aman (550–600 °C). Dua blower keong kembali berputar menyuplai oksigen.");
    }
  };

  const handleFocusHotspot = (id: number) => {
    if (id === 1) {
      handleSetCamera("still3");
      setHotspotTitle("Enam rak penjepit SUS 304");
      setHotspotDesc(
        "Tangkai ganda melengkung (hairpin U-loop) berbahan kawat stainless steel SUS 304 food-grade (SNI 8753:2020), menjepit 1 keping kemplang bulat per rak."
      );
    } else if (id === 2) {
      if (!isHoodOpen) handleToggleHood();
      handleSetCamera("still3");
      setHotspotTitle("Enam servo MG996R");
      setHotspotDesc("Motor penggerak torsi tinggi di kompartemen belakang, terhubung langsung ke poros belakang rak penjepit kemplang.");
    } else if (id === 3) {
      handleSetCamera("still2");
      setHotspotTitle("Ruang bakar dan saluran blower");
      setHotspotDesc(
        "Hamparan abu keperakan dengan 6 briket arang membara (3 per kompartemen) serta lubang bundar berbingkai krom di dinding samping palung."
      );
    } else if (id === 4) {
      handleSetCamera("rear");
      setHotspotTitle("Panel kendali dan LCD");
      setHotspotDesc("Layar digital berlatar biru, 2 kenop putar dimmer blower (PWM AC), dan tombol sakelar daya merah.");
    } else if (id === 5) {
      handleSetCamera("still1");
      setHotspotTitle("Dua blower keong");
      setHotspotDesc(
        "Rumah keong silver metalik, kap intake dengan rotating sector wheel, sakelar hijau, pipa siku L melengkung, dan kabel daya melengkung ke kotak ECU."
      );
    }
  };

  return (
    <div className={`overflow-hidden border border-paper/15 bg-stage-raised ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-4 py-3">
        <div className="text-sm text-paper/60">
          Model 3D <span className="text-steel">·</span> simulasi
        </div>
        <button
          type="button"
          onClick={() => {
            const next = !autoTurntable;
            setAutoTurntable(next);
            engineRef.current.autoTurntable = next;
          }}
          aria-pressed={autoTurntable}
          className={`inline-flex min-h-11 items-center gap-2 border px-3 py-1.5 text-xs font-medium transition ${
            autoTurntable
              ? "border-ember/60 bg-ember/10 text-ember-bright"
              : "border-paper/15 text-paper/65 hover:text-paper"
          }`}
        >
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          Putar 360°
        </button>
      </div>

      <div
        ref={containerRef}
        className={`relative w-full select-none ${
          compact ? "h-[300px] sm:h-[380px]" : "h-[360px] sm:h-[520px]"
        }`}
        style={{ background: "radial-gradient(circle at 50% 45%, #211c18 0%, #0b0a09 100%)" }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Model 3D interaktif INTAN; gunakan tombol sudut dan kontrol di bawah untuk memutar dan membuka komponen"
          className="block h-full w-full cursor-grab touch-none active:cursor-grabbing"
        />
        <p className="pointer-events-none absolute bottom-3 left-4 text-xs text-paper/60">
          Seret untuk memutar · gulir untuk zoom
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-paper/10 px-4 py-3">
        <span className="shrink-0 py-1.5 text-xs text-steel">Sudut</span>
        {(
          [
            ["still1", "Isometri"],
            ["still2", "Atas"],
            ["still3", "Penggerak"],
            ["front", "Depan"],
            ["rear", "Belakang"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSetCamera(key)}
            className={`min-h-11 shrink-0 border px-3 py-1.5 text-xs font-medium transition ${
              currentCameraPreset === key
                ? "border-ember/60 text-ember-bright"
                : "border-transparent text-paper/70 hover:text-paper"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="border-t border-paper/10 px-4 py-3" aria-live="polite">
        <p className="mt-1 text-sm font-medium text-paper">{hotspotTitle}</p>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-paper/65">{hotspotDesc}</p>
      </div>

      <div className="grid grid-cols-2 divide-x divide-paper/10 border-t border-paper/10 bg-stage sm:grid-cols-4">
        <div className="p-4">
          <p className="text-xs text-steel">Suhu bara</p>
          <p className="mt-1 font-mono text-sm font-medium text-paper tabular-numbers">{tempValue}</p>
        </div>
        <div className="p-4">
          <p className="text-xs text-steel">Histeresis</p>
          <p className={`mt-1 text-sm font-medium ${isCutoffActive ? "text-ember-bright" : "text-paper/80"}`}>
            {hysteresisTag}
          </p>
        </div>
        <div className="border-t border-paper/10 p-4 sm:border-t-0">
          <p className="text-xs text-steel">Blower</p>
          <p className={`mt-1 text-sm font-medium ${isCutoffActive ? "text-ember-bright" : "text-paper/80"}`}>
            {blowerState}
          </p>
        </div>
        <div className="border-t border-paper/10 p-4 sm:border-t-0">
          <p className="text-xs text-steel">Servo</p>
          <p className="mt-1 text-sm font-medium text-paper/80">{servoState}</p>
        </div>
      </div>

      {!compact && (
        <div className="space-y-4 border-t border-paper/10 p-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2 text-xs font-medium text-paper/65">
              <Sliders className="h-4 w-4 text-ember-bright" aria-hidden="true" />
              Kontrol mekanik
            </span>
            <div className="flex items-center gap-2.5">
              <label htmlFor="servo-angle" className="text-xs text-steel">
                Sudut servo
              </label>
              <span className="w-10 text-right font-mono text-xs text-ember-bright tabular-numbers">
                {servoAngleDeg}°
              </span>
              <input
                id="servo-angle"
                type="range"
                min="0"
                max="180"
                value={servoAngleDeg}
                onChange={(e) => handleServoSlide(e.target.value)}
                className="h-1.5 w-32 cursor-pointer appearance-none rounded bg-paper/15"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              type="button"
              onClick={handleFlipServo}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-paper/15 bg-stage px-3 py-2.5 text-xs font-medium text-paper/80 transition hover:bg-paper/5 hover:text-paper"
            >
              <RotateCw className="h-3.5 w-3.5 text-ember-bright" aria-hidden="true" />
              Balik 180°
            </button>
            <button
              type="button"
              onClick={handleToggleDrawers}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-paper/15 bg-stage px-3 py-2.5 text-xs font-medium text-paper/80 transition hover:bg-paper/5 hover:text-paper"
            >
              <Layers className="h-3.5 w-3.5 text-paper/50" aria-hidden="true" />
              {isDrawerOpen ? "Tutup laci" : "Tarik 2 laci"}
            </button>
            <button
              type="button"
              onClick={handleToggleHood}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-paper/15 bg-stage px-3 py-2.5 text-xs font-medium text-paper/80 transition hover:bg-paper/5 hover:text-paper"
            >
              <Camera className="h-3.5 w-3.5 text-paper/50" aria-hidden="true" />
              {isHoodOpen ? "Tutup kap" : "Buka kap servo"}
            </button>
            <button
              type="button"
              onClick={handleToggleCutoff}
              className={`inline-flex min-h-11 items-center justify-center gap-2 border px-3 py-2.5 text-xs font-medium transition ${
                isCutoffActive
                  ? "border-ember/60 bg-ember/10 text-ember-bright"
                  : "border-paper/15 bg-stage text-paper/80 hover:bg-paper/5"
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5 text-ember-bright" aria-hidden="true" />
              {isCutoffActive ? "Kembali 550 °C" : "Cut-off 600 °C"}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-paper/10 pt-3">
            <span className="shrink-0 pr-1 text-xs text-steel">Inspeksi</span>
            {(
              [
                [1, "Rak penjepit"],
                [2, "Enam servo"],
                [3, "Bara arang"],
                [4, "Panel"],
                [5, "Blower"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => handleFocusHotspot(id)}
                className="min-h-11 shrink-0 border border-paper/15 px-3 py-1.5 text-xs text-paper/65 transition hover:bg-paper/5 hover:text-paper"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
