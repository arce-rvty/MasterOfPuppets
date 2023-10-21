import { Button } from "@mui/material";

const NextPuppetButton = (props: {
    setNextPuppet: () => void
}
) => {
    const { setNextPuppet } = props;
    return <>
        <div className="card">
            <Button
                size="large"
                variant="contained"
                color="error"
                onClick={() => setNextPuppet()}
            >
                NEXT PUPPET
            </Button>
        </div>
        <div className="read-the-docs">
            <div>Scrum Master's proverb:</div>
            Tyranny and slavery is the only way
        </div>
    </>;
}
export default NextPuppetButton;