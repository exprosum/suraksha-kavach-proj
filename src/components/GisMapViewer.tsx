import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { CriticalRegion, VulnerableHabitation, RelocationSite, SensorStation, EvacuationRoute } from '../types';
import { 
  Layers, 
  MapPin, 
  Home, 
  Radio, 
  Route, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Info, 
  X,
  Maximize2,
  Activity,
  Compass,
  Zap,
  Users,
  LocateFixed,
  HelpCircle,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface GisMapViewerProps {
  region: CriticalRegion;
  currentStepIndex: number;
  alertLevel: string;
  onOpenDataAudit?: () => void;
}

export const GisMapViewer: React.FC<GisMapViewerProps> = ({
  region,
  currentStepIndex,
  alertLevel,
  onOpenDataAudit,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Layer groups refs
  const redZoneGroupRef = useRef<L.LayerGroup | null>(null);
  const floodBufferGroupRef = useRef<L.LayerGroup | null>(null);
  const routesGroupRef = useRef<L.LayerGroup | null>(null);
  const habitationsGroupRef = useRef<L.LayerGroup | null>(null);
  const sheltersGroupRef = useRef<L.LayerGroup | null>(null);
  const sensorsGroupRef = useRef<L.LayerGroup | null>(null);

  // Layer toggles
  const [showRedZones, setShowRedZones] = useState(true);
  const [showFloodBuffer, setShowFloodBuffer] = useState(true);
  const [showSensors, setShowSensors] = useState(true);
  const [showHabitations, setShowHabitations] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'terrain' | 'radar'>('satellite');

  // Selected item modal/card
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'habitation' | 'shelter' | 'sensor' | 'route' | 'hazard';
    data: any;
  } | null>(null);

  const isRedAlert = alertLevel === 'RED_EVACUATION';

  // Tile layer URLs
  const getTileUrl = (style: 'satellite' | 'terrain' | 'radar') => {
    switch (style) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'radar':
      default:
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
  };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: region.centerCoordinates,
        zoom: region.zoomLevel,
        zoomControl: false,
        attributionControl: false,
        maxZoom: 18,
        minZoom: 9,
      });

      const initialTile = L.tileLayer(getTileUrl(mapStyle), {
        maxZoom: 18,
        subdomains: mapStyle === 'terrain' ? ['a', 'b', 'c'] : ['a', 'b', 'c', 'd'],
      }).addTo(map);

      tileLayerRef.current = initialTile;

      // Create layer groups
      redZoneGroupRef.current = L.layerGroup().addTo(map);
      floodBufferGroupRef.current = L.layerGroup().addTo(map);
      routesGroupRef.current = L.layerGroup().addTo(map);
      sensorsGroupRef.current = L.layerGroup().addTo(map);
      habitationsGroupRef.current = L.layerGroup().addTo(map);
      sheltersGroupRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;

      // Auto invalidate size on load
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Handle Map Style (Tile layer) change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newTile = L.tileLayer(getTileUrl(mapStyle), {
      maxZoom: 18,
      subdomains: mapStyle === 'terrain' ? ['a', 'b', 'c'] : ['a', 'b', 'c', 'd'],
    }).addTo(map);

    tileLayerRef.current = newTile;
  }, [mapStyle]);

  // 3. Update Layers when region, step, or toggles change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear all previous overlays
    redZoneGroupRef.current?.clearLayers();
    floodBufferGroupRef.current?.clearLayers();
    routesGroupRef.current?.clearLayers();
    sensorsGroupRef.current?.clearLayers();
    habitationsGroupRef.current?.clearLayers();
    sheltersGroupRef.current?.clearLayers();

    // A. Flood Buffer Polygon
    if (showFloodBuffer && floodBufferGroupRef.current && region.floodBufferPolygon.length > 0) {
      const floodPoly = L.polygon(region.floodBufferPolygon, {
        color: '#06b6d4',
        weight: 2,
        opacity: 0.8,
        dashArray: '5, 5',
        fillColor: '#0891b2',
        fillOpacity: 0.22,
      });
      floodPoly.bindTooltip('Projected 100-Year Flood Inundation Buffer Envelope', {
        sticky: true,
        className: 'custom-gis-tooltip',
      });
      floodPoly.addTo(floodBufferGroupRef.current);
    }

    // B. Critical Red Zone Polygon
    if (showRedZones && redZoneGroupRef.current && region.redZonePolygon.length > 0) {
      const redPoly = L.polygon(region.redZonePolygon, {
        color: '#ef4444',
        weight: isRedAlert ? 3.5 : 2.5,
        opacity: 0.95,
        dashArray: isRedAlert ? '6, 4' : '4, 4',
        fillColor: '#dc2626',
        fillOpacity: isRedAlert ? 0.42 : 0.28,
      });

      redPoly.on('click', () => {
        setSelectedEntity({
          type: 'hazard',
          data: {
            name: `${region.name} Catastrophic Red Zone`,
            basin: region.riverBasin,
            hazardFactor: region.geomorphicRiskFactor,
            inundationArea: 'High velocity hydrodynamic corridor',
            alertLevel: alertLevel,
          },
        });
      });

      redPoly.bindTooltip('CRITICAL HAZARD RED ZONE (Strict Inhabitation Ban)', {
        sticky: true,
        className: 'custom-gis-tooltip-danger',
      });

      redPoly.addTo(redZoneGroupRef.current);
    }

    // C. Evacuation Routes & Blocked Paths
    if (showRoutes && routesGroupRef.current) {
      region.evacuationRoutes.forEach((route) => {
        const isBlocked = route.status === 'FLOODED_INACCESSIBLE' || route.status === 'HIGH_RISK_LANDSLIDE';
        const polyline = L.polyline(route.pathCoordinates, {
          color: isBlocked ? '#ef4444' : '#10b981',
          weight: isBlocked ? 4 : 4.5,
          opacity: 0.9,
          dashArray: isBlocked ? '4, 6' : '8, 6',
        });

        polyline.on('click', () => {
          setSelectedEntity({ type: 'route', data: route });
        });

        polyline.bindTooltip(
          `${isBlocked ? '🚫 BARRED (FLOODED):' : '✅ SAFE CORRIDOR:'} ${route.name} (${route.estimatedTransitMinutes} min)`,
          { sticky: true, className: isBlocked ? 'custom-gis-tooltip-danger' : 'custom-gis-tooltip-safe' }
        );

        polyline.addTo(routesGroupRef.current!);
      });
    }

    // D. Sensor Stations
    if (showSensors && sensorsGroupRef.current) {
      region.sensorStations.forEach((sensor) => {
        const isCrit = sensor.status === 'CRITICAL' || sensor.status === 'WARNING';
        
        const sensorIcon = L.divIcon({
          className: 'gis-div-icon',
          html: `
            <div class="cursor-pointer group flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2">
              <div class="flex items-center gap-1 px-2 py-0.5 rounded-full shadow-lg border backdrop-blur-md ${
                isCrit
                  ? 'bg-slate-900/95 text-cyan-300 border-cyan-400 shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700'
              } text-[10px] font-semibold whitespace-nowrap transition-transform group-hover:scale-110">
                <span class="relative flex h-2 w-2">
                  ${isCrit ? '<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>' : ''}
                  <span class="relative inline-flex rounded-full h-2 w-2 ${isCrit ? 'bg-cyan-400' : 'bg-slate-400'}"></span>
                </span>
                <span>${sensor.name.split(' ')[0]}</span>
                <span class="text-cyan-200 font-mono text-[9px] font-bold">(${sensor.currentValue.split(' ')[0]})</span>
              </div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker(sensor.coordinates, { icon: sensorIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'sensor', data: sensor });
        });
        marker.addTo(sensorsGroupRef.current!);
      });
    }

    // E. Vulnerable Habitations
    if (showHabitations && habitationsGroupRef.current) {
      region.habitations.forEach((hab) => {
        const isEvacuated = hab.evacuationStatus === 'SAFELY_EVACUATED';

        const habIcon = L.divIcon({
          className: 'gis-div-icon',
          html: `
            <div class="cursor-pointer group flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-xl border backdrop-blur-md ${
                isEvacuated
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-emerald-900/40'
                  : 'bg-red-950/95 text-white border-red-500 animate-pulse shadow-red-900/50'
              } text-[11px] font-bold whitespace-nowrap transition-transform group-hover:scale-110">
                <span class="w-2.5 h-2.5 rounded-full ${isEvacuated ? 'bg-emerald-400' : 'bg-red-500'}"></span>
                <span>${hab.name}</span>
                <span class="px-1.5 py-0.2 rounded bg-black/40 text-[9px] font-mono text-slate-200">Pop: ${hab.totalPopulation}</span>
              </div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker(hab.coordinates, { icon: habIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'habitation', data: hab });
        });
        marker.addTo(habitationsGroupRef.current!);
      });
    }

    // F. Safe Relocation Shelters
    if (showShelters && sheltersGroupRef.current) {
      region.relocationShelters.forEach((shelter) => {
        const totalAlloc = shelter.currentOccupied + shelter.allocatedFromSystem;
        const capPct = Math.round((totalAlloc / shelter.totalCapacity) * 100);

        const shelterIcon = L.divIcon({
          className: 'gis-div-icon',
          html: `
            <div class="cursor-pointer group flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl shadow-xl border backdrop-blur-md bg-slate-900/95 text-emerald-300 border-emerald-500/80 text-[11px] font-bold whitespace-nowrap transition-transform group-hover:scale-110">
                <span class="text-xs">⛺</span>
                <span>${shelter.name.split(' ')[0]}</span>
                <span class="px-1.5 py-0.2 rounded ${capPct > 90 ? 'bg-orange-500/30 text-orange-300' : 'bg-emerald-500/20 text-emerald-300'} text-[10px] font-mono">
                  ${capPct}% Cap
                </span>
              </div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker(shelter.coordinates, { icon: shelterIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'shelter', data: shelter });
        });
        marker.addTo(sheltersGroupRef.current!);
      });
    }
  }, [
    region,
    currentStepIndex,
    alertLevel,
    showRedZones,
    showFloodBuffer,
    showSensors,
    showHabitations,
    showShelters,
    showRoutes,
  ]);

  // 4. Center map when region changes or on Recenter click
  const handleRecenterValley = () => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Collect all primary coordinates in the valley (habitations + shelters + redZone)
    const points: [number, number][] = [
      ...region.habitations.map((h) => h.coordinates),
      ...region.relocationShelters.map((s) => s.coordinates),
      ...region.redZonePolygon,
    ];

    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])));
      map.flyToBounds(bounds, {
        padding: [50, 50],
        maxZoom: 14,
        duration: 1.2,
      });
    } else {
      map.flyTo(region.centerCoordinates, region.zoomLevel, { duration: 1.2 });
    }
  };

  useEffect(() => {
    handleRecenterValley();
  }, [region.id]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      
      {/* Top Map Control Bar */}
      <div className="bg-slate-900/95 backdrop-blur px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        
        {/* Left: Status & Region Info */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRedAlert ? 'bg-red-400' : 'bg-orange-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRedAlert ? 'bg-red-500' : 'bg-amber-500'}`}></span>
          </span>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span>GIS Dynamic Red Zone &amp; Evacuation Map</span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50 hidden sm:inline-block">
                OpenGIS Real Tiles
              </span>
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden md:inline-block">
            [{region.centerCoordinates[0].toFixed(4)}°N, {region.centerCoordinates[1].toFixed(4)}°E]
          </span>
        </div>

        {/* Right: Map Style & Layer Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Map Style Selector */}
          <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
            <button
              id="map-style-sat"
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mapStyle === 'satellite' ? 'bg-slate-700 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Satellite (Esri)
            </button>
            <button
              id="map-style-terrain"
              onClick={() => setMapStyle('terrain')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mapStyle === 'terrain' ? 'bg-slate-700 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              DEM Topo (OpenTopo)
            </button>
            <button
              id="map-style-radar"
              onClick={() => setMapStyle('radar')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mapStyle === 'radar' ? 'bg-slate-700 text-cyan-400 shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tactical SAR (Dark)
            </button>
          </div>

          {/* Layer Toggles */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setShowRedZones(!showRedZones)}
              className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showRedZones ? 'bg-red-950/80 border-red-700 text-red-300' : 'bg-slate-800/80 border-slate-700 text-slate-500'
              }`}
              title="Toggle Red Hazard Zone Polygon"
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Red Zone
            </button>
            <button
              onClick={() => setShowShelters(!showShelters)}
              className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showShelters ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' : 'bg-slate-800/80 border-slate-700 text-slate-500'
              }`}
              title="Toggle Safe Shelters"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Shelters
            </button>
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showRoutes ? 'bg-cyan-950/80 border-cyan-700 text-cyan-300' : 'bg-slate-800/80 border-slate-700 text-slate-500'
              }`}
              title="Toggle Safe Routes & Barred Roads"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Routes
            </button>
            <button
              onClick={() => setShowSensors(!showSensors)}
              className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showSensors ? 'bg-indigo-950/80 border-indigo-700 text-indigo-300' : 'bg-slate-800/80 border-slate-700 text-slate-500'
              }`}
              title="Toggle Telemetry Sensors"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Sensors
            </button>
          </div>

          {/* Quick Data Provenance / Trust Button */}
          {onOpenDataAudit && (
            <button
              onClick={onOpenDataAudit}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              title="View Data Provenance, Authenticity & Scientific Grounding"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Data Trust</span>
            </button>
          )}

        </div>
      </div>

      {/* Interactive Map Viewport */}
      <div className="relative w-full h-[520px] sm:h-[620px] bg-slate-950 overflow-hidden">
        
        {/* Leaflet Map DOM Container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating In-Map Quick Navigation Controls */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          
          {/* Zoom Buttons */}
          <div className="flex flex-col rounded-xl bg-slate-900/90 backdrop-blur border border-slate-700 overflow-hidden shadow-xl">
            <button
              onClick={handleZoomIn}
              className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="h-px bg-slate-800" />
            <button
              onClick={handleZoomOut}
              className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Recenter on Valley */}
          <button
            onClick={handleRecenterValley}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/95 backdrop-blur border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 shadow-xl transition-colors cursor-pointer"
            title="Recenter and auto-fit to Valley Habitations & Red Zone"
          >
            <LocateFixed className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Recenter Valley</span>
          </button>
        </div>

        {/* Tactical Legend Floating Card (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-xs text-slate-300 max-w-xs shadow-2xl hidden md:block">
          <div className="font-bold text-white mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-orange-400" />
              <span>GIS Legend &amp; Risk Overlays</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">EPSG:3857</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-red-500/50 border border-red-500"></span>
              <span>Red Hazard Zone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-500/40 border border-blue-400 border-dashed"></span>
              <span>Flood Buffer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 bg-emerald-400 border-t border-dashed border-emerald-300"></span>
              <span>Safe Escape Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 bg-red-500 border-t border-dashed border-red-400"></span>
              <span>Barred Flooded Road</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900"></span>
              <span>Capacity Shelter</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>Telemetry Station</span>
            </div>
          </div>
        </div>

        {/* Selected Entity Tactical Card (Top Right) */}
        {selectedEntity && (
          <div className="absolute top-4 right-4 max-w-sm w-full bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-4 text-xs text-slate-200 z-20 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start justify-between gap-2 mb-2.5 pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {selectedEntity.type === 'habitation' && <Users className="w-4 h-4 text-orange-400" />}
                {selectedEntity.type === 'shelter' && <Home className="w-4 h-4 text-emerald-400" />}
                {selectedEntity.type === 'sensor' && <Radio className="w-4 h-4 text-cyan-400" />}
                {selectedEntity.type === 'route' && <Route className="w-4 h-4 text-emerald-400" />}
                {selectedEntity.type === 'hazard' && <AlertTriangle className="w-4 h-4 text-red-400" />}

                <div>
                  <h4 className="font-bold text-white text-sm">
                    {selectedEntity.data.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {selectedEntity.type.replace('_', ' ')} Inspector
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEntity(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content tailored to entity type */}
            {selectedEntity.type === 'habitation' && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Total Population:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {selectedEntity.data.totalPopulation}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">
                    Vulnerability Demographic Triage:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400">Elderly (60+): </span>
                      <span className="font-bold text-amber-400">{selectedEntity.data.demographics.elderly}</span>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400">Children (&lt;10): </span>
                      <span className="font-bold text-cyan-400">{selectedEntity.data.demographics.children}</span>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400">Pregnant: </span>
                      <span className="font-bold text-pink-400">{selectedEntity.data.demographics.pregnantWomen}</span>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400">PwD / Bedridden: </span>
                      <span className="font-bold text-purple-400">{selectedEntity.data.demographics.personsWithDisabilities}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-orange-950/40 border border-orange-800/40">
                  <div className="text-[11px] font-semibold text-orange-300">Special Logistics Needed:</div>
                  <ul className="list-disc list-inside text-[10px] text-slate-300 mt-1 space-y-0.5">
                    {selectedEntity.data.specialLogisticsNeeded.map((log: string, i: number) => (
                      <li key={i}>{log}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedEntity.type === 'shelter' && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Capacity</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {selectedEntity.data.totalCapacity} beds
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Allocated by System</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {selectedEntity.data.allocatedFromSystem} beds
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Carrying Capacity Usage:</span>
                    <span className="font-bold text-white">
                      {Math.round(
                        ((selectedEntity.data.currentOccupied + selectedEntity.data.allocatedFromSystem) /
                          selectedEntity.data.totalCapacity) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            ((selectedEntity.data.currentOccupied + selectedEntity.data.allocatedFromSystem) /
                              selectedEntity.data.totalCapacity) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-300 font-semibold">Facilities Verified:</div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
                    <div>Medical Station: {selectedEntity.data.facilities.medicalStation ? '✅ Yes' : '❌ No'}</div>
                    <div>Helipad Access: {selectedEntity.data.facilities.helipadAccessible ? '✅ Yes' : '❌ No'}</div>
                    <div>Water Buffer: {selectedEntity.data.facilities.drinkingWaterLiters.toLocaleString()} L</div>
                    <div>Food Stocks: {selectedEntity.data.facilities.stockedFoodDays} Days</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400">
                  <strong className="text-slate-300">Contact Officer:</strong> {selectedEntity.data.contactOfficer}
                </div>
              </div>
            )}

            {selectedEntity.type === 'sensor' && (
              <div className="space-y-2.5">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Instantaneous Telemetry Reading:</div>
                  <div className="text-cyan-400 font-mono font-bold text-base mt-0.5">
                    {selectedEntity.data.currentValue}
                  </div>
                </div>

                <div className="text-slate-300 text-[11px] leading-relaxed">
                  {selectedEntity.data.description}
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2">
                  <span>Provider: {selectedEntity.data.provider}</span>
                  <span>Elev: {selectedEntity.data.elevation}m</span>
                </div>
              </div>
            )}

            {selectedEntity.type === 'route' && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Distance</span>
                    <span className="font-bold text-white">{selectedEntity.data.distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimated Transit</span>
                    <span className="font-bold text-emerald-400">{selectedEntity.data.estimatedTransitMinutes} min</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Elevation Offset</span>
                    <span className="font-bold text-cyan-400">+{selectedEntity.data.elevationGainMeters}m</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                  <span className="text-slate-400 font-semibold block">Safety Assessment:</span>
                  <span className="text-slate-300">{selectedEntity.data.hazardIntersectionNote}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === 'hazard' && (
              <div className="space-y-2.5">
                <div className="p-2 rounded-lg bg-red-950/60 border border-red-700/60 text-red-200">
                  <div className="font-bold text-xs uppercase tracking-wider">Demarcated High Velocity Inundation Corridor</div>
                  <p className="text-[11px] mt-1 text-red-300">
                    Direct path of debris flow, GLOF flash surges, and moraine failure. No human settlement or vehicular movement permitted during warning states.
                  </p>
                </div>
                <div className="text-[11px] text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Geomorphic Risk Factor:</strong> {selectedEntity.data.hazardFactor}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
