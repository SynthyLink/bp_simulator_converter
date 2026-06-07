"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiplyOperation = exports.NotEqualDepth = exports.GreaterDepth = exports.GreaterEqualDepth = exports.EqualDepth = exports.LessEqualDepth = exports.LessDepth = exports.AlwaysDepth = exports.NeverDepth = exports.OneMinusConstantAlphaFactor = exports.ConstantAlphaFactor = exports.OneMinusConstantColorFactor = exports.ConstantColorFactor = exports.SrcAlphaSaturateFactor = exports.OneMinusDstColorFactor = exports.DstColorFactor = exports.OneMinusDstAlphaFactor = exports.DstAlphaFactor = exports.OneMinusSrcAlphaFactor = exports.SrcAlphaFactor = exports.OneMinusSrcColorFactor = exports.SrcColorFactor = exports.OneFactor = exports.ZeroFactor = exports.MaxEquation = exports.MinEquation = exports.ReverseSubtractEquation = exports.SubtractEquation = exports.AddEquation = exports.MaterialBlending = exports.CustomBlending = exports.MultiplyBlending = exports.SubtractiveBlending = exports.AdditiveBlending = exports.NormalBlending = exports.NoBlending = exports.DoubleSide = exports.BackSide = exports.FrontSide = exports.VSMShadowMap = exports.PCFSoftShadowMap = exports.PCFShadowMap = exports.BasicShadowMap = exports.CullFaceFrontBack = exports.CullFaceFront = exports.CullFaceBack = exports.CullFaceNone = exports.TOUCH = exports.MOUSE = exports.REVISION = void 0;
exports.RedFormat = exports.DepthStencilFormat = exports.DepthFormat = exports.RGBAFormat = exports.RGBFormat = exports.AlphaFormat = exports.UnsignedInt101111Type = exports.UnsignedInt5999Type = exports.UnsignedInt248Type = exports.UnsignedShort5551Type = exports.UnsignedShort4444Type = exports.HalfFloatType = exports.FloatType = exports.UnsignedIntType = exports.IntType = exports.UnsignedShortType = exports.ShortType = exports.ByteType = exports.UnsignedByteType = exports.LinearMipMapLinearFilter = exports.LinearMipmapLinearFilter = exports.LinearMipMapNearestFilter = exports.LinearMipmapNearestFilter = exports.LinearFilter = exports.NearestMipMapLinearFilter = exports.NearestMipmapLinearFilter = exports.NearestMipMapNearestFilter = exports.NearestMipmapNearestFilter = exports.NearestFilter = exports.MirroredRepeatWrapping = exports.ClampToEdgeWrapping = exports.RepeatWrapping = exports.CubeUVReflectionMapping = exports.EquirectangularRefractionMapping = exports.EquirectangularReflectionMapping = exports.CubeRefractionMapping = exports.CubeReflectionMapping = exports.UVMapping = exports.DetachedBindMode = exports.AttachedBindMode = exports.NeutralToneMapping = exports.AgXToneMapping = exports.CustomToneMapping = exports.ACESFilmicToneMapping = exports.CineonToneMapping = exports.ReinhardToneMapping = exports.LinearToneMapping = exports.NoToneMapping = exports.AddOperation = exports.MixOperation = void 0;
exports.ZeroSlopeEnding = exports.ZeroCurvatureEnding = exports.InterpolateBezier = exports.InterpolateSmooth = exports.InterpolateLinear = exports.InterpolateDiscrete = exports.LoopPingPong = exports.LoopRepeat = exports.LoopOnce = exports.SIGNED_RED_GREEN_RGTC2_Format = exports.RED_GREEN_RGTC2_Format = exports.SIGNED_RED_RGTC1_Format = exports.RED_RGTC1_Format = exports.RGB_BPTC_UNSIGNED_Format = exports.RGB_BPTC_SIGNED_Format = exports.RGBA_BPTC_Format = exports.RGBA_ASTC_12x12_Format = exports.RGBA_ASTC_12x10_Format = exports.RGBA_ASTC_10x10_Format = exports.RGBA_ASTC_10x8_Format = exports.RGBA_ASTC_10x6_Format = exports.RGBA_ASTC_10x5_Format = exports.RGBA_ASTC_8x8_Format = exports.RGBA_ASTC_8x6_Format = exports.RGBA_ASTC_8x5_Format = exports.RGBA_ASTC_6x6_Format = exports.RGBA_ASTC_6x5_Format = exports.RGBA_ASTC_5x5_Format = exports.RGBA_ASTC_5x4_Format = exports.RGBA_ASTC_4x4_Format = exports.SIGNED_RG11_EAC_Format = exports.RG11_EAC_Format = exports.SIGNED_R11_EAC_Format = exports.R11_EAC_Format = exports.RGBA_ETC2_EAC_Format = exports.RGB_ETC2_Format = exports.RGB_ETC1_Format = exports.RGBA_PVRTC_2BPPV1_Format = exports.RGBA_PVRTC_4BPPV1_Format = exports.RGB_PVRTC_2BPPV1_Format = exports.RGB_PVRTC_4BPPV1_Format = exports.RGBA_S3TC_DXT5_Format = exports.RGBA_S3TC_DXT3_Format = exports.RGBA_S3TC_DXT1_Format = exports.RGB_S3TC_DXT1_Format = exports.RGBAIntegerFormat = exports.RGBIntegerFormat = exports.RGIntegerFormat = exports.RGFormat = exports.RedIntegerFormat = void 0;
exports.StreamReadUsage = exports.DynamicReadUsage = exports.StaticReadUsage = exports.StreamDrawUsage = exports.DynamicDrawUsage = exports.StaticDrawUsage = exports.AlwaysCompare = exports.GreaterEqualCompare = exports.NotEqualCompare = exports.GreaterCompare = exports.LessEqualCompare = exports.EqualCompare = exports.LessCompare = exports.NeverCompare = exports.AlwaysStencilFunc = exports.GreaterEqualStencilFunc = exports.NotEqualStencilFunc = exports.GreaterStencilFunc = exports.LessEqualStencilFunc = exports.EqualStencilFunc = exports.LessStencilFunc = exports.NeverStencilFunc = exports.InvertStencilOp = exports.DecrementWrapStencilOp = exports.IncrementWrapStencilOp = exports.DecrementStencilOp = exports.IncrementStencilOp = exports.ReplaceStencilOp = exports.KeepStencilOp = exports.ZeroStencilOp = exports.NormalGAPacking = exports.NormalRGPacking = exports.NoNormalPacking = exports.SRGBTransfer = exports.LinearTransfer = exports.LinearSRGBColorSpace = exports.SRGBColorSpace = exports.NoColorSpace = exports.ObjectSpaceNormalMap = exports.TangentSpaceNormalMap = exports.RGDepthPacking = exports.RGBDepthPacking = exports.RGBADepthPacking = exports.BasicDepthPacking = exports.TriangleFanDrawMode = exports.TriangleStripDrawMode = exports.TrianglesDrawMode = exports.AdditiveAnimationBlendMode = exports.NormalAnimationBlendMode = exports.WrapAroundEnding = void 0;
exports.Compatibility = exports.InterpolationSamplingMode = exports.InterpolationSamplingType = exports.TimestampQuery = exports.WebGPUCoordinateSystem = exports.WebGLCoordinateSystem = exports.GLSL3 = exports.GLSL1 = exports.StreamCopyUsage = exports.DynamicCopyUsage = exports.StaticCopyUsage = void 0;
exports.REVISION = '185dev';
/**
 * Represents mouse buttons and interaction types in context of controls.
 *
 * @type {ConstantsMouse}
 * @constant
 */
