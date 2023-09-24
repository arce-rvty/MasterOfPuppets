import { Button, FormControlLabel, Switch } from "@mui/material";
import { GameStatus, Puppet } from "./../interfaces/puppet";
import { PuppetOrder } from "./../interfaces/order";
import { FileFormat, FileFormatPuppet } from "interfaces/fileFormat";


const WaitingLoadFile = (props: {
    setPeople: (puppets: Puppet[]) => void,
    setOrderCriterial: (order: PuppetOrder) => void
}
) => {
    const { setPeople, setOrderCriterial } = props;
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setOrderCriterial(e.target.checked ? PuppetOrder.File : PuppetOrder.Random)

    const parseUserInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const peopleList: Puppet[] = [];
            const dataRaw: FileFormat = JSON.parse(e.target?.result as string);
            dataRaw.puppets.forEach((p: FileFormatPuppet) => {
                peopleList.push({
                    name: p.name,
                    status: GameStatus.Waiting,
                    img: "images/" + p.image,
                    orderGroup: p.order,
                    interruptTime: 0
                });
            });
            setPeople(peopleList);
        };
        if (e.target.files)
            reader.readAsText(e.target.files[0]);
    };

    return <>
        <div className="main-puppet">Scrum Master Game</div>
        <Button
            variant="contained"
            component="label"
            size="large"
            color="error"
        >
            Upload File
            <input
                type="file"
                hidden
                accept=".json"
                onChange={(e) => parseUserInputFile(e)}
            />
        </Button>
        <div style={{ marginTop: '30px' }}>
            <FormControlLabel
                control={<Switch color="error" onClick={(e: any) => handleToggle(e)} />}
                label="Order set by file"
                labelPlacement="end"
            />
        </div>
    </>;
}
export default WaitingLoadFile;