import { CriticalRegion } from '../types';

export const CRITICAL_REGIONS: CriticalRegion[] = [
  {
    id: 'bhotekoshi-nepal',
    name: 'Bhotekoshi Valley',
    subRegion: 'Sindhupalchok District',
    country: 'NEPAL',
    centerCoordinates: [27.9485, 85.9328],
    zoomLevel: 13,
    riverBasin: 'Bhote Koshi / Sun Koshi Basin (Transboundary Poiqu Basin)',
    primaryHazards: ['GLOF', 'FLASH_FLOOD', 'DEBRIS_FLOW'],
    historicalEvent: {
      name: 'Bhotekoshi Glacial Breach & Flash Debris Surges',
      date: 'July 5, 2016 & July 2020 Liping Event',
      actualImpact: 'Catastrophic debris surge destroyed 66 houses, Tatopani border infrastructure, Upper Bhotekoshi Hydro intake (45MW), Araniko Highway bridges, with dozens missing/displaced due to midnight arrival with only 8-15 min informal alert.',
      preventedCasualtiesWithAI: '1,840 inhabitants & border workers relocated 4.5 hours prior to high terraces, preventing all 38 recorded casualties and severe distress entrapments.',
      earlyWarningLeadTimeGained: '4.5 Hours Predictive Lead Time (Moraine deformation + Upstream Poiqu QPE trigger)'
    },
    overviewDescription: 'The Bhotekoshi river corridor along the Araniko Highway is one of the most hazardous transboundary valleys in the Himalayas. Fed by glacial lakes in the Tibetan plateau (including Gongbatongsha Tsho and Cirenmaco) with steep V-shaped gorges (>45° slope), it is susceptible to sudden Glacial Lake Outburst Floods (GLOFs) compounded by intense monsoon cloudbursts.',
    geomorphicRiskFactor: 'High moraine dam instability upstream in Poiqu catchment + 2,100m elevation drop over 35km creates supersonic debris flow velocity exceeding 12 m/s.',
    sensorStations: [
      {
        id: 'DHM-TATOPANI-01',
        name: 'Tatopani Hydrology & Radar Stage Station',
        type: 'RADAR_STAGE',
        provider: 'Nepal Dept of Hydrology & Meteorology (DHM)',
        coordinates: [27.9542, 85.9411],
        elevation: 1680,
        currentValue: '12.4 m (Above Extreme Warning 9.5m)',
        unit: 'meters',
        status: 'CRITICAL',
        description: 'Continuous non-contact radar stage sensor installed on Tatopani suspension pillar measuring river stage and instantaneous rate of water rise.'
      },
      {
        id: 'ICIMOD-GLOF-ALERT-04',
        name: 'Gongbatongsha Transboundary Telemetry Node',
        type: 'ACOUSTIC_FLOW',
        provider: 'ICIMOD / CAS Transboundary Network',
        coordinates: [28.0125, 85.9814],
        elevation: 3200,
        currentValue: 'Triggered (Flow: 1,480 m³/s)',
        unit: 'm³/s',
        status: 'CRITICAL',
        description: 'Upstream lake breach acoustic and pressure transducer transmitting telemetry via satellite uplink to Katmandu & NDRRMA emergency servers.'
      },
      {
        id: 'BARHABI-AWS-02',
        name: 'Barhabise Automatic Weather Station (AWS)',
        type: 'RAIN_GAUGE',
        provider: 'Nepal DHM / JICA Network',
        coordinates: [27.7912, 85.9015],
        elevation: 820,
        currentValue: '48.5 mm/hr (Cumulative: 242 mm)',
        unit: 'mm/hr',
        status: 'WARNING',
        description: 'Tipping-bucket rain gauge with GPRS telemetry logging intense localized monsoon downpours.'
      },
      {
        id: 'SAR-S1-INTRAPASS-NP',
        name: 'Sentinel-1 InSAR Transboundary Pass Orbit 121',
        type: 'SATELLITE_PASS',
        provider: 'Copernicus / ESA C-Band SAR',
        coordinates: [27.9712, 85.9450],
        elevation: 2400,
        currentValue: 'VH/VV Backscatter Ratio: -21.4 dB',
        unit: 'dB',
        status: 'CRITICAL',
        description: 'C-band radar detected sudden specular reflection drop over glacial moraine and upstream lake breach zone through dense cloud cover.'
      }
    ],
    habitations: [
      {
        id: 'HAB-LIPING',
        name: 'Liping Bazaar & Border Customs Outpost',
        coordinates: [27.9628, 85.9490],
        elevationMeters: 1720,
        proximityToRiverKm: 0.05,
        totalPopulation: 420,
        demographics: {
          elderly: 62,
          children: 88,
          pregnantWomen: 14,
          personsWithDisabilities: 18,
          general: 238
        },
        hazardRiskScore: 98,
        assignedShelterId: 'SHELTER-CHAKU-RIDGE',
        assignedRouteId: 'ROUTE-LIPING-CHAKU',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['2 Off-road 4x4 Ambulances for PwD & elderly', '16 Police Escort Vans']
      },
      {
        id: 'HAB-TATOPANI',
        name: 'Tatopani Riverside Habitation & Hotsprings',
        coordinates: [27.9515, 85.9380],
        elevationMeters: 1650,
        proximityToRiverKm: 0.08,
        totalPopulation: 680,
        demographics: {
          elderly: 94,
          children: 145,
          pregnantWomen: 22,
          personsWithDisabilities: 29,
          general: 390
        },
        hazardRiskScore: 95,
        assignedShelterId: 'SHELTER-TATOPANI-HIGH',
        assignedRouteId: 'ROUTE-TATO-HIGH',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['Wheelchair accessible minibus', 'Oxygen cylinders for elderly care']
      },
      {
        id: 'HAB-KODARI-MARKET',
        name: 'Kodari Valley Habitations & Hydro Staff Quarters',
        coordinates: [27.9350, 85.9250],
        elevationMeters: 1540,
        proximityToRiverKm: 0.12,
        totalPopulation: 740,
        demographics: {
          elderly: 105,
          children: 160,
          pregnantWomen: 28,
          personsWithDisabilities: 34,
          general: 413
        },
        hazardRiskScore: 89,
        assignedShelterId: 'SHELTER-BARHBISE-HSS',
        assignedRouteId: 'ROUTE-KODARI-BARHBISE',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['Heavy transport trucks', 'Portable baby feeding kits']
      }
    ],
    relocationShelters: [
      {
        id: 'SHELTER-CHAKU-RIDGE',
        name: 'Chaku High Ridge Secondary School & Monastery',
        type: 'TEMPLE_MONASTERY',
        coordinates: [27.9380, 85.9080],
        elevationMeters: 1980,
        totalCapacity: 650,
        currentOccupied: 120,
        allocatedFromSystem: 420,
        distanceKm: 3.4,
        safetyScore: 96,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 14,
          drinkingWaterLiters: 12000,
          emergencyPowerBackup: true,
          helipadAccessible: true,
          stockedFoodDays: 7
        },
        contactOfficer: 'Inspector Dorje Lama (Nepal Armed Police Force - Tatopani Base)'
      },
      {
        id: 'SHELTER-TATOPANI-HIGH',
        name: 'Tatopani Community Terrace Relief Shelter',
        type: 'COMMUNITY_CENTER',
        coordinates: [27.9580, 85.9220],
        elevationMeters: 1890,
        totalCapacity: 850,
        currentOccupied: 90,
        allocatedFromSystem: 680,
        distanceKm: 2.1,
        safetyScore: 94,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 18,
          drinkingWaterLiters: 16000,
          emergencyPowerBackup: true,
          helipadAccessible: false,
          stockedFoodDays: 6
        },
        contactOfficer: 'Dr. Sunita Shrestha (Sindhupalchok Health Post Officer)'
      },
      {
        id: 'SHELTER-BARHBISE-HSS',
        name: 'Barhabise Higher Secondary School & Sports Ground',
        type: 'SCHOOL',
        coordinates: [27.7980, 85.9040],
        elevationMeters: 980,
        totalCapacity: 1400,
        currentOccupied: 260,
        allocatedFromSystem: 740,
        distanceKm: 7.8,
        safetyScore: 98,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 32,
          drinkingWaterLiters: 35000,
          emergencyPowerBackup: true,
          helipadAccessible: true,
          stockedFoodDays: 10
        },
        contactOfficer: 'Chief District Officer (CDO) Emergency Liaison Desk'
      }
    ],
    evacuationRoutes: [
      {
        id: 'ROUTE-LIPING-CHAKU',
        name: 'Liping to Chaku High Ridge Trail (Upper Contour Road)',
        fromHabitationId: 'HAB-LIPING',
        toShelterId: 'SHELTER-CHAKU-RIDGE',
        pathCoordinates: [
          [27.9628, 85.9490],
          [27.9540, 85.9320],
          [27.9440, 85.9180],
          [27.9380, 85.9080]
        ],
        distanceKm: 3.4,
        estimatedTransitMinutes: 35,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Completely avoids low-lying river bank; stays +260m above projected GLOF water peak.',
        elevationGainMeters: 260
      },
      {
        id: 'ROUTE-TATO-HIGH',
        name: 'Tatopani East Terrace Escape Route',
        fromHabitationId: 'HAB-TATOPANI',
        toShelterId: 'SHELTER-TATOPANI-HIGH',
        pathCoordinates: [
          [27.9515, 85.9380],
          [27.9550, 85.9300],
          [27.9580, 85.9220]
        ],
        distanceKm: 2.1,
        estimatedTransitMinutes: 22,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Reinforced paved incline with safety ropes, cleared of loose debris.',
        elevationGainMeters: 240
      },
      {
        id: 'ROUTE-KODARI-BARHBISE',
        name: 'Araniko Arterial Bypass to Barhabise Higher Ground',
        fromHabitationId: 'HAB-KODARI-MARKET',
        toShelterId: 'SHELTER-BARHBISE-HSS',
        pathCoordinates: [
          [27.9350, 85.9250],
          [27.8820, 85.9110],
          [27.8340, 85.9050],
          [27.7980, 85.9040]
        ],
        distanceKm: 7.8,
        estimatedTransitMinutes: 45,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Convoys guided by traffic police; bypasses vulnerable river curves.',
        elevationGainMeters: -140
      },
      {
        id: 'ROUTE-BLOCKED-RIVERBED',
        name: 'Old Araniko Riverside Service Lane (DANGER)',
        fromHabitationId: 'HAB-LIPING',
        toShelterId: 'SHELTER-TATOPANI-HIGH',
        pathCoordinates: [
          [27.9628, 85.9490],
          [27.9580, 85.9430],
          [27.9515, 85.9380]
        ],
        distanceKm: 1.8,
        estimatedTransitMinutes: 18,
        status: 'FLOODED_INACCESSIBLE',
        hazardIntersectionNote: 'CRITICAL HAZARD: DIRECTLY IN THE PATH OF 1,500 m³/s DEBRIS SURGE! BANNED BY AI.',
        elevationGainMeters: 0
      }
    ],
    timeline: [
      {
        stepId: 'step-t48',
        label: 'T - 48 Hours',
        relativeHours: -48,
        summary: 'Cloudburst buildup over Tibetan plateau and higher Himalayas.',
        alertLevel: 'NORMAL',
        rainRateMmHr: 4.2,
        accumulatedRainMm: 28,
        soilMoistureSaturationPct: 45,
        riverDischargeM3s: 180,
        riverWaterLevelMeters: 3.4,
        dangerWaterLevelMeters: 8.5,
        sentinel1RadarBackscatterDb: -14.2,
        sentinel2NdwiIndex: -0.12,
        slopeDisplacementMmDay: 1.8,
        predictiveInsight: 'Sentinel-2 imagery shows expansion of Gongbatongsha supraglacial pond by 28% over 10 days. Pre-monsoon soil saturation is low to moderate.',
        actionTakenBySurakshaKavach: 'Automated ingestion of transboundary telemetry. Routine background risk index 18/100.',
        historicalActionRecorded: 'No action taken. No automated alert systems monitoring upstream lakes in Tibet.'
      },
      {
        stepId: 'step-t24',
        label: 'T - 24 Hours',
        relativeHours: -24,
        summary: 'Persistent heavy downpour begins in Poiqu catchment. Rain rate jumps to 24 mm/hr.',
        alertLevel: 'WATCH',
        rainRateMmHr: 24.5,
        accumulatedRainMm: 96,
        soilMoistureSaturationPct: 68,
        riverDischargeM3s: 340,
        riverWaterLevelMeters: 5.2,
        dangerWaterLevelMeters: 8.5,
        sentinel1RadarBackscatterDb: -16.8,
        sentinel2NdwiIndex: 0.22,
        slopeDisplacementMmDay: 8.4,
        predictiveInsight: 'Sentinel-1 SAR C-Band radar pass indicates intense surface water runoff across moraine dam slopes. DEM hydrological flow simulations show rapid accumulation.',
        actionTakenBySurakshaKavach: 'Suraksha Kavach raises regional alert to WATCH. Pre-activates community shelter rosters in Tatopani & Barhabise.',
        historicalActionRecorded: 'Locals noted rising water levels, but business and customs traffic continued normally.'
      },
      {
        stepId: 'step-t6',
        label: 'T - 6 Hours',
        relativeHours: -6,
        summary: 'Upstream lake moraine breach detected. Inflow discharge surges beyond 850 m³/s.',
        alertLevel: 'ORANGE_WARNING',
        rainRateMmHr: 42.0,
        accumulatedRainMm: 188,
        soilMoistureSaturationPct: 88,
        riverDischargeM3s: 890,
        riverWaterLevelMeters: 7.9,
        dangerWaterLevelMeters: 8.5,
        sentinel1RadarBackscatterDb: -19.5,
        sentinel2NdwiIndex: 0.58,
        slopeDisplacementMmDay: 26.5,
        predictiveInsight: 'Sentinel-1 radar backscatter plunges to -19.5 dB confirming water sheet overflow over moraine. Suraksha Kavach AI models predict GLOF wave arrival in 4.5 hours with peak flow >1,400 m³/s.',
        actionTakenBySurakshaKavach: 'ORANGE WARNING DISPATCHED. District Magistrate and Armed Police Force receive automated Red Zone coordinates. Priority evacuation buses dispatched to Liping & Tatopani.',
        historicalActionRecorded: 'No transboundary warning communicated. No early evacuation ordered.'
      },
      {
        stepId: 'step-t2',
        label: 'T - 2.5 Hours (PREDICTIVE RELOCATION WINDOW)',
        relativeHours: -2.5,
        summary: 'CRITICAL RELOCATION PHASE: 1,840 people mobilized across predetermined safe routes.',
        alertLevel: 'RED_EVACUATION',
        rainRateMmHr: 54.0,
        accumulatedRainMm: 230,
        soilMoistureSaturationPct: 96,
        riverDischargeM3s: 1240,
        riverWaterLevelMeters: 9.8,
        dangerWaterLevelMeters: 8.5,
        sentinel1RadarBackscatterDb: -22.1,
        sentinel2NdwiIndex: 0.74,
        slopeDisplacementMmDay: 64.0,
        predictiveInsight: 'Carrying capacity engine assigns 420 residents to Chaku Ridge, 680 to Tatopani Terrace, and 740 to Barhabise. All 138 elderly and 81 disabled residents evacuated in Stage 1.',
        actionTakenBySurakshaKavach: '100% of habitations cleared from red zone 2.5 hours BEFORE flood crest arrives. Evacuation completed calmly in daylight.',
        historicalActionRecorded: 'Villagers were asleep or in homes. Flood wave was heard only 10 minutes before impact in the dark.'
      },
      {
        stepId: 'step-t0',
        label: 'T - 0 (Peak GLOF Debris Wave Hits)',
        relativeHours: 0,
        summary: 'Massive 1,520 m³/s debris wave demolishes riverside highway, customs yard, and lower homes.',
        alertLevel: 'RED_EVACUATION',
        rainRateMmHr: 38.0,
        accumulatedRainMm: 268,
        soilMoistureSaturationPct: 100,
        riverDischargeM3s: 1520,
        riverWaterLevelMeters: 13.6,
        dangerWaterLevelMeters: 8.5,
        sentinel1RadarBackscatterDb: -23.5,
        sentinel2NdwiIndex: 0.82,
        slopeDisplacementMmDay: 180.0,
        predictiveInsight: 'Physical structures in Liping & Tatopani riverside submerged under 4m of boulders & mud. However, all residents are safe inside elevated shelters equipped with power and supplies.',
        actionTakenBySurakshaKavach: 'ZERO CASUALTIES RECORDED. 1,840 lives protected. Relocation shelters operating with 3 to 7 days food buffer.',
        historicalActionRecorded: 'In reality: 66 buildings swept away, 38 lives lost or missing, hundreds stranded without food or shelter on isolated cliffs for days.'
      }
    ],
    dataSources: [
      {
        id: 'SRC-S1',
        name: 'Copernicus Sentinel-1 (C-Band SAR)',
        agency: 'European Space Agency (ESA) / Copernicus',
        type: 'SAR',
        resolution: '10m Spatial Resolution (Interferometric Wide Swath)',
        updateFrequency: 'Every 6-12 days (Constellation A/B)',
        primaryIndicators: ['Co-polarization VV & cross-polarization VH backscatter', 'InSAR coherence for ground deformation', 'Water specular reflection masking'],
        roleInSurakshaKavach: 'Penetrates dense monsoon cloud covers and nighttime darkness to detect glacial lake expansions, moraine slips, and sudden river channel widening.',
        dataLatency: '<2 hours via Fast-Delivery L1 GRD pipeline',
        reliabilityWeight: 0.94,
        officialPortalUrl: 'https://dataspace.copernicus.eu'
      },
      {
        id: 'SRC-S2',
        name: 'Copernicus Sentinel-2 (Multispectral MSI)',
        agency: 'ESA / European Commission',
        type: 'OPTICAL',
        resolution: '10m to 20m across 13 spectral bands',
        updateFrequency: 'Every 5 days at equator (2-3 days in high latitudes)',
        primaryIndicators: ['NDWI (Normalized Difference Water Index)', 'NDVI (Vegetation health/scars)', 'NDBI (Built-up exposure)'],
        roleInSurakshaKavach: 'Tracks glacial lake surface area changes, sediment plumes in headwaters, and infrastructure boundary mapping.',
        dataLatency: '<3 hours via Copernicus Open Access Hub',
        reliabilityWeight: 0.88,
        officialPortalUrl: 'https://sentinels.copernicus.eu'
      },
      {
        id: 'SRC-DEM',
        name: 'ALOS PALSAR & Cartosat DEM (Digital Elevation Model)',
        agency: 'ISRO / JAXA / NASA SRTM 30m',
        type: 'DEM',
        resolution: '12.5m - 30m High Precision Topography',
        updateFrequency: 'Static Terrain Baseline with periodic lidar/InSAR updates',
        primaryIndicators: ['Slope angle (>35° hazard threshold)', 'Flow direction & accumulation vectors', 'Topographic Wetness Index (TWI)'],
        roleInSurakshaKavach: 'Feeds the physical fluid-dynamic simulation calculating GLOF wave arrival times and identifying high ground shelters safe from flood level + freeboard.',
        dataLatency: 'Immediate (Stored in spatial database)',
        reliabilityWeight: 0.96,
        officialPortalUrl: 'https://bhuvan.nrsc.gov.in'
      },
      {
        id: 'SRC-DHM',
        name: 'DHM & ICIMOD Real-time Hydrology Network',
        agency: 'Department of Hydrology and Meteorology (DHM, Nepal)',
        type: 'GROUND_TELEMETRY',
        resolution: 'Point sensor telemetry at 15-minute intervals',
        updateFrequency: 'Continuous 15-min telemetry via satellite & GSM',
        primaryIndicators: ['River stage height (meters)', 'Instantaneous discharge (m³/s)', 'Hourly precipitation rate (mm/hr)'],
        roleInSurakshaKavach: 'Provides ground-truth validation for satellite alerts, eliminating false positives and confirming rapid gauge surges.',
        dataLatency: '<10 minutes via DHM Telemetry API',
        reliabilityWeight: 0.98,
        officialPortalUrl: 'https://dhm.gov.np'
      }
    ],
    redZonePolygon: [
      [27.9650, 85.9520],
      [27.9620, 85.9460],
      [27.9540, 85.9380],
      [27.9420, 85.9300],
      [27.9300, 85.9220],
      [27.9320, 85.9260],
      [27.9460, 85.9360],
      [27.9570, 85.9440],
      [27.9650, 85.9520]
    ],
    floodBufferPolygon: [
      [27.9680, 85.9550],
      [27.9600, 85.9420],
      [27.9500, 85.9330],
      [27.9380, 85.9240],
      [27.9250, 85.9170],
      [27.9290, 85.9230],
      [27.9420, 85.9330],
      [27.9540, 85.9420],
      [27.9680, 85.9550]
    ]
  },
  {
    id: 'chamoli-rishiganga',
    name: 'Rishiganga - Dhauliganga Valley',
    subRegion: 'Chamoli District, Uttarakhand',
    country: 'INDIA',
    centerCoordinates: [30.4850, 79.7120],
    zoomLevel: 13,
    riverBasin: 'Alaknanda - Dhauliganga River Basin (Ganga Headwaters)',
    primaryHazards: ['FLASH_FLOOD', 'DEBRIS_FLOW', 'LANDSLIDE'],
    historicalEvent: {
      name: 'Chamoli Rock-Ice Avalanche & Flash Flood Disaster',
      date: 'February 7, 2021',
      actualImpact: 'Sudden collapse of ~27 million m³ rock and hanging glacier from Ronti peak caused catastrophic flash flood obliterating Rishiganga Hydel (13.2 MW) and Tapovan Vishnugad project, trapping >200 workers in tunnels and sweeping away Raini bridge.',
      preventedCasualtiesWithAI: '480 workers and Raini village residents evacuated to Joshimath terraces in the 52-minute window between slope failure detection and Tapovan inundation.',
      earlyWarningLeadTimeGained: '52 Minutes Predictive Lead Time (Sentinel-2 thermal albedo slip + high-frequency seismograph trigger)'
    },
    overviewDescription: 'The upper reaches of Dhauliganga and Rishiganga rivers cut through steep gorges beneath Nanda Devi and Ronti peaks. Glacial retreat and permafrost thawing in 5,000m+ elevations produce high-risk rock-ice avalanches that liquefy upon impact, creating devastating debris flows travelling down narrow valleys at over 40 km/h.',
    geomorphicRiskFactor: 'Extreme hydraulic gradient from 5,600m to 1,500m over 22km; thermal thawing of hanging glaciers on steep amphitheatre walls.',
    sensorStations: [
      {
        id: 'CWC-JOSHIMATH-01',
        name: 'Joshimath / Tapovan CWC Hydrological Station',
        type: 'RADAR_STAGE',
        provider: 'Central Water Commission (CWC, India)',
        coordinates: [30.4912, 79.6280],
        elevation: 1780,
        currentValue: '18.2 m (Flash Surge Wave: +7.4m in 6 min)',
        unit: 'meters',
        status: 'CRITICAL',
        description: 'Automated ultrasonic water stage sensor with wireless transmission to Dehradun & National Disaster Management Authority (NDMA).'
      },
      {
        id: 'WIHG-SEISMO-RONTI',
        name: 'Ronti Ridge Acoustic & Seismic Infrasound Array',
        type: 'ACOUSTIC_FLOW',
        provider: 'Wadia Institute of Himalayan Geology (WIHG)',
        coordinates: [30.4420, 79.7420],
        elevation: 4600,
        currentValue: 'High Amplitude Infrasound (>4.2 Hz detected)',
        unit: 'Hz / m/s²',
        status: 'CRITICAL',
        description: 'High-altitude broadband sensor detecting massive rock-mass fractures and high-velocity debris momentum before valley entry.'
      },
      {
        id: 'BHUVAN-SAR-CHAMOLI',
        name: 'ISRO Bhuvan / Sentinel-1 Interferometric Monitor',
        type: 'SATELLITE_PASS',
        provider: 'ISRO NRSC & Copernicus',
        coordinates: [30.4780, 79.7050],
        elevation: 2800,
        currentValue: 'Deformation Rate: 142 mm/month',
        unit: 'mm',
        status: 'CRITICAL',
        description: 'Persistent Scatterer Interferometry (PSI) identifying slope instability on northern facet of Ronti amphitheatre.'
      }
    ],
    habitations: [
      {
        id: 'HAB-TAPOVAN-WORKERS',
        name: 'Tapovan Vishnugad Hydel Project Barrage & Tunnels',
        coordinates: [30.4950, 79.6240],
        elevationMeters: 1760,
        proximityToRiverKm: 0.03,
        totalPopulation: 260,
        demographics: {
          elderly: 8,
          children: 12,
          pregnantWomen: 2,
          personsWithDisabilities: 4,
          general: 234
        },
        hazardRiskScore: 99,
        assignedShelterId: 'SHELTER-JOSHIMATH-ARMY',
        assignedRouteId: 'ROUTE-TAPOVAN-JOSHIMATH',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['Emergency tunnel siren strobe', 'Rapid rope-haul extraction winches']
      },
      {
        id: 'HAB-RAINI-VILLAGE',
        name: 'Raini Village Lower Terrace & Bridge Settlement',
        coordinates: [30.4850, 79.7020],
        elevationMeters: 1950,
        proximityToRiverKm: 0.06,
        totalPopulation: 220,
        demographics: {
          elderly: 44,
          children: 52,
          pregnantWomen: 9,
          personsWithDisabilities: 12,
          general: 103
        },
        hazardRiskScore: 94,
        assignedShelterId: 'SHELTER-SUBHAI-RIDGE',
        assignedRouteId: 'ROUTE-RAINI-SUBHAI',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['Mountain stretcher teams', 'Portable emergency lights']
      }
    ],
    relocationShelters: [
      {
        id: 'SHELTER-JOSHIMATH-ARMY',
        name: 'Joshimath Upper Cantonment & Transit Camp',
        type: 'STADIUM_CAMP',
        coordinates: [30.5560, 79.5680],
        elevationMeters: 2180,
        totalCapacity: 1200,
        currentOccupied: 180,
        allocatedFromSystem: 260,
        distanceKm: 6.2,
        safetyScore: 99,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 28,
          drinkingWaterLiters: 40000,
          emergencyPowerBackup: true,
          helipadAccessible: true,
          stockedFoodDays: 14
        },
        contactOfficer: 'Lt. Col. R. Sharma (Indian Army Joshimath Garrison Base)'
      },
      {
        id: 'SHELTER-SUBHAI-RIDGE',
        name: 'Subhai High Ridge Government Inter College',
        type: 'SCHOOL',
        coordinates: [30.5020, 79.6820],
        elevationMeters: 2340,
        totalCapacity: 550,
        currentOccupied: 40,
        allocatedFromSystem: 220,
        distanceKm: 2.8,
        safetyScore: 97,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 12,
          drinkingWaterLiters: 15000,
          emergencyPowerBackup: true,
          helipadAccessible: false,
          stockedFoodDays: 8
        },
        contactOfficer: 'Sub-Divisional Magistrate (SDM) Joshimath Control Room'
      }
    ],
    evacuationRoutes: [
      {
        id: 'ROUTE-TAPOVAN-JOSHIMATH',
        name: 'NH-58 Joshimath Arterial High Highway Ramp',
        fromHabitationId: 'HAB-TAPOVAN-WORKERS',
        toShelterId: 'SHELTER-JOSHIMATH-ARMY',
        pathCoordinates: [
          [30.4950, 79.6240],
          [30.5180, 79.5980],
          [30.5420, 79.5780],
          [30.5560, 79.5680]
        ],
        distanceKm: 6.2,
        estimatedTransitMinutes: 28,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Rises rapidly out of river gorge; tunnel exits immediately connect to uphill service road.',
        elevationGainMeters: 420
      },
      {
        id: 'ROUTE-RAINI-SUBHAI',
        name: 'Raini to Subhai Mountain Stepped Evacuation Trail',
        fromHabitationId: 'HAB-RAINI-VILLAGE',
        toShelterId: 'SHELTER-SUBHAI-RIDGE',
        pathCoordinates: [
          [30.4850, 79.7020],
          [30.4930, 79.6920],
          [30.5020, 79.6820]
        ],
        distanceKm: 2.8,
        estimatedTransitMinutes: 24,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Traverses stable bedrock ridge; avoids the lower bridge abutment completely.',
        elevationGainMeters: 390
      }
    ],
    timeline: [
      {
        stepId: 'step-ch-t24',
        label: 'T - 24 Hours',
        relativeHours: -24,
        summary: 'Cryospheric thermal anomaly detected on Ronti Peak face via Sentinel-2.',
        alertLevel: 'WATCH',
        rainRateMmHr: 0.0,
        accumulatedRainMm: 0,
        soilMoistureSaturationPct: 35,
        riverDischargeM3s: 45,
        riverWaterLevelMeters: 2.1,
        dangerWaterLevelMeters: 5.5,
        sentinel1RadarBackscatterDb: -11.2,
        sentinel2NdwiIndex: -0.28,
        slopeDisplacementMmDay: 18.0,
        predictiveInsight: 'Sub-surface freeze-thaw cycle causing tension cracks in wedge block. InSAR coherence indicates accelerating displacement at 5,400m altitude.',
        actionTakenBySurakshaKavach: 'Warning sent to Tapovan Project Safety Engineers. Standby siren test executed.',
        historicalActionRecorded: 'Unmonitored high-altitude hanging glacier. Normal operations continued.'
      },
      {
        stepId: 'step-ch-t1h',
        label: 'T - 52 Minutes (PREDICTIVE RELOCATION TRIGGER)',
        relativeHours: -0.86,
        summary: 'Massive wedge detached. High-frequency acoustic arrays triggered.',
        alertLevel: 'RED_EVACUATION',
        rainRateMmHr: 0.0,
        accumulatedRainMm: 0,
        soilMoistureSaturationPct: 40,
        riverDischargeM3s: 220,
        riverWaterLevelMeters: 3.8,
        dangerWaterLevelMeters: 5.5,
        sentinel1RadarBackscatterDb: -18.4,
        sentinel2NdwiIndex: 0.35,
        slopeDisplacementMmDay: 3500.0,
        predictiveInsight: 'Avalanche impact in Rishiganga gorge pulverized ice into slurry. Flow velocity measured at 48 km/h. AI calculates wave arrival at Raini in 18 min and Tapovan in 48 min.',
        actionTakenBySurakshaKavach: 'INSTANT AUTOMATIC TUNNEL SIREN BLAST & GATE LOCKS. 260 workers ordered to evacuate to high hill ramp. 220 Raini villagers moved up Subhai trail.',
        historicalActionRecorded: 'Workers inside tunnel heard no alarm until flood water crashed through the mouth without warning.'
      },
      {
        stepId: 'step-ch-t0',
        label: 'T - 0 (Flood Wave Strikes Tapovan)',
        relativeHours: 0,
        summary: '40ft wall of black water, boulders, and pulverized ice slams into barrage.',
        alertLevel: 'RED_EVACUATION',
        rainRateMmHr: 0.0,
        accumulatedRainMm: 0,
        soilMoistureSaturationPct: 100,
        riverDischargeM3s: 2800,
        riverWaterLevelMeters: 18.2,
        dangerWaterLevelMeters: 5.5,
        sentinel1RadarBackscatterDb: -24.2,
        sentinel2NdwiIndex: 0.88,
        slopeDisplacementMmDay: 0.0,
        predictiveInsight: 'Rishiganga hydel obliterated; Tapovan barrage inundated under 12m silt. All workers and villagers safely positioned on Joshimath & Subhai high ridges.',
        actionTakenBySurakshaKavach: '480 LIVES SAVED. Zero trapped workers. Medical triage established at Joshimath Army Base.',
        historicalActionRecorded: 'In reality: 204 deaths / missing, 35+ workers perished inside the head-race tunnel.'
      }
    ],
    dataSources: [
      {
        id: 'SRC-CH-S1',
        name: 'Copernicus Sentinel-1 InSAR',
        agency: 'ESA / ISRO Ground Station Shadnagar',
        type: 'SAR',
        resolution: '10m Spatial Resolution',
        updateFrequency: 'Every 6 days',
        primaryIndicators: ['Phase interferometry', 'Ground displacement fringe pattern'],
        roleInSurakshaKavach: 'Detects millimeter-scale creep on hanging rock-ice faces before catastrophic failure.',
        dataLatency: '<2.5 hours',
        reliabilityWeight: 0.95,
        officialPortalUrl: 'https://dataspace.copernicus.eu'
      },
      {
        id: 'SRC-CH-CWC',
        name: 'Central Water Commission Telemetry',
        agency: 'Ministry of Jal Shakti, India',
        type: 'GROUND_TELEMETRY',
        resolution: 'Real-time stage sensors at 5-minute sampling',
        updateFrequency: '5-minute burst transmission',
        primaryIndicators: ['Water elevation', 'Rate of rise (dh/dt > 0.5 m/min alarm)'],
        roleInSurakshaKavach: 'Triggers instant siren dispatch when upstream surge velocity exceeds threshold.',
        dataLatency: '<3 minutes',
        reliabilityWeight: 0.99,
        officialPortalUrl: 'https://cwc.gov.in'
      }
    ],
    redZonePolygon: [
      [30.4980, 79.6260],
      [30.4920, 79.6380],
      [30.4860, 79.6740],
      [30.4820, 79.7080],
      [30.4760, 79.7140],
      [30.4820, 79.6980],
      [30.4880, 79.6640],
      [30.4940, 79.6220],
      [30.4980, 79.6260]
    ],
    floodBufferPolygon: [
      [30.5020, 79.6220],
      [30.4950, 79.6420],
      [30.4890, 79.6800],
      [30.4850, 79.7150],
      [30.4720, 79.7180],
      [30.4790, 79.6940],
      [30.4850, 79.6580],
      [30.4910, 79.6180],
      [30.5020, 79.6220]
    ]
  },
  {
    id: 'wayanad-chooralmala',
    name: 'Chooralmala - Mundakkai (Meppadi)',
    subRegion: 'Wayanad District, Kerala',
    country: 'INDIA',
    centerCoordinates: [11.5360, 76.1520],
    zoomLevel: 13,
    riverBasin: 'Iruvanjippuzha / Chaliyar River Sub-Basin (Western Ghats)',
    primaryHazards: ['DEBRIS_FLOW', 'LANDSLIDE', 'FLASH_FLOOD'],
    historicalEvent: {
      name: 'Wayanad Massive Landslide & Slope Liquefaction',
      date: 'July 30, 2024 (02:00 AM)',
      actualImpact: 'Extreme 572mm rainfall over 48 hours caused catastrophic slope collapse at Punchirimattam (1,500m). Massive debris flow swept away Mundakkai, Chooralmala school, and the concrete bridge, killing over 400 people while they slept.',
      preventedCasualtiesWithAI: '1,250 plantation workers and families relocated to Meppadi relief centers 18 hours prior during daylight, achieving 100% life preservation.',
      earlyWarningLeadTimeGained: '18 Hours Predictive Lead Time (Continuous 48-hr IMD QPE >300mm + Sentinel-1 Soil Moisture >96% trigger)'
    },
    overviewDescription: 'The tea plantation hills of Mundakkai and Chooralmala in Meppadi panchayat lie along the steep escarpments of the Western Ghats. Under extreme monsoon conditions with rainfall exceeding 200mm in 24 hours, weathered lateritic soil over Precambrian crystalline rock undergoes liquefaction, forming debris flows traveling over 6km down the river valley.',
    geomorphicRiskFactor: 'High Topographic Wetness Index (TWI), lateritic overburden on impermeable bedrock, tea monoculture with shallow rooting depth on 35-50° slopes.',
    sensorStations: [
      {
        id: 'IMD-WAYANAD-RADAR',
        name: 'Kochi / Wayanad Doppler Weather Radar & AWS',
        type: 'RAIN_GAUGE',
        provider: 'India Meteorological Department (IMD)',
        coordinates: [11.5540, 76.1280],
        elevation: 780,
        currentValue: '572 mm (48-hr cumulative) / 38 mm/hr peak',
        unit: 'mm',
        status: 'CRITICAL',
        description: 'Dual-polarization radar estimating rain rate, cloud top height, and continuous quantitative precipitation.'
      },
      {
        id: 'GSI-SOIL-MOIST-03',
        name: 'Vellarimala Slope Inclinometer & Soil Saturation Probe',
        type: 'GROUND_INCLINOMETER',
        provider: 'Geological Survey of India (GSI) / NCESS',
        coordinates: [11.5180, 76.1620],
        elevation: 1420,
        currentValue: 'Soil Saturation: 98.4% (Threshold: 85%)',
        unit: '%',
        status: 'CRITICAL',
        description: 'Deep piezometers and tilt sensors measuring pore-water pressure and shear plane deformation.'
      },
      {
        id: 'CWC-CHALIYAR-STAGE',
        name: 'Chaliyar River Basin Telemetry Station',
        type: 'RADAR_STAGE',
        provider: 'Central Water Commission (CWC)',
        coordinates: [11.5290, 76.1410],
        elevation: 690,
        currentValue: 'Discharge: 640 m³/s (Extreme Warning)',
        unit: 'm³/s',
        status: 'CRITICAL',
        description: 'River discharge monitor logging sudden sediment-choked damming and release waves.'
      }
    ],
    habitations: [
      {
        id: 'HAB-MUNDAKKAI',
        name: 'Mundakkai Village & Estate Quarters',
        coordinates: [11.5280, 76.1650],
        elevationMeters: 890,
        proximityToRiverKm: 0.04,
        totalPopulation: 580,
        demographics: {
          elderly: 82,
          children: 118,
          pregnantWomen: 19,
          personsWithDisabilities: 24,
          general: 337
        },
        hazardRiskScore: 99,
        assignedShelterId: 'SHELTER-MEPPADI-COMMUNITY',
        assignedRouteId: 'ROUTE-MUNDAKKAI-MEPPADI',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['KSRTC Emergency Shuttle Buses', 'Medical van for elderly plantation workers']
      },
      {
        id: 'HAB-CHOORALMALA',
        name: 'Chooralmala Town, Market & School Settlement',
        coordinates: [11.5390, 76.1480],
        elevationMeters: 740,
        proximityToRiverKm: 0.05,
        totalPopulation: 670,
        demographics: {
          elderly: 96,
          children: 135,
          pregnantWomen: 21,
          personsWithDisabilities: 28,
          general: 390
        },
        hazardRiskScore: 96,
        assignedShelterId: 'SHELTER-ST-JOSEPH-MEPPADI',
        assignedRouteId: 'ROUTE-CHOORAL-MEPPADI',
        evacuationStatus: 'SAFELY_EVACUATED',
        specialLogisticsNeeded: ['Accessible ramp transport', 'Infant food & milk supplies']
      }
    ],
    relocationShelters: [
      {
        id: 'SHELTER-MEPPADI-COMMUNITY',
        name: 'Meppadi Town Community Hall & Relief Campus',
        type: 'COMMUNITY_CENTER',
        coordinates: [11.5520, 76.1240],
        elevationMeters: 840,
        totalCapacity: 800,
        currentOccupied: 140,
        allocatedFromSystem: 580,
        distanceKm: 4.8,
        safetyScore: 98,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 22,
          drinkingWaterLiters: 25000,
          emergencyPowerBackup: true,
          helipadAccessible: true,
          stockedFoodDays: 10
        },
        contactOfficer: 'Tahsildar / Vythiri Taluk Relief Coordinator'
      },
      {
        id: 'SHELTER-ST-JOSEPH-MEPPADI',
        name: 'St. Joseph Higher Secondary School & Grounds',
        type: 'SCHOOL',
        coordinates: [11.5580, 76.1190],
        elevationMeters: 860,
        totalCapacity: 1100,
        currentOccupied: 210,
        allocatedFromSystem: 670,
        distanceKm: 5.6,
        safetyScore: 99,
        facilities: {
          medicalStation: true,
          sanitationBlocks: 30,
          drinkingWaterLiters: 32000,
          emergencyPowerBackup: true,
          helipadAccessible: true,
          stockedFoodDays: 12
        },
        contactOfficer: 'Kerala State Disaster Management Authority (KSDMA) Ward Officer'
      }
    ],
    evacuationRoutes: [
      {
        id: 'ROUTE-MUNDAKKAI-MEPPADI',
        name: 'Upper Mundakkai-Attamala Ridge Link Road',
        fromHabitationId: 'HAB-MUNDAKKAI',
        toShelterId: 'SHELTER-MEPPADI-COMMUNITY',
        pathCoordinates: [
          [11.5280, 76.1650],
          [11.5360, 76.1550],
          [11.5450, 76.1380],
          [11.5520, 76.1240]
        ],
        distanceKm: 4.8,
        estimatedTransitMinutes: 32,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Evacuated during daylight before Chooralmala bridge collapsed; route stays on elevated road.',
        elevationGainMeters: 60
      },
      {
        id: 'ROUTE-CHOORAL-MEPPADI',
        name: 'Chooralmala-Meppadi Main Estate Highway',
        fromHabitationId: 'HAB-CHOORALMALA',
        toShelterId: 'SHELTER-ST-JOSEPH-MEPPADI',
        pathCoordinates: [
          [11.5390, 76.1480],
          [11.5480, 76.1320],
          [11.5580, 76.1190]
        ],
        distanceKm: 5.6,
        estimatedTransitMinutes: 28,
        status: 'CLEAR_OPTIMAL',
        hazardIntersectionNote: 'Wide two-lane road flanked by police escort.',
        elevationGainMeters: 120
      }
    ],
    timeline: [
      {
        stepId: 'step-wy-t48',
        label: 'T - 48 Hours (July 28)',
        relativeHours: -48,
        summary: 'Deep offshore monsoon depression intensifies over Arabian Sea. Red alert rain forecast.',
        alertLevel: 'NORMAL',
        rainRateMmHr: 12.0,
        accumulatedRainMm: 94,
        soilMoistureSaturationPct: 72,
        riverDischargeM3s: 110,
        riverWaterLevelMeters: 2.8,
        dangerWaterLevelMeters: 6.2,
        sentinel1RadarBackscatterDb: -14.8,
        sentinel2NdwiIndex: 0.15,
        slopeDisplacementMmDay: 3.2,
        predictiveInsight: 'Antecedent rainfall index begins crossing critical safety curve. Soil moisture saturation jumps to 72%.',
        actionTakenBySurakshaKavach: 'System initiates automated continuous polling of IMD Doppler radar and Kerala AWS network.',
        historicalActionRecorded: 'General heavy rain advisory issued, but no habitation relocation ordered.'
      },
      {
        stepId: 'step-wy-t18',
        label: 'T - 18 Hours (PREDICTIVE RELOCATION WINDOW - July 29, 08:00 AM)',
        relativeHours: -18,
        summary: 'CRITICAL RELOCATION TRIGGER: 380mm rainfall logged in 24h. Soil moisture reaches 96%.',
        alertLevel: 'RED_EVACUATION',
        rainRateMmHr: 44.0,
        accumulatedRainMm: 384,
        soilMoistureSaturationPct: 96,
        riverDischargeM3s: 420,
        riverWaterLevelMeters: 5.4,
        dangerWaterLevelMeters: 6.2,
        sentinel1RadarBackscatterDb: -21.8,
        sentinel2NdwiIndex: 0.62,
        slopeDisplacementMmDay: 48.0,
        predictiveInsight: 'GSI slope stability threshold breached: shear strength reduced by 85%. Catastrophic slope liquefaction predicted within 18-24 hours. Suraksha Kavach designates Mundakkai & Chooralmala as RED EVACUATION ZONES.',
        actionTakenBySurakshaKavach: 'DAYTIME MANDATORY EVACUATION DISPATCHED: 1,250 residents transported via KSRTC buses to Meppadi Community Hall & St. Joseph School while daylight was available.',
        historicalActionRecorded: 'No mandatory evacuation. Inhabitants remained in homes overnight as rainfall intensified.'
      },
      {
        stepId: 'step-wy-t0',
        label: 'T - 0 (July 30, 02:00 AM - Slope Collapse)',
        relativeHours: 0,
        summary: 'Massive landslide at Punchirimattam triggers supersonic debris avalanche obliterating Mundakkai.',
        alertLevel: 'RED_EVACUATION',
        rainRateMmHr: 35.0,
        accumulatedRainMm: 572,
        soilMoistureSaturationPct: 100,
        riverDischargeM3s: 980,
        riverWaterLevelMeters: 11.4,
        dangerWaterLevelMeters: 6.2,
        sentinel1RadarBackscatterDb: -24.6,
        sentinel2NdwiIndex: 0.86,
        slopeDisplacementMmDay: 450.0,
        predictiveInsight: 'Chooralmala bridge destroyed, entire river valley choked with mud, boulders and tree trunks up to 8m deep. However, every resident was already safe at Meppadi 5km away.',
        actionTakenBySurakshaKavach: '1,250 LIVES PROTECTED. Zero fatalities among evacuated populations. All shelters supplied with food, blankets, and medical staff.',
        historicalActionRecorded: 'In reality: Over 400 lives tragically lost, bodies swept 25km downriver, families trapped under rubble in darkness.'
      }
    ],
    dataSources: [
      {
        id: 'SRC-WY-IMD',
        name: 'IMD Doppler Radar & Kerala State AWS',
        agency: 'India Meteorological Department (IMD) / KSDMA',
        type: 'GROUND_TELEMETRY',
        resolution: '15-minute precipitation grid',
        updateFrequency: '15 minutes continuous telemetry',
        primaryIndicators: ['48-hr cumulative rainfall', 'Instantaneous rain intensity (mm/hr)'],
        roleInSurakshaKavach: 'Identifies cloudburst thresholds triggering soil liquefaction in Western Ghats terrain.',
        dataLatency: '<10 minutes',
        reliabilityWeight: 0.98,
        officialPortalUrl: 'https://mausam.imd.gov.in'
      },
      {
        id: 'SRC-WY-S1',
        name: 'Copernicus Sentinel-1 SAR',
        agency: 'ESA / Copernicus',
        type: 'SAR',
        resolution: '10m Spatial Resolution',
        updateFrequency: 'Every 6-12 days',
        primaryIndicators: ['Soil moisture dielectric permittivity', 'VV/VH backscatter decay'],
        roleInSurakshaKavach: 'Maps soil moisture saturation percentage across steep tea slopes regardless of thick rain clouds.',
        dataLatency: '<2 hours',
        reliabilityWeight: 0.94,
        officialPortalUrl: 'https://dataspace.copernicus.eu'
      }
    ],
    redZonePolygon: [
      [11.5340, 76.1680],
      [11.5260, 76.1660],
      [11.5320, 76.1520],
      [11.5420, 76.1440],
      [11.5460, 76.1480],
      [11.5380, 76.1580],
      [11.5340, 76.1680]
    ],
    floodBufferPolygon: [
      [11.5380, 76.1720],
      [11.5220, 76.1680],
      [11.5280, 76.1480],
      [11.5450, 76.1380],
      [11.5520, 76.1440],
      [11.5420, 76.1620],
      [11.5380, 76.1720]
    ]
  }
];
