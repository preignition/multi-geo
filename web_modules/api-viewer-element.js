import { d as directive } from './common/directive-9885f5ff.js';
import { h as html, c as nothing, N as NodePart } from './common/lit-html-a0bff75d.js';
import { customElement, LitElement, css, property } from './lit-element.js';
import { unsafeHTML } from './lit-html/directives/unsafe-html.js';
import { D as DOMPurify, m as marked } from './common/purify.es-a1cebf94.js';
import { until } from './lit-html/directives/until.js';
import { __decorate, __assign } from './tslib.js';
import { cache } from './lit-html/directives/cache.js';

const getSlotTitle = (name) => {
    return name === '' ? 'Default' : name[0].toUpperCase() + name.slice(1);
};
let templates = [];
const queryTemplates = (node) => {
    templates = Array.from(node.querySelectorAll('template'));
};
const isTemplate = (tpl, name) => {
    return tpl.dataset.element === name;
};
const isHostTemplate = (tpl) => {
    return tpl.dataset.target === 'host';
};
const getSlotTemplate = (name) => {
    return templates.find(t => isTemplate(t, name) && !isHostTemplate(t));
};
const hasSlotTemplate = (name) => {
    return templates.some(t => isTemplate(t, name) && !isHostTemplate(t));
};
const getHostTemplateNode = (name) => {
    const tpl = templates.find(t => isTemplate(t, name) && isHostTemplate(t));
    return tpl && tpl.content.firstElementChild;
};
const hasHostTemplate = (name) => {
    return templates.some(tpl => isTemplate(tpl, name) && isHostTemplate(tpl));
};
const isEmptyArray = (array) => array.length === 0;
const normalizeType = (type = '') => type.replace(' | undefined', '').replace(' | null', '');

const EMPTY_ELEMENT = {
    name: '',
    description: '',
    slots: [],
    attributes: [],
    properties: [],
    events: [],
    cssParts: [],
    cssProperties: []
};

const parse = (markdown) => {
    if (!markdown) {
        return html `
      ${nothing}
    `;
    }
    return html `
    ${unsafeHTML(DOMPurify.sanitize(marked(markdown)))}
  `;
};

let panelIdCounter = 0;
let ApiViewerPanel = class ApiViewerPanel extends LitElement {
    static get styles() {
        return css `
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
    }
    render() {
        return html `
      <slot></slot>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'tabpanel');
        if (!this.id) {
            this.id = `api-viewer-panel-${panelIdCounter++}`;
        }
    }
};
ApiViewerPanel = __decorate([
    customElement('api-viewer-panel')
], ApiViewerPanel);

