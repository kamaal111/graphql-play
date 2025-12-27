import {Step, type ExecutionDetails} from 'grafast';

class AddStep extends Step<number> {
    constructor($a: Step<number>, $b: Step<number>) {
        super();
        this.addDependency($a);
        this.addDependency($b);
    }

    override execute(details: ExecutionDetails<[number, number]>) {
        return details.indexMap(i => {
            const [aDep, bDep] = details.values;

            return aDep.at(i) + bDep.at(i);
        });
    }
}

export function add($a: Step<number>, $b: Step<number>) {
    return new AddStep($a, $b);
}
