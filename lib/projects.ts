export type Discipline = 'Hardware' | 'Software' | 'Mechanical'

export type Project = {
  slug: string
  title: string
  summary: string
  year: string
  duration: string
  team: string
  disciplines: Discipline[]
  image: string
  imageAlt: string
  goal: string[]
  role: { summary: string; contributions: string[] }
  decisions: { title: string; detail: string }[]
  debugging: { problem: string; investigation: string; fix: string }[]
  result: { summary: string; nextTime: string[] }
  metrics: { label: string; value: string }[]
  visuals: { src: string; alt: string; caption: string }[]
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: 'atlas-rover',
    title: 'Atlas Rover',
    summary: 'Six-wheel autonomous rover for outdoor mapping.',
    year: '2025',
    duration: '8 months',
    team: '4 engineers',
    disciplines: ['Hardware', 'Software', 'Mechanical'],
    image: '/projects/rover.png',
    imageAlt: 'Six-wheeled robotic rover with an aluminum chassis and a lidar sensor on top',
    goal: [
      'Field teams surveying uneven terrain were spending most of their day walking transects with handheld GPS units. The goal was a low-cost platform that could map a site unsupervised and return a usable point cloud by the end of the day.',
      'Hard constraints: under $2,000 in parts, at least 3 km of range per charge, and repairable in the field with hand tools.',
    ],
    role: {
      summary:
        'Lead engineer on a team of four. I owned the chassis design and the navigation stack, and coordinated integration across the electrical and software subteams.',
      contributions: [
        'Designed the rocker-bogie suspension and drivetrain in SolidWorks',
        'Wrote the ROS 2 terrain-cost layer and the local planner tuning',
        'Built the wheel odometry and IMU fusion pipeline',
        'Ran weekly field tests and kept the shared failure log',
      ],
    },
    decisions: [
      {
        title: 'Rocker-bogie over a skid-steer chassis',
        detail:
          'A skid-steer chassis was simpler to build, but in early tests it lost traction on loose gravel and dragged its wheels through turns, which corrupted the odometry. Rocker-bogie keeps all six wheels in contact without springs, so the wheel-encoder data stayed trustworthy.',
      },
      {
        title: '2D lidar + odometry instead of 3D lidar',
        detail:
          'A 3D lidar alone would have used about 60% of the budget. A tilted 2D lidar fused with wheel odometry and an IMU gave enough coverage for terrain mapping at a fraction of the cost, at the price of a slower scan rate.',
      },
      {
        title: 'Custom terrain-cost layer',
        detail:
          'The default Nav2 costmaps treat the world as flat. I added a layer that scores slope and roughness from the point cloud, so the planner prefers gentle grades even when they mean a longer path.',
      },
    ],
    debugging: [
      {
        problem: 'The map drifted by roughly 2 m over a 500 m loop.',
        investigation:
          'Logging raw encoder ticks against GPS showed the drift was worst on soft ground. The middle wheels were slipping during turns and the odometry was counting that slip as forward travel.',
        fix: 'Weighted the middle wheels lower in the odometry model during turns and raised the IMU yaw weight in the EKF. Loop-closure error dropped below 10 cm.',
      },
      {
        problem: 'The Jetson would randomly brown out on steep climbs.',
        investigation:
          'A scope on the 5 V rail showed 600 mV dips whenever the drive motors pulled peak current. The compute and motor rails shared a ground return.',
        fix: 'Split the compute supply onto its own isolated DC-DC converter and added bulk capacitance near the motor drivers. There have been no brownouts since.',
      },
    ],
    result: {
      summary:
        'Completed a 4 km unsupervised mapping run with sub-10 cm loop-closure error, at about a third of the cost of comparable commercial platforms. The field team now uses it weekly.',
      nextTime: [
        'Use sealed connectors from day one, because dust caused two intermittent faults',
        'Design the battery swap to work without tools',
        'Add a cheap stereo camera for visual odometry as a backup on featureless terrain',
      ],
    },
    metrics: [
      { label: 'Range', value: '4 km' },
      { label: 'Map error', value: '<10 cm' },
      { label: 'BOM cost', value: '$1.8k' },
    ],
    visuals: [
      {
        src: '/projects/rover.png',
        alt: 'Atlas Rover on a studio backdrop',
        caption: 'Final build with the tilted lidar mount and the field-swappable battery bay.',
      },
      {
        src: '/projects/rover-map.png',
        alt: 'Top-down terrain map with a colored traversability overlay and a planned path',
        caption: 'Terrain-cost overlay from the field test. Warmer cells are steeper or rougher.',
      },
    ],
    stack: ['ROS 2', 'C++', 'SolidWorks', 'Lidar SLAM', 'Jetson Orin'],
    links: [
      { label: 'Source', href: '#' },
      { label: 'Demo video', href: '#' },
    ],
  },
  {
    slug: 'volt-bldc-controller',
    title: 'Volt BLDC Controller',
    summary: 'Compact 60 A field-oriented motor driver.',
    year: '2024',
    duration: '5 months',
    team: 'Solo, with lab support',
    disciplines: ['Hardware', 'Software'],
    image: '/projects/pcb.png',
    imageAlt: 'Matte black printed circuit board motor controller with copper traces',
    goal: [
      'Our robot arm actuators needed a driver small enough to mount directly on the motor. The off-the-shelf options were either too large or produced noticeable torque ripple at low speed, which showed up as jitter at the end effector.',
      'Target: 60 A peak in a 42 × 42 mm footprint, with smooth torque down to 10 RPM.',
    ],
    role: {
      summary:
        'Sole designer for the hardware and firmware. A lab technician helped with board assembly, and my advisor reviewed the schematics.',
      contributions: [
        'Schematic capture and 4-layer PCB layout in KiCad',
        'Field-oriented control firmware on the STM32G4',
        'Built a dynamometer test rig for characterization',
      ],
    },
    decisions: [
      {
        title: 'STM32G4 over a dedicated motor-control IC',
        detail:
          'Dedicated FOC ICs are easier to bring up, but they lock you into their observer design. The G4 has hardware math accelerators (CORDIC and FMAC) that made a 20 kHz current loop practical, and it left room for custom low-speed compensation.',
      },
      {
        title: 'Low-side shunt current sensing',
        detail:
          'Inline sensing is more accurate but costs board area and needs isolated amplifiers. Three low-side shunts with careful ADC timing gave enough accuracy and kept the board within the footprint.',
      },
    ],
    debugging: [
      {
        problem: 'The current readings were noisy enough to make the motor audibly whine.',
        investigation:
          'An FFT of the ADC samples showed spikes at the PWM frequency. The ADC was sampling right at the switching edges.',
        fix: 'Moved the ADC trigger to the center of the low-side on-time and rerouted the shunt traces as Kelvin connections. Noise fell by about 12 dB.',
      },
    ],
    result: {
      summary:
        'Torque ripple was 38% lower than the previous driver, the board fit in 42 × 42 mm, and the motor stayed stable down to 8 RPM.',
      nextTime: [
        'Add an onboard temperature sensor near the FETs',
        'Expose a CAN-FD bus for daisy-chaining multiple actuators',
      ],
    },
    metrics: [
      { label: 'Peak current', value: '60 A' },
      { label: 'Torque ripple', value: '−38%' },
      { label: 'Footprint', value: '42×42 mm' },
    ],
    visuals: [
      {
        src: '/projects/pcb.png',
        alt: 'Volt BLDC controller board',
        caption: 'Rev C board. The power stage is on the left and the MCU and gate driver are on the right.',
      },
      {
        src: '/projects/pcb-scope.png',
        alt: 'Oscilloscope screen showing three clean sinusoidal phase current waveforms',
        caption: 'Phase currents at 200 RPM after fixing the ADC timing.',
      },
    ],
    stack: ['KiCad', 'STM32', 'Embedded C', 'FOC', 'LTspice'],
    links: [
      { label: 'Schematics', href: '#' },
      { label: 'Firmware', href: '#' },
    ],
  },
  {
    slug: 'lattice-frame',
    title: 'Lattice Frame',
    summary: 'Generative-design quadcopter frame.',
    year: '2024',
    duration: '3 months',
    team: '2 engineers',
    disciplines: ['Mechanical'],
    image: '/projects/drone.png',
    imageAlt: 'Carbon fiber quadcopter frame with lattice-structured arms',
    goal: [
      'A university racing team wanted a stiffer frame to reduce vibration in their flight controller, but thicker carbon plates added weight they could not afford.',
      'The goal was to raise the first resonant mode above the motor operating band without adding mass.',
    ],
    role: {
      summary:
        'I ran the optimization and simulation work. My teammate handled manufacturing and flight testing.',
      contributions: [
        'Set up topology optimization with modal constraints',
        'FEA validation of 14 candidate geometries',
        'Designed the shaker-table test fixture',
      ],
    },
    decisions: [
      {
        title: 'Optimize for modal frequency, not just stiffness',
        detail:
          'Pure stiffness optimization produced frames that were stiff in bending but had torsional modes right in the motor band. Constraining the first mode directly gave better real-world results.',
      },
    ],
    debugging: [
      {
        problem: 'The simulated first mode was 410 Hz but the shaker test measured 320 Hz.',
        investigation:
          'The fixture itself was flexing. Testing the fixture alone showed its own resonance near 340 Hz.',
        fix: 'Redesigned the fixture from aluminum plate with a higher natural frequency. After that, the measured and simulated values agreed within 4%.',
      },
    ],
    result: {
      summary:
        'Delivered a frame 22% lighter than the previous design, with its first resonant mode at 410 Hz, well above motor frequencies. The team raced it for a full season.',
      nextTime: ['Run the fixture validation before the part tests, not after'],
    },
    metrics: [
      { label: 'Weight', value: '−22%' },
      { label: 'First mode', value: '410 Hz' },
      { label: 'Iterations', value: '14' },
    ],
    visuals: [
      {
        src: '/projects/drone.png',
        alt: 'Lattice Frame quadcopter',
        caption: 'Final frame with the optimized lattice arms.',
      },
      {
        src: '/projects/drone-fea.png',
        alt: 'FEA simulation showing a color-coded stress map on a quadcopter arm',
        caption: 'Modal analysis of the first bending mode of a candidate arm.',
      },
    ],
    stack: ['Fusion 360', 'ANSYS', 'Topology opt.', 'CNC', 'Python'],
    links: [{ label: 'Case study', href: '#' }],
  },
  {
    slug: 'canopy-sensor-net',
    title: 'Canopy Sensor Net',
    summary: 'Solar-powered LoRa environmental sensors.',
    year: '2023',
    duration: '1 year',
    team: '3 engineers + research lab',
    disciplines: ['Hardware', 'Software'],
    image: '/projects/sensor.png',
    imageAlt: 'Small white 3D-printed sensor enclosure with an antenna and visible circuit board',
    goal: [
      'An ecology lab needed microclimate data (temperature, humidity, and light) from across a forest canopy where there is no Wi-Fi or cell coverage.',
      'The nodes had to run for a full year without battery swaps, because each one took a climbing crew to reach.',
    ],
    role: {
      summary:
        'I designed the node hardware and firmware, and built the ingestion pipeline to the lab database.',
      contributions: [
        'Low-power PCB design around the nRF52 and a LoRa radio',
        'Firmware in Rust with a power budget under 10 µA in sleep',
        'Gateway and dashboard backend in TypeScript and PostgreSQL',
      ],
    },
    decisions: [
      {
        title: 'LoRaWAN instead of a mesh network',
        detail:
          'A mesh network would have handled dense foliage better, but every node would have to stay awake to relay packets. A star topology with one tall gateway kept every node asleep more than 99.9% of the time.',
      },
    ],
    debugging: [
      {
        problem: 'Three nodes died after six weeks despite a calculated two-year battery life.',
        investigation:
          'Bench measurements showed a 400 µA sleep current on those boards. A pull-up resistor on the humidity sensor I²C line was back-feeding the sensor while it was powered down.',
        fix: 'Switched the sensor to a GPIO-controlled power rail and put the I²C pins in high-impedance mode during sleep. Sleep draw dropped to 4 µA.',
      },
    ],
    result: {
      summary:
        'Thirty nodes ran a full year untouched and streamed more than 2 million readings into the lab pipeline. The data supported one published paper.',
      nextTime: [
        'Add a supercapacitor buffer for cloudy weeks',
        'Support over-the-air firmware updates from the start',
      ],
    },
    metrics: [
      { label: 'Nodes', value: '30' },
      { label: 'Uptime', value: '12 mo' },
      { label: 'Sleep draw', value: '4 µA' },
    ],
    visuals: [
      {
        src: '/projects/sensor.png',
        alt: 'Canopy sensor node',
        caption: 'Node enclosure with the solar cell and the antenna.',
      },
      {
        src: '/projects/sensor-plot.png',
        alt: 'Line chart of temperature and humidity readings over several days',
        caption: 'One week of canopy temperature and humidity from a single node.',
      },
    ],
    stack: ['nRF52', 'LoRaWAN', 'Rust', 'TypeScript', 'PostgreSQL'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Source', href: '#' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
