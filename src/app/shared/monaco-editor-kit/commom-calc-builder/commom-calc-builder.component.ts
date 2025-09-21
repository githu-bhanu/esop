// tslint:disable:component-selector ter-arrow-parens align max-line-length no-this-assignment prefer-template no-increment-decrement no-inferrable-types no-input-rename no-output-rename

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'esop-commom-calc-builder',
  templateUrl: './commom-calc-builder.component.html',
  styleUrls: ['./commom-calc-builder.component.scss']
})
export class CommomCalcBuilderComponent implements OnInit, OnDestroy {
  @Input('suggestions') suggestions = [];
  @Input() calcResults: any;
  @Input('colorSettings') colorSettings = {
    tokenizer: [],
  };
  @Input() setEditorPropertyFlag = false;
  @Input() applyHeight: any;
  @Input() getIndex: any;
  @Input('formulaInfo') formulaInfo: any = {
    code: '',
  };
  @Input() formControls: FormControl;
  @Input() id: any = 'code-editor';
  @Output('formulaData') formulaData = new EventEmitter();

  public editorSuggestInstance = undefined;
  public suggestionList = [];
  public code = '';
  public editorOptions = undefined;
  public editorMonarchTokensProvider = undefined;


  ngOnInit() {
    try {
      if (!this.formControls) {
        this.formControls = new FormControl('', Validators.nullValidator);
      }
      this.editorOptions = {
        language:'newlang',
        theme: 'vs-light',
        ariaLabel: 'jobin\'s edior',
        selectOnLineNumbers: false,
        lineNumbers: 'on',
        lineNumbersMinChars: 3,
        accessibilitySupport: 'off',
        cursorBlinking: 'smooth',
        smoothScrolling: true,
        suggestSelection: 'first',
        autoIndent: false,
        folding: false,
        iconsInSuggestions: false,
        wordWrap: 'on', // 'wordWrapColumn',
        minimap: {
          enabled: false,
        },
        wordBasedSuggestions: false,
        suggestFontSize: 10,
        autoClosingQuotes: 'always',
        acceptSuggestionOnCommitCharacter: false,
        scrollbar: {
          verticalScrollbarSize: 6,
        },
        contextmenu: false,
        dragAndDrop: false,
        scrollBeyondLastLine: false,
        unfoldOnClickAfterEndOfLine: true,
      };
    } catch (error) {
      console.error(error);
    }
  }

  public sleep = ms => new Promise(r => setTimeout(r, ms));

  /**
   * Method for setup all the configurations or plugin into the editor once the editor is initialised
   * @param editor
   */
  async onInitMonaco(editor) {
    await this.sleep(1000);
    const monaco = (window as any).monaco;
    if (this.applyHeight) {
      this.disableEnter(editor);
    }
    try {
      if (this.setEditorPropertyFlag) {
        // setup the coloring configurations of attributes in the editor
        this.editorMonarchTokensProvider = monaco.languages.setMonarchTokensProvider('newlang', {
          tokenizer: {
            root: this.colorSettings.tokenizer,
          },
          ignoreCase: false,
          tokenPostfix: '.newlang',
        });
      }

    } catch (error) {
      console.error('editorSuggestInstance', error);
    }

    try {
      if (this.setEditorPropertyFlag) {
        this.editorSuggestInstance = monaco.languages.registerCompletionItemProvider('newlang', this.getSuggestions());
      }
    } catch (error) {
      console.error('editorSuggestInstance', error);
    }
  }

  /**
   * Method for returning custom suggestions
   */
  getSuggestions() {
    const _refObj = this;
    return {
      provideCompletionItems (model, position) {
        var word = model.getWordUntilPosition(position);
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        _refObj.suggestions.forEach(e => e.range = range);
        return { suggestions: _refObj.suggestions };
      },
    };
  }

  /**
   * Event for getting the script form editor whenever there is a change.
   */
  codeChangeAction() {
    try {
      this.formulaData.emit(this.getCopy(this.formulaInfo));
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Method for returning a deep copy of json passed
   * @param obj json object to take a deep copy
   */
  getCopy(obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
  }
  disableEnter(editor) {
    try {
      editor.onKeyDown((e) => {
        if (e.keyCode === 3 || e.keyCode === 52) {
          e.preventDefault();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy() {
    if (this.editorSuggestInstance) {
      this.editorSuggestInstance.dispose();
    }

    if (this.editorMonarchTokensProvider) {
      this.editorMonarchTokensProvider.dispose();
    }
  }
}
