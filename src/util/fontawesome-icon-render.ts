import { h, VNode } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FontAwesomeIconName } from '@/types/fontawesome-icon-name';

export function iconAsRender(name: FontAwesomeIconName, extraClasses: string[] = []): VNode<any, any, any> {
  return h(
    "span",
    { class: "icon " + extraClasses.join(" ") },
    h(
      FontAwesomeIcon,
      { icon: name }
    )
  );
}
