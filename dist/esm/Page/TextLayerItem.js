import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import PageContext from "../PageContext";
import { isPage, isRotate } from "../shared/propTypes";
export var TextLayerItemInternal = /*#__PURE__*/function (_PureComponent) {
  _inherits(TextLayerItemInternal, _PureComponent);

  function TextLayerItemInternal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TextLayerItemInternal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TextLayerItemInternal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getElementWidth", function (element) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          sideways = _assertThisInitialize.sideways;

      return element.getBoundingClientRect()[sideways ? "height" : "width"];
    });

    return _this;
  }

  _createClass(TextLayerItemInternal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.alignTextItem();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.alignTextItem();
    }
  }, {
    key: "getFontData",
    value: function () {
      var _getFontData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(fontName) {
        var page, font;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = this.props.page;
                _context.next = 3;
                return new Promise(function (resolve) {
                  page.commonObjs.get(fontName, resolve);
                });

              case 3:
                font = _context.sent;
                return _context.abrupt("return", font);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFontData(_x) {
        return _getFontData.apply(this, arguments);
      }

      return getFontData;
    }()
  }, {
    key: "alignTextItem",
    value: function () {
      var _alignTextItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var element, _this$props, fontName, scale, width, fontData, fallbackFontName, targetWidth, actualWidth, transform, ascent;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                element = this.item;

                if (element) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                element.style.transform = "";
                _this$props = this.props, fontName = _this$props.fontName, scale = _this$props.scale, width = _this$props.width;
                element.style.fontFamily = "".concat(fontName, ", sans-serif");
                _context2.next = 8;
                return this.getFontData(fontName);

              case 8:
                fontData = _context2.sent;
                fallbackFontName = fontData ? fontData.fallbackName : "sans-serif";
                element.style.fontFamily = "".concat(fontName, ", ").concat(fallbackFontName);
                targetWidth = width * scale;
                actualWidth = this.getElementWidth(element);
                transform = "scaleX(".concat(targetWidth / actualWidth, ")");
                ascent = fontData ? fontData.ascent : 0;

                if (ascent) {
                  transform += " translateY(".concat((1 - ascent) * 100, "%)");
                }

                element.style.transform = transform;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function alignTextItem() {
        return _alignTextItem.apply(this, arguments);
      }

      return alignTextItem;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var fontSize = this.fontSize,
          top = this.top,
          left = this.left;
      var _this$props2 = this.props,
          customTextRenderer = _this$props2.customTextRenderer,
          itemIndex = _this$props2.itemIndex,
          scale = _this$props2.scale,
          text = _this$props2.str,
          page = _this$props2.page;
      return React.createElement("span", {
        style: {
          height: "1em",
          fontFamily: "sans-serif",
          fontSize: "".concat(fontSize * scale, "px"),
          position: "absolute",
          top: "".concat(top * scale, "px"),
          left: "".concat(left * scale, "px"),
          transformOrigin: "left bottom",
          whiteSpace: "pre",
          pointerEvents: "all"
        },
        ref: function ref(_ref) {
          _this2.item = _ref;
        },
        id: "page-".concat(page.pageIndex + 1, "-item-").concat(itemIndex)
      }, customTextRenderer ? customTextRenderer(this.props) : text);
    }
  }, {
    key: "unrotatedViewport",
    get: function get() {
      var _this$props3 = this.props,
          page = _this$props3.page,
          scale = _this$props3.scale;
      return page.getViewport({
        scale: scale
      });
    }
    /**
     * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
     * text content.
     */

  }, {
    key: "rotate",
    get: function get() {
      var _this$props4 = this.props,
          page = _this$props4.page,
          rotate = _this$props4.rotate;
      return rotate - page.rotate;
    }
  }, {
    key: "sideways",
    get: function get() {
      var rotate = this.rotate;
      return rotate % 180 !== 0;
    }
  }, {
    key: "defaultSideways",
    get: function get() {
      var rotation = this.unrotatedViewport.rotation;
      return rotation % 180 !== 0;
    }
  }, {
    key: "fontSize",
    get: function get() {
      var transform = this.props.transform;
      var defaultSideways = this.defaultSideways;

      var _transform = _slicedToArray(transform, 2),
          fontHeightPx = _transform[0],
          fontWidthPx = _transform[1];

      return defaultSideways ? fontWidthPx : fontHeightPx;
    }
  }, {
    key: "top",
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport,
          defaultSideways = this.defaultSideways;

      var _transform2 = _slicedToArray(transform, 6),

      /* fontHeightPx */

      /* fontWidthPx */
      offsetX = _transform2[2],
          offsetY = _transform2[3],
          x = _transform2[4],
          y = _transform2[5];

      var _viewport$viewBox = _slicedToArray(viewport.viewBox, 4),

      /* xMin */
      yMin
      /* xMax */
      = _viewport$viewBox[1],
          yMax = _viewport$viewBox[3];

      return defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY);
    }
  }, {
    key: "left",
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport,
          defaultSideways = this.defaultSideways;

      var _transform3 = _slicedToArray(transform, 6),

      /* fontHeightPx */

      /* fontWidthPx */

      /* offsetX */

      /* offsetY */
      x = _transform3[4],
          y = _transform3[5];

      var _viewport$viewBox2 = _slicedToArray(viewport.viewBox, 1),
          xMin = _viewport$viewBox2[0];

      return defaultSideways ? y - xMin : x - xMin;
    }
  }]);

  return TextLayerItemInternal;
}(PureComponent);
TextLayerItemInternal.propTypes = {
  customTextRenderer: PropTypes.func,
  fontName: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  // eslint-disable-line react/no-unused-prop-types
  page: isPage.isRequired,
  rotate: isRotate,
  scale: PropTypes.number,
  str: PropTypes.string.isRequired,
  transform: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired
};
export default function TextLayerItem(props) {
  return React.createElement(PageContext.Consumer, null, function (context) {
    return React.createElement(TextLayerItemInternal, _extends({}, context, props));
  });
}