"use client"

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngLiteral, LatLngTuple } from 'leaflet';
import { useState, useRef } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

type ClickableMapProps = {
  markers: LatLngLiteral[];
  setMarkers: React.Dispatch<React.SetStateAction<LatLngLiteral[]>>;
};

const defaults = {
  zoom: 19,
}

const MapClickHandler: React.FC<ClickableMapProps> = ({ markers, setMarkers }) => {
  useMapEvents({
    click(e) {
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

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;
  const [markers, setMarkers] = useState<LatLngLiteral[]>([]);
  const markerRefs = useRef<(L.Marker | null)[]>([]); // マーカーの参照を配列で管理

  const removeMaker = (lat: number, lng: number, index: number) => {
    console.log("removeMaker", lat, lng);

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

    // ドラッグイベントの伝播を停止
    // これをしないと、マーカーをドラッグしたときにクリックイベントが発火してしまう
    // なんだけど、ドラッグイベントにはstopPropagation()がないし、originalEventもない
    // どうしようか悩み中
    // event.originalEvent.stopPropagation();
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
            markerRefs.current[index] = ref; // マーカーの参照を保存
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

export default Map;