exports.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
/**
 * Represents touch interaction types in context of controls.
 *
 * @type {ConstantsTouch}
 * @constant
 */
exports.TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
/**
 * Disables face culling.
 *
 * @type {number}
 * @constant
 */
exports.CullFaceNone = 0;
/**
 * Culls back faces.
 *
 * @type {number}
 * @constant
 */
exports.CullFaceBack = 1;
/**
 * Culls front faces.
 *
 * @type {number}
 * @constant
 */
exports.CullFaceFront = 2;
/**
 * Culls both front and back faces.
 *
 * @type {number}
 * @constant
 */
exports.CullFaceFrontBack = 3;
/**
 * Gives unfiltered shadow maps - fastest, but lowest quality.
 *
 * @type {number}
 * @constant
 */
exports.BasicShadowMap = 0;
/**
 * Filters shadow maps using the Percentage-Closer Filtering (PCF) algorithm.
 *
 * @type {number}
 * @constant
 */
exports.PCFShadowMap = 1;
/**
 * Filters shadow maps using the Percentage-Closer Filtering (PCF) algorithm with
 * better soft shadows especially when using low-resolution shadow maps.
 *
 * @type {number}
 * @constant
 */
exports.PCFSoftShadowMap = 2;
/**
 * Filters shadow maps using the Variance Shadow Map (VSM) algorithm.
 * When using VSMShadowMap all shadow receivers will also cast shadows.
 *
 * @type {number}
 * @constant
 */
exports.VSMShadowMap = 3;
/**
 * Only front faces are rendered.
 *
 * @type {number}
 * @constant
 */
exports.FrontSide = 0;
/**
 * Only back faces are rendered.
 *
 * @type {number}
 * @constant
 */
exports.BackSide = 1;
/**
 * Both front and back faces are rendered.
 *
 * @type {number}
 * @constant
 */
exports.DoubleSide = 2;
/**
 * No blending is performed which effectively disables
 * alpha transparency.
 *
 * @type {number}
 * @constant
 */
exports.NoBlending = 0;
/**
 * The default blending.
 *
 * @type {number}
 * @constant
 */
exports.NormalBlending = 1;
/**
 * Represents additive blending.
 *
 * @type {number}
 * @constant
 */
exports.AdditiveBlending = 2;
/**
 * Represents subtractive blending.
 *
 * @type {number}
 * @constant
 */
