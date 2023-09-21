import { Puppet } from "../interfaces/puppet";
import { millisToMinutesAndSeconds } from "../utils";

export const ListPuppets = (props: { list: Puppet[], selectPuppet?: (puppet: string) => void }) => {
  return (
    <>
      {props.list.map((item: Puppet) => (
        <div
          onClick={() =>
            props.selectPuppet ? props.selectPuppet?.(item.name) : console.log('¯\\_(ツ)_/¯')
          }
          className="puppet-list"
          style={{ color: "#ff7b46" }}
          key={item.name}>
          {item.name} {!item.elapsedTime ? <></> : millisToMinutesAndSeconds(item.elapsedTime ?? 0)}</div >
      ))}
    </>
  );
};