let tabIdCounter = 0;
let ApiViewerTab = class ApiViewerTab extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = false;
        this.heading = '';
        this.active = false;
        this._mousedown = false;
    }
    static get styles() {
        return css `
      :host {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        max-width: 150px;
        overflow: hidden;
        min-height: 3rem;
        padding: 0 1rem;
        color: var(--ave-tab-color);
        font-size: 0.875rem;
        line-height: 1.2;
        font-weight: 500;
        text-transform: uppercase;
        outline: none;
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: var(--ave-tab-indicator-size);
        background-color: var(--ave-primary-color);
        opacity: 0;
      }

      :host([selected]) {
        color: var(--ave-primary-color);
      }

      :host([selected])::before {
        opacity: 1;
      }

      :host::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--ave-primary-color);
        opacity: 0;
        transition: opacity 0.1s linear;
      }

      :host(:hover)::after {
        opacity: 0.08;
      }

      :host([focus-ring])::after {
        opacity: 0.12;
      }

      :host([active])::after {
        opacity: 0.16;
      }

      @media (max-width: 600px) {
        :host {
          justify-content: center;
          text-align: center;
        }

        :host::before {
          top: auto;
          right: 0;
          width: 100%;
          height: var(--ave-tab-indicator-size);
        }
      }
    `;
    }
    render() {
        return html `
      ${this.heading}
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'tab');
        if (!this.id) {
            this.id = `api-viewer-tab-${tabIdCounter++}`;
        }
        this.addEventListener('focus', () => this._setFocused(true), true);
        this.addEventListener('blur', () => {
            this._setFocused(false);
            this._setActive(false);
        }, true);
        this.addEventListener('mousedown', () => {
            this._setActive((this._mousedown = true));
            const mouseUpListener = () => {
                this._setActive((this._mousedown = false));
                document.removeEventListener('mouseup', mouseUpListener);
            };
            document.addEventListener('mouseup', mouseUpListener);
        });
    }
    updated(props) {
        if (props.has('selected')) {
            this.setAttribute('aria-selected', String(this.selected));
            this.setAttribute('tabindex', this.selected ? '0' : '-1');
        }
    }
    _setActive(active) {
        this.toggleAttribute('active', active);
    }
    _setFocused(focused) {
        this.toggleAttribute('focused', focused);
        this.toggleAttribute('focus-ring', focused && !this._mousedown);
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ApiViewerTab.prototype, "selected", void 0);
__decorate([
    property({ type: String })
], ApiViewerTab.prototype, "heading", void 0);
__decorate([
    property({ type: Boolean })
], ApiViewerTab.prototype, "active", void 0);
ApiViewerTab = __decorate([
    customElement('api-viewer-tab')
], ApiViewerTab);

const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35
};
let ApiViewerTabs = class ApiViewerTabs extends LitElement {
    constructor() {
        super(...arguments);
        this._boundSlotChange = this._onSlotChange.bind(this);
    }
    static get styles() {
        return css `
      :host {
        display: flex;
      }

      .tabs {
        display: block;
      }

      @media (max-width: 600px) {
        :host {
          flex-direction: column;
        }

        .tabs {
          flex-grow: 1;
          display: flex;
          align-self: stretch;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    }
    render() {
        return html `
      <div class="tabs">
        <slot name="tab"></slot>
      </div>
      <slot name="panel"></slot>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'tablist');
        this.addEventListener('keydown', this._onKeyDown);
        this.addEventListener('click', this._onClick);
        const [tabSlot, panelSlot] = Array.from(this.renderRoot.querySelectorAll('slot'));
        if (tabSlot && panelSlot) {
            tabSlot.addEventListener('slotchange', this._boundSlotChange);
            panelSlot.addEventListener('slotchange', this._boundSlotChange);
        }
        Promise.all([...this._allTabs(), ...this._allPanels()].map(el => el.updateComplete)).then(() => {
            this._linkPanels();
        });
    }
    _onSlotChange() {
        this._linkPanels();
    }
    _linkPanels() {
        const tabs = this._allTabs();
        tabs.forEach(tab => {
            const panel = tab.nextElementSibling;
            tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', tab.id);
        });
        const selectedTab = tabs.find(tab => tab.selected) || tabs[0];
        this._selectTab(selectedTab);
    }
    _allPanels() {
        return Array.from(this.querySelectorAll('api-viewer-panel'));
    }
    _allTabs() {
        return Array.from(this.querySelectorAll('api-viewer-tab'));
    }
    _getAvailableIndex(idx, increment) {
        const tabs = this._allTabs();
        const total = tabs.length;
        for (let i = 0; typeof idx === 'number' && i < total; i++, idx += increment || 1) {
            if (idx < 0) {
                idx = total - 1;
            }
            else if (idx >= total) {
                idx = 0;
            }
            const tab = tabs[idx];
            if (!tab.hasAttribute('hidden')) {
                return idx;
            }
        }
        return -1;
    }
    _panelForTab(tab) {
        const panelId = tab.getAttribute('aria-controls');
        return this.querySelector(`#${panelId}`);
    }
    _prevTab() {
        const tabs = this._allTabs();
        const newIdx = this._getAvailableIndex(tabs.findIndex(tab => tab.selected) - 1, -1);
        return tabs[(newIdx + tabs.length) % tabs.length];
    }
    _firstTab() {
        const tabs = this._allTabs();
        return tabs[0];
    }
    _lastTab() {
        const tabs = this._allTabs();
        return tabs[tabs.length - 1];
    }
    _nextTab() {
        const tabs = this._allTabs();
        const newIdx = this._getAvailableIndex(tabs.findIndex(tab => tab.selected) + 1, 1);
        return tabs[newIdx % tabs.length];
    }
    /**
     * `reset()` marks all tabs as deselected and hides all the panels.
     */
    reset() {
        const tabs = this._allTabs();
        const panels = this._allPanels();
        tabs.forEach(tab => {
            tab.selected = false;
        });
        panels.forEach(panel => {
            panel.hidden = true;
        });
    }
    /**
     * `selectFirst()` automatically selects first non-hidden tab.
     */
    selectFirst() {
        const tabs = this._allTabs();
        const idx = this._getAvailableIndex(0, 1);
        this._selectTab(tabs[idx % tabs.length]);
    }
    _selectTab(newTab) {
        this.reset();
        const newPanel = this._panelForTab(newTab);
        if (!newPanel) {
            throw new Error('No panel with for tab');
        }
        newTab.selected = true;
        newPanel.hidden = false;
    }
    _onKeyDown(event) {
        const { target } = event;
        if ((target && target instanceof ApiViewerTab) === false) {
            return;
        }
        if (event.altKey) {
            return;
        }
        let newTab;
        switch (event.keyCode) {
            case KEYCODE.LEFT:
            case KEYCODE.UP:
                newTab = this._prevTab();
                break;
            case KEYCODE.RIGHT:
            case KEYCODE.DOWN:
                newTab = this._nextTab();
                break;
            case KEYCODE.HOME:
                newTab = this._firstTab();
                break;
            case KEYCODE.END:
                newTab = this._lastTab();
                break;
            default:
                return;
        }
        event.preventDefault();
        this._selectTab(newTab);
        newTab.focus();
    }
    _onClick(event) {
        const { target } = event;
        if (target && target instanceof ApiViewerTab) {
            this._selectTab(target);
            target.focus();
        }
    }
};
ApiViewerTabs = __decorate([
    customElement('api-viewer-tabs')
], ApiViewerTabs);

/* eslint-enable import/no-duplicates */
const processAttrs = (attrs, props) => {
    return attrs.filter(({ name }) => !props.some(prop => prop.attribute === name || prop.name === name));
};
const renderItem = (name, description, valueType, attribute, value) => {
    return html `
    <div part="docs-item">
      <div part="docs-row">
        <div part="docs-column">
          <div part="docs-label">Name</div>
          <div part="docs-value" class="accent">${name}</div>
        </div>
        ${attribute === undefined
        ? nothing
        : html `
              <div part="docs-column">
                <div part="docs-label">Attribute</div>
                <div part="docs-value">${attribute}</div>
              </div>
            `}
        ${valueType === undefined
        ? nothing
        : html `
              <div part="docs-column" class="column-type">
                <div part="docs-label">Type</div>
                <div part="docs-value">
                  ${valueType}
                  ${value === undefined
            ? nothing
            : html `
                        = <span class="accent">${value}</span>
                      `}
                </div>
              </div>
            `}
      </div>
      <div ?hidden="${description === undefined}">
        <div part="docs-label">Description</div>
        <div part="docs-markdown">${parse(description)}</div>
      </div>
    </div>
  `;
};
const renderTab = (heading, count, content) => {
    const hidden = count === 0;
    return html `
    <api-viewer-tab
      heading="${heading}"
      slot="tab"
      part="tab"
      ?hidden="${hidden}"
    ></api-viewer-tab>
    <api-viewer-panel slot="panel" part="tab-panel" ?hidden="${hidden}">
      ${content}
    </api-viewer-panel>
  `;
};
let ApiViewerDocs = class ApiViewerDocs extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.props = [];
        this.attrs = [];
        this.slots = [];
        this.events = [];
        this.cssParts = [];
        this.cssProps = [];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { slots, props, attrs, events, cssParts, cssProps } = this;
        const properties = props || [];
        const attributes = processAttrs(attrs || [], properties);
        const emptyDocs = [
            properties,
            attributes,
            slots,
            events,
            cssProps,
            cssParts
        ].every(isEmptyArray);
        return emptyDocs
            ? html `
          <div part="warning">
            The element &lt;${this.name}&gt; does not provide any documented
            API.
          </div>
        `
            : html `
          <api-viewer-tabs>
            ${renderTab('Properties', properties.length, html `
                ${properties.map(prop => {
                const { name, description, type, attribute } = prop;
                return renderItem(name, description, type, attribute, prop.default);
            })}
              `)}
            ${renderTab('Attributes', attributes.length, html `
                ${attributes.map(({ name, description, type }) => renderItem(name, description, type))}
              `)}
            ${renderTab('Slots', slots.length, html `
                ${slots.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('Events', events.length, html `
                ${events.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('CSS Custom Properties', cssProps.length, html `
                ${cssProps.map(({ name, description }) => renderItem(name, description))}
              `)}
            ${renderTab('CSS Shadow Parts', cssParts.length, html `
                ${cssParts.map(({ name, description }) => renderItem(name, description))}
              `)}
          </api-viewer-tabs>
        `;
    }
    updated(props) {
        if (props.has('name') && props.get('name')) {
            const tabs = this.renderRoot.querySelector('api-viewer-tabs');
            if (tabs instanceof ApiViewerTabs) {
                tabs.selectFirst();
            }
        }
    }
};
__decorate([
    property({ type: String })
], ApiViewerDocs.prototype, "name", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "props", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "attrs", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "events", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "cssParts", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDocs.prototype, "cssProps", void 0);
ApiViewerDocs = __decorate([
    customElement('api-viewer-docs')
], ApiViewerDocs);

const caches = new WeakMap();
const applyKnobs = (component, knobs) => {
    Object.keys(knobs).forEach((key) => {
        const { type, attribute, value } = knobs[key];
        if (normalizeType(type) === 'boolean') {
            component.toggleAttribute(attribute || key, Boolean(value));
        }
        else {
            component[key] = value;
        }
    });
};
const applySlots = (component, slots) => {
    while (component.firstChild) {
        component.removeChild(component.firstChild);
    }
    slots.forEach(slot => {
        const div = document.createElement('div');
        const { name, content } = slot;
        if (name) {
            div.setAttribute('slot', name);
        }
        div.textContent = content;
        component.appendChild(div);
    });
};
const applyCssProps = (component, cssProps) => {
    cssProps.forEach(prop => {
        const { name, value } = prop;
        if (value) {
            if (value === prop.defaultValue) {
                component.style.removeProperty(name);
            }
            else {
                component.style.setProperty(name, value);
            }
        }
    });
};
const isDefinedPromise = (action) => typeof action === 'object' && Promise.resolve(action) === action;
/**
 * Awaits for "update complete promises" of elements
 * - for [lit-element](https://github.com/polymer/lit-element) that is `el.updateComplete`;
 * - for [stencil](https://github.com/ionic-team/stencil/) that is `el.componentOnReady()`;
 *
 * If none of those Promise hooks are found, it will wait for `setTimeout`.
 */
async function elementUpdated(element) {
    let hasSpecificAwait = false;
    const el = element;
    const litPromise = el.updateComplete;
    if (isDefinedPromise(litPromise)) {
        await litPromise;
        hasSpecificAwait = true;
    }
    const stencilPromise = el.componentOnReady ? el.componentOnReady() : false;
    if (isDefinedPromise(stencilPromise)) {
        await stencilPromise;
        hasSpecificAwait = true;
    }
    if (!hasSpecificAwait) {
        await new Promise(resolve => setTimeout(() => resolve()));
    }
    return el;
}
const renderer = directive((tag, knobs, slots, cssProps) => (part) => {
    if (!(part instanceof NodePart)) {
        throw new Error('renderer can only be used in text bindings');
    }
    let component = caches.get(part);
    if (component === undefined || component.tagName.toLowerCase() !== tag) {
        const node = getHostTemplateNode(tag);
        if (node) {
            component = node.cloneNode(true);
        }
        else {
            component = document.createElement(tag);
        }
        part.setValue(component);
        part.commit();
        const template = getSlotTemplate(tag);
        if (template instanceof HTMLTemplateElement) {
            const clone = document.importNode(template.content, true);
            component.appendChild(clone);
        }
        caches.set(part, component);
        const instance = part.value;
        // wait for rendering
        elementUpdated(instance).then(() => {
            instance.dispatchEvent(new CustomEvent('rendered', {
                detail: {
                    component
                },
                bubbles: true,
                composed: true
            }));
        });
    }
    applyKnobs(component, knobs);
    if (!hasSlotTemplate(tag) && slots.length) {
        applySlots(component, slots);
    }
    if (cssProps.length) {
        applyCssProps(component, cssProps);
    }
});

const getInputType = (type) => {
    switch (normalizeType(type)) {
        case 'boolean':
            return 'checkbox';
        case 'number':
            return 'number';
        default:
            return 'text';
    }
};
const cssPropRenderer = (knob, id) => {
    const { name, value } = knob;
    return html `
    <input
      id="${id}"
      type="text"
      .value="${String(value)}"
      data-name="${name}"
      part="input"
    />
  `;
};
const propRenderer = (knob, id) => {
    const { name, type, value } = knob;
    const inputType = getInputType(type);
    let input;
    if (value === undefined) {
        input = html `
      <input
        id="${id}"
        type="${inputType}"
        data-name="${name}"
        data-type="${type}"
        part="input"
      />
    `;
    }
    else if (normalizeType(type) === 'boolean') {
        input = html `
      <input
        id="${id}"
        type="checkbox"
        .checked="${Boolean(value)}"
        data-name="${name}"
        data-type="${type}"
        part="checkbox"
      />
    `;
    }
    else {
        input = html `
      <input
        id="${id}"
        type="${inputType}"
        .value="${String(value)}"
        data-name="${name}"
        data-type="${type}"
        part="input"
      />
    `;
    }
    return input;
};
const slotRenderer = (knob, id) => {
    const { name, content } = knob;
    return html `
    <input
      id="${id}"
      type="text"
      .value="${content}"
      data-type="slot"
      data-slot="${name}"
      part="input"
    />
  `;
};
const renderKnobs = (items, type, renderer) => {
    const rows = items.map((item) => {
        const { name } = item;
        const id = `${type}-${name || 'default'}`;
        const label = type === 'slot' ? getSlotTitle(name) : name;
        return html `
      <tr>
        <td>
          <label for="${id}" part="knob-label">${label}</label>
        </td>
        <td>${renderer(item, id)}</td>
      </tr>
    `;
    });
    return html `
    <table>
      ${rows}
    </table>
  `;
};

function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
var htmlRender = {
    text: function (chunk) { return escape(chunk); },
    join: function (chunks) { return chunks.join(''); },
    wrap: function (className, chunk) { return "<span class=\"" + className + "\">" + chunk + "</span>"; }
};

function reStr(re) {
    return (re && re.source) || re;
}
var noneRe = { exec: function ( /*s*/) { return null; } };
function langRe(language, value, global) {
    return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
}
function compileLanguage(language) {
    var cached_modes = [];
    function getCompiled(sub) {
        for (var _i = 0, cached_modes_1 = cached_modes; _i < cached_modes_1.length; _i++) {
            var _a = cached_modes_1[_i], mode = _a[0], compiled_1 = _a[1];
            if (sub === mode) {
                return compiled_1;
            }
        }
    }
    var cached_variants = [];
    function getVariants(mode) {
        if (!mode.variants || !mode.variants.length) {
            return undefined;
        }
        for (var _i = 0, cached_variants_1 = cached_variants; _i < cached_variants_1.length; _i++) {
            var _a = cached_variants_1[_i], mode_ = _a[0], variants_1 = _a[1];
            if (mode === mode_) {
                return variants_1;
            }
        }
        var variants = mode.variants.map(function (variant) { return (__assign({}, mode, { variants: undefined }, variant)); });
        cached_variants.push([mode, variants]);
        return variants;
    }
    function compileMode(mode, parent, parent_terminator_end) {
        var already_compiled = getCompiled(mode);
        if (already_compiled) {
            return already_compiled;
        }
        var compiled = {
            lexemesRe: langRe(language, mode.lexemes || /\w+/, true),
            relevance: mode.relevance == null ? 1 : mode.relevance,
            contains: [],
            terminators: noneRe,
            subLanguage: mode.subLanguage == null ? undefined :
                typeof mode.subLanguage == 'string' ? [mode.subLanguage] :
                    mode.subLanguage
        };
        cached_modes.push([mode, compiled]);
        if (mode.className) {
            compiled.className = mode.className;
        }
        if (mode.illegal) {
            compiled.illegalRe = langRe(language, mode.illegal);
        }
        for (var _i = 0, _a = ['endsParent', 'endsWithParent', 'skip', 'excludeBegin', 'excludeEnd', 'returnBegin', 'returnEnd']; _i < _a.length; _i++) {
            var key = _a[_i];
            if (mode[key]) {
                compiled[key] = true;
            }
        }
        // compile parenthes
        var compiled_terminator_end;
        if (parent) {
            var begin = mode.beginKeywords ?
                ("\\b(" + mode.beginKeywords.split(/\s+/).join('|') + ")\\b") :
                (mode.begin || /\B|\b/);
            mode.begin = begin;
            compiled.beginRe = langRe(language, begin);
            var end = !mode.end && !mode.endsWithParent ? /\B|\b/ : mode.end;
            if (end) {
                mode.end = end;
                compiled.endRe = langRe(language, end);
            }
            compiled_terminator_end = reStr(end) || '';
            if (mode.endsWithParent && parent_terminator_end) {
                compiled_terminator_end += (end ? '|' : '') + parent_terminator_end;
            }
        }
        // compile keywords
        var keywords = mode.keywords || mode.beginKeywords;
        if (keywords) {
            var compiled_keywords_1 = {};
            var flatten = function (className, str) {
                if (language.case_insensitive) {
                    str = str.toLowerCase();
                }
                var kws = str.split(/\s+/);
                for (var _i = 0, kws_1 = kws; _i < kws_1.length; _i++) {
                    var kw = kws_1[_i];
                    var _a = kw.split(/\|/), key = _a[0], rel = _a[1];
                    compiled_keywords_1[key] = [className, rel ? Number(rel) : 1];
                }
            };
            if (typeof keywords == 'string') { // string
                flatten('keyword', keywords);
            }
            else {
                for (var className in keywords) {
                    flatten(className, keywords[className]);
                }
            }
            compiled.keywords = compiled_keywords_1;
        }
        // compile contains
        var contains = [];
        if (mode.contains && mode.contains.length) {
            // expand mode
            for (var _b = 0, _c = mode.contains; _b < _c.length; _b++) {
                var child = _c[_b];
                var sub = child === 'self' ? mode : child;
                var variants = getVariants(sub) || (sub.endsWithParent && [__assign({}, sub)]) || [sub];
                for (var _d = 0, variants_2 = variants; _d < variants_2.length; _d++) {
                    var variant = variants_2[_d];
                    contains.push(variant);
                }
            }
            compiled.contains = contains.map(function (child) { return compileMode(child, compiled, compiled_terminator_end); });
        }
        if (mode.starts) {
            compiled.starts = compileMode(mode.starts, parent, parent_terminator_end);
        }
        var terminators = contains.map(function (child) { return child.beginKeywords ? "\\.?(" + child.begin + ")\\.?" : child.begin; }).concat([
            compiled_terminator_end,
            mode.illegal
        ]).map(reStr).filter(Boolean);
        if (terminators.length)
            compiled.terminators = langRe(language, terminators.join('|'), true);
        return compiled;
    }
    var compiled = compileMode(language);
    if (language.case_insensitive)
        compiled.case_insensitive = true;
    return compiled;
}

// Global internal variables used within the highlight.js library.
var languages = {};
var aliases = {};
function compiledLanguage(language) {
    return 'lexemesRe' in language;
}
function registerLanguage(language) {
    languages[language.name] = language;
    if (language.aliases) {
        for (var _i = 0, _a = language.aliases; _i < _a.length; _i++) {
            var alias = _a[_i];
            aliases[alias] = language.name;
        }
    }
}
function registerLanguages() {
    var languages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        languages[_i] = arguments[_i];
    }
    for (var _a = 0, languages_1 = languages; _a < languages_1.length; _a++) {
        var language = languages_1[_a];
        registerLanguage(language);
    }
}
function listLanguages() {
    return Object.keys(languages);
}
function getLanguage(name) {
    name = (name || '').toLowerCase();
    name = aliases[name] || name;
    var language = languages[name];
    if (!language) {
        return undefined;
    }
    if (compiledLanguage(language)) {
        return language;
    }
    return languages[name] = compileLanguage(language);
}