exports.SubtractiveBlending = 3;
/**
 * Represents multiply blending.
 *
 * @type {number}
 * @constant
 */
exports.MultiplyBlending = 4;
/**
 * Represents custom blending.
 *
 * @type {number}
 * @constant
 */
exports.CustomBlending = 5;
/**
 * Represents material blending.
 *
 * @type {number}
 * @constant
 */
exports.MaterialBlending = 6;
/**
 * A `source + destination` blending equation.
 *
 * @type {number}
 * @constant
 */
exports.AddEquation = 100;
/**
 * A `source - destination` blending equation.
 *
 * @type {number}
 * @constant
 */
exports.SubtractEquation = 101;
/**
 * A `destination - source` blending equation.
 *
 * @type {number}
 * @constant
 */
exports.ReverseSubtractEquation = 102;
/**
 * A blend equation that uses the minimum of source and destination.
 *
 * @type {number}
 * @constant
 */
exports.MinEquation = 103;
/**
 * A blend equation that uses the maximum of source and destination.
 *
 * @type {number}
 * @constant
 */
exports.MaxEquation = 104;
/**
 * Multiplies all colors by `0`.
 *
 * @type {number}
 * @constant
 */
exports.ZeroFactor = 200;
/**
 * Multiplies all colors by `1`.
 *
 * @type {number}
 * @constant
 */
exports.OneFactor = 201;
/**
 * Multiplies all colors by the source colors.
 *
 * @type {number}
 * @constant
 */
exports.SrcColorFactor = 202;
/**
 * Multiplies all colors by `1` minus each source color.
 *
 * @type {number}
 * @constant
 */
exports.OneMinusSrcColorFactor = 203;
/**
 * Multiplies all colors by the source alpha value.
 *
 * @type {number}
 * @constant
 */
exports.SrcAlphaFactor = 204;
/**
 * Multiplies all colors by 1 minus the source alpha value.
 *
 * @type {number}
 * @constant
 */
exports.OneMinusSrcAlphaFactor = 205;
/**
 * Multiplies all colors by the destination alpha value.
 *
 * @type {number}
 * @constant
 */
exports.DstAlphaFactor = 206;
/**
 * Multiplies all colors by `1` minus the destination alpha value.
 *
 * @type {number}
 * @constant
 */
exports.OneMinusDstAlphaFactor = 207;
/**
 * Multiplies all colors by the destination color.
 *
 * @type {number}
 * @constant
 */
exports.DstColorFactor = 208;
/**
 * Multiplies all colors by `1` minus each destination color.
 *
 * @type {number}
 * @constant
 */
exports.OneMinusDstColorFactor = 209;
/**
 * Multiplies the RGB colors by the smaller of either the source alpha
 * value or the value of `1` minus the destination alpha value. The alpha
 * value is multiplied by `1`.
 *
 * @type {number}
 * @constant
 */
exports.SrcAlphaSaturateFactor = 210;
/**
 * Multiplies all colors by a constant color.
 *
 * @type {number}
 * @constant
 */
exports.ConstantColorFactor = 211;
/**
 * Multiplies all colors by `1` minus a constant color.
 *
 * @type {number}
 * @constant
 */
exports.OneMinusConstantColorFactor = 212;
/**
 * Multiplies all colors by a constant alpha value.
 *
 * @type {number}
 * @constant
 */
exports.ConstantAlphaFactor = 213;
/**
 * Multiplies all colors by 1 minus a constant alpha value.
 *
 * @type {number}
 * @constant
 */
exports.OneMinusConstantAlphaFactor = 214;
/**
 * Never pass.
 *
 * @type {number}
 * @constant
 */
exports.NeverDepth = 0;
/**
 * Always pass.
 *
 * @type {number}
 * @constant
 */
exports.AlwaysDepth = 1;
/**
 * Pass if the incoming value is less than the depth buffer value.
 *
 * @type {number}
 * @constant
 */
exports.LessDepth = 2;
/**
 * Pass if the incoming value is less than or equal to the depth buffer value.
 *
 * @type {number}
 * @constant
 */
exports.LessEqualDepth = 3;
/**
 * Pass if the incoming value equals the depth buffer value.
 *
 * @type {number}
 * @constant
 */
exports.EqualDepth = 4;
/**
 * Pass if the incoming value is greater than or equal to the depth buffer value.
 *
 * @type {number}
 * @constant
 */
exports.GreaterEqualDepth = 5;
/**
 * Pass if the incoming value is greater than the depth buffer value.
 *
 * @type {number}
 * @constant
 */
exports.GreaterDepth = 6;
/**
 * Pass if the incoming value is not equal to the depth buffer value.
 *
 * @type {number}
 * @constant
 */
exports.NotEqualDepth = 7;
/**
 * Multiplies the environment map color with the surface color.
 *
 * @type {number}
 * @constant
 */
exports.MultiplyOperation = 0;
/**
 * Uses reflectivity to blend between the two colors.
 *
 * @type {number}
 * @constant
 */
