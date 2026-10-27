export type AlertLevel = 'NORMAL' | 'WATCH' | 'ORANGE_WARNING' | 'RED_EVACUATION';

export type HazardType = 'GLOF' | 'FLASH_FLOOD' | 'LANDSLIDE' | 'DEBRIS_FLOW' | 'RIVERINE_FLOOD';

export interface SensorStation {
  id: string;
  name: string;
  type: 'RAIN_GAUGE' | 'RADAR_STAGE' | 'SATELLITE_PASS' | 'GROUND_INCLINOMETER' | 'ACOUSTIC_FLOW';
  provider: string;
  coordinates: [number, number]; // [lat, lng]
  elevation: number;
  currentValue: string;
  unit: string;
  status: 'ACTIVE' | 'WARNING' | 'CRITICAL';
  description: string;
}

export interface VulnerableHabitation {
  id: string;
  name: string;
  coordinates: [number, number];
  elevationMeters: number;
  proximityToRiverKm: number;
  totalPopulation: number;
  demographics: {
    elderly: number; // 60+ yrs
    children: number; // <10 yrs
    pregnantWomen: number;
    personsWithDisabilities: number;
    general: number;
  };
  hazardRiskScore: number; // 0-100
  assignedShelterId: string;
  assignedRouteId: string;
  evacuationStatus: 'NOT_STARTED' | 'EN_ROUTE' | 'SAFELY_EVACUATED';
  specialLogisticsNeeded: string[];
}

export interface RelocationSite {
  id: string;
  name: string;
  type: 'SCHOOL' | 'COMMUNITY_CENTER' | 'TEMPLE_MONASTERY' | 'STADIUM_CAMP';
  coordinates: [number, number];
  elevationMeters: number;
  totalCapacity: number;
  currentOccupied: number;
  allocatedFromSystem: number;
  distanceKm: number;
  safetyScore: number; // 0-100
  facilities: {
    medicalStation: boolean;
    sanitationBlocks: number;
    drinkingWaterLiters: number;
    emergencyPowerBackup: boolean;
    helipadAccessible: boolean;
    stockedFoodDays: number;
  };
  contactOfficer: string;
}

export interface EvacuationRoute {
  id: string;
  name: string;
  fromHabitationId: string;
  toShelterId: string;
  pathCoordinates: [number, number][];
  distanceKm: number;
  estimatedTransitMinutes: number;
  status: 'CLEAR_OPTIMAL' | 'CONGESTED' | 'HIGH_RISK_LANDSLIDE' | 'FLOODED_INACCESSIBLE';
  hazardIntersectionNote: string;
  elevationGainMeters: number;
}

export interface TimelineStep {
  stepId: string;
  label: string; // e.g., 'T - 48 Hours', 'T - 24 Hours', 'T - 6 Hours', 'T - 2 Hours', 'T - 0 (Disaster Event)'
  relativeHours: number; // -48, -24, -6, -2, 0
  summary: string;
  alertLevel: AlertLevel;
  rainRateMmHr: number;
  accumulatedRainMm: number;
  soilMoistureSaturationPct: number;
  riverDischargeM3s: number;
  riverWaterLevelMeters: number;
  dangerWaterLevelMeters: number;
  sentinel1RadarBackscatterDb: number; // e.g. -14 dB (dry) -> -22 dB (water surface reflection)
  sentinel2NdwiIndex: number; // -0.2 (normal) -> +0.75 (expanded water)
  slopeDisplacementMmDay: number;
  predictiveInsight: string;
  actionTakenBySurakshaKavach: string;
  historicalActionRecorded: string; // What actually happened in reality without this system
}

export interface SatelliteDataSource {
  id: string;
  name: string;
  agency: string;
  type: 'SAR' | 'OPTICAL' | 'DEM' | 'GROUND_TELEMETRY' | 'CENSUS_GIS';
  resolution: string;
  updateFrequency: string;
  primaryIndicators: string[];
  roleInSurakshaKavach: string;
  dataLatency: string;
  reliabilityWeight: number;
  officialPortalUrl: string;
}

export interface CriticalRegion {
  id: string;
  name: string;
  subRegion: string;
  country: 'NEPAL' | 'INDIA';
  centerCoordinates: [number, number];
  zoomLevel: number;
  riverBasin: string;
  primaryHazards: HazardType[];
  historicalEvent: {
    name: string;
    date: string;
    actualImpact: string;
    preventedCasualtiesWithAI: string;
    earlyWarningLeadTimeGained: string;
  };
  overviewDescription: string;
  geomorphicRiskFactor: string;
  sensorStations: SensorStation[];
  habitations: VulnerableHabitation[];
  relocationShelters: RelocationSite[];
  evacuationRoutes: EvacuationRoute[];
  timeline: TimelineStep[];
  dataSources: SatelliteDataSource[];
  redZonePolygon: [number, number][]; // Polygon coordinates
  floodBufferPolygon: [number, number][];
}
