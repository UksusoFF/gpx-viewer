import * as $ from "jquery";
import 'bootstrap';

import TemplateBuilder from "./template";
import WayPoint from "./gpx/types/way_point";
import Icon from "./icon";

class EditPopup {

    public $modal: JQuery;

    constructor(
        private point: WayPoint,
    ) {
        this.$modal = $((new TemplateBuilder(
            'edit-popup-template',
            {
                point: point,
                icons: Object.entries(Icon.getAll()).map(([value, icon]) => ({value, icon})),
            }
        )).string());

        this.fill();

        this.$modal.on('hidden.bs.modal', () => {
            this.$modal.remove();
        })

        this.$modal.on('submit', (e: JQuery.SubmitEvent) => {
            e.preventDefault();

            this.save();

            this.$modal.modal('hide');
        });
    }

    private fill(): void {
        this.$modal.find('[name=edit-popup-name]').val(this.point.name);
        this.$modal.find(`[name="edit-popup-icon"][value="${this.point.extensions.icon}"`).attr("checked", "checked");
    }

    private save(): void {
        this.point.name = String(this.$modal.find('[name=edit-popup-name]').val());
    }

    public show(): void {
        this.$modal.modal('show');
    }
}

export default EditPopup;