exports.MixOperation = 1;
/**
 * Adds the two colors.
 *
 * @type {number}
 * @constant
 */
exports.AddOperation = 2;
/**
 * No tone mapping is applied.
 *
 * @type {number}
 * @constant
 */
exports.NoToneMapping = 0;
/**
 * Linear tone mapping.
 *
 * @type {number}
 * @constant
 */
exports.LinearToneMapping = 1;
/**
 * Reinhard tone mapping.
 *
 * @type {number}
 * @constant
 */
exports.ReinhardToneMapping = 2;
/**
 * Cineon tone mapping.
 *
 * @type {number}
 * @constant
 */
exports.CineonToneMapping = 3;
/**
 * ACES Filmic tone mapping.
 *
 * @type {number}
 * @constant
 */
exports.ACESFilmicToneMapping = 4;
/**
 * Custom tone mapping.
 *
 * Expects a custom implementation by modifying shader code of the material's fragment shader.
 *
 * @type {number}
 * @constant
 */
exports.CustomToneMapping = 5;
/**
 * AgX tone mapping.
 *
 * @type {number}
 * @constant
 */
exports.AgXToneMapping = 6;
/**
 * Neutral tone mapping.
 *
 * Implementation based on the Khronos 3D Commerce Group standard tone mapping.
 *
 * @type {number}
 * @constant
 */
exports.NeutralToneMapping = 7;
/**
 * The skinned mesh shares the same world space as the skeleton.
 *
 * @type {string}
 * @constant
 */
exports.AttachedBindMode = 'attached';
/**
 * The skinned mesh does not share the same world space as the skeleton.
 * This is useful when a skeleton is shared across multiple skinned meshes.
 *
 * @type {string}
 * @constant
 */
exports.DetachedBindMode = 'detached';
/**
 * Maps textures using the geometry's UV coordinates.
 *
 * @type {number}
 * @constant
 */
exports.UVMapping = 300;
/**
 * Reflection mapping for cube textures.
 *
 * @type {number}
 * @constant
 */
exports.CubeReflectionMapping = 301;
/**
 * Refraction mapping for cube textures.
 *
 * @type {number}
 * @constant
 */
exports.CubeRefractionMapping = 302;
/**
 * Reflection mapping for equirectangular textures.
 *
 * @type {number}
 * @constant
 */
exports.EquirectangularReflectionMapping = 303;
/**
 * Refraction mapping for equirectangular textures.
 *
 * @type {number}
 * @constant
 */
exports.EquirectangularRefractionMapping = 304;
/**
 * Reflection mapping for PMREM textures.
 *
 * @type {number}
 * @constant
 */
exports.CubeUVReflectionMapping = 306;
/**
 * The texture will simply repeat to infinity.
 *
 * @type {number}
 * @constant
 */
exports.RepeatWrapping = 1000;
/**
 * The last pixel of the texture stretches to the edge of the mesh.
 *
 * @type {number}
 * @constant
 */
exports.ClampToEdgeWrapping = 1001;
/**
 * The texture will repeats to infinity, mirroring on each repeat.
 *
 * @type {number}
 * @constant
 */
exports.MirroredRepeatWrapping = 1002;
/**
 * Returns the value of the texture element that is nearest (in Manhattan distance)
 * to the specified texture coordinates.
 *
 * @type {number}
 * @constant
 */
exports.NearestFilter = 1003;
/**
 * Chooses the mipmap that most closely matches the size of the pixel being textured
 * and uses the `NearestFilter` criterion (the texel nearest to the center of the pixel)
 * to produce a texture value.
 *
 * @type {number}
 * @constant
 */
exports.NearestMipmapNearestFilter = 1004;
exports.NearestMipMapNearestFilter = 1004; // legacy
/**
 * Chooses the two mipmaps that most closely match the size of the pixel being textured and
 * uses the `NearestFilter` criterion to produce a texture value from each mipmap.
 * The final texture value is a weighted average of those two values.
 *
 * @type {number}
 * @constant
 */
exports.NearestMipmapLinearFilter = 1005;
exports.NearestMipMapLinearFilter = 1005; // legacy
/**
 * Returns the weighted average of the four texture elements that are closest to the specified
 * texture coordinates, and can include items wrapped or repeated from other parts of a texture,
 * depending on the values of `wrapS` and `wrapT`, and on the exact mapping.
 *
 * @type {number}
 * @constant
 */
exports.LinearFilter = 1006;
/**
 * Chooses the mipmap that most closely matches the size of the pixel being textured and uses
 * the `LinearFilter` criterion (a weighted average of the four texels that are closest to the
 * center of the pixel) to produce a texture value.
 *
 * @type {number}
 * @constant
 */
exports.LinearMipmapNearestFilter = 1007;
exports.LinearMipMapNearestFilter = 1007; // legacy
/**
 * Chooses the two mipmaps that most closely match the size of the pixel being textured and uses
 * the `LinearFilter` criterion to produce a texture value from each mipmap. The final texture value
 * is a weighted average of those two values.
 *
 * @type {number}
 * @constant
 */