var NUMBER_RE = '\\b\\d+(\\.\\d+)?';
// Common modes
var BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]',
    relevance: 0
};
var APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [BACKSLASH_ESCAPE]
};
var QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [BACKSLASH_ESCAPE]
};
var PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
function COMMENT(begin, end, inherits) {
    if (inherits === void 0) { inherits = {}; }
    var mode = __assign({ className: 'comment', begin: begin, end: end, contains: [] }, inherits);
    var contains = mode.contains;
    if (contains) {
        contains.push(PHRASAL_WORDS_MODE);
        contains.push({
            className: 'doctag',
            begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
            relevance: 0
        });
    }
    return mode;
}
var C_LINE_COMMENT_MODE = COMMENT('//', '$');
var C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
var HASH_COMMENT_MODE = COMMENT('#', '$');
var CSS_NUMBER_MODE = {
    className: 'number',
    begin: NUMBER_RE + '(' +
        '%|em|ex|ch|rem' +
        '|vw|vh|vmin|vmax' +
        '|cm|mm|in|pt|pc|px' +
        '|deg|grad|rad|turn' +
        '|s|ms' +
        '|Hz|kHz' +
        '|dpi|dpcm|dppx' +
        ')?',
    relevance: 0
};

/*
Language: HTML, XML
Category: common
*/
var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
        {
            className: 'attr',
            begin: XML_IDENT_RE,
            relevance: 0
        },
        {
            begin: /=\s*/,
            relevance: 0,
            contains: [
                {
                    className: 'string',
                    endsParent: true,
                    variants: [
                        { begin: /"/, end: /"/ },
                        { begin: /'/, end: /'/ },
                        { begin: /[^\s"'=<>`]+/ }
                    ]
                }
            ]
        }
    ]
};
var XML = {
    name: 'xml',
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist'],
    case_insensitive: true,
    contains: [
        {
            className: 'meta',
            begin: '<!DOCTYPE', end: '>',
            relevance: 10,
            contains: [{ begin: '\\[', end: '\\]' }]
        },
        COMMENT('<!--', '-->', {
            relevance: 10
        }),
        {
            begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
            relevance: 10
        },
        {
            className: 'meta',
            begin: /<\?xml/, end: /\?>/, relevance: 10
        },
        {
            begin: /<\?(php)?/, end: /\?>/,
            subLanguage: 'php',
            contains: [{ begin: '/\\*', end: '\\*/', skip: true }]
        },
        {
            className: 'tag',
            /*
            The lookahead pattern (?=...) ensures that 'begin' only matches
            '<style' as a single word, followed by a whitespace or an
            ending braket. The '$' is needed for the lexeme to be recognized
            by subMode() that tests lexemes outside the stream.
            */
            begin: '<style(?=\\s|>|$)', end: '>',
            keywords: { name: 'style' },
            contains: [TAG_INTERNALS],
            starts: {
                end: '</style>', returnEnd: true,
                subLanguage: ['css', 'xml']
            }
        },
        {
            className: 'tag',
            // See the comment in the <style tag about the lookahead pattern
            begin: '<script(?=\\s|>|$)', end: '>',
            keywords: { name: 'script' },
            contains: [TAG_INTERNALS],
            starts: {
                end: '\<\/script\>', returnEnd: true,
                subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
            }
        },
        {
            className: 'tag',
            begin: '</?', end: '/?>',
            contains: [
                {
                    className: 'name', begin: /[^\/><\s]+/, relevance: 0
                },
                TAG_INTERNALS
            ]
        }
    ]
};

