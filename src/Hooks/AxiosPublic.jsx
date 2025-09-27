import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const url = `http://localhost:2100`;

const AxiosPublic = (path) => {
    const { data = [], refetch } = useQuery({
        queryKey: ['fetchURL'],
        queryFn: async () => {
            const fetchURL = await axios.get(`${url}${path})`).then(res => res.data || {}).catch(error => error);
            return fetchURL;
        }
    })
    return { data, refetch };
};

export default AxiosPublic;