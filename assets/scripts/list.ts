import * as $ from 'jquery';
import 'bootstrap';
import WayPoint from './gpx/types/way_point';
import {
    Icon,
} from './icon';

interface ListItem {
    lat: number;
    lon: number;

    name: string;
    type: string;
    icon: string;
}

class ItemPopup {

    constructor(
        private item: WayPoint,
    ) {
        //
    }

    public show(): void {
        let $modal = $(`
<form class="modal fade" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${ this.item.name }</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label for="list-item-modal-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="list-item-modal-name" value="${ this.item.name }" required>
          </div>
          <div class="form-group">
            <label class="col-form-label">Icon:</label>
            
            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-home" value="special_house">
              <label class="form-check-label" for="list-item-modal-icon-home">
                <i class="mdi mdi-home"></i>
              </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-star-outline" value="special_star_stroked">
              <label class="form-check-label" for="list-item-modal-icon-star-outline">
                <i class="mdi mdi-star-outline"></i>
              </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-parking" value="parking">
              <label class="form-check-label" for="list-item-modal-icon-parking">
                <i class="mdi mdi-parking"></i>
              </label>
            </div>
            
            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-pine-tree" value="park">
              <label class="form-check-label" for="list-item-modal-icon-pine-tree">
                <i class="mdi mdi-pine-tree"></i>
              </label>
            </div>
            
            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-silverware" value="restaurants">
              <label class="form-check-label" for="list-item-modal-icon-silverware">
                <i class="mdi mdi-silverware"></i>
              </label>
            </div>
            
            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-asterisk" value="tourism_viewpoint">
              <label class="form-check-label" for="list-item-modal-icon-asterisk">
                <i class="mdi mdi-asterisk"></i>
              </label>
            </div>
            
            <div class="form-check">
              <input class="form-check-input" type="radio" name="list-item-modal-icon" id="list-item-modal-icon-camera" value="special_photo_camera">
              <label class="form-check-label" for="list-item-modal-icon-camera">
                <i class="mdi mdi-camera"></i>
              </label>
            </div>
            
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</input>
      </div>
    </div>
  </div>
</form>
`);
        $modal.on('submit', (e: JQuery.SubmitEvent) => {
            e.preventDefault();

            let $form = $(e.currentTarget);

            this.item.name = String($form.find('#list-item-modal-name').val());

            $modal.modal('hide');
        });

        $modal.modal({
            show: true,
        });
    }
}

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
        let icon = Icon.getIcon(item.extensions.icon);

        let node = document.createElement('p');
        node.innerHTML = `* <i class="mdi mdi-${ icon }"></i> ${ item.name }`;
        node.onclick = (): void => {
            (new ItemPopup(item)).show();
        };

        group.append(node);
    }
}

export {
    ListController,
    ListItem,
};
