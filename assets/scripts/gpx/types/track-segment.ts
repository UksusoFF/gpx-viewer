import Waypoint from './waypoint';

export default class TrackSegment {
  private trkpt?: Waypoint[];
  private extensions: any;
  constructor(object: any) {
    if (object.trkpt) {
      if (!Array.isArray(object.trkpt)) {
        object.trkpt = [object.trkpt];
      }
      this.trkpt = object.trkpt.map((pt:any) => new Waypoint(pt));
    }
    this.extensions = object.extensions;
  }
}