exports.LinearMipmapLinearFilter = 1008;
exports.LinearMipMapLinearFilter = 1008; // legacy
/**
 * An unsigned byte data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedByteType = 1009;
/**
 * A byte data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.ByteType = 1010;
/**
 * A short data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.ShortType = 1011;
/**
 * An unsigned short data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedShortType = 1012;
/**
 * An int data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.IntType = 1013;
/**
 * An unsigned int data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedIntType = 1014;
/**
 * A float data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.FloatType = 1015;
/**
 * A half float data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.HalfFloatType = 1016;
/**
 * An unsigned short 4_4_4_4 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedShort4444Type = 1017;
/**
 * An unsigned short 5_5_5_1 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedShort5551Type = 1018;
/**
 * An unsigned int 24_8 data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedInt248Type = 1020;
/**
 * An unsigned int 5_9_9_9 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedInt5999Type = 35902;
/**
 * An unsigned int 10_11_11 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
exports.UnsignedInt101111Type = 35899;
/**
 * Discards the red, green and blue components and reads just the alpha component.
 *
 * @type {number}
 * @constant
 */
exports.AlphaFormat = 1021;
/**
 * Discards the alpha component and reads the red, green and blue component.
 *
 * @type {number}
 * @constant
 */
exports.RGBFormat = 1022;
/**
 * Reads the red, green, blue and alpha components.
 *
 * @type {number}
 * @constant
 */
exports.RGBAFormat = 1023;
/**
 * Reads each element as a single depth value, converts it to floating point, and clamps to the range `[0,1]`.
 *
 * @type {number}
 * @constant
 */
exports.DepthFormat = 1026;
/**
 * Reads each element is a pair of depth and stencil values. The depth component of the pair is interpreted as
 * in `DepthFormat`. The stencil component is interpreted based on the depth + stencil internal format.
 *
 * @type {number}
 * @constant
 */
exports.DepthStencilFormat = 1027;
/**
 * Discards the green, blue and alpha components and reads just the red component.
 *
 * @type {number}
 * @constant
 */
exports.RedFormat = 1028;
/**
 * Discards the green, blue and alpha components and reads just the red component. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
exports.RedIntegerFormat = 1029;
/**
 * Discards the alpha, and blue components and reads the red, and green components.
 *
 * @type {number}
 * @constant
 */
exports.RGFormat = 1030;
/**
 * Discards the alpha, and blue components and reads the red, and green components. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
exports.RGIntegerFormat = 1031;
/**
 * Discards the alpha component and reads the red, green and blue component. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
exports.RGBIntegerFormat = 1032;
/**
 * Reads the red, green, blue and alpha components. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
exports.RGBAIntegerFormat = 1033;
/**
 * A DXT1-compressed image in an RGB image format.
 *
 * @type {number}
 * @constant
 */
exports.RGB_S3TC_DXT1_Format = 33776;
/**
 * A DXT1-compressed image in an RGB image format with a simple on/off alpha value.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_S3TC_DXT1_Format = 33777;
/**
 * A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_S3TC_DXT3_Format = 33778;
/**
 * A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3
 * compression in how the alpha compression is done.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_S3TC_DXT5_Format = 33779;
/**
 * PVRTC RGB compression in 4-bit mode. One block for each 4×4 pixels.
 *
 * @type {number}
 * @constant
 */
exports.RGB_PVRTC_4BPPV1_Format = 35840;
/**
 * PVRTC RGB compression in 2-bit mode. One block for each 8×4 pixels.
 *
 * @type {number}
 * @constant
 */
exports.RGB_PVRTC_2BPPV1_Format = 35841;
/**
 * PVRTC RGBA compression in 4-bit mode. One block for each 4×4 pixels.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_PVRTC_4BPPV1_Format = 35842;
/**
 * PVRTC RGBA compression in 2-bit mode. One block for each 8×4 pixels.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_PVRTC_2BPPV1_Format = 35843;
/**
 * ETC1 RGB format.
 *
 * @type {number}
 * @constant
 */
exports.RGB_ETC1_Format = 36196;
/**
 * ETC2 RGB format.
 *
 * @type {number}
 * @constant
 */
exports.RGB_ETC2_Format = 37492;
/**
 * ETC2 RGBA format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ETC2_EAC_Format = 37496;
/**
 * EAC R11 UNORM format.
 *
 * @type {number}
 * @constant
 */
exports.R11_EAC_Format = 37488; // 0x9270
/**
 * EAC R11 SNORM format.
 *
 * @type {number}
 * @constant
 */
exports.SIGNED_R11_EAC_Format = 37489; // 0x9271
/**
 * EAC RG11 UNORM format.
 *
 * @type {number}
 * @constant
 */
exports.RG11_EAC_Format = 37490; // 0x9272
/**
 * EAC RG11 SNORM format.
 *
 * @type {number}
 * @constant
 */
