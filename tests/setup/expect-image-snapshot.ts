import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({
  toMatchImageSnapshot: configureToMatchImageSnapshot({
    customSnapshotsDir: '__image_snapshots__',
  }),
});