/* Utility functions */
function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0 || false;
}
/*
Core highlighting function. Accepts a language name, or an alias, and a
string with the code to highlight. Returns an object with the following
properties:
- relevance (int)
- value (an HTML string with highlighting markup)
*/
function highlight(options, render, lang, value, ignore_illegals, continuation) {
    var output = [{ content: [] }];
    function outContent(content) {
        var cont = output[0].content;
        // optimization for sequential strings outputs
        if (typeof content == 'string' && cont.length &&
            typeof cont[cont.length - 1] == 'string') {
            cont[cont.length - 1] += content;
        }
        else {
            cont.push(content);
        }
    }
    function outText(text) {
        outContent(render.text(text));
    }
    function openSpan(className, noPrefix) {
        if (!noPrefix)
            className = options.classPrefix + className;
        output.unshift({ className: className, content: [] });
    }
    function wrapSpan(className) {
        className = options.classPrefix + className;
        output.push({ className: className, content: [] });
    }
    function closeSpan() {
        if (output.length < 2)
            throw "unbalanced";
        var _a = output.shift(), className = _a.className, content = _a.content;
        var output_ = render.join(content);
        outContent(className ? render.wrap(className, output_) : output_);
    }
    function endOfMode(mode, lexeme) {
        if (testRe(mode.endRe, lexeme)) {
            for (; mode.endsParent && mode.parent; mode = mode.parent)
                ;
            return mode;
        }
        if (mode.endsWithParent && mode.parent) {
            return endOfMode(mode.parent, lexeme);
        }
    }
    function processKeywords() {
        if (!top.keywords) {
            outText(mode_buffer);
            return;
        }
        var last_index = 0;
        top.lexemesRe.lastIndex = 0;
        var match = top.lexemesRe.exec(mode_buffer);
        while (match) {
            outText(mode_buffer.substring(last_index, match.index));
            // match keyword
            var match_str = language.case_insensitive ?
                match[0].toLowerCase() : match[0];
            var keyword_match = top.keywords.hasOwnProperty(match_str) &&
                top.keywords[match_str];
            if (keyword_match) {
                relevance += keyword_match[1];
                openSpan(keyword_match[0], false);
                outText(match[0]);
                closeSpan();
            }
            else {
                outText(match[0]);
            }
            last_index = top.lexemesRe.lastIndex;
            match = top.lexemesRe.exec(mode_buffer);
        }
        outText(mode_buffer.substr(last_index));
    }
    function processSubLanguage(subLanguage) {
        var explicitLanguage = subLanguage.length == 1 && subLanguage[0];
        if (explicitLanguage && !getLanguage(explicitLanguage)) {
            outText(mode_buffer);
            return;
        }
        var result = explicitLanguage ?
            highlight(options, render, explicitLanguage, mode_buffer, true, continuations[explicitLanguage]) :
            highlightAuto(options, render, mode_buffer, subLanguage.length ? top.subLanguage : undefined);
        // Counting embedded language score towards the host language may be disabled
        // with zeroing the containing mode relevance. Usecase in point is Markdown that
        // allows XML everywhere and makes every XML snippet to have a much larger Markdown
        // score.
        if (top.relevance > 0) {
            relevance += result.relevance;
        }
        if (explicitLanguage && result.top) {
            continuations[explicitLanguage] = result.top;
        }
        openSpan(result.language, true);
        outContent(result.value);
        closeSpan();
    }
    function processBuffer() {
        if (top.subLanguage != null)
            processSubLanguage(top.subLanguage);
        else
            processKeywords();
        mode_buffer = '';
    }
    function startNewMode(mode) {
        if (mode.className) {
            openSpan(mode.className, false);
        }
        top = Object.create(mode, { parent: { value: top } });
    }
    function processLexeme(buffer, lexeme) {
        mode_buffer += buffer;
        if (lexeme == null) {
            processBuffer();
            return 0;
        }
        var new_mode;
        // subMode(top, lexeme)
        for (var _i = 0, _a = top.contains; _i < _a.length; _i++) {
            var sub = _a[_i];
            if (testRe(sub.beginRe, lexeme)) {
                new_mode = sub;
                break;
            }
        }
        if (new_mode) {
            if (new_mode.skip) {
                mode_buffer += lexeme;
            }
            else {
                if (new_mode.excludeBegin) {
                    mode_buffer += lexeme;
                }
                processBuffer();
                if (!new_mode.returnBegin && !new_mode.excludeBegin) {
                    mode_buffer = lexeme;
                }
            }
            startNewMode(new_mode /*, lexeme*/);
            return new_mode.returnBegin ? 0 : lexeme.length;
        }
        var end_mode = endOfMode(top, lexeme);
        if (end_mode) {
            var origin_1 = top;
            if (origin_1.skip) {
                mode_buffer += lexeme;
            }
            else {
                if (!(origin_1.returnEnd || origin_1.excludeEnd)) {
                    mode_buffer += lexeme;
                }
                processBuffer();
                if (origin_1.excludeEnd) {
                    mode_buffer = lexeme;
                }
            }
            do {
                if (top.className) {
                    closeSpan();
                }
                if (!top.skip && !top.subLanguage) {
                    relevance += top.relevance;
                }
                top = top.parent;
            } while (top !== end_mode.parent);
            if (end_mode.starts) {
                startNewMode(end_mode.starts /*, ''*/);
            }
            return origin_1.returnEnd ? 0 : lexeme.length;
        }
        // is illegal
        if (!ignore_illegals && testRe(top.illegalRe, lexeme)) {
            throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        }
        /*
        Parser should not reach this point as all types of lexemes should be caught
        earlier, but if it does due to some bug make sure it advances at least one
        character forward to prevent infinite looping.
        */
        mode_buffer += lexeme;
        return lexeme.length || 1;
    }
    var language = getLanguage(lang);
    if (!language)
        throw new Error("Unknown language: \"" + lang + "\"");
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var current;
    for (current = top; current && current !== language; current = current.parent) {
        if (current.className) {
            wrapSpan(current.className);
        }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
        var match = void 0, count = void 0, index = 0;
        while (true) {
            top.terminators.lastIndex = index;
            match = top.terminators.exec(value);
            if (!match)
                break;
            count = processLexeme(value.substring(index, match.index), match[0]);
            index = match.index + count;
        }
        processLexeme(value.substr(index));
        for (current = top; current.parent; current = current.parent) { // close dangling modes
            if (current.className) {
                closeSpan();
            }
        }
        if (output.length != 1)
            throw "unbalanced";
        var _a = output[0], className = _a.className, content = _a.content;
        var output_ = render.join(content);
        var result = className ? render.wrap(className, output_) : output_;
        return {
            language: lang,
            relevance: relevance,
            value: result,
            top: top
        };
    }
    catch (e) {
        if (e.message && e.message.indexOf('Illegal') !== -1) {
            return {
                language: lang,
                relevance: 0,
                value: render.text(value)
            };
        }
        else {
            throw e;
        }
    }
}
/*
Highlighting with language detection. Accepts a string with the code to
highlight. Returns an object with the following properties:
- language (detected language)
- relevance (int)
- value (an HTML string with highlighting markup)
- second_best (object with the same structure for second-best heuristically
  detected language, may be absent)
*/
function highlightAuto(options, render, text, languageSubset) {
    if (languageSubset === void 0) { languageSubset = options.languages || listLanguages(); }
    var result = {
        language: '',
        relevance: 0,
        value: render.text(text)
    };
    if (text != '') {
        var second_best = result;
        var languages = languageSubset.filter(getLanguage);
        for (var _i = 0, languages_1 = languages; _i < languages_1.length; _i++) {
            var lang = languages_1[_i];
            var current = highlight(options, render, lang, text, false);
            if (current.relevance > second_best.relevance) {
                second_best = current;
            }
            if (current.relevance > result.relevance) {
                second_best = result;
                result = current;
            }
        }
        if (second_best.language) {
            result.second_best = second_best;
        }
    }
    return result;
}
var defaults = {
    classPrefix: 'hljs-',
    //tabReplace: undefined,
    useBr: false,
};
function init(render, options) {
    if (options === void 0) { options = {}; }
    return {
        render: render,
        options: __assign({}, defaults, options)
    };
}
function process(_a, source, lang) {
    var render = _a.render, options = _a.options;
    return typeof lang == 'string' ? highlight(options, render, lang, source, false) :
        highlightAuto(options, render, source, lang);
}