exports.SIGNED_RG11_EAC_Format = 37491; // 0x9273
/**
 * ASTC RGBA 4x4 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_4x4_Format = 37808;
/**
 * ASTC RGBA 5x4 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_5x4_Format = 37809;
/**
 * ASTC RGBA 5x5 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_5x5_Format = 37810;
/**
 * ASTC RGBA 6x5 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_6x5_Format = 37811;
/**
 * ASTC RGBA 6x6 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_6x6_Format = 37812;
/**
 * ASTC RGBA 8x5 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_8x5_Format = 37813;
/**
 * ASTC RGBA 8x6 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_8x6_Format = 37814;
/**
 * ASTC RGBA 8x8 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_8x8_Format = 37815;
/**
 * ASTC RGBA 10x5 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_10x5_Format = 37816;
/**
 * ASTC RGBA 10x6 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_10x6_Format = 37817;
/**
 * ASTC RGBA 10x8 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_10x8_Format = 37818;
/**
 * ASTC RGBA 10x10 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_10x10_Format = 37819;
/**
 * ASTC RGBA 12x10 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_12x10_Format = 37820;
/**
 * ASTC RGBA 12x12 format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_ASTC_12x12_Format = 37821;
/**
 * BPTC RGBA format.
 *
 * @type {number}
 * @constant
 */
exports.RGBA_BPTC_Format = 36492;
/**
 * BPTC Signed RGB format.
 *
 * @type {number}
 * @constant
 */
exports.RGB_BPTC_SIGNED_Format = 36494;
/**
 * BPTC Unsigned RGB format.
 *
 * @type {number}
 * @constant
 */
exports.RGB_BPTC_UNSIGNED_Format = 36495;
/**
 * RGTC1 Red format.
 *
 * @type {number}
 * @constant
 */
exports.RED_RGTC1_Format = 36283;
/**
 * RGTC1 Signed Red format.
 *
 * @type {number}
 * @constant
 */
exports.SIGNED_RED_RGTC1_Format = 36284;
/**
 * RGTC2 Red Green format.
 *
 * @type {number}
 * @constant
 */
exports.RED_GREEN_RGTC2_Format = 36285;
/**
 * RGTC2 Signed Red Green format.
 *
 * @type {number}
 * @constant
 */
exports.SIGNED_RED_GREEN_RGTC2_Format = 36286;
/**
 * Animations are played once.
 *
 * @type {number}
 * @constant
 */
exports.LoopOnce = 2200;
/**
 * Animations are played with a chosen number of repetitions, each time jumping from
 * the end of the clip directly to its beginning.
 *
 * @type {number}
 * @constant
 */
exports.LoopRepeat = 2201;
/**
 * Animations are played with a chosen number of repetitions, alternately playing forward
 * and backward.
 *
 * @type {number}
 * @constant
 */
exports.LoopPingPong = 2202;
/**
 * Discrete interpolation mode for keyframe tracks.
 *
 * @type {number}
 * @constant
 */
exports.InterpolateDiscrete = 2300;
/**
 * Linear interpolation mode for keyframe tracks.
 *
 * @type {number}
 * @constant
 */
exports.InterpolateLinear = 2301;
/**
 * Smooth interpolation mode for keyframe tracks.
 *
 * @type {number}
 * @constant
 */
exports.InterpolateSmooth = 2302;
/**
 * Bezier interpolation mode for keyframe tracks.
 *
 * Uses cubic Bezier curves with explicit 2D control points.
 * Requires tangent data to be set on the track.
 *
 * @type {number}
 * @constant
 */
exports.InterpolateBezier = 2303;
/**
 * Zero curvature ending for animations.
 *
 * @type {number}
 * @constant
 */
exports.ZeroCurvatureEnding = 2400;
/**
 * Zero slope ending for animations.
 *
 * @type {number}
 * @constant
 */
exports.ZeroSlopeEnding = 2401;
/**
 * Wrap around ending for animations.
 *
 * @type {number}
 * @constant
 */
exports.WrapAroundEnding = 2402;
/**
 * Default animation blend mode.
 *
 * @type {number}
 * @constant
 */
exports.NormalAnimationBlendMode = 2500;
/**
 * Additive animation blend mode. Can be used to layer motions on top of
 * each other to build complex performances from smaller re-usable assets.
 *
 * @type {number}
 * @constant
 */
exports.AdditiveAnimationBlendMode = 2501;
/**
 * For every three vertices draw a single triangle.
 *
 * @type {number}
 * @constant
 */
exports.TrianglesDrawMode = 0;
/**
 * For each vertex draw a triangle from the last three vertices.
 *
 * @type {number}
 * @constant
 */
exports.TriangleStripDrawMode = 1;
/**
 * For each vertex draw a triangle from the first vertex and the last two vertices.
 *
 * @type {number}
 * @constant
 */
exports.TriangleFanDrawMode = 2;
/**
 * The depth value is inverted (1.0 - z) for visualization purposes.
 *
 * @type {number}
 * @constant
 */
exports.BasicDepthPacking = 3200;
/**
 * The depth value is packed into 32 bit RGBA.
 *
 * @type {number}
 * @constant
 */
exports.RGBADepthPacking = 3201;
/**
 * The depth value is packed into 24 bit RGB.
 *
 * @type {number}
 * @constant
 */
