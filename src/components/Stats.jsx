import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Stats = () => {
    

    const { tutorCount } = useContext(AuthContext);

    return (
        <div className="stats shadow">
            <div className="stat place-items-center">
                <div className="stat-title">Tutors</div>
                <div className="stat-value">{ tutorCount }</div>
                <div className="stat-desc">From December to Now</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title">Users</div>
                <div className="stat-value text-secondary">4,200</div>
                <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title">New Registers</div>
                <div className="stat-value">12</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">New Registers</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
        </div>
    );
};

export default Stats;