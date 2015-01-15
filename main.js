/*jslint nomen: true, vars: true */
/*global define, brackets, $*/

define(function (require, exports, module) {

  'use strict';

  // Brackets modules
  var AppInit     = brackets.getModule('utils/AppInit'),
    EditorManager = brackets.getModule('editor/EditorManager'),
    KeyEvent      = brackets.getModule('utils/KeyEvent');

  function _keyEventHandler($event, editor, event) {
    var 
      cursorPos = editor.getCursorPos(),
      document = editor.document;
    // On alt+ENTER pressed
    if (event.keyCode === KeyEvent.DOM_VK_RETURN && event.altKey) {
      var fileLang = editor.document.language._id;
      // only for JavaScript
      if (fileLang === 'javascript') {
        editor.setCursorPos(cursorPos.line, document.getLine(cursorPos.line).length);
        cursorPos = editor.getCursorPos();
        document.replaceRange(';\n', cursorPos);
      }
    }
  }

  function _activeEditorChangeHandler($event, focusedEditor, lostEditor) {
    if (lostEditor) {
      $(lostEditor).off('keydown', _keyEventHandler);
    }
    if (focusedEditor) {
      $(focusedEditor).on('keydown', _keyEventHandler);
    }
  }

  AppInit.appReady(function () {
    var currentEditor = EditorManager.getActiveEditor();
    $(currentEditor).on('keydown', _keyEventHandler);
    $(EditorManager).on('activeEditorChange', _activeEditorChangeHandler);
  });

});