const FUNCTION_LIKE = {
    begin: /[\w-]+\(/,
    returnBegin: true,
    contains: [
        {
            className: 'built_in',
            begin: /[\w-]+/
        },
        {
            begin: /\(/,
            end: /\)/,
            contains: [APOS_STRING_MODE, QUOTE_STRING_MODE, CSS_NUMBER_MODE]
        }
    ]
};
const ATTRIBUTE = {
    className: 'attribute',
    begin: /\S/,
    end: ':',
    excludeEnd: true,
    starts: {
        endsWithParent: true,
        excludeEnd: true,
        contains: [
            FUNCTION_LIKE,
            CSS_NUMBER_MODE,
            QUOTE_STRING_MODE,
            APOS_STRING_MODE,
            C_BLOCK_COMMENT_MODE,
            {
                className: 'number',
                begin: '#[0-9A-Fa-f]+'
            },
            {
                className: 'meta',
                begin: '!important'
            }
        ]
    }
};
const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
const RULE = {
    begin: /(?:[A-Z_.-]+|--[a-zA-Z0-9_-]+)\s*:/,
    returnBegin: true,
    end: ';',
    endsWithParent: true,
    contains: [ATTRIBUTE]
};
const CSS = {
    name: 'css',
    case_insensitive: true,
    illegal: /[=/|'$]/,
    contains: [
        C_BLOCK_COMMENT_MODE,
        {
            className: 'selector-attr',
            begin: /\[/,
            end: /\]/,
            illegal: '$',
            contains: [APOS_STRING_MODE, QUOTE_STRING_MODE]
        },
        {
            className: 'selector-tag',
            begin: IDENT_RE,
            relevance: 0
        },
        {
            begin: '{',
            end: '}',
            illegal: /\S/,
            contains: [C_BLOCK_COMMENT_MODE, RULE]
        }
    ]
};

var highlightTheme = css `
  pre {
    margin: 0;
    color: black;
    background: none;
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    text-shadow: none;
  }

  code {
    font-family: inherit;
  }

  .comment {
    color: slategray;
  }

  .attr,
  .selector-tag {
    color: #690;
  }

  .css {
    color: #333;
  }

  .built_in {
    color: #dd4a68;
  }

  .meta {
    color: #e90;
    font-weight: bold;
  }

  .string {
    color: #07a;
  }

  .tag {
    color: #999;
  }

  .attribute,
  .name,
  .number {
    color: #905;
  }
`;

// register languages
registerLanguages(CSS, XML);
// initialize highlighter
const highlighter = init(htmlRender, {
    classPrefix: ''
});
const INDENT = '  ';
const unindent = (text) => {
    if (!text)
        return text;
    const lines = text.replace(/\t/g, INDENT).split('\n');
    const indent = lines.reduce((prev, line) => {
        if (/^\s*$/.test(line))
            return prev; // Completely ignore blank lines.
        const match = line.match(/^(\s*)/);
        const lineIndent = match && match[0].length;
        if (prev === null)
            return lineIndent;
        return lineIndent < prev ? lineIndent : prev;
    }, null);
    return lines.map(l => INDENT + l.substr(indent)).join('\n');
};
const renderSnippet = (tag, values, slots, cssProps) => {
    let markup = `<${tag}`;
    Object.keys(values)
        .sort((a, b) => (a > b ? 1 : -1))
        .forEach((key) => {
        const knob = values[key];
        const attr = knob.attribute || key;
        switch (normalizeType(knob.type)) {
            case 'boolean':
                markup += knob.value ? ` ${attr}` : '';
                break;
            default:
                markup += knob.value != null ? ` ${attr}="${knob.value}"` : '';
                break;
        }
    });
    markup += `>`;
    const template = getSlotTemplate(tag);
    if (template instanceof HTMLTemplateElement) {
        const tpl = template.innerHTML.replace(/\s+$/, '').replace(/(="")/g, '');
        markup += unindent(tpl);
        markup += `\n`;
    }
    else if (slots.length) {
        slots.forEach(slot => {
            const { name, content } = slot;
            const div = name ? `<div slot="${name}">` : '<div>';
            markup += `\n${INDENT}${div}${content}</div>`;
        });
        markup += `\n`;
    }
    markup += `</${tag}>`;
    const cssValues = cssProps.filter(p => p.value !== p.defaultValue);
    if (cssValues.length) {
        markup += `\n<style>\n${INDENT}${tag} {\n`;
        cssValues.forEach(prop => {
            if (prop.value) {
                markup += `${INDENT}${INDENT}${prop.name}: ${prop.value};\n`;
            }
        });
        markup += `${INDENT}}\n</style>`;
    }
    const { value } = process(highlighter, markup, ['xml', 'css']);
    return html `
    <pre><code>${unsafeHTML(value)}</code></pre>
  `;
};
let ApiViewerDemoSnippet = class ApiViewerDemoSnippet extends LitElement {
    constructor() {
        super(...arguments);
        this.tag = '';
        this.knobs = {};
        this.slots = [];
        this.cssProps = [];
    }
    static get styles() {
        return [
            highlightTheme,
            css `
        :host {
          display: block;
          padding: 0.75rem 1rem;
        }
      `
        ];
    }
    render() {
        return html `
      ${renderSnippet(this.tag, this.knobs, this.slots, this.cssProps)}
    `;
    }
    get source() {
        return this.renderRoot.querySelector('code');
    }
};
__decorate([
    property({ type: String })
], ApiViewerDemoSnippet.prototype, "tag", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoSnippet.prototype, "knobs", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoSnippet.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoSnippet.prototype, "cssProps", void 0);
ApiViewerDemoSnippet = __decorate([
    customElement('api-viewer-demo-snippet')
], ApiViewerDemoSnippet);

const renderDetail = (detail) => {
    const result = detail;
    if ('value' in detail && detail.value === undefined) {
        result.value = 'undefined';
    }
    return JSON.stringify(detail).replace('"undefined"', 'undefined');
};
const renderEvents = (log) => {
    return html `
    ${log.map(e => {
        return html `
        <p part="event-record">
          event: "${e.type}". detail: ${renderDetail(e.detail)}
        </p>
      `;
    })}
  `;
};
let ApiViewerDemoEvents = class ApiViewerDemoEvents extends LitElement {
    constructor() {
        super(...arguments);
        this.log = [];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { log } = this;
        return html `
      <button
        @click="${this._onClearClick}"
        ?hidden="${!log.length}"
        part="button"
      >
        Clear
      </button>
      ${cache(log.length
            ? renderEvents(log)
            : html `
              <p part="event-record">
                Interact with component to see the event log.
              </p>
            `)}
    `;
    }
    _onClearClick() {
        this.dispatchEvent(new CustomEvent('clear'));
    }
};
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoEvents.prototype, "log", void 0);
ApiViewerDemoEvents = __decorate([
    customElement('api-viewer-demo-events')
], ApiViewerDemoEvents);

const getDefault = (prop) => {
    switch (normalizeType(prop.type)) {
        case 'boolean':
            return prop.default !== 'false';
        case 'number':
            return Number(prop.default);
        default:
            return prop.default;
    }
};
// TODO: remove when analyzer outputs "readOnly" to JSON
const isGetter = (element, prop) => {
    function getDescriptor(obj) {
        return obj === HTMLElement
            ? undefined
            : Object.getOwnPropertyDescriptor(obj.prototype, prop) ||
                getDescriptor(Object.getPrototypeOf(obj));
    }
    if (element) {
        const descriptor = getDescriptor(element.constructor);
        return Boolean(descriptor && descriptor.get && descriptor.set === undefined);
    }
    return false;
};
let ApiViewerDemoLayout = class ApiViewerDemoLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.tag = '';
        this.props = [];
        this.slots = [];
        this.events = [];
        this.cssProps = [];
        this.processedSlots = [];
        this.processedCss = [];
        this.eventLog = [];
        this.knobs = {};
        this.copyBtnText = 'copy';
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const noEvents = isEmptyArray(this.events);
        const noCss = isEmptyArray(this.cssProps);
        const noSlots = isEmptyArray(this.slots);
        const noKnobs = isEmptyArray(this.props) && noSlots;
        return html `
      <div part="demo-output" @rendered="${this._onRendered}">
        ${renderer(this.tag, this.knobs, this.processedSlots, this.processedCss)}
      </div>
      <api-viewer-tabs part="demo-tabs">
        <api-viewer-tab heading="Source" slot="tab" part="tab"></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <button @click="${this._onCopyClick}" part="button">
            ${this.copyBtnText}
          </button>
          <api-viewer-demo-snippet
            .tag="${this.tag}"
            .knobs="${this.knobs}"
            .slots="${this.processedSlots}"
            .cssProps="${this.processedCss}"
          ></api-viewer-demo-snippet>
        </api-viewer-panel>
        <api-viewer-tab
          heading="Knobs"
          slot="tab"
          part="tab"
          ?hidden="${noKnobs}"
        ></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="knobs" ?hidden="${noKnobs}">
            <section part="knobs-column" @change="${this._onPropChanged}">
              <h3 part="knobs-header">Properties</h3>
              ${renderKnobs(this.props, 'prop', propRenderer)}
            </section>
            <section
              ?hidden="${hasSlotTemplate(this.tag) || noSlots}"
              part="knobs-column"
              @change="${this._onSlotChanged}"
            >
              <h3 part="knobs-header">Slots</h3>
              ${renderKnobs(this.processedSlots, 'slot', slotRenderer)}
            </section>
          </div>
        </api-viewer-panel>
        <api-viewer-tab
          heading="Styles"
          slot="tab"
          part="tab"
          ?hidden="${noCss}"
        ></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="knobs" ?hidden="${noCss}">
            <section part="knobs-column" @change="${this._onCssChanged}">
              <h3 part="knobs-header">Custom CSS Properties</h3>
              ${renderKnobs(this.cssProps, 'css-prop', cssPropRenderer)}
            </section>
          </div>
        </api-viewer-panel>
        <api-viewer-tab
          id="events"
          heading="Events"
          slot="tab"
          part="tab"
          ?hidden="${noEvents}"
        ></api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <api-viewer-demo-events
            ?hidden="${noEvents}"
            .log="${this.eventLog}"
            @clear="${this._onLogClear}"
            part="event-log"
          ></api-viewer-demo-events>
        </api-viewer-panel>
      </api-viewer-tabs>
    `;
    }
    firstUpdated(props) {
        if (props.has('props')) {
            const element = document.createElement(this.tag);
            // Apply default property values from analyzer
            // Do not include getters to prevent exception
            this.props = this.props
                .filter(({ name }) => !isGetter(element, name))
                .map((prop) => {
                return typeof prop.default === 'string'
                    ? {
                        ...prop,
                        value: getDefault(prop)
                    }
                    : prop;
            });
        }
    }
    updated(props) {
        if (props.has('slots') && this.slots) {
            this.processedSlots = this.slots
                .sort((a, b) => {
                if (a.name === '') {
                    return 1;
                }
                if (b.name === '') {
                    return -1;
                }
                return a.name.localeCompare(b.name);
            })
                .map((slot) => {
                return {
                    ...slot,
                    content: getSlotTitle(slot.name)
                };
            });
        }
    }
    _getProp(name) {
        return this.props.find(p => p.attribute === name || p.name === name);
    }
    _onLogClear() {
        this.eventLog = [];
        const tab = this.renderRoot.querySelector('#events');
        if (tab) {
            tab.focus();
        }
    }
    _onCopyClick() {
        const snippet = this.renderRoot.querySelector('api-viewer-demo-snippet');
        if (snippet && snippet.source) {
            const range = document.createRange();
            range.selectNodeContents(snippet.source);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                this.copyBtnText = 'done';
            }
            catch (err) {
                // Copy command is not available
                console.error(err);
                this.copyBtnText = 'error';
            }
            // Return to the copy button after a second.
            setTimeout(() => {
                this.copyBtnText = 'copy';
            }, 1000);
            selection.removeAllRanges();
        }
    }
    _onCssChanged(e) {
        const target = e.composedPath()[0];
        const { value, dataset } = target;
        const { name } = dataset;
        this.processedCss = this.processedCss.map(prop => {
            return prop.name === name
                ? {
                    ...prop,
                    value
                }
                : prop;
        });
    }
    _onPropChanged(e) {
        const target = e.composedPath()[0];
        const { name, type } = target.dataset;
        let value;
        switch (normalizeType(type)) {
            case 'boolean':
                value = target.checked;
                break;
            case 'number':
                value = target.value === '' ? null : Number(target.value);
                break;
            default:
                value = target.value;
        }
        const { attribute } = this._getProp(name);
        this.knobs = Object.assign(this.knobs, {
            [name]: { type, value, attribute }
        });
    }
    _onSlotChanged(e) {
        const target = e.composedPath()[0];
        const name = target.dataset.slot;
        const content = target.value;
        this.processedSlots = this.processedSlots.map(slot => {
            return slot.name === name
                ? {
                    ...slot,
                    content
                }
                : slot;
        });
    }
    _onRendered(e) {
        const { component } = e.detail;
        if (hasHostTemplate(this.tag)) {
            // Apply property values from template
            this.props
                .filter(prop => {
                const { name, type } = prop;
                const defaultValue = getDefault(prop);
                return (component[name] !== defaultValue ||
                    (normalizeType(type) === 'boolean' && defaultValue));
            })
                .forEach(prop => {
                this._syncKnob(component, prop);
            });
        }
        this.events.forEach(event => {
            this._listen(component, event.name);
        });
        if (this.cssProps.length) {
            const style = getComputedStyle(component);
            this.processedCss = this.cssProps.map(cssProp => {
                let value = style.getPropertyValue(cssProp.name);
                const result = cssProp;
                if (value) {
                    value = value.trim();
                    result.defaultValue = value;
                    result.value = value;
                }
                return result;
            });
        }
    }
    _listen(component, event) {
        component.addEventListener(event, ((e) => {
            const s = '-changed';
            if (event.endsWith(s)) {
                const prop = this._getProp(event.replace(s, ''));
                if (prop) {
                    this._syncKnob(component, prop);
                }
            }
            this.eventLog.push(e);
        }));
    }
    _syncKnob(component, changed) {
        const { name, type, attribute } = changed;
        const value = component[name];
        // update knobs to avoid duplicate event
        this.knobs = Object.assign(this.knobs, {
            [name]: { type, value, attribute }
        });
        this.props = this.props.map(prop => {
            return prop.name === name
                ? {
                    ...prop,
                    value
                }
                : prop;
        });
    }
};
__decorate([
    property({ type: String })
], ApiViewerDemoLayout.prototype, "tag", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "props", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "events", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "cssProps", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "processedSlots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "processedCss", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "eventLog", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemoLayout.prototype, "knobs", void 0);
__decorate([
    property({ type: String })
], ApiViewerDemoLayout.prototype, "copyBtnText", void 0);
ApiViewerDemoLayout = __decorate([
    customElement('api-viewer-demo-layout')
], ApiViewerDemoLayout);

let ApiViewerDemo = class ApiViewerDemo extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.props = [];
        this.slots = [];
        this.events = [];
        this.cssProps = [];
        this.whenDefined = Promise.resolve();
    }
    async renderDemoLayout(whenDefined) {
        await whenDefined;
        return html `
      <api-viewer-demo-layout
        .tag="${this.name}"
        .props="${this.props}"
        .slots="${this.slots}"
        .events="${this.events}"
        .cssProps="${this.cssProps}"
      ></api-viewer-demo-layout>
    `;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { name } = this;
        if (name && this.lastName !== name) {
            this.lastName = name;
            this.whenDefined = customElements.whenDefined(name);
        }
        return html `
      ${until(this.renderDemoLayout(this.whenDefined), html `
          <div part="warning">
            Element "${this.name}" is not defined. Have you imported it?
          </div>
        `)}
    `;
    }
};
__decorate([
    property({ type: String })
], ApiViewerDemo.prototype, "name", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "props", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "slots", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "events", void 0);
__decorate([
    property({ attribute: false, hasChanged: () => true })
], ApiViewerDemo.prototype, "cssProps", void 0);
ApiViewerDemo = __decorate([
    customElement('api-viewer-demo')
], ApiViewerDemo);

