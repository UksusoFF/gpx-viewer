import GPX from '../gpx/types/gpx';
import WayPoint from '../gpx/types/way_point';
import ListPoint from './point';
import {
    bus, pointCreated, pointUpdated,
} from '../events';
import {
    BusEvent,
} from 'ts-bus/types';

class ListController {

    private wrapper: HTMLElement;

    private groups: Record<string, HTMLElement> = {};

    constructor(
        private container: HTMLElement,
        private storage: GPX
    ) {
        this.wrapper = document.createElement('div');

        this.container.append(this.wrapper);

        this.subscribe();
    }

    private subscribe(): void {
        bus.subscribe(pointUpdated, (e: BusEvent) => {
            this.refresh();
        });

        bus.subscribe(pointCreated, (e: BusEvent) => {
            this.refresh();
        });
    }

    private groupGet(name: string): HTMLElement {
        if (typeof this.groups[name] !== 'undefined') {
            return this.groups[name];
        } else {
            let group = document.createElement('div');
            group.innerHTML = `<p class="group-title">${ name }</p>`;

            this.groups[name] = group;
            this.wrapper.append(group);

            return group;
        }
    }

    public refresh(): void {
        this.groups = {};

        this.wrapper.remove();

        this.wrapper = document.createElement('div');

        this.container.append(this.wrapper);

        this.storage.wpt.forEach((point: WayPoint): void => {
            if (!point.isDeleted) {
                this.itemAdd(point);
            }
        });
    }

    public itemAdd(item: WayPoint): void {
        let group = this.groupGet(typeof item.type !== 'undefined' ? item.type : 'Unsorted');

        group.append((new ListPoint(item).element));
    }
}

export default ListController;
