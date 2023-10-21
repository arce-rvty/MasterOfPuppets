import { useEffect, useState } from "react";
import { Puppet } from "../interfaces/puppet";
import { millisToMinutesAndSeconds } from "../utils";

const TimerController = (props: {
    puppet: undefined | Puppet
}) => {
    const [time, setTime] = useState<Date>(new Date());
    const { puppet } = props;

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer)
        };
    }, [])

    const calculateTime = () => {
        if (puppet === undefined || puppet.startTime === undefined) {
            return "";
        }
        else {
            const diff = Math.abs(time.getTime() - puppet.startTime.getTime());
            return millisToMinutesAndSeconds(diff);
        }
    };

    return (
        <div className="time-talking">
            {calculateTime()}
        </div>
    );
}

export default TimerController;
