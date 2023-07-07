import { useEffect, useState } from "react";
import { Puppet } from "../interfaces/puppet";

const TimerController = (props: {
    puppet: undefined | Puppet
}) => {
    const [time, setTime] = useState<Date>(new Date());
    const { puppet } = props;

    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, [])

    const millisToMinutesAndSeconds = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (+seconds < 10 ? '0' : '') + seconds;
    }

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
