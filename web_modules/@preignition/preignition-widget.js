import '../common/directive-9885f5ff.js';
import '../d3-selection.js';
import '../d3-transition.js';
import '../common/index-887d0098.js';
import '../d3-interpolate.js';
import { DefaultValueMixin, DoNotSetUndefinedValue } from './preignition-mixin.js';
import { h as html, c as nothing } from '../common/lit-html-a0bff75d.js';
import { LitElement, css } from '../lit-element.js';
import { f as format } from '../common/index-2d17bda4.js';
import '../d3-time.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import { D as DOMPurify, m as marked } from '../common/purify.es-a1cebf94.js';

class GridCellFlag extends LitElement {

  static get styles() {
    return css `
     :host {
        display: block;
        text-align: center;
        margin: 0 17px;
      }
    `
  }
  render() {
    return html `
      ${this.flags.map(item => html `<iron-icon icon="flag"></iron-icon>`)}
    `;
  }

  static get properties() {
    return {
      /*
       * `flags` flags to repeat
       */
      flags: {
        type: Array,
      },
    }
  }
}

// Register the new element with the browser.
customElements.define('grid-cell-flag', GridCellFlag);

class GridCellNumber extends
DefaultValueMixin(
  DoNotSetUndefinedValue(
    LitElement)) {

  static get styles() {
    return css `
     :host {
      display: block;
      text-align: center;
      margin: 0 12px;
    }

    :host(.dark) {
      color: var(--primary-background-color);
    }

    `
  }
  render() {
    if(this.backgroundScaleColor) {
      this.style['background-color'] = this.backgroundScaleColor(this.value * 1);
    }
    if(this.scaleColor) {
      this.style['color'] = this.scaleColor(this.value * 1);
    }
    return html ` 
      <span>${this.formatValue(this.value, this.format)}<span>
    `;
  }

  static get properties() {
    return {
      /*
       * `value` value to display
       */
      value: {
        type: String
      },


      /* 
       * `scale` d3.scale
       */
      scale: {
        type: Function,
        value: function() {
          return x => x * 1;
        }
      },

      scaleColor: {
        type: Function,
        // value: () => {
        //   // Note(cg): app is no more global in ESM.
        //   const app = document.querySelector('#app');
        //   return scaleLinear().domain([0, 0.5, 1]).range([app.themeColors['--paper-red-400'], app.themeColors['--paper-orange-400'], app.themeColors['--paper-green-400']]);
        // }
      },

      backgroundScaleColor: {
        type: Function
      },

      /* 
       * `format` value to be sent to d3.format 
       */
      format: {
        type: String
      }
    }
  }

  formatValue(value, stringFormat = '.0f') {
    if (value || value === 0) {
      return format(stringFormat)(this.scale(value));
    }
    return '';
  }
}

// Register the new element with the browser.
customElements.define('grid-cell-number', GridCellNumber);

class GridCellStatus extends LitElement {

  static get styles() {
    return css `
     :host {
      display: block;
      color: var(--cell-color, var(--paper-grey-400));
    }

     .online {
      color: var(--cell-online-color, var(--paper-green-400));
    }

     .idle {
      color: var(--cell-idle-color, var(--paper-orange-400));
    }
    `
  }
  render() {
    return html ` 
      <span class='${this.value}'>${this.computeValue(this.value)}<span>
    `;
  }

  static get properties() {
    return {
      /*
       * `value` value to display
       */
      value: {
        type: String
      }
    }
  }

  computeValue(d) {
    if (!d ||(Object(d) === d)) {
      return '';
    }
    var star = d === 'online' ? '★' : d === 'idle' ? '☆' : '';
    var value = d === 'signedout' ? 'signed-out' : d;
    return star + ' ' + value;
  }
}

// Register the new element with the browser.
customElements.define('grid-cell-status', GridCellStatus);

/**
 * # preignition-semantic-layout
 *
 * A responsive layout using semantic tag,
 *
 * @element preignition-semantic-layout
 * @slot header - header slot
 * @slot aside - aside slot
 * @slot footer - footer slot
 */
class SemanticLayout extends LitElement {

  static get styles() {
    return css `
     :host {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        margin: 0;
        color: var(--primary-text-color, #212121);
        --sl-header-height: 20vh;
        --sl-footer-height: 20vh;
        --sl-aside-max-width: 380px;
      }
     
      footer {
        height: var(--sl-footer-height);
      }

      header {
        text-align: center;
        height: var(--sl-header-height);
      }

      header ::slotted(h1) {
        margin-top: 20px;
        font-size: 60px;
      }

      header ::slotted(h2),
      header ::slotted(h3) {
        color: var(--secondary-text-color);
      }
      
      header, footer, article, nav, aside, section {
        padding: 1em;
      }

      /* we used <div id="main"> instead of <main> 
       * because we want to keep main at appliction level.
       */
      #main {
        display: flex;
        flex: 1;
        box-sizing: border-box;
      }

      #main > * {
        box-sizing: border-box;
      }
      
      #main-slot {
        flex: 1;
      }
      
      #main ::slotted(nav), 
      #main ::slotted(aside) {
        flex: 0 0 20vw;
        max-width: var(--sl-aside-max-width);  
      }
      
      #main ::slotted(nav) {
        order: -1;
      }
      
      #actions {
        position: fixed;
        right: 24px;
        bottom: 24px;
        --mdc-theme-secondary: var(--accent-color);
        -webkit-box-align: end;
        align-items: flex-end;
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 100;
      }

      #actions ::slotted(*)  {
        margin-top: 20px;
      }
      
      @media screen and (max-width: 992px) {
        #main {
          display: block;
        }
        #main ::slotted(nav), 
        #main ::slotted(aside) {
          max-width: initial;  
        }
      }
    `
  }
  render() {
    return html `
    ${!this.noHeader ? html `
      <header>
        <slot name="header"></slot>
      </header>` : ''}
      
      <div id="main">
        <div id="main-slot">
          <slot></slot>
        </div>
        ${!this.noAside ? html `
          <aside>
             <slot name="aside"></slot>
          </aside> ` : ''}
      </div>

      <div id="actions">
        <slot name="action"></slot>
      </div>

      ${!this.noFooter ? html `
      <footer>
        <slot name="footer"></slot>
      </footer>` : ''}
    `;
  }

  static get properties() {
    return {

      /**
       * true to hide header
       * @type {Boolean}
       */
      noHeader: {
        type: Boolean,
        attribute: 'no-header'
      },

      /**
       * true to hide footer
       * @type {Boolean}
       */
      noFooter: {
        type: Boolean,
        attribute: 'no-footer'
      },

      /**
       * true to hide aside
       * @type {Boolean}
       */
      noAside: {
        type: Boolean,
        attribute: 'no-aside'
      }
    }
  }
}

// Register the new element with the browser.
customElements.define('preignition-semantic-layout', SemanticLayout);

const parse = (markdown) => {
  if (!markdown) {
    return html`
      ${nothing}
    `;
  }

  return html`
    ${unsafeHTML(DOMPurify.sanitize(marked(markdown)))}
  `;
};

export { parse };
