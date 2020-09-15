import WayPoint from './gpx/types/way_point';

import { EventBus, createEventDefinition } from 'ts-bus';

export const bus = new EventBus();

export const pointCreated = createEventDefinition<{
    point: WayPoint;
}>()('event.point.created');

export const pointUpdated = createEventDefinition<{
    point: WayPoint;
}>()('event.point.updated');

export const pointTargeted = createEventDefinition<{
    point: WayPoint;
}>()('event.point.targeted');