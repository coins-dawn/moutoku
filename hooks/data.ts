import initialStops from '@/data/initialStops.json';

export const useGetInitialStops = () => {
    const stops = initialStops.stops.map((stop) => ({
        ...stop,
        coord: {
            lat: stop.coord.lat,
            lng: stop.coord.lon,
        },
    }));
    return { stops: stops }
}
