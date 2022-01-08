import { h, VNode } from "vue";
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import classNames from "classnames";

export interface OptionalIcon {
  icon?: FontAwesomeIconName;
  titleText: string;
}

export function renderOptionalIcon(optionalIcon: OptionalIcon, extraClasses: string[]): VNode[] {
  if (optionalIcon.icon) {
    return [
      h("span",
        { class: classNames("icon", ...extraClasses) },
         h(FontAwesomeIcon, {icon: optionalIcon.icon })
      ),
      h("span", {}, optionalIcon.titleText)
    ];
  } else {
    return [ h("span", {}, optionalIcon.titleText) ];
  }
}
