"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyeGazeData = void 0;
class EyeGazeData {
    // TRACK BOX:
    // 3d coordinates of the track box frustum,
    // given in millimeters from the device center.
    // gaze position x and y
    // the gaze position on the screen. The value is between 0 and 1. The Top Left edge is the origin.
    gazePositionXY = [0, 0];
    // gaze origin
    // x, y and z coordinates as floats of the gaze origin point on the left and right
    // eye of the user, as measured in millimeters from the center of the display.
    gazeOriginRightXYZ = [0, 0, 0];
    gazeOriginLeftXYZ = [0, 0, 0];
    // eye position normalized
    // An array of three floats, for the x, y and z coordinate of the eye position on the left eye of the user,
    // as a normalized value within the track box.
    // right analogue.
    eyePositionRightNormalizedXYZ = [0, 0, 0];
    eyePositionLeftNormalizedXYZ = [0, 0, 0];
    // head position and rotation
    // An array of three floats, for the x, y and z coordinate of the head of the user, as measured in
    // millimeters from the center of the display.
    headPositionXYZ = [0, 0, 0];
    // An array of three floats, for the x, y and z rotation of the head of the user. The rotation is
    // expressed in Euler angles using right-handed rotations around each axis. The z rotation describes
    // the rotation around the vector pointing towards the user.
    headRotationXYZ = [0, 0, 0];
    // user presence, a bool represented as a public number so that everything fits in a char array
    userPresence = false;
    toString() {
        let message = '';
        message += `Gaze Position: ${this.gazePositionXY}\n`;
        message += `Gaze Origin Right: ${this.gazeOriginRightXYZ}\n`;
        message += `Gaze Origin Left: ${this.gazeOriginLeftXYZ}\n`;
        message += `Eye Position Normalized Right: ${this.eyePositionRightNormalizedXYZ}\n`;
        message += `Eye Position Normalized Left: ${this.eyePositionLeftNormalizedXYZ}\n`;
        message += `Head Position: ${this.headPositionXYZ}\n`;
        message += `Head Rotation: ${this.headRotationXYZ}\n`;
        message += `User Presence: ${this.userPresence}\n`;
        return message;
    }
}
exports.EyeGazeData = EyeGazeData;
//# sourceMappingURL=eyegazeevent.js.map