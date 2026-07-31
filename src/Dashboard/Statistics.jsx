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
import { Line } from 'react-chartjs-2';
import useAppStore from '../store/useAppStore';

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
    const { stats, appliedUser } = useAppStore();
    const totalTutor = stats?.tutorLen || 0;
    const languageCount = stats?.languages?.length || 0;
    const pendingApplications = (appliedUser || []).filter((application) => !['approved', 'rejected'].includes(application?.status)).length;

    const data = {
        labels: ['Tutors', 'Languages', 'Applications'],
        datasets: [
            {
                label: 'Platform snapshot',
                data: [Math.max(totalTutor, 1), Math.max(languageCount, 1), Math.max(pendingApplications, 1)],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                tension: 0.35,
                fill: true,
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
                text: 'Platform growth snapshot',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <p className="text-sm text-base-content/70">Active tutors</p>
                    <p className="mt-3 text-3xl font-semibold">{totalTutor}</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <p className="text-sm text-base-content/70">Languages covered</p>
                    <p className="mt-3 text-3xl font-semibold">{languageCount}</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <p className="text-sm text-base-content/70">Pending applications</p>
                    <p className="mt-3 text-3xl font-semibold">{pendingApplications}</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Statistics;