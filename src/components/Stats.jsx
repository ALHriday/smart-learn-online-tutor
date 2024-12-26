import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Stats = () => {

    const { tutorCount, langCount, heartCount } = useContext(AuthContext);

    return (
        <div className="stats shadow">
            <div className="stat place-items-center">
                <div className="stat-title">Tutors</div>
                <div className="stat-value">{tutorCount}+</div>
                <div className="stat-desc">From December to Now</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Reviews</div>
                <div className="stat-value">{ heartCount }</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Languages</div>
                <div className="stat-value">{langCount}+</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>          
            <div className="stat place-items-center">
                <div className="stat-title">Users</div>
                <div className="stat-value text-secondary">200+</div>
                <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
        </div>
    );
};

export default Stats;