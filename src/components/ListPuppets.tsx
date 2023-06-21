import { Puppet } from "../interfaces/puppet";

export const ListPuppets = (props: { list: Puppet[]; }) => {
  const rainbow = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#ee82ee"]
  return (
    <>
      {props.list.map((item: Puppet, index) => (
        <div
          className="puppet-list"
          style={{ color: "#ff7b46" }}
          key={item.name}>
          {item.name}</div>
      ))}
    </>
  );
};
