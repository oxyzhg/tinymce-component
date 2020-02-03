import TinymceEditor from "./main";

/* istanbul ignore next */
TinymceEditor.install = function(Vue) {
  Vue.component(TinymceEditor.name, TinymceEditor);
};

export default TinymceEditor;