let radioId = 0;
let ApiViewerContent = class ApiViewerContent extends LitElement {
    constructor() {
        super();
        this.elements = [];
        this.selected = 0;
        this.section = 'docs';
        this._id = ++radioId;
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const { elements, selected, section } = this;
        const { name, description, properties, attributes, slots, events, cssParts, cssProperties } = { ...EMPTY_ELEMENT, ...(elements[selected] || {}) };
        // TODO: analyzer should sort CSS custom properties
        const cssProps = (cssProperties || []).sort((a, b) => a.name > b.name ? 1 : -1);
        return html `
      <header part="header">
        <div class="tag-name">&lt;${name}&gt;</div>
        <nav>
          <input
            id="docs"
            type="radio"
            name="section-${this._id}"
            value="docs"
            ?checked="${section === 'docs'}"
            @change="${this._onToggle}"
            part="radio-button"
          />
          <label part="radio-label" for="docs">Docs</label>
          <input
            id="demo"
            type="radio"
            name="section-${this._id}"
            value="demo"
            ?checked="${section === 'demo'}"
            @change="${this._onToggle}"
            part="radio-button"
          />
          <label part="radio-label" for="demo">Demo</label>
          <label part="select-label">
            <select
              @change="${this._onSelect}"
              .value="${String(selected)}"
              ?hidden="${elements.length === 1}"
              part="select"
            >
              ${elements.map((tag, idx) => {
            return html `
                  <option value="${idx}">${tag.name}</option>
                `;
        })}
            </select>
          </label>
        </nav>
      </header>
      ${cache(section === 'docs'
            ? html `
              <div ?hidden="${description === ''}" part="docs-description">
                ${parse(description)}
              </div>
              <api-viewer-docs
                .name="${name}"
                .props="${properties}"
                .attrs="${attributes}"
                .events="${events}"
                .slots="${slots}"
                .cssParts="${cssParts}"
                .cssProps="${cssProps}"
              ></api-viewer-docs>
            `
            : html `
              <api-viewer-demo
                .name="${name}"
                .props="${properties}"
                .slots="${slots}"
                .events="${events}"
                .cssProps="${cssProps}"
              ></api-viewer-demo>
            `)}
    `;
    }
    _onSelect(e) {
        this.selected = Number(e.target.value);
    }
    _onToggle(e) {
        this.section = e.target.value;
    }
};
__decorate([
    property({ attribute: false })
], ApiViewerContent.prototype, "elements", void 0);
__decorate([
    property({ type: Number })
], ApiViewerContent.prototype, "selected", void 0);
__decorate([
    property({ type: String })
], ApiViewerContent.prototype, "section", void 0);
ApiViewerContent = __decorate([
    customElement('api-viewer-content')
], ApiViewerContent);

