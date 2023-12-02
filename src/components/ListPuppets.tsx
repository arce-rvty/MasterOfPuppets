import { Puppet } from "../interfaces/puppet";
import { millisToMinutesAndSeconds } from "../utils";

export const ListPuppets = (props: { list: Puppet[], selectPuppet?: (puppet: string) => void, speaker: string }) => {
  return (
    <>
      {props.list.map((item: Puppet) => (
        <div
          onClick={() =>
            props.selectPuppet ? props.selectPuppet?.(item.name) : console.log('¯\\_(ツ)_/¯')
          }
          className="puppet-list"
          style={{ color: props.speaker != item.name ? "#ff7b46" : "#D32F2F" }}
          key={item.name}>
          {item.name} {
            !item.elapsedTime ?
              <></> :
              millisToMinutesAndSeconds(item.elapsedTime + (item.interruptTime ?? 0))
          }
        </div>
      ))}
    </>
  );
};
