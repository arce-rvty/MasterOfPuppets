import { Puppet } from "../interfaces/puppet";

export const ListPuppets = (props: { list: Puppet[]; }) => {
  return (
    <>
      {props.list.map((item: Puppet) => (
        <h4 key={item.name}> {item.name}</h4>
      ))}
    </>
  );
};
