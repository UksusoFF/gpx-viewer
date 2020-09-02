import * as $ from "jquery";
import "bootstrap";
import WayPoint from "./gpx/types/way_point";

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
        <h5 class="modal-title">${this.item.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label for="list-item-modal-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="list-item-modal-name" value="${this.item.name}" required>
          </div>
          <div class="form-group">
            <label for="list-item-modal-icon" class="col-form-label">Example select</label>
            <select class="form-control" id="list-item-modal-icon" required>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
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
            group.innerHTML = `<p class="group-title">${name}</p>`

            this.groups[name] = group;
            this.wrapper.append(group);

            return group;
        }
    }

    public itemAdd(item: WayPoint): void {
        let group = this.groupGet(typeof item.type !== 'undefined' ? item.type : 'Unsorted');

        let node = document.createElement('p');
        node.innerText = `* ${item.name}`;
        node.onclick = (): void => {
            (new ItemPopup(item)).show();
        }

        group.append(node);
    }
}

export { ListController, ListItem };
