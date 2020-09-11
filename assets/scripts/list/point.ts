import EditPopup from "../edit_popup";
import TemplateBuilder from '../template';
import WayPoint from '../gpx/types/way_point';
import Icon from "../icon";

export class ListPoint {

    public item: HTMLElement;

    constructor(
        private point: WayPoint,
        private pointUpdated: () => void = () => {},
        private pointTargeted: (point: WayPoint) => void = () => {},
    ) {
        this.item = (new TemplateBuilder(
            'list-point-template',
            {
                point: this.point,
                icon: Icon.getIcon(this.point.extensions?.icon ?? null),
            }
        )).element();

        for (const button of this.item.querySelectorAll('[data-action="edit"]')) {
            button.addEventListener('click', () => {
                (new EditPopup(this.point, this.pointUpdated)).show();
            });
        }

        for (const button of this.item.querySelectorAll('[data-action="target"]')) {
            button.addEventListener('click', () => {
                this.pointTargeted(this.point);
            });
        }
    }
}

export default ListPoint;