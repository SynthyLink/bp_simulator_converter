"use strict";
/* spellchecker: disable */
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const auxiliaries_1 = require("./auxiliaries");
const camera_1 = require("./camera");
/* spellchecker: enable */
var ray_math;
(function (ray_math) {
    /**
     * Lots of variables that represent components of other variables or are transformed.
     * For these I (dl) prefer, e.g.,  _component or _transformation notation
     */
    /**
     * Computes the intersection point of a given ray and a circle at [0.0, 0.0] and a given radius.
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray's direction.
     * @param radius - Radius of the circle to test for intersection with.
     * @returns The intersection point of the given ray and a circle, undefined if no intersection exists.
     */
    function rayCircleIntersection(ray0, ray1, radius = 1.0) {
        const ray_direction = gl_matrix_1.vec2.subtract((0, gl_matrix_extensions_1.v2)(), ray1, ray0);
        if (gl_matrix_1.vec2.equals(ray_direction, gl_matrix_1.vec2.fromValues(0.0, 0.0))) {
            return undefined;
        }
        /**
         * This is a default ray circle intersection with common variable names. It's math and math sometimes has no
         * meaning full variable names... (we could use twoTimesDotProductOfRayAndOrigin instead of b, but this is
         * obviously not a good idea :D).
         */
        const a = gl_matrix_1.vec2.squaredLength(ray_direction);
        const b = 2.0 * gl_matrix_1.vec2.dot(ray_direction, ray0);
        const c = gl_matrix_1.vec2.squaredLength(ray0) - radius * radius;
        const delta = b * b - 4.0 * a * c;
        if (delta < 0.0) {
            return undefined;
        }
        /* Compute the two possible intersections and use nearest one. */
        const s = Math.sqrt(delta);
        const t = Math.min((-b + s) / (2.0 * a), (-b - s) / (2.0 * a));
        const intersection = gl_matrix_1.vec2.scale((0, gl_matrix_extensions_1.v2)(), ray_direction, t);
        return gl_matrix_1.vec2.add(intersection, intersection, ray0);
    }
    ray_math.rayCircleIntersection = rayCircleIntersection;
    /**
     * Computes the intersection point of a ray starting at a given point and pointing to the center of an axis-aligned
     * square of a given side length.
     * @param point - Starting point used to derive a ray for intersection.
     * @param edgeLength - Side length of the square.
     * @returns - The intersection point of the square and the derived ray.
     */
    function pointSquareIntersection(point, edgeLength = 1.0) {
        const a = (0, gl_matrix_extensions_1.abs2)((0, gl_matrix_extensions_1.v2)(), point);
        if (a[0] >= a[1]) { // intersection is with left or right border
            return gl_matrix_1.vec2.fromValues((0, gl_matrix_extensions_1.sign)(point[0]) * edgeLength, point[1] / a[0] * edgeLength);
        }
        return gl_matrix_1.vec2.fromValues(point[0] / a[1] * edgeLength, (0, gl_matrix_extensions_1.sign)(point[1]) * edgeLength);
    }
    ray_math.pointSquareIntersection = pointSquareIntersection;
    /**
     * Computes the intersection of a ray with an axis-aligned square at [0.0, 0.0] with side length of 2 * halfLength.
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray's direction.
     * @returns - The intersection point of the square and the ray.
     */
    function raySquareIntersection(ray0, ray1, halfLength = 1.0) {
        const vertices = [gl_matrix_1.vec2.fromValues(-halfLength, +halfLength), gl_matrix_1.vec2.fromValues(-halfLength, -halfLength),
            gl_matrix_1.vec2.fromValues(+halfLength, -halfLength), gl_matrix_1.vec2.fromValues(+halfLength, +halfLength)];
        const intersections = new Array();
        for (let i = 0; i < 4; ++i) {
            const intersection = rayLineIntersection(ray0, ray1, vertices[i], vertices[(i + 1) % 4]);
            if (intersection) {
                intersections.push(intersection[1]);
            }
        }
        return intersections;
    }
    ray_math.raySquareIntersection = raySquareIntersection;
    /**
     * Computes the intersection of a ray with a line.
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray direction.
     * @param line0 - Start point of a line.
     * @param line1 - End point of a line.
     * @returns - If ray intersects, a 2-tuple of intersection point and t (ray0 + t + ray1) is returned.
     */
    function rayLineIntersection(ray0, ray1, line0, line1) {
        const p = ray0; /* do not write to p (or clone ray0) */
        const r = gl_matrix_1.vec2.sub((0, gl_matrix_extensions_1.v2)(), ray1, ray0);
        const q = line0; /* do not write to q (or clone line0) */
        const s = gl_matrix_1.vec2.sub((0, gl_matrix_extensions_1.v2)(), line1, line0);
        const cross_rs = gl_matrix_1.vec2.cross((0, gl_matrix_extensions_1.v3)(), r, s)[2];
        if (cross_rs === 0.0) {
            return undefined;
        }
        const qp = gl_matrix_1.vec2.sub((0, gl_matrix_extensions_1.v2)(), q, p);
        const u = gl_matrix_1.vec2.cross((0, gl_matrix_extensions_1.v3)(), qp, gl_matrix_1.vec2.scale((0, gl_matrix_extensions_1.v2)(), r, 1.0 / cross_rs))[2];
        const t = gl_matrix_1.vec2.cross((0, gl_matrix_extensions_1.v3)(), qp, gl_matrix_1.vec2.scale((0, gl_matrix_extensions_1.v2)(), s, 1.0 / cross_rs))[2];
        if (u < 0.0 || u > 1.0 || t < 0.0) { // } || t > 1.0) { // ray intersects line segment in both directions ...
            return undefined;
        }
        return [gl_matrix_1.vec2.add((0, gl_matrix_extensions_1.v2)(), q, gl_matrix_1.vec2.scale((0, gl_matrix_extensions_1.v2)(), s, u)), t];
    }
    ray_math.rayLineIntersection = rayLineIntersection;
    /**
     * Computes the intersection point of a given ray and a given plane (rooted at [ 0, 0, 0 ]).
     * t = -(dot(plane.xyz, origin) + plane.w) / dot(plane.xyz, ray);
     * The ray intersects when (t > 0.0) && (t < tm) is true.
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray direction.
     * @param origin - Point on a plane with origin [ 0, 0, 0 ].
     * @param normal - Normal of the plane with origin [ 0, 0, 0 ].
     * @returns - If ray intersects, the intersection point on the plane if the plane was hit.
     */
    function rayPlaneIntersection(ray0, ray1, origin = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0), normal = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0)) {
        const ray_direction = gl_matrix_1.vec3.normalize((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), ray1, ray0));
        /* Intersect with plane in point normal form. */
        const rdDotN = gl_matrix_1.vec3.dot(ray_direction, normal);
        /* Constrain the intersection to rays that point from front to back with respect to the plane. */
        if (gl_matrix_1.vec3.equals(ray_direction, [0, 0, 0]) || rdDotN >= 0.0) {
            return undefined;
        }
        /* Retrieve point using the ray. */
        const t = gl_matrix_1.vec3.dot(gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), origin, ray0), normal) / rdDotN;
        return gl_matrix_1.vec3.add((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), ray_direction, t), ray0);
    }
    ray_math.rayPlaneIntersection = rayPlaneIntersection;
    /**
     * Computes the intersection point of a given ray and a given sphere.
     * t = -(dot(plane.xyz, origin) + plane.w) / dot(plane.xyz, ray);
     * The ray intersects when (t > 0.0) && (t < tm) is true.
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray direction.
     * @param origin - Location of the sphere.
     * @param radius - Radius of the sphere.
     * @returns - If ray intersects, the intersection point on the plane if the plane was hit.
     */
    function raySphereIntersection(ray0, ray1, origin = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0), radius = 1.0) {
        const rayOriginToSphereCenter = gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), ray0, origin); // o - c
        const ray_direction = gl_matrix_1.vec3.normalize((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), ray1, ray0)); // l
        const dot_term = gl_matrix_1.vec3.dot(ray_direction, rayOriginToSphereCenter); // l * (o - c)
        // Note: dot product can be used to compute the squared length of a vector -> gl-matrix supports squaredLength
        // vec3.squaredLength(rayOriginToSphereCenter); // ||o -c||²
        const t = dot_term * dot_term - gl_matrix_1.vec3.squaredLength(rayOriginToSphereCenter) + radius * radius;
        if (t <= 0.0) { // no intersection
            return undefined;
        }
        return gl_matrix_1.vec3.add((0, gl_matrix_extensions_1.v3)(), ray0, gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), ray_direction, -dot_term - Math.sqrt(t)));
    }
    ray_math.raySphereIntersection = raySphereIntersection;
    /**
     * Computes the intersection point of a given ray and a given plane (origin [ 0, 0, 0 ]). The intersection point,
     * however, is constrained to a tube of a given radius. The computation is currently limited to a tube
     * on the plane y = 0 with origin in [0.0, 0.0, 0.0], extending towards [0.0, 1.0, 0.0].
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray direction.
     * @param radius - Constrain intersection point to be within a tube of this radius.
     * @returns - The intersection point on the plane if the plane was hit, undefined otherwise.
     */
    function rayPlaneIntersection_tube(ray0, ray1, radius = 1.0) {
        const intersection = rayPlaneIntersection(ray0, ray1);
        if (intersection !== undefined && gl_matrix_1.vec3.length(intersection) < radius) {
            return intersection;
        }
        /* Project the ray start to the y = 0 plane. */
        const ray0_xz = gl_matrix_1.vec2.fromValues(ray0[0], ray0[2]);
        const ray1_xz = gl_matrix_1.vec2.fromValues(ray1[0], ray1[2]);
        const intersection2 = rayCircleIntersection(ray0_xz, ray1_xz, radius);
        return intersection2 ? gl_matrix_1.vec3.fromValues(intersection2[0], 0.0, intersection2[1]) : undefined;
    }
    ray_math.rayPlaneIntersection_tube = rayPlaneIntersection_tube;
    /**
     * Evaluates whether or not a given point is within a square of a given edge length.
     * @param point - Point to check the within-square-status for.
     * @param halfLength - Half of the side length of the square.
     * @returns - Whether or not the given point is within an axis aligned square at [0.0, 0.0] and edge length.
     */
    function isPointWithinSquare(point, halfLength = 1.0) {
        const p_abs = (0, gl_matrix_extensions_1.abs2)((0, gl_matrix_extensions_1.v2)(), point);
        return p_abs[0] <= halfLength && p_abs[1] <= halfLength;
    }
    ray_math.isPointWithinSquare = isPointWithinSquare;
    /**
     * Evaluates whether or not a given point is within the NDC-space (normalized device coordinates) after being
     * transformed by a view projection matrix.
     * @param viewProjection - (Model) view projection matrix to transform the point with.
     * @param point - Point that is to be transformed
     * @returns True if the point should be visible (within NDC), false otherwise.
     */
    function isPointWithinNDC(viewProjection, point) {
        const p_transformed = gl_matrix_1.vec3.transformMat4((0, gl_matrix_extensions_1.v3)(), point, viewProjection);
        const p_abs = (0, gl_matrix_extensions_1.abs3)((0, gl_matrix_extensions_1.v3)(), p_transformed);
        return p_abs[0] <= 1.0 && p_abs[1] <= 1.0 && p_transformed[2] >= 0.0 && p_transformed[2] <= 1.0;
    }
    ray_math.isPointWithinNDC = isPointWithinNDC;
    /**
     * Computes the shortest distance of a point to a ray (closest point on ray distance).
     * @param ray0 - Start point of a ray.
     * @param ray1 - Far point of a ray, used to derive the ray direction.
     * @param point - Point to compute the distance for.
     * @returns - Distance of the closest point on a ray to a point.
     */
    function distancePointToRay(ray0, ray1, point) {
        const ray_direction = gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), ray1, ray0);
        const ray_length = gl_matrix_1.vec3.squaredLength(ray_direction);
        if (ray_length === 0.0) {
            return 0.0;
        }
        const eyeToPoint = gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), point, ray0);
        const theta = gl_matrix_1.vec3.dot(eyeToPoint, ray_direction);
        return theta / ray_length;
    }
    ray_math.distancePointToRay = distancePointToRay;
    /**
     * Computes a new eye coordinate for the camera that should have the given point within view. The eye is only
     * modified with respect to its distance to the camera's center (on the camera look-at ray).
     * @param camera - Camera as base constraint for the eye movement (only distance to center is changed).
     * @param point - Point to adjust the camera position for.
     * @returns - Eye coordinate for the given camera that should have the given point within view.
     */
    function eyeWithPointInView(camera, point) {
        const ray_direction = gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), camera.center, camera.eye);
        const ray_normalized = gl_matrix_1.vec3.normalize((0, gl_matrix_extensions_1.v3)(), ray_direction);
        /* Retrieve u and v for an orthonormal basis. */
        const ortho_v = gl_matrix_1.vec3.normalize((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), ray_normalized, camera.up));
        const ortho_u = gl_matrix_1.vec3.normalize((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), ortho_v, ray_normalized));
        const distance = distancePointToRay(camera.eye, camera.center, point);
        /* Compute the closest point c on the ray. */
        const closest = gl_matrix_1.vec3.add((0, gl_matrix_extensions_1.v3)(), camera.eye, gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), ray_direction, distance));
        const t = gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), point, closest);
        const part_v = Math.abs(gl_matrix_1.vec3.dot(t, ortho_v)) / camera.aspect;
        const part_u = Math.abs(gl_matrix_1.vec3.dot(t, ortho_u));
        /* Retrieve max distance to camera with required fov. */
        const part_max = Math.max(part_v, part_u);
        /* Require distance from closest to new camera position. */
        const a = part_max / Math.tan(camera.fovy * auxiliaries_1.DEG2RAD * 0.5);
        return gl_matrix_1.vec3.subtract((0, gl_matrix_extensions_1.v3)(), closest, gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), ray_normalized, a));
    }
    ray_math.eyeWithPointInView = eyeWithPointInView;
})(ray_math || (ray_math = {}));
module.exports = ray_math;
//# sourceMappingURL=raymath.js.map