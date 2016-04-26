'use babel';

import HelloAtomView from './hello-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  helloAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.helloAtomView = new HelloAtomView(state.helloAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.helloAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hello-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.helloAtomView.destroy();
  },

  serialize() {
    return {
      helloAtomViewState: this.helloAtomView.serialize()
    };
  },

  toggle() {
    console.log('HelloAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
