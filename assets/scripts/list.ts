interface ListItem {
    lat: number;
    lon: number;

    name: string;
    type: string;
    icon: string;
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

    public itemAdd(item: ListItem): void {
        let group = this.groupGet(typeof item.type !== 'undefined' ? item.type: 'Unsorted');

        group.innerHTML += `<p data-lat="${item.lat} data-lon="${item.lon}">* ${item.name}</p>`;
    }
}

export { ListController, ListItem };
