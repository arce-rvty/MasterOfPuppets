import { GlobalGameStatus, Puppet } from "./../interfaces/puppet";

const MainImage = (props:
    {
        gameStatus: GlobalGameStatus,
        currentPuppet: Puppet | undefined,
        podium: boolean
    }) => {

    const { currentPuppet, podium, gameStatus } = props;
    return (<div>
        {gameStatus === GlobalGameStatus.Playing ? (
            <img
                src={currentPuppet == undefined ? "images/doll.png" : currentPuppet.img}
                className="logo react" />
        ) : (
            <img
                src={podium ? "images/banana.gif" : "images/loser.png"}
                className="logo react" />
        )}
    </div>);
}
export default MainImage;