exports.RGBDepthPacking = 3202;
/**
 * The depth value is packed into 16 bit RG.
 *
 * @type {number}
 * @constant
 */
exports.RGDepthPacking = 3203;
/**
 * Normal information is relative to the underlying surface.
 *
 * @type {number}
 * @constant
 */
exports.TangentSpaceNormalMap = 0;
/**
 * Normal information is relative to the object orientation.
 *
 * @type {number}
 * @constant
 */
exports.ObjectSpaceNormalMap = 1;
// Color space string identifiers, matching CSS Color Module Level 4 and WebGPU names where available.
/**
 * No color space.
 *
 * @type {string}
 * @constant
 */
exports.NoColorSpace = '';
/**
 * sRGB color space.
 *
 * @type {string}
 * @constant
 */
exports.SRGBColorSpace = 'srgb';
/**
 * sRGB-linear color space.
 *
 * @type {string}
 * @constant
 */
exports.LinearSRGBColorSpace = 'srgb-linear';
/**
 * Linear transfer function.
 *
 * @type {string}
 * @constant
 */
exports.LinearTransfer = 'linear';
/**
 * sRGB transfer function.
 *
 * @type {string}
 * @constant
 */
exports.SRGBTransfer = 'srgb';
/**
 * No normal map packing.
 *
 * @type {string}
 * @constant
 */
exports.NoNormalPacking = '';
/**
 * Normal RG packing.
 *
 * @type {string}
 * @constant
 */
exports.NormalRGPacking = 'rg';
/**
 * Normal GA packing.
 *
 * @type {string}
 * @constant
 */
exports.NormalGAPacking = 'ga';
/**
 * Sets the stencil buffer value to `0`.
 *
 * @type {number}
 * @constant
 */
exports.ZeroStencilOp = 0;
/**
 * Keeps the current value.
 *
 * @type {number}
 * @constant
 */
exports.KeepStencilOp = 7680;
/**
 * Sets the stencil buffer value to the specified reference value.
 *
 * @type {number}
 * @constant
 */
exports.ReplaceStencilOp = 7681;
/**
 * Increments the current stencil buffer value. Clamps to the maximum representable unsigned value.
 *
 * @type {number}
 * @constant
 */
exports.IncrementStencilOp = 7682;
/**
 * Decrements the current stencil buffer value. Clamps to `0`.
 *
 * @type {number}
 * @constant
 */
exports.DecrementStencilOp = 7683;
/**
 * Increments the current stencil buffer value. Wraps stencil buffer value to zero when incrementing
 * the maximum representable unsigned value.
 *
 * @type {number}
 * @constant
 */
exports.IncrementWrapStencilOp = 34055;
/**
 * Decrements the current stencil buffer value. Wraps stencil buffer value to the maximum representable
 * unsigned value when decrementing a stencil buffer value of `0`.
 *
 * @type {number}
 * @constant
 */
exports.DecrementWrapStencilOp = 34056;
/**
 * Inverts the current stencil buffer value bitwise.
 *
 * @type {number}
 * @constant
 */
exports.InvertStencilOp = 5386;
/**
 * Will never return true.
 *
 * @type {number}
 * @constant
 */
exports.NeverStencilFunc = 512;
/**
 * Will return true if the stencil reference value is less than the current stencil value.
 *
 * @type {number}
 * @constant
 */
exports.LessStencilFunc = 513;
/**
 * Will return true if the stencil reference value is equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
exports.EqualStencilFunc = 514;
/**
 * Will return true if the stencil reference value is less than or equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
exports.LessEqualStencilFunc = 515;
/**
 * Will return true if the stencil reference value is greater than the current stencil value.
 *
 * @type {number}
 * @constant
 */
exports.GreaterStencilFunc = 516;
/**
 * Will return true if the stencil reference value is not equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
exports.NotEqualStencilFunc = 517;
/**
 * Will return true if the stencil reference value is greater than or equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
exports.GreaterEqualStencilFunc = 518;
/**
 * Will always return true.
 *
 * @type {number}
 * @constant
 */
exports.AlwaysStencilFunc = 519;
/**
 * Never pass.
 *
 * @type {number}
 * @constant
 */
exports.NeverCompare = 512;
/**
 * Pass if the incoming value is less than the texture value.
 *
 * @type {number}
 * @constant
 */
exports.LessCompare = 513;
/**
 * Pass if the incoming value equals the texture value.
 *
 * @type {number}
 * @constant
 */
exports.EqualCompare = 514;
/**
 * Pass if the incoming value is less than or equal to the texture value.
 *
 * @type {number}
 * @constant
 */
exports.LessEqualCompare = 515;
/**
 * Pass if the incoming value is greater than the texture value.
 *
 * @type {number}
 * @constant
 */
exports.GreaterCompare = 516;
/**
 * Pass if the incoming value is not equal to the texture value.
 *
 * @type {number}
 * @constant
 */
exports.NotEqualCompare = 517;
/**
 * Pass if the incoming value is greater than or equal to the texture value.
 *
 * @type {number}
 * @constant
 */
exports.GreaterEqualCompare = 518;
/**
 * Always pass.
 *
 * @type {number}
 * @constant
 */
exports.AlwaysCompare = 519;
/**
 * The contents are intended to be specified once by the application, and used many
 * times as the source for drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
exports.StaticDrawUsage = 35044;
/**
 * The contents are intended to be respecified repeatedly by the application, and
 * used many times as the source for drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
exports.DynamicDrawUsage = 35048;
/**
 * The contents are intended to be specified once by the application, and used at most
 * a few times as the source for drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
exports.StreamDrawUsage = 35040;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and queried
 * many times by the application.
 *
 * @type {number}
 * @constant
 */
exports.StaticReadUsage = 35045;
/**
 * The contents are intended to be respecified repeatedly by reading data from the 3D API, and queried
 * many times by the application.
 *
 * @type {number}
 * @constant
 */
exports.DynamicReadUsage = 35049;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and queried at most
 * a few times by the application
 *
 * @type {number}
 * @constant
 */
exports.StreamReadUsage = 35041;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and used many times as
 * the source for WebGL drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
exports.StaticCopyUsage = 35046;
/**
 * The contents are intended to be respecified repeatedly by reading data from the 3D API, and used many times
 * as the source for WebGL drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
exports.DynamicCopyUsage = 35050;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and used at most a few times
 * as the source for WebGL drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
exports.StreamCopyUsage = 35042;
/**
 * GLSL 1 shader code.
 *
 * @type {string}
 * @constant
 */
exports.GLSL1 = '100';
/**
 * GLSL 3 shader code.
 *
 * @type {string}
 * @constant
 */
exports.GLSL3 = '300 es';
/**
 * WebGL coordinate system.
 *
 * @type {number}
 * @constant
 */
exports.WebGLCoordinateSystem = 2000;
/**
 * WebGPU coordinate system.
 *
 * @type {number}
 * @constant
 */
exports.WebGPUCoordinateSystem = 2001;
/**
 * Represents the different timestamp query types.
 *
 * @type {ConstantsTimestampQuery}
 * @constant
 */
exports.TimestampQuery = {
    COMPUTE: 'compute',
    RENDER: 'render'
};
/**
 * Represents mouse buttons and interaction types in context of controls.
 *
 * @type {ConstantsInterpolationSamplingType}
 * @constant
 */
exports.InterpolationSamplingType = {
    PERSPECTIVE: 'perspective',
    LINEAR: 'linear',
    FLAT: 'flat'
};
/**
 * Represents the different interpolation sampling modes.
 *
 * @type {ConstantsInterpolationSamplingMode}
 * @constant
 */
exports.InterpolationSamplingMode = {
    NORMAL: 'normal',
    CENTROID: 'centroid',
    SAMPLE: 'sample',
    FIRST: 'first',
    EITHER: 'either'
};
/**
 * Compatibility flags for features that may not be supported across all platforms.
 *
 * @type {Object}
 * @constant
 */
exports.Compatibility = {
    TEXTURE_COMPARE: 'depthTextureCompare'
};
/**
 * This type represents mouse buttons and interaction types in context of controls.
 *
 * @typedef {Object} ConstantsMouse
 * @property {number} MIDDLE - The left mouse button.
 * @property {number} LEFT - The middle mouse button.
 * @property {number} RIGHT - The right mouse button.
 * @property {number} ROTATE - A rotate interaction.
 * @property {number} DOLLY - A dolly interaction.
 * @property {number} PAN - A pan interaction.
 **/
/**
 * This type represents touch interaction types in context of controls.
 *
 * @typedef {Object} ConstantsTouch
 * @property {number} ROTATE - A rotate interaction.
 * @property {number} PAN - A pan interaction.
 * @property {number} DOLLY_PAN - The dolly-pan interaction.
 * @property {number} DOLLY_ROTATE - A dolly-rotate interaction.
 **/
/**
 * This type represents the different timestamp query types.
 *
 * @typedef {Object} ConstantsTimestampQuery
 * @property {string} COMPUTE - A `compute` timestamp query.
 * @property {string} RENDER - A `render` timestamp query.
 **/
/**
 * Represents the different interpolation sampling types.
 *
 * @typedef {Object} ConstantsInterpolationSamplingType
 * @property {string} PERSPECTIVE - Perspective-correct interpolation.
 * @property {string} LINEAR - Linear interpolation.
 * @property {string} FLAT - Flat interpolation.
 */
/**
 * Represents the different interpolation sampling modes.
 *
 * @typedef {Object} ConstantsInterpolationSamplingMode
 * @property {string} NORMAL - Normal sampling mode.
 * @property {string} CENTROID - Centroid sampling mode.
 * @property {string} SAMPLE - Sample-specific sampling mode.
 * @property {string} FIRST - Flat interpolation using the first vertex.
 * @property {string} EITHER - Flat interpolation using either vertex.
 */
//# sourceMappingURL=constants.js.map