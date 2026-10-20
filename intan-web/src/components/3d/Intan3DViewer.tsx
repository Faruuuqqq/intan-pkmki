"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Camera, RotateCw, AlertTriangle, Layers, Sliders, Sun, Moon, CheckCircle2 } from "lucide-react";

interface Intan3DViewerProps {
  compact?: boolean;
  className?: string;
}

export default function Intan3DViewer({ compact = false, className = "" }: Intan3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Viewport & Lighting States
  const [studioBg, setStudioBg] = useState<"light" | "dark">("light");
  const [autoTurntable, setAutoTurntable] = useState<boolean>(!compact);
  const [currentCameraPreset, setCurrentCameraPreset] = useState<string>("still1");

  // Mechanical States
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [servoAngleDeg, setServoAngleDeg] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isHoodOpen, setIsHoodOpen] = useState<boolean>(false);
  const [isCutoffActive, setIsCutoffActive] = useState<boolean>(false);

  // LCD & Telemetry States
  const [tempValue, setTempValue] = useState<string>("571.3 °C");
  const [hysteresisTag, setHysteresisTag] = useState<string>("IDEAL [550°–600°C]");
  const [blowerState, setBlowerState] = useState<string>("ACTIVE (PWM 85%)");
  const [servoState, setServoState] = useState<string>("POS 0° (CYCLE 15s)");

  // Technical HUD Card
  const [hotspotCode, setHotspotCode] = useState<string>("DWG-STILL-01");
  const [hotspotTitle, setHotspotTitle] = useState<string>("INTAN Smart Rotary Roaster (124 × 30 × 30 cm)");
  const [hotspotDesc, setHotspotDesc] = useState<string>(
    "Palung utama SUS 304 (100 cm), dual blower keong sentrifugal (2 × 12 cm), 6 rak penjepit U-loop, dan kompartemen servo MG996R."
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
    autoTurntable: !compact,
    reqId: 0,
    textures: [] as THREE.Texture[],
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const eng = engineRef.current;
    eng.scene = new THREE.Scene();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

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
    eng.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    eng.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    eng.renderer.toneMappingExposure = 1.15;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    eng.scene.add(ambientLight);

    const mainStudioLight = new THREE.DirectionalLight(0xfffaf0, 1.35);
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

    eng.studioWarmLight = new THREE.DirectionalLight(0xffbfa3, 0.75);
    eng.studioWarmLight.position.set(-6, 8, -7);
    eng.scene.add(eng.studioWarmLight);

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 0.55);
    rimLight.position.set(0, 5, -10);
    eng.scene.add(rimLight);

    // Internal Glowing Charcoal Point Lights
    eng.emberPointLight1 = new THREE.PointLight(0xff3b00, 2.6, 4.8);
    eng.emberPointLight1.position.set(-1.55, 0.05, 0.15);
    eng.scene.add(eng.emberPointLight1);

    eng.emberPointLight2 = new THREE.PointLight(0xff3b00, 2.6, 4.8);
    eng.emberPointLight2.position.set(1.55, 0.05, 0.15);
    eng.scene.add(eng.emberPointLight2);

    // Shadow-Catching Floor Plane
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    eng.studioFloorMesh = new THREE.Mesh(floorGeo, floorMat);
    eng.studioFloorMesh.rotation.x = -Math.PI / 2;
    eng.studioFloorMesh.position.y = -1.24;
    eng.studioFloorMesh.receiveShadow = true;
    eng.scene.add(eng.studioFloorMesh);

    // -------------------------------------------------------------
    // 3. PBR MATERIALS (SUS 304, HOOD, CHROME, ASH, BRIQUETTES)
    // -------------------------------------------------------------
    const sus304Mat = new THREE.MeshStandardMaterial({
      color: 0xd8dce0,
      map: brushedMetalTex,
      bumpMap: brushedMetalTex,
      bumpScale: 0.004,
      metalness: 0.82,
      roughness: 0.24,
    });

    const hoodBrushedMat = new THREE.MeshStandardMaterial({
      color: 0xc4c9ce,
      map: brushedMetalTex,
      bumpMap: brushedMetalTex,
      bumpScale: 0.006,
      metalness: 0.78,
      roughness: 0.28,
    });

    const darkChamberMat = new THREE.MeshStandardMaterial({
      color: 0x3f444a,
      metalness: 0.7,
      roughness: 0.42,
    });

    const wireClampMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.85,
      roughness: 0.18,
    });

    const blowerChromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.18,
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
      eng.textures.forEach((t) => t.dispose());
      eng.renderer?.dispose();
    };
  }, [compact]);

  // -------------------------------------------------------------
  // CAMERA PRESETS (STILL 1, STILL 2, STILL 3, FRONT, REAR)
  // -------------------------------------------------------------
  const handleSetCamera = (preset: "still1" | "still2" | "still3" | "front" | "rear") => {
    const eng = engineRef.current;
    setCurrentCameraPreset(preset);
    eng.autoTurntable = false;
    setAutoTurntable(false);

    if (preset === "still1") {
      // Perspective Isometric Studio (Still 1.png)
      eng.targetCamTheta = -0.62;
      eng.targetCamPhi = 0.86;
      eng.targetCamRadius = 10.6;
      eng.targetLookAt.set(0, 0.1, 0);
      setHotspotCode("CAD-STILL-01");
      setHotspotTitle("Perspektif Isometrik Studio (Still 1)");
      setHotspotDesc(
        "Menampilkan bentang total 124 cm, 6 rak penjepit U-loop berporos belakang, kap pelindung miring, laci arang ber-kenop oranye, dan blower keong ganda."
      );
    } else if (preset === "still2") {
      // Orthographic-like Top-Down view (Still 2.png)
      eng.targetCamTheta = 0.0;
      eng.targetCamPhi = 0.14;
      eng.targetCamRadius = 11.2;
      eng.targetLookAt.set(0, 0.0, -0.05);
      setHotspotCode("CAD-STILL-02");
      setHotspotTitle("Tampak Atas Simetris 1:1 (Still 2)");
      setHotspotDesc(
        "Memperlihatkan 2 kompartemen abu arang, 6 briket membara dengan celah pendaran, 6 kemplang bulat, 2 blower keong + kabel hitam ke ECU, dan 2 kenop dimmer."
      );
    } else if (preset === "still3") {
      // Oblique Close-Up view (Still 3 alpha.png)
      eng.targetCamTheta = -1.08;
      eng.targetCamPhi = 0.92;
      eng.targetCamRadius = 7.2;
      eng.targetLookAt.set(0.2, 0.22, -0.15);
      setHotspotCode("CAD-STILL-03");
      setHotspotTitle("Close-Up Rak Penjepit, Bara, & Panel ECU (Still 3)");
      setHotspotDesc(
        "Menyorot lengkungan kawat penjepit kemplang (hairpin U-loop), lubang masuk tiupan udara berbingkai krom pada dinding dalam, layar LCD biru, dan 2 kenop dimmer."
      );
    } else if (preset === "front") {
      eng.targetCamTheta = 0.0;
      eng.targetCamPhi = 1.15;
      eng.targetCamRadius = 10.2;
      eng.targetLookAt.set(0, -0.1, 0.35);
      setHotspotCode("VIEW-FRONT");
      setHotspotTitle("Tampak Depan Kompartemen Laci & Penjepit");
      setHotspotDesc("2 kompartemen laci tarik ber-kenop oranye dan zona palung kemplang setinggi total 30 cm.");
    } else if (preset === "rear") {
      eng.targetCamTheta = -2.35;
      eng.targetCamPhi = 1.02;
      eng.targetCamRadius = 8.2;
      eng.targetLookAt.set(0, 0.1, -0.5);
      setHotspotCode("VIEW-REAR");
      setHotspotTitle("Tampak Belakang Panel Kontrol & Kap Miring");
      setHotspotDesc("Layar digital LCD 20x4 I2C, 2 kenop dimmer PWM pengatur blower, dan sakelar daya utama AC 220V.");
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
    setServoState(nextFlipped ? "POS 180° (ACTIVE)" : "POS 0° (HOME)");
    setHotspotCode("ACT-01 // SERVO");
    setHotspotTitle("Simulasi Rotasi 6 Servo MG996R");
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
    setServoState(`MANUAL ${deg}°`);
  };

  const handleToggleDrawers = () => {
    const eng = engineRef.current;
    const next = !isDrawerOpen;
    setIsDrawerOpen(next);
    eng.targetDrawerZ = next ? 1.55 : 0;
    if (next) {
      handleSetCamera("front");
      setHotspotCode("CHM-02 // DRAWERS");
      setHotspotTitle("Laci Bahan Bakar & Hamparan Bara Arang");
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
      setHotspotCode("ENC-03 // HOOD");
      setHotspotTitle("Inspeksi Kap Servo Berengsel");
      setHotspotDesc("Kap miring logam terbuka untuk memperlihatkan deretan 6 motor servo MG996R metal gear berkekuatan torsi 11 kg·cm.");
    }
  };

  const handleToggleCutoff = () => {
    const eng = engineRef.current;
    const next = !isCutoffActive;
    setIsCutoffActive(next);
    eng.isHysteresisCutoff = next;
    if (next) {
      setTempValue("612.4 °C");
      setHysteresisTag("OVERHEAT! CUT-OFF");
      setBlowerState("CUT-OFF (0% RPM)");
      setHotspotCode("HYST-04 // OVERHEAT");
      setHotspotTitle("Logika Histeresis Aktif: Cut-Off ≥ 600°C");
      setHotspotDesc(
        "Termokopel Tipe-K mendeteksi suhu melebihi 600°C (612,4°C). Mikrokontroler otomatis memutus daya kedua blower keong agar kemplang tidak hangus."
      );
    } else {
      setTempValue("571.3 °C");
      setHysteresisTag("IDEAL [550°–600°C]");
      setBlowerState("ACTIVE (PWM 85%)");
      setHotspotCode("HYST-05 // RECOVERY");
      setHotspotTitle("Mode Pemulihan Termal Normal");
      setHotspotDesc("Suhu ruang bakar turun ke rentang aman (550°C–600°C). Dual blower keong kembali berputar menyuplai oksigen.");
    }
  };

  const handleFocusHotspot = (id: number) => {
    if (id === 1) {
      handleSetCamera("still3");
      setHotspotCode("HOT-01 // RACK");
      setHotspotTitle("6x Rak Penjepit Kawat U-Loop (SUS 304)");
      setHotspotDesc(
        "Tangkai ganda melengkung (hairpin U-loop) berbahan kawat Stainless Steel SUS 304 food-grade (SNI 8753:2020), menjepit 1 keping kemplang bulat per rak."
      );
    } else if (id === 2) {
      if (!isHoodOpen) handleToggleHood();
      handleSetCamera("still3");
      setHotspotCode("HOT-02 // SERVO");
      setHotspotTitle("6x Motor Servo MG996R Metal Gear");
      setHotspotDesc("Motor penggerak torsi tinggi di kompartemen belakang, terhubung langsung ke poros belakang rak penjepit kemplang.");
    } else if (id === 3) {
      handleSetCamera("still2");
      setHotspotCode("HOT-03 // BARA");
      setHotspotTitle("Ruang Bakar, Briket Arang, & Saluran Blower");
      setHotspotDesc(
        "Hamparan abu keperakan dengan 6 briket arang membara (3 per kompartemen) serta lubang bundar berbingkai krom di dinding samping palung."
      );
    } else if (id === 4) {
      handleSetCamera("rear");
      setHotspotCode("HOT-04 // ECU");
      setHotspotTitle("Panel Kendali Belakang & LCD 20x4 I2C");
      setHotspotDesc("Layar digital berlatar biru, 2 kenop putar dimmer blower (PWM AC), dan tombol sakelar daya merah.");
    } else if (id === 5) {
      handleSetCamera("still1");
      setHotspotCode("HOT-05 // BLOWER");
      setHotspotTitle("Dual Blower Keong Sentrifugal (12 cm x 2)");
      setHotspotDesc(
        "Rumah keong silver metalik, kap intake dengan rotating sector wheel, sakelar hijau, pipa siku L melengkung, dan kabel daya melengkung ke kotak ECU."
      );
    }
  };

  return (
    <div className={`industrial-panel rounded-lg overflow-hidden border border-white/[0.1] ${className}`}>
      {/* Precision Viewport Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0a0a0a] border-b border-white/[0.08] flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs truncate">
          <span className="text-[#ff5500] font-bold shrink-0">VIEWPORT // 3D MODEL</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-400 hidden sm:inline">SCALE 1:1 CAD BLUEPRINT [1240 × 300 × 300 MM]</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {!compact && (
            <button
              onClick={() => {
                const next = studioBg === "light" ? "dark" : "light";
                setStudioBg(next);
                if (engineRef.current.studioFloorMesh) {
                  engineRef.current.studioFloorMesh.visible = next === "light";
                }
              }}
              className="px-2 sm:px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[10px] sm:text-[11px] font-mono text-neutral-300 border border-white/[0.08] transition flex items-center gap-1.5"
            >
              {studioBg === "light" ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-sky-400" />}
              <span className="hidden sm:inline">{studioBg === "light" ? "STUDIO (STILL 1)" : "DARK (STILL 3)"}</span>
            </button>
          )}
          <button
            onClick={() => {
              const next = !autoTurntable;
              setAutoTurntable(next);
              engineRef.current.autoTurntable = next;
            }}
            className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-mono border transition ${
              autoTurntable
                ? "bg-[#ff5500]/15 text-[#ff5500] border-[#ff5500]/30"
                : "bg-white/[0.05] text-neutral-400 border-white/[0.08]"
            }`}
          >
            <span className="hidden sm:inline">PUTAR 360°: </span>{autoTurntable ? "360° ON" : "360° OFF"}
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport & Framing */}
      <div
        ref={containerRef}
        className={`relative w-full ${compact ? "h-[300px] xs:h-[340px] sm:h-[380px]" : "h-[360px] xs:h-[400px] sm:h-[480px]"} transition-colors duration-300 select-none`}
        style={{
          background:
            studioBg === "light"
              ? "radial-gradient(circle at 50% 45%, #f4f1ea 0%, #dcd7cd 100%)"
              : "radial-gradient(circle at 50% 45%, #1a1615 0%, #080706 100%)",
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing touch-none" />

        {/* Viewfinder Crosshairs */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-neutral-500/50 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-neutral-500/50 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-neutral-500/50 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-neutral-500/50 pointer-events-none" />

        {/* Mobile touch hint badge */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-neutral-400 pointer-events-none sm:hidden">
          1-JARI: ROTASI 3D
        </div>

        {/* Technical HUD Overlay Box */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 max-w-[240px] sm:max-w-sm bg-[#0a0a0a]/90 backdrop-blur-sm border border-white/[0.12] rounded p-2.5 sm:p-3 text-left pointer-events-none shadow-lg">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 mb-0.5 sm:mb-1">
            <span className="text-[#ff5500] font-bold">{hotspotCode}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-2.5 h-2.5" /> CAD VERIFIED
            </span>
          </div>
          <div className="font-display font-bold text-xs sm:text-sm text-white tracking-tight truncate sm:whitespace-normal">{hotspotTitle}</div>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 sm:mt-1 leading-relaxed font-sans line-clamp-2 sm:line-clamp-none">{hotspotDesc}</p>
        </div>

        {/* Camera Preset Selector (Matching Still 1, Still 2, Still 3, Front, Rear) */}
        <div className="absolute bottom-2.5 right-2.5 max-w-[calc(100%-1.25rem)] flex items-center gap-1 bg-[#0a0a0a]/90 backdrop-blur-sm p-1 rounded border border-white/[0.1] overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleSetCamera("still1")}
            className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 transition ${
              currentCameraPreset === "still1" ? "bg-[#ff5500] text-black font-bold" : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            <span className="sm:hidden">ISO</span>
            <span className="hidden sm:inline">STILL 1 (ISO)</span>
          </button>
          <button
            onClick={() => handleSetCamera("still2")}
            className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 transition ${
              currentCameraPreset === "still2" ? "bg-[#ff5500] text-black font-bold" : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            <span className="sm:hidden">TOP</span>
            <span className="hidden sm:inline">STILL 2 (TOP)</span>
          </button>
          <button
            onClick={() => handleSetCamera("still3")}
            className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 transition ${
              currentCameraPreset === "still3" ? "bg-[#ff5500] text-black font-bold" : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            <span className="sm:hidden">DRIVE</span>
            <span className="hidden sm:inline">STILL 3 (DRIVE)</span>
          </button>
          <button
            onClick={() => handleSetCamera("front")}
            className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 transition ${
              currentCameraPreset === "front" ? "bg-[#ff5500] text-black font-bold" : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            FRONT
          </button>
          <button
            onClick={() => handleSetCamera("rear")}
            className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 transition ${
              currentCameraPreset === "rear" ? "bg-[#ff5500] text-black font-bold" : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            <span className="sm:hidden">REAR</span>
            <span className="hidden sm:inline">REAR ECU</span>
          </button>
        </div>
      </div>

      {/* Industrial LCD Character Matrix Display (Real-time Telemetry) */}
      <div className="p-2.5 sm:p-3 bg-[#000d18] border-t border-[#002845] font-mono text-xs">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-sky-400/80 mb-1 px-1">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
            <span className="truncate">PANEL KENDALI BELAKANG // LCD 20X4</span>
          </span>
          <span className="text-emerald-400 shrink-0">ECU: 44.2°C</span>
        </div>
        <div className="lcd-screen rounded p-2 sm:p-3 text-[10px] sm:text-xs leading-relaxed space-y-1">
          <div className="flex justify-between items-center border-b border-sky-950 pb-1 gap-2">
            <span className="truncate">INTAN SMART ROASTER</span>
            <span className="text-amber-400 font-bold shrink-0">[AUTO-CYCLE]</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="truncate text-sky-300/80">SUHU BARA (MAX6675)</span>
            <span className="font-bold text-white shrink-0 tabular-numbers">{tempValue}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="truncate text-sky-300/80">KENDALI HISTERESIS</span>
            <span className={isCutoffActive ? "text-rose-400 font-bold animate-pulse shrink-0" : "text-emerald-400 shrink-0"}>
              {hysteresisTag}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="truncate text-sky-300/80">DUAL BLOWER KEONG</span>
            <span className={isCutoffActive ? "text-rose-400 font-bold shrink-0" : "text-sky-300 shrink-0"}>{blowerState}</span>
          </div>
          <div className="flex justify-between items-center border-t border-sky-950 pt-1 gap-2">
            <span className="truncate text-sky-300/80">6X SERVO MG996R</span>
            <span className="text-amber-300 shrink-0">{servoState}</span>
          </div>
        </div>
      </div>

      {/* Hardware Actuation Controls */}
      {!compact && (
        <div className="p-3 sm:p-4 bg-[#0d0d0d] border-t border-white/[0.08] space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <span className="text-neutral-400 uppercase tracking-wider font-bold flex items-center gap-1.5 text-[11px] sm:text-xs">
              <Sliders className="w-3.5 h-3.5 text-[#ff5500]" /> KONTROL MEKANIK &amp; AKTUASI
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <span className="text-neutral-400 text-[10px] sm:text-[11px] shrink-0">SUDUT SERVO:</span>
              <span className="text-[#ff5500] font-bold tabular-numbers w-8 sm:w-10 text-right shrink-0">{servoAngleDeg}°</span>
              <input
                type="range"
                min="0"
                max="180"
                value={servoAngleDeg}
                onChange={(e) => handleServoSlide(e.target.value)}
                className="w-full sm:w-32 h-1.5 bg-neutral-800 rounded appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={handleFlipServo}
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded bg-white/[0.04] active:bg-white/[0.1] hover:bg-white/[0.08] border border-white/[0.1] text-[11px] sm:text-xs font-mono font-medium text-neutral-200 hover:text-white transition flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
              <span>FLIP 180°</span>
            </button>
            <button
              onClick={handleToggleDrawers}
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded bg-white/[0.04] active:bg-white/[0.1] hover:bg-white/[0.08] border border-white/[0.1] text-[11px] sm:text-xs font-mono font-medium text-neutral-200 hover:text-white transition flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{isDrawerOpen ? "TUTUP LACI" : "TARIK 2 LACI"}</span>
            </button>
            <button
              onClick={handleToggleHood}
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded bg-white/[0.04] active:bg-white/[0.1] hover:bg-white/[0.08] border border-white/[0.1] text-[11px] sm:text-xs font-mono font-medium text-neutral-200 hover:text-white transition flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Camera className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{isHoodOpen ? "TUTUP KAP" : "BUKA KAP SERVO"}</span>
            </button>
            <button
              onClick={handleToggleCutoff}
              className={`px-2.5 sm:px-3 py-2 sm:py-2.5 rounded border text-[11px] sm:text-xs font-mono font-medium transition flex items-center justify-center gap-1.5 sm:gap-2 ${
                isCutoffActive
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  : "bg-white/[0.04] active:bg-white/[0.1] hover:bg-white/[0.08] border-white/[0.1] text-neutral-200"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{isCutoffActive ? "KEMBALI 550°" : "CUT-OFF ≥ 600°"}</span>
            </button>
          </div>

          {/* Horizontal Swipeable Inspection Hotspots */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] overflow-x-auto scrollbar-none pb-0.5">
            <span className="text-neutral-500 py-1 mr-1 shrink-0 text-[10px]">INSPEKSI:</span>
            <button
              onClick={() => handleFocusHotspot(1)}
              className="px-2.5 py-1 rounded bg-white/[0.03] active:bg-white/[0.1] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] shrink-0 transition"
            >
              01 // U-LOOP
            </button>
            <button
              onClick={() => handleFocusHotspot(2)}
              className="px-2.5 py-1 rounded bg-white/[0.03] active:bg-white/[0.1] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] shrink-0 transition"
            >
              02 // 6X SERVO
            </button>
            <button
              onClick={() => handleFocusHotspot(3)}
              className="px-2.5 py-1 rounded bg-white/[0.03] active:bg-white/[0.1] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] shrink-0 transition"
            >
              03 // BARA ARANG
            </button>
            <button
              onClick={() => handleFocusHotspot(4)}
              className="px-2.5 py-1 rounded bg-white/[0.03] active:bg-white/[0.1] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] shrink-0 transition"
            >
              04 // LCD/DIMMER
            </button>
            <button
              onClick={() => handleFocusHotspot(5)}
              className="px-2.5 py-1 rounded bg-white/[0.03] active:bg-white/[0.1] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] shrink-0 transition"
            >
              05 // DUAL BLOWER
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
