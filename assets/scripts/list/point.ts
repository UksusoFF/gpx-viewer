import EditPopup from '../edit_popup';
import TemplateBuilder from '../template';
import WayPoint from '../gpx/types/way_point';
import Icon from '../icon';
import {
    bus, pointTargeted,
} from '../events';

export class ListPoint {

    public element: HTMLElement;

    constructor(
        private point: WayPoint,
    ) {
        this.element = (new TemplateBuilder(
            'list-point-template',
            {
                point: this.point,
                icon: Icon.getIcon(this.point.extensions?.icon ?? null),
            }
        )).element;

        for (const button of this.element.querySelectorAll('[data-action="edit"]')) {
            button.addEventListener('click', () => {
                (new EditPopup(this.point)).show();
            });
        }

        for (const button of this.element.querySelectorAll('[data-action="target"]')) {
            button.addEventListener('click', () => {
                bus.publish(pointTargeted({
                    point: this.point,
                }));
            });
        }
    }
}

export default ListPoint;