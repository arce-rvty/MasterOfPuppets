import { PuppetOrder } from "./../interfaces/order";
import { Puppet } from "./../interfaces/puppet";

export abstract class OrderService {
    public static getNextPersonIndex(people: Puppet[], order: PuppetOrder): number {
        switch (order) {
            case PuppetOrder.Random:
                return Math.floor(Math.random() * people.length);

            case PuppetOrder.File: {
                const copyPeople: Puppet[] = [...people]
                copyPeople.sort((a, b) => {
                    const orderGroupA = a.orderGroup || 0;
                    const orderGroupB = b.orderGroup || 0;
                    return orderGroupB > orderGroupA ? -1 : 1;
                });

                const index = people.findIndex(person => person.name == copyPeople[0].name)
                return index != -1 ? index : 0;
            }
            default: console.log('¯\\_(ツ)_/¯')
        }
        return -1;
    }
}
