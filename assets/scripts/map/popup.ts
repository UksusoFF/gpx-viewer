import WayPoint from '../gpx/types/way_point';
import TemplateBuilder from '../template';
import EditPopup from '../edit_popup';

class MapPopup {

    public popup: HTMLElement;

    constructor(
        private point: WayPoint
    ) {
        this.popup = (new TemplateBuilder(
            'map-popup-template',
            {
                point: point,
            }
        )).element();

        for (const button of this.popup.querySelectorAll('[data-action="edit"]')) {
            button.addEventListener('click', () => {
                (new EditPopup(this.point)).show();
            });
        }
    }
}

export default MapPopup;