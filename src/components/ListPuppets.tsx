import { Puppet } from "../interfaces/puppet";
import { millisToMinutesAndSeconds } from "../utils";

export const ListPuppets = (props: { list: Puppet[]; }) => {
  return (
    <>
      {props.list.map((item: Puppet) => (
        <div
          className="puppet-list"
          style={{ color: "#ff7b46" }}
          key={item.name}>
          {item.name} { !item.elapsedTime ? <></> : millisToMinutesAndSeconds(item.elapsedTime ?? 0)}</div>
      ))}
    </>
  );
};
