import * as $ from 'jquery';
import 'bootstrap';

import Icon from './icon';
import TemplateBuilder from './template';
import WayPoint from './gpx/types/way_point';
import {
    bus, pointUpdated,
} from './events';

class PointEditDialog {

    public $modal: JQuery;

    constructor(
        private point: WayPoint,
    ) {
        this.$modal = $((new TemplateBuilder(
            'edit-popup-template',
            {
                point: point,
                icons: Object.entries(Icon.getAll()).map(([
                    value,
                    icon,
                ]) => {
                    return {
                        value: value,
                        icon: icon,
                    };
                }),
            }
        )).string);

        this.fill();
        this.bind();
    }

    private bind(): void {
        this.$modal.on('hidden.bs.modal', () => {
            this.$modal.remove();
        });

        this.$modal.on('submit', (e: JQuery.SubmitEvent) => {
            e.preventDefault();

            this.save();

            this.$modal.modal('hide');
        });
    }

    private fill(): void {
        this.$modal.find('[name=edit-popup-name]').val(this.point.name);
        this.$modal.find('[name=edit-popup-type]').val(this.point.type);

        let icon = this.point.extensions?.icon ?? null;

        if (icon !== null) {
            this.$modal.find(`[name="edit-popup-icon"][value="${ icon }"`).attr('checked', 'checked');
        } else {
            this.$modal.find('[name="edit-popup-icon"]').first().attr('checked', 'checked');
        }
    }

    private save(): void {
        this.point.name = String(this.$modal.find('[name=edit-popup-name]').val());
        this.point.type = String(this.$modal.find('[name=edit-popup-type]').val());

        if (typeof this.point.extensions === 'undefined') {
            this.point.extensions = {};
        }

        this.point.extensions.icon = String(this.$modal.find('[name="edit-popup-icon"]:checked').val());

        bus.publish(pointUpdated({
            point: this.point,
        }));
    }

    public show(): void {
        this.$modal.modal('show');
    }
}

export default PointEditDialog;