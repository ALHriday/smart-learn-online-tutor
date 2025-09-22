import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../AuthProvider/AuthProvider';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
);

const Statistics = () => {

    const { tutorsData } = useContext(AuthContext);
    const totalTutor = tutorsData?.length

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Tutors',
                data: [totalTutor / 5, totalTutor / 4, totalTutor / 3, totalTutor / 2, totalTutor],
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Tutors',
            },
        },
    };

    return (
        <div>
            <div className='overflow-hidden'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Statistics;