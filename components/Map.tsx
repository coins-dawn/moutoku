"use client"

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import L, { LatLngExpression, LatLngLiteral, LatLngTuple } from 'leaflet';
import { useState, useRef } from "react";
import polyline from "@mapbox/polyline";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { SearchCar } from "@/types/searchCar";

interface MapProps {
  searchCar: SearchCar | null,
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

type ClickableMapProps = {
  markers: LatLngLiteral[];
  setMarkers: React.Dispatch<React.SetStateAction<LatLngLiteral[]>>;
};

const defaults = {
  zoom: 14,
}

const MapClickHandler: React.FC<ClickableMapProps> = ({ markers, setMarkers }) => {
  useMapEvents({
    click(e) {

      // dragendイベントからのclickイベントの発火は無視
      const target = e.originalEvent.target as HTMLElement;
      if (target.className.includes("leaflet-marker-pane")) {
        return null;
      }

      const newMarker = e.latlng
      const isDuplicate = markers.some(
        (marker) => marker.lat == newMarker.lat && marker.lng == newMarker.lng
      );

      if (!isDuplicate) {
        setMarkers([...markers, e.latlng]);
      }
    },
  });

  return null;
};

export const MakerMap = (Map: MapProps) => {
  const { searchCar, zoom = defaults.zoom, posix } = Map;
  const [markers, setMarkers] = useState<LatLngLiteral[]>([]);
  const markerRefs = useRef<(L.Marker | null)[]>([]); // マーカーの参照を配列で管理
  console.log(searchCar)

  const removeMaker = (lat: number, lng: number, index: number) => {

    // ポップアップが開いている場合は閉じる
    const markerRef = markerRefs.current[index];
    if (markerRef && markerRef.getPopup()?.isOpen()) {
      markerRef.closePopup();
    }

    // マーカーを削除
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.lat !== lat || marker.lng !== lng)
    );

    // マーカー参照を削除
    markerRefs.current.splice(index, 1);
  };

  const updateMarker = (event: L.DragEndEvent, index: number) => {

    const marker = event.target;
    const newPosition = marker.getLatLng();
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker, i) =>
        i === index ? { lat: newPosition.lat, lng: newPosition.lng } : marker
      )
    );
  };

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler markers={markers} setMarkers={setMarkers} />
      {markers.map((position, index) => (
        <Marker
          key={index}
          position={position}
          draggable={true}
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
              <p>緯度: {position.lat}</p>
              <p>経度: {position.lng}</p>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  removeMaker(position.lat, position.lng, index);
                }}
              >
                このマーカーを削除
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export const RouteMap = (Map: MapProps) => {
  const { searchCar, zoom = defaults.zoom, posix } = Map;

  // マーカーの初期値を設定
  const [markers] = useState<LatLngLiteral[]>(
    searchCar?.result.route.stops.map((stop) => ({
      lat: stop.stop.coord.lat,
      lng: stop.stop.coord.lon,
    })) || []
  );

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {searchCar?.result.route.sections.map((section, index) => {
        const decodedPath = polyline.decode(section.shape).map(([lat, lng]) => ({
          lat,
          lng,
        }));

        return (
          <Polyline
            key={index}
            positions={decodedPath}
            color="blue"
            weight={4}
          />
        );
      })}

      {markers.map((position, index) => (
        <Marker
          key={index}
          position={position}
          draggable={false}
        >
          <Popup>
            <div>
              <p>緯度: {position.lat}</p>
              <p>経度: {position.lng}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};