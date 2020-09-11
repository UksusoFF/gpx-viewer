import PointEditDialog from '../point_edit_dialog';
import TemplateBuilder from '../template';
import WayPoint from '../gpx/types/way_point';

class MapPoint {

    public popup: HTMLElement;

    constructor(
        private point: WayPoint,
    ) {
        this.popup = (new TemplateBuilder(
            'map-point-template',
            {
                point: point,
            }
        )).element;

        for (const button of this.popup.querySelectorAll('[data-action="edit"]')) {
            button.addEventListener('click', () => {
                (new PointEditDialog(this.point)).show();
            });
        }
    }
}

export default MapPoint;