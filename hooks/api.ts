import { useState, useEffect } from 'react';
import mockSearchCar from '@/data/mockSearchCar.json'
import { SearchCar } from '@/types/searchCar'

export const useSearchCar = () => {
    const [response, setResponse] = useState<SearchCar | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                // 実際のAPI呼び出しの代わりにモックデータを使用
                const data = mockSearchCar;
                setResponse(data);
            } catch (err) {
                setError('Failed to load routes');
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);

    return { response, loading, error };
};