async function fetchJson(src) {
    let result = [];
    try {
        const file = await fetch(src);
        const json = (await file.json());
        if (Array.isArray(json.tags) && json.tags.length) {
            result = json.tags;
        }
        else {
            console.error(`No element definitions found at ${src}`);
        }
    }
    catch (e) {
        console.error(e);
    }
    return result;
}
async function renderDocs(jsonFetched, section, selected) {
    const elements = await jsonFetched;
    const index = elements.findIndex(el => el.name === selected);
    return elements.length
        ? html `
        <api-viewer-content
          .elements="${elements}"
          .section="${section}"
          .selected="${index >= 0 ? index : 0}"
        ></api-viewer-content>
      `
        : html `
        <div part="warning">
          No custom elements found in the JSON file.
        </div>
      `;
}
class ApiViewerBase extends LitElement {
    constructor() {
        super(...arguments);
        this.section = 'docs';
        this.jsonFetched = Promise.resolve([]);
    }
    render() {
        const { src } = this;
        if (src && this.lastSrc !== src) {
            this.lastSrc = src;
            this.jsonFetched = fetchJson(src);
        }
        return html `
      ${until(renderDocs(this.jsonFetched, this.section, this.selected))}
    `;
    }
    firstUpdated() {
        queryTemplates(this);
    }
}
__decorate([
    property({ type: String })
], ApiViewerBase.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ApiViewerBase.prototype, "section", void 0);
__decorate([
    property({ type: String })
], ApiViewerBase.prototype, "selected", void 0);

