import { defineCustomElement as defineIonList } from "@ionic/core/components/ion-list.js";
import { defineCustomElement as defineIonReorderGroup } from "@ionic/core/components/ion-reorder-group.js";
import { defineCustomElement as defineIonReorder } from "@ionic/core/components/ion-reorder.js";
import { defineCustomElement as defineIonItem } from "@ionic/core/components/ion-item.js";
import { defineCustomElement as defineIonLabel } from "@ionic/core/components/ion-label.js";
import { defineCustomElement as defineIonCheckbox } from "@ionic/core/components/ion-checkbox.js";
import { defineCustomElement as defineIonInput } from "@ionic/core/components/ion-input.js";
import { defineCustomElement as defineIonToggle } from "@ionic/core/components/ion-toggle.js";
import { defineCustomElement as defineIonRadioGroup } from "@ionic/core/components/ion-radio-group.js";
import { defineCustomElement as defineIonRadio } from "@ionic/core/components/ion-radio.js";
import { initialize } from "@ionic/core/components";

initialize();
defineIonList();
defineIonReorderGroup();
defineIonReorder();
defineIonItem();
defineIonLabel();
defineIonCheckbox()
defineIonInput();
defineIonToggle();
defineIonRadioGroup();
defineIonRadio();

const pages = import.meta.glob("./pages/**/*.js")
const components = import.meta.glob("./components/**/*.js")

const allComponents = { ...pages, ...components }
for (const path in allComponents) {
	allComponents[path]()
}
