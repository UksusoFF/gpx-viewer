import EditPopup from './edit_popup';
import Icon from './icon';
import WayPoint from './gpx/types/way_point';

class ListController {

    private wrapper: HTMLElement;

    private groups: Record<string, HTMLElement> = {};

    constructor(
        private container: HTMLElement,
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

    public itemAdd(item: WayPoint): void {
        let group = this.groupGet(typeof item.type !== 'undefined' ? item.type : 'Unsorted');
        let icon = Icon.getIcon(item.extensions?.icon ?? null);

        let node = document.createElement('p');
        node.innerHTML = `* <i class="mdi mdi-${ icon }"></i> ${ item.name }`;
        node.onclick = (): void => {
            (new EditPopup(item)).show();
        };

        group.append(node);
    }
}

export default ListController;
