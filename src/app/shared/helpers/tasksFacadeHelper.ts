import {Task} from "../../base/main/interfaces/task";

export class TaskHelper {
    static getValue(obj: any, path: string) {
        const keys = path.split('.');
        let result = obj;

        for (let key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return null;
            }
        }
        return result;
    }

    static sortTasks(tasks: Task[], sort: any): Task[] {
        if (sort.active && sort.direction) {
            return tasks.slice(0).sort((a, b) => {
                const valueA = TaskHelper.getValue(a, sort.active);
                const valueB = TaskHelper.getValue(b, sort.active);

                const valueAString = String(valueA).toLowerCase();
                const valueBString = String(valueB).toLowerCase();

                if (valueAString < valueBString) {
                    return sort.direction === 'asc' ? -1 : 1;
                } else if (valueAString > valueBString) {
                    return sort.direction === 'asc' ? 1 : -1;
                } else {
                    return 0;
                }
            });
        }

        return tasks;
    }
}