var styles = css `
  :host {
    display: block;
    text-align: left;
    box-sizing: border-box;
    max-width: 800px;
    min-width: 360px;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Oxygen-Sans', Ubuntu, Cantarell, sans-serif;
    border: 1px solid var(--ave-border-color);
    border-radius: var(--ave-border-radius);

    --ave-primary-color: #01579b;
    --ave-accent-color: #d63200;
    --ave-border-color: rgba(0, 0, 0, 0.12);
    --ave-border-radius: 4px;
    --ave-header-color: #fff;
    --ave-item-color: rgba(0, 0, 0, 0.87);
    --ave-label-color: #424242;
    --ave-link-color: #01579b;
    --ave-link-hover-color: #d63200;
    --ave-tab-indicator-size: 2px;
    --ave-tab-color: rgba(0, 0, 0, 0.54);
    --ave-monospace-font: Menlo, 'DejaVu Sans Mono', 'Liberation Mono', Consolas,
      'Courier New', monospace;
  }

  [hidden] {
    display: none !important;
  }

  p,
  ul,
  ol {
    margin: 1rem 0;
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  pre {
    white-space: pre-wrap;
  }

  a {
    color: var(--ave-link-color);
  }

  a:hover {
    color: var(--ave-link-hover-color);
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    text-transform: uppercase;
    border: none;
    border-radius: 0.25em;
    cursor: pointer;
    background: var(--ave-button-background, rgba(0, 0, 0, 0.3));
    color: var(--ave-button-color, #fff);
  }

  button:focus,
  button:hover {
    background: var(--ave-button-active-background, rgba(0, 0, 0, 0.6));
  }

  api-viewer-content,
  api-viewer-docs,
  api-viewer-demo,
  api-viewer-demo-layout {
    display: block;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: var(--ave-primary-color);
    border-top-left-radius: var(--ave-border-radius);
    border-top-right-radius: var(--ave-border-radius);
  }

  .tag-name {
    color: var(--ave-header-color);
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  nav {
    display: flex;
    align-items: center;
  }

  [part='warning'] {
    padding: 1rem;
  }

  [part='radio-label'] {
    margin: 0 0.75rem 0 0.25rem;
    color: var(--ave-header-color);
    font-size: 0.875rem;
  }

  [part='select-label'] {
    margin-left: 0.5rem;
  }

  /* Docs styles */
  [part='tab'][heading^='CSS'] {
    font-size: 0.8125rem;
  }

  [part='docs-item'] {
    display: block;
    padding: 0.5rem;
    color: var(--ave-item-color);
  }

  [part='docs-description'] {
    display: block;
    padding: 0 1rem;
    border-bottom: solid 1px var(--ave-border-color);
  }

  [part='docs-row'] {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  [part='docs-column'] {
    box-sizing: border-box;
    flex-basis: 25%;
    padding-right: 0.5rem;
  }

  [part='docs-column']:only-child {
    flex-basis: 100%;
  }

  .column-type {
    flex-basis: 50%;
  }

  [part='docs-label'] {
    color: var(--ave-label-color);
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.1rem;
  }

  [part='docs-value'] {
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  [part='docs-markdown'] p,
  [part='docs-markdown'] ul,
  [part='docs-markdown'] ol {
    margin: 0.5rem 0;
  }

  .accent {
    color: var(--ave-accent-color);
  }

  /* Demo styles */
  [part='docs-item']:not(:first-of-type),
  [part='demo-tabs'],
  [part='demo-output'] {
    border-top: solid 1px var(--ave-border-color);
  }

  [part='demo-tabs'] [part='tab-panel'] {
    box-sizing: border-box;
    position: relative;
    background: #fafafa;
  }

  [part='demo-output'] {
    padding: 1.5rem;
    text-align: initial;
    transform: translateZ(0);
    overflow: hidden;
  }

  .source {
    position: relative;
  }

  [part='knobs'] {
    display: flex;
    padding: 1rem;
  }

  [part='knobs-column'] {
    width: 50%;
  }

  [part='knobs-header'] {
    font-size: 1rem;
    font-weight: bold;
    margin: 0 0 0.25rem;
  }

  td {
    padding: 0.25rem 0.25rem 0.25rem 0;
    font-size: 0.9375rem;
    white-space: nowrap;
  }

  [part='event-log'] {
    display: block;
    padding: 0 1rem;
    min-height: 50px;
    max-height: 200px;
    overflow: auto;
  }

  [part='event-record'] {
    margin: 0 0 0.25rem;
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
  }

  [part='event-record']:first-of-type {
    margin-top: 1rem;
  }

  [part='event-record']:last-of-type {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    header {
      flex-direction: column;
    }

    nav {
      margin-top: 0.5rem;
    }

    .api-col-type {
      flex-basis: 100%;
      margin-top: 1rem;
    }

    .columns {
      flex-direction: column;
    }

    [part='knobs-column']:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

let ApiViewer = class ApiViewer extends ApiViewerBase {
    static get styles() {
        return styles;
    }
};
ApiViewer = __decorate([
    customElement('api-viewer')
], ApiViewer);

export { ApiViewer };
