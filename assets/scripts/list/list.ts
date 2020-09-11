import EditPopup from '../edit_popup';
import GPX from "../gpx/types/gpx";
import Icon from '../icon';
import TemplateBuilder from "../template";
import WayPoint from '../gpx/types/way_point';
import ListPoint from "./point";

class ListController {

    private wrapper: HTMLElement;

    private groups: Record<string, HTMLElement> = {};

    public itemUpdated: () => void = () => {};

    public itemTargeted: (point: WayPoint) => void = () => {};

    constructor(
        private container: HTMLElement,
        private storage: GPX
    ) {
        this.wrapper = document.createElement('div');

        this.container.append(this.wrapper);
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
            this.itemAdd(point);
        });
    }

    public itemAdd(item: WayPoint): void {
        let group = this.groupGet(typeof item.type !== 'undefined' ? item.type : 'Unsorted');

        group.append((new ListPoint(
            item,
            this.itemUpdated,
            this.itemTargeted,
        ).item));
    }
}

export default ListController;
