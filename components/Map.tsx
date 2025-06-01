'use client'

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, ZoomControl } from "react-leaflet";
import L, { LatLngExpression } from 'leaflet';
import { useRef } from "react";
import polyline from "@mapbox/polyline";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useSetStops, useStops } from "@/context/StopsContext";
import { usePathname } from "next/navigation";
import { useSearchCar } from "@/context/SearchCarContext";

const posix: LatLngExpression = [36.663746, 137.21158200000002]
const zoom = 14
const minZoom = 10

const MapClickHandler = () => {
  const stops = useStops();
  const setStops = useSetStops();
  useMapEvents({
    click(e) {

      // dragendイベントからのclickイベントの発火は無視
      const target = e.originalEvent.target as HTMLElement;
      if (target.className.includes("leaflet-marker-pane")) {
        return null;
      }

      const newMarker = e.latlng
      const isDuplicate = stops.some(
        (stop) => stop.coord.lat == newMarker.lat && stop.coord.lng == newMarker.lng
      );

      if (!isDuplicate) {
        setStops([...stops, { name: "", coord: { lat: newMarker.lat, lng: newMarker.lng } }]);
      }
    },
  });

  return null;
};

export const CustomMap = () => {
  const path = usePathname();

  const showMarker = ["/", "/route"].includes(path)
  const showPreview = ["/"].includes(path)
  const showRoute = ["/route"].includes(path)
  const editable = ["/"].includes(path)

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      minZoom={minZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl
        position="topright"
      />
      {showMarker && <MarkerMap editable={editable} />}
      {showPreview && <PreviewMap />}
      {showRoute && <RouteMap />}
    </MapContainer>
  )
}

export const MarkerMap = ({
  editable
}: {
  editable: boolean
}) => {
  const stops = useStops();
  const setStops = useSetStops();
  const markerRefs = useRef<(L.Marker | null)[]>([]); // マーカーの参照を配列で管理

  const removeMaker = (lat: number, lng: number, index: number) => {

    // ポップアップが開いている場合は閉じる
    const markerRef = markerRefs.current[index];
    if (markerRef && markerRef.getPopup()?.isOpen()) {
      markerRef.closePopup();
    }

    // マーカーを削除
    setStops((prevStops) =>
      prevStops.filter((stop) => stop.coord.lat !== lat || stop.coord.lng !== lng)
    );

    // マーカー参照を削除
    markerRefs.current.splice(index, 1);
  };

  const updateMarker = (event: L.DragEndEvent, index: number) => {
    const marker = event.target;
    const newPosition = marker.getLatLng();
    setStops((prevStops) =>
      prevStops.map((stop, i) =>
        i === index ? { ...stop, coord: { lat: newPosition.lat, lng: newPosition.lng } } : stop
      )
    );
  };

  return (<>
    {editable && <MapClickHandler />}
    {
      stops.map((stop, index) => (
        <Marker
          key={index}
          position={stop.coord}
          draggable={editable}
          ref={(ref) => {
            // マーカーの参照を保存
            markerRefs.current[index] = ref;
          }}

          eventHandlers={{
            dragend: (event) => updateMarker(event, index),
          }}
        >
          <Popup>
            <div>
              <p>緯度: {stop.coord.lat}</p>
              <p>経度: {stop.coord.lng}</p>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  removeMaker(stop.coord.lat, stop.coord.lng, index);
                }}
              >
                このマーカーを削除
              </button>
            </div>
          </Popup>
        </Marker>
      ))
    }
  </>);
};

export const PreviewMap = () => {
  const stops = useStops();

  // 最初の地点を最後に追加
  const positions = [...stops, stops[0]].map(stop => [stop.coord.lat, stop.coord.lng] as LatLngExpression);

  return (
    <Polyline
      positions={positions}
      color="blue"
      weight={4}
    />
  )
};

export const RouteMap = () => {
  const searchCar = useSearchCar()

  const positions = searchCar.result?.route.sections.map((section) => {
    const decoded = polyline.decode(section.shape);
    return decoded;
  }) ?? [];

  return (
    <Polyline
      positions={positions}
      color="blue"
      weight={4}
    />
  );
}