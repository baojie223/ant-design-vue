import { getOptionProps, getComponentFromProp, getListeners } from '../_util/props-util';
import VcCollapse, { panelProps } from '../vc-collapse';
import { ConfigConsumerProps } from '../config-provider';

export default {
  name: 'ACollapsePanel',
  props: {
    ...panelProps(),
  },
  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },
  render() {
    const { prefixCls: customizePrefixCls, showArrow = true } = this;
    const getPrefixCls = this.configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);

    const collapsePanelClassName = {
      [`${prefixCls}-no-arrow`]: !showArrow,
    };
    const rcCollapePanelProps = {
      props: {
        ...getOptionProps(this),
        prefixCls,
        extra: getComponentFromProp(this, 'extra'),
      },
      class: collapsePanelClassName,
      on: getListeners(this),
    };
    const header = getComponentFromProp(this, 'header');
    return (
      <VcCollapse.Panel {...rcCollapePanelProps}>
        {this.$scopedSlots.default()}
        {header ? <template slot="header">{header}</template> : null}
      </VcCollapse.Panel>
    );
  },
};
