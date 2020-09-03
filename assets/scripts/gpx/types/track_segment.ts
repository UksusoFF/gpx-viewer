import WayPoint from './way_point';

export default class TrackSegment {
  private trkpt?: WayPoint[];

  private extensions: any;

  constructor(object: any) {
      if (object.trkpt) {
          if (!Array.isArray(object.trkpt)) {
              object.trkpt = [
                  object.trkpt,
              ];
          }
          this.trkpt = object.trkpt.map((pt: any) => {
              return new WayPoint(pt);
          });
      }
      this.extensions = object.extensions;
  }
}
