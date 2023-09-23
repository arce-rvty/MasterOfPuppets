import { Button, FormControlLabel, Switch } from "@mui/material";
import { GameStatus, Puppet } from "./../interfaces/puppet";
import { PuppetOrder } from "./../interfaces/order";


const WaitingLoadFile = (props: {
    setPeople: (puppets: Puppet[]) => void,
    setOrderCriterial: (order: PuppetOrder) => void
}
) => {
    const { setPeople, setOrderCriterial } = props;
    const handleToggle = (e: any) =>
        setOrderCriterial(e.target.checked ? PuppetOrder.File : PuppetOrder.Random)

    const parseUserInputFile = async (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const peopleList: Puppet[] = [];
            const dataRaw: any = JSON.parse(e.target?.result as string);
            dataRaw.puppets.forEach((p: any) => {
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
                control={<Switch color="error" onClick={(e) => handleToggle(e)} />}
                label="Order set by file"
                labelPlacement="end"
            />
        </div>
    </>;
}
export default WaitingLoadFile;