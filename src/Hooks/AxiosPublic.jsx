import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const url = `https://online-tutor-server-web.vercel.app`;

const AxiosPublic = (path) => {
    const { data = [], refetch } = useQuery({
        queryKey: ['fetchURL'],
        queryFn: async () => {
            const fetchURL = await axios.get(url + path).then(res => res.data).catch(error => error) || {};
            return fetchURL;
        }
    })
    return { data, refetch };
};

export default AxiosPublic;