export type Discipline = 'Hardware' | 'Software' | 'Mechanical'

export type Project = {
  id: string
  title: string
  summary: string
  year: string
  role: string
  disciplines: Discipline[]
  image: string
  imageAlt: string
  problem: string
  approach: string
  outcome: string
  metrics: { label: string; value: string }[]
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'rover',
    title: 'Atlas Rover',
    summary: 'Six-wheel autonomous rover for outdoor mapping.',
    year: '2025',
    role: 'Lead engineer',
    disciplines: ['Hardware', 'Software', 'Mechanical'],
    image: '/projects/rover.png',
    imageAlt: 'Six-wheeled robotic rover with an aluminum chassis and a lidar sensor on top',
    problem:
      'Field teams needed a low-cost platform that could map uneven terrain without constant human supervision.',
    approach:
      'Designed a rocker-bogie chassis, integrated a 2D lidar with wheel odometry, and wrote a ROS 2 navigation stack with custom terrain-cost layers.',
    outcome:
      'Completed a 4 km unsupervised mapping run with sub-10 cm loop-closure error at a third of the cost of commercial platforms.',
    metrics: [
      { label: 'Range', value: '4 km' },
      { label: 'Map error', value: '<10 cm' },
      { label: 'BOM cost', value: '$1.8k' },
    ],
    stack: ['ROS 2', 'C++', 'SolidWorks', 'Lidar SLAM', 'Jetson Orin'],
    links: [
      { label: 'Write-up', href: '#' },
      { label: 'Source', href: '#' },
    ],
  },
  {
    id: 'pcb',
    title: 'Volt BLDC Controller',
    summary: 'Compact 60 A field-oriented motor driver.',
    year: '2024',
    role: 'Hardware design',
    disciplines: ['Hardware', 'Software'],
    image: '/projects/pcb.png',
    imageAlt: 'Matte black printed circuit board motor controller with copper traces',
    problem:
      'Off-the-shelf drivers were either too large for our actuators or too noisy at low speed.',
    approach:
      'Laid out a 4-layer board with careful current-loop routing and implemented field-oriented control on an STM32G4 with a 20 kHz current loop.',
    outcome:
      'Reduced torque ripple by 38% versus the previous driver while shrinking board area to 42 × 42 mm.',
    metrics: [
      { label: 'Peak current', value: '60 A' },
      { label: 'Torque ripple', value: '−38%' },
      { label: 'Footprint', value: '42×42 mm' },
    ],
    stack: ['KiCad', 'STM32', 'Embedded C', 'FOC', 'LTspice'],
    links: [
      { label: 'Schematics', href: '#' },
      { label: 'Firmware', href: '#' },
    ],
  },
  {
    id: 'drone',
    title: 'Lattice Frame',
    summary: 'Generative-design quadcopter frame.',
    year: '2024',
    role: 'Mechanical design',
    disciplines: ['Mechanical'],
    image: '/projects/drone.png',
    imageAlt: 'Carbon fiber quadcopter frame with lattice-structured arms',
    problem:
      'A racing team wanted a stiffer frame without the weight penalty of thicker carbon plates.',
    approach:
      'Ran topology optimization with modal constraints, then validated candidate geometries with FEA and vibration testing on a shaker table.',
    outcome:
      'Shipped a frame 22% lighter with a first resonant mode pushed well above motor operating frequencies.',
    metrics: [
      { label: 'Weight', value: '−22%' },
      { label: 'First mode', value: '410 Hz' },
      { label: 'Iterations', value: '14' },
    ],
    stack: ['Fusion 360', 'ANSYS', 'Topology opt.', 'CNC', 'Python'],
    links: [{ label: 'Case study', href: '#' }],
  },
  {
    id: 'sensor',
    title: 'Canopy Sensor Net',
    summary: 'Solar-powered LoRa environmental sensors.',
    year: '2023',
    role: 'Full stack',
    disciplines: ['Hardware', 'Software'],
    image: '/projects/sensor.png',
    imageAlt: 'Small white 3D-printed sensor enclosure with an antenna and visible circuit board',
    problem:
      'A research lab needed microclimate data across a forest canopy where Wi-Fi and cell coverage don\u2019t exist.',
    approach:
      'Built ultra-low-power nodes with LoRa radios and a tiny solar cell, plus a gateway and dashboard for real-time data ingestion.',
    outcome:
      'Deployed 30 nodes that ran a full year untouched, streaming 2M+ readings to the lab\u2019s pipeline.',
    metrics: [
      { label: 'Nodes', value: '30' },
      { label: 'Uptime', value: '12 mo' },
      { label: 'Sleep draw', value: '4 µA' },
    ],
    stack: ['nRF52', 'LoRaWAN', 'Rust', 'TypeScript', 'PostgreSQL'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Source', href: '#' },
    ],
  },
]
