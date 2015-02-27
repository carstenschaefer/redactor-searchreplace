if (!RedactorPlugins) var RedactorPlugins = {};
(function ($) {
  RedactorPlugins.searchreplace = function () {
    var selectedText,
      selectedHtml,
      current,
      range;

    return {
      init: function () {
        var button = this.button.add('search', 'Search And Replace');
        this.button.setAwesome('search', 'fa-search');
        this.button.addCallback(button, this.searchreplace.show);
     
        $.extend(this.opts.shortcuts, {
          'ctrl+f': { func: 'searchreplace.show', params: [] }
        });
      
      },
      show: function () {
        this.modal.addTemplate('searchreplace', getTemplate());
        this.modal.load('searchreplace', 'Search And Replace', 300);
        this.modal.setTitle('Search And Replace');

        this.modal.createCancelButton();

        var button = this.modal.createActionButton('Run');
        button.on('click', this.searchreplace.run);
        
        selectedText = this.selection.getText();
        selectedHtml = this.selection.getHtml();

        this.selection.get();
        range = this.range;

        this.selection.save();
        this.modal.show();

        if (selectedText) {
          var numChars = selectedText.match(/[a-zA-Z]/g).length;    //if selected text is longer then 20 chars then I assume the selection is needed for "only-selection"
          if (numChars >= 20) {
            $('#redactor-search-replace-search').val('');
            $('#redactor-search-replace-search').focus();
          } else {
            $('#redactor-search-replace-search').val(selectedText);
            $('#redactor-search-replace-replace').focus();
          }
        } else {
          $('#redactor-search-replace-search').focus();
        }

      },
      run: function () {
        var search = $('#redactor-search-replace-search').val(),
            replace = $('#redactor-search-replace-replace').val(),
            ignoreCase = $('#redactor-search-replace-ignore-case').is(":checked"),
            wordBoundary = $('#redactor-search-replace-word-boundary').is(":checked"),
            searchSelection = $('#redactor-search-replace-only-selection').is(":checked");
     
        if (search && replace) {
          var text = searchSelection ? selectedHtml : this.code.get();   // first is text of current selection.   second is whole text
          var replacedText = (replaceAll(text, search, replace, ignoreCase, wordBoundary));

          if (searchSelection) {
            replaceSelectionWithHtml(range, replacedText);
          } else {
            this.insert.set(replacedText);
          }
        }

        this.modal.close();
        this.selection.restore();
      }
    };

    // private functions
    function getTemplate() {
      return String()
      + '<section id="redactor-modal-search-replace">'
      + '<label>' + 'Search' + '</label>'
      + '<input type="text" size="5" id="redactor-search-replace-search" required />'
      + '<label>' + 'Replace' + '</label>'
      + '<input type="text" size="5" id="redactor-search-replace-replace" required />'
      + '<input type="checkbox" id="redactor-search-replace-ignore-case" />' + 'Ignore Case' + '</label>'
      + '<input type="checkbox" id="redactor-search-replace-word-boundary" />' + 'Match at Word Boundary' + '</label>'
      + '<input type="checkbox" id="redactor-search-replace-only-selection" />' + 'Search Only in Selection' + '</label>'
      + '</section>';
    }

    function replaceAll(string, find, replace, ignoreCase, wordBoundary) {
      var regexOption = 'g' + (ignoreCase ? 'i' : '');

      var cleanedFind = escapeRegExp(find);
      var wordBoundarieFind = wordBoundary ? '\\b' + cleanedFind + '\\b' : cleanedFind;
      var regex = new RegExp(wordBoundarieFind, regexOption);
      return string.replace(regex, replace);
    }

    function escapeRegExp(string) {
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceSelectionWithHtml(range, html) {
      var html;
      if (window.getSelection && window.getSelection().getRangeAt) {
        range.deleteContents();
        var div = document.createElement("div");
        div.innerHTML = html;
        var frag = document.createDocumentFragment(), child;
        while ((child = div.firstChild)) {
          frag.appendChild(child);
        }
        range.insertNode(frag);
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(html);
      }
    }
  };
})(jQuery);