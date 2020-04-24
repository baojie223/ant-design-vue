import PropTypes from '../../_util/vue-types';
import { cloneElement } from '../../_util/vnode';
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
  getMarginStyle,
} from './utils';
export default {
  name: 'TabContent',
  props: {
    animated: { type: Boolean, default: true },
    animatedWithMargin: { type: Boolean, default: true },
    prefixCls: {
      default: 'ant-tabs',
      type: String,
    },
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tabBarPosition: String,
    direction: PropTypes.string,
    destroyInactiveTabPane: PropTypes.bool,
  },
  computed: {
    classes() {
      const { animated, prefixCls } = this;
      return {
        [`${prefixCls}-content`]: true,
        [animated ? `${prefixCls}-content-animated` : `${prefixCls}-content-no-animated`]: true,
      };
    },
  },
  methods: {
    getTabPanes() {
      const props = this.$props;
      const activeKey = props.activeKey;
      const children = (this.$scopedSlots.deafult && this.$scopedSlots.default()) || [] || [];
      const newChildren = [];

      children.forEach(child => {
        if (!child) {
          return;
        }
        const key = child.key;
        const active = activeKey === key;
        newChildren.push(
          cloneElement(child, {
            props: {
              active,
              destroyInactiveTabPane: props.destroyInactiveTabPane,
              rootPrefixCls: props.prefixCls,
            },
          }),
        );
      });

      return newChildren;
    },
  },
  render() {
    const { activeKey, tabBarPosition, animated, animatedWithMargin, direction, classes } = this;
    let style = {};
    if ((animated && this.$scopedSlots.deafult && this.$scopedSlots.default()) || []) {
      const activeIndex = getActiveIndex(
        (this.$scopedSlots.deafult && this.$scopedSlots.default()) || [],
        activeKey,
      );
      if (activeIndex !== -1) {
        const animatedStyle = animatedWithMargin
          ? getMarginStyle(activeIndex, tabBarPosition)
          : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition, direction));
        style = animatedStyle;
      } else {
        style = {
          display: 'none',
        };
      }
    }
    return (
      <div class={classes} style={style}>
        {this.getTabPanes()}
      </div>
    );
  },
};
