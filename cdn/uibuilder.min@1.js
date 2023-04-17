!function(h){customElements.define('ui-build-root',class extends HTMLDivElement{constructor(){super()}},{extends:'div'}),customElements.define('ui-build-component',class extends HTMLDivElement{constructor(){super()}},{extends:'div'}),customElements.define('ui-build-children',class extends HTMLDivElement{constructor(){super()}},{extends:'div'});var c=/CLASS/g;function l(){}function p(){var e=this;e.state={init:0,value:null,disabled:!1,modified:!1,readonly:!1,touched:!1,invalid:!1,delay:10,notify:!1,bind:!1,validate:!0},e.cache={},e.events={},e.$inputs={},e.$outputs={}}l.prototype.stopPropagation=function(){this.$propagation=!0};function i(){return''}var e=p.prototype;e.$forcecheck=function(e){e.$checktimeout=null,e.set('invalid',!e.state.disabled&&!e.state.readonly&&(!!e.validate&&!e.validate()))},e.check=function(e){var t=this;if(!1!==t.state.validate)return t.$checktimeout&&clearTimeout(t.$checktimeout),e?t.$forcecheck(t):t.$checktimeout=setTimeout(t.$forcecheck,150,t),t};function o(e,t,n,i){var o={};o.id=e.id+'_'+t.id,o.instanceid=e.id,o.componentid=e.component.id,o.ref=t.id,o.icon=t.icon,o.color=t.color,o.note=t.note,o.name=t.name,o.component=e.component,o.app=e.app,o.instance=e,o.err=n,o.data=i,e.app.emit('output',o),h.emit('output',o)}function r(f,e,u,t){var n=this,i=n.components[e.component];if(i){var o=document.createElement('DIV'),r=new p;if(o.setAttribute('is','ui-build-component'),o.classList.add('ui_'+i.id),e.gap&&o.classList.add('UI_gap'),i.floating&&(o.classList.add('UI_floating'),o.style='left:{0}px;top:{1}px;z-index:{2};position:absolute'.format(e.x||0,e.y||0,e.zindex||1)),e.bind&&(r.state.bind=!0),e.notify&&(r.state.notify=!0),i.config||(i.config={}),r.id=e.id,r.args=n.args,r.element=$(o),r.element.aclass(h.selectors.component.substring(1)+' '+i.cls).attrd('id',e.id),r.dom=o,r.events={},r.config=CLONE(i.config),r.app=n,r.component=i,r.protected=e.protected,r.meta=e,r.edit=m,e.config)for(var s in e.config)r.config[s]=e.config[s];r.config.name||(r.config.name=i.name),n.instances.push(r);var a,c=f.closest(h.selectors.component);if(c&&c.length&&(r.parent=c[0].uibuilder,r.parent&&((a=r.parent).children||(a.children=[]),a.containers||(a.containers={}),s='container'+u,a.children.push(r),a.containers[s]?null==t?a.containers[s].push(r):a.containers[s].splice(t,0,r):a.containers[s]=[r])),o.uibuilder=r,c=$(f),null==t)c.append(o);else{for(var d=!1,l=0;l<c[0].children.length;l++)if(l===t){c[0].insertBefore(o,c[0].children[l]),d=!0;break}d||c.append(o)}i.make(r,r.config,r.element,r.component.cls),h.events.make&&h.emit('make',r),e.children instanceof Array?setTimeout(function(e,t){for(var n=v(e,t.id),i=0;i<t.children.length;i++){var o,r=n.findItem('index',i);if(r)for(o of t.children[i])e.compile(r.element,o,i)}e.refreshio()},1,n,e):n.refreshio()}else console.error('UI Builder: The component "{0}" not found'.format(e.component))}function s(){for(var e=0,t=0,n=[];;){var i=this.instances[e];if(!i)break;!function(e){if(e){if('BODY'===e.tagName)return 1;for(var t=e.parentNode;t;){if('BODY'===t.tagName)return 1;t=t.parentNode}}}(i.dom)?(t++,i.events.destroy&&i.emit('destroy'),this.instances.splice(e,1),n.push(i)):e++}if(this.refreshio(),t)for(var o of this.instances)o.events.refresh&&o.emit('refresh',{type:'remove',items:n})}e.maketemplate=function(e){var t=this;if(!(e=e||t.component.html))return i;var n=HASH(e).toString(36);return t.app.cache[n]||(t.app.cache[n]=-1===e.indexOf('{{')?()=>e:Tangular.compile(e),t.app.cache[n])},e.error=function(e){var t=this.config;console.error(this.component.name+': '+t.name+(t.path?' ({0})'.format(t.path):''),e)},e.clone=function(e){var t=e;return'object'==typeof e&&(!e||e instanceof Date||(t=CLONE(e))),t},e.set=function(e,t,n,i){var o,r,s=this,a=!1;switch(e){case'disabled':case'modified':case'readonly':case'touched':case'invalid':a=!0,t=!!t}if('touched'===e&&s.check(),s.state[e]===t)return!1;if(s.state[e]=t,s.events.set&&s.emit('set',e,t,n),'value'===e){if(s.events.value&&s.emit('value',t,n),s.binded)for(var c of s.binded)c!==i&&(o=s.clone(t),c.state.notify?c.emit('notify',o,s):c.set('value',o,i?'noemitstate':'',s));s.binder&&!s.state.notify&&s.binder!==i&&s.binder.set('value',s.clone(t),i?'noemitstate':'',s),s.check()}if('noemitstate'!==n)return r=s.cache.e,a&&s.element.tclass('UI_'+e,t),r?s.cache.e.changes[e]=1:((r=s.cache.e=new l).id=s.id,r.instance=s,r.state=s.state,r.element=s.element,r.changes={},r.changes[e]=1,r.kind=n,setTimeout(e=>e.app.emitstate(e.cache.e),s.state.delay,s)),!0},e.input=function(e,t){return this.$inputs[e]=t,this},e.output=function(e,t){var n=this,i=(n.component.outputs||EMPTYARRAY).findItem('id',e);if(i)return t?'function'==typeof t?n.$outputs[e]=t:o(n,i,null,t):(t=n.$outputs[e])&&t((e,t)=>o(n,i,e,t)),n;console.error('Output "{0}" not found in the "{1}" component'.format(e,n.component.name))},e.family=function(){function n(e){if(e.children)for(var t of e.children)i.push(t),n(t)}var i=[];return n(this),i},e.remove=function(){this.element.remove(),this.app.clean()},e.readvalue=function(e){if(!e)return this.state.value;e=this.find(e);return e?e.state.value:null},e.view=function(e,t,n){return e&&('function'==typeof t&&(n=t,t=null),'#'===e.charAt(0)&&(e=e.substring(1)),this.app.view(e,t,n)),this},e.datasource=function(e,t){var n=this;if(!e)return n;function i(e){e&&(e=!(e instanceof Array)&&e.items instanceof Array?e.items:e)instanceof Array&&t(CLONE(e))}var o=e.charAt(0);return'#'===o?n.view(e,null,t):'@'===o?(o=n.find(e))&&(o.on('value',i),i(o.state.value)):n.clfind(e,i),n},e.clfind=function(t,n,i){var o=this;if('function'==typeof n&&(i=n,n=''),!i)return new Promise(e=>o.app.clfind(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return o.app.clfind(t,n,i),o;e=o.find(t);if(e&&e.state.value instanceof Array){var r,s=[];n=n&&n.toSearch();for(r of e.state.value)!r.name||n&&-1===r.name.toSearch().indexOf(n)||s.push(r);i(s)}else i([])}else o.view(t,{search:n},function(e,t){t?(t.items instanceof Array&&(t=t.items),i(t)):i([])})},e.clread=function(t,n,i){var o=this;if(!i)return new Promise(e=>o.app.clread(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return o.app.clread(t,n,i),o;(e=o.find(n))&&e.state.value instanceof Array?i(e.state.value.findItem('id',n)):i(null)}else o.view(t,{id:n},function(e,t){t?(t=t.items instanceof Array?t.items:t)instanceof Array?i(t.findItem('id',n)):i(t):i(null)})},e.find=function(e){return this.app.instances.findItem('id','@'===e.charAt(0)?e.substring(1):e)},e.hidden=function(){return HIDDEN(this.dom)},e.reset=function(){return this.events.reset&&this.emit('reset'),this},e.reconfigure=function(e){var t=this,n={};if(e)for(var i in e){var o=t.config[i],r=e[i];r!==o&&(n[i]=o,t.config[i]=r)}return t.events.configure&&t.emit('configure',n),t},e.get=function(e){return this.state[e||'value']},e.on=function(e,t){this.events[e]?this.events[e].push(t):this.events[e]=[t]},e.off=function(e,t){var n=this.events[e];return n&&(t?-1!==(t=n.indexOf(t))&&(n.splice(t,1),n.length||delete this.events[e]):delete this.events[e]),this},e.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},e.bindable=function(e){return(!this.config.path||'@'!==this.config.path.charAt(0))&&this.config.path===e},e.write=function(e,t,n){if(!t||'@'===t.charAt(0))return n;for(var i=t.split('.'),o=0;o<i.length-1;o++){var r=e[i[o]];e=r=null==r?e[i[o]]={}:r}return e[i[o]]=n,e},e.watch=function(e,t,n){'function'==typeof t&&(n=t,t='value');e=this.app.instance.findItem('id',e);return e&&e.on(t,n),this},e.read=function(e,t){if(!t||'@'===t.charAt(0))return e;for(var n=t.split('.'),i=0;i<n.length;i++)if(!(e=e[n[i]]))return;return e},e.replace=e.variables=function(e,o,r){var s=this;return e.replace(/\{[a-z0-9_\.-]+\}/gi,function(e){var t=e.substring(1,e.length-1).trim(),n='',i=t.substring(0,4);if('user'===i)W.user&&(n=-1===(t=t.substring(5)).indexOf('.')?W.user[t]:s.read(W.user,t));else if('args'===i)t=t.substring(5),n=s.args[t];else if('data'===i)o&&(n=-1===(t=t.substring(4)).indexOf('.')?o:s.read(o,t.substring(1)));else if('query'===t.substring(0,5)){if(-1===(t=t.substring(5)).indexOf('.'))return QUERIFY(s.query).substring(1);n=s.query[t.substring(1)]}if(null==n)return e;if('function'==typeof r)return r(n);switch(r){case'url':case'urlencode':case'encode':return encodeURIComponent(n);case'escape':case'html':return Thelpers.encode(n);case'json':return JSON.stringify(n)}return n})},e.wait=function(e,t){function n(){e()?t():setTimeout(n,300)}return n(),this},e.querify=function(e,t){return this.app.urlify(this.variables(t?QUERIFY(e,t):e))},e.urlify=function(e){return this.app.urlify(this.variables(e))},e.settings=function(){this.app.emit('settings',this),h.emit('settings',this)},h.version=1.3,h.selectors={component:'.UI_component',components:'.UI_components'},h.current='default',h.events={},h.apps={},h.resize=function(){for(var e in h.apps){var t;for(t of h.apps[e].instances)t.events.resize&&t.emit('resize')}},ON('resize + resize2',h.resize),h.on=function(e,t){this.events[e]?this.events[e].push(t):this.events[e]=[t]},h.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},h.register=function(e,t){h.apps[h.current].pending.push({name:e,fn:t})};function v(e,t){var n=e.element,i=[];for(n of n.find(h.selectors.component+'[data-id="{0}"] {1}'.format(t,h.selectors.components)))(n=$(n)).closest(h.selectors.component).attrd('id')===t&&i.push({index:+n.attrd('index'),element:n});return i.quicksort('index'),i}function d(e,t,n,i,o,r){if('string'==typeof n){if(!this.components[n])return void console.error('Component "{0}" not found'.format(n));n={id:'cid'+Date.now().toString(36),component:n,children:[],config:n.config||{},gap:0!=n.gap}}if(r&&COPY(r,n),o)for(var s in o)n.config[s]=o[s];r=v(this,e);if(r.length)for(var a of r)a.index==t&&this.compile(a.element,n,t,i);return this.refreshio(),n}h.build=function(e,a,i){if(h.apps[a.id])return h.remove(a.id),void setTimeout(h.build,100,e,a,i);h.current=a.id;function t(){if(u=null,h.editor){f.inputs=[],f.outputs=[],f.list=[],f.zindex=1;for(var e of f.instances)if(e.dom.parentNode){e.component.floating&&(f.zindex=(e.element.css('z-index')||'').parseInt(),f.zindex<=0&&(f.zindex=1));var t=e.component.inputs,n=e.config.name||e.component.name;if(f.list&&f.list.push({id:e.id,name:n,icon:e.component.icon,color:e.component.color}),t)for(var i of t)f.inputs.push({id:e.id+'_'+i.id,ref:i.id,name:n+': '+i.name,componentid:e.component.id,component:n,input:i.name,icon:e.component.icon,color:e.component.color,note:i.note,schema:i.schema});if((t=e.component.outputs)&&t.length)for(var i of t)f.outputs.push({id:e.id+'_'+i.id,ref:i.id,name:n+': '+i.name,componentid:e.component.id,component:n,output:i.name,icon:e.component.icon,color:e.component.color,note:i.note,schema:i.schema})}}else f.outputs=f.inputs=f.schema=null;if(!f.ready){f.ready=!0,f.callback&&f.callback(f),l.rclass('invisible');var o,r={},s={},a=!1;for(c of f.instances)!c.config.path||'@'!==c.config.path.charAt(0)||(o=c.config.path.substring(1))!=c.id&&(r[o]?r[o].push(c):r[o]=[c],s[c.id]=o,a=!0);if(a)for(var c of f.instances)c.binded=r[c.id]||null,c.binder=s[c.id]?f.instances.findItem('id',s[c.id]):null;for(c of f.instances)c.state.init=1,c.events.ready&&c.emit('ready');h.emit('app',f)}f.emit('io',f),h.emit('io',f)}var n=document.createElement('DIV'),l=$(n),f=(l.attrd('id',a.id),l.aclass('UI_app invisible'),l.empty(),n.setAttribute('is','ui-build-root'),$(e)[0].appendChild(n),{}),o=[],u=(f.id=h.current,f.components={},f.args=a.args||{},f.query=a.query||CLONE(NAV.query),f.schema=a,f.events={},f.cache={},f.compile=r,f.stringify=g,f.clean=s,f.add=d,f.remove=()=>h.remove(f.id),f.class='ui_'+HASH(h.current).toString(36),f.element=l,f.dom=l[0],f.pending=[],f.instances=[],a.urlify?f.urlify=a.urlify:f.urlify=e=>e,l.aclass(f.class),h.view?f.view=h.view:f.view=function(e,t,n){n(EMPTYARRAY)},h.clfind?f.clfind=h.clfind:f.clfind=function(e,t,n){n(EMPTYARRAY)},h.clread?f.clread=h.clread:f.clread=function(e,t,n){n(EMPTYOBJECT)},f.on=function(e,t){this.events[e]?this.events[e].push(t):this.events[e]=[t]},f.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},f.intervalcounter=0,f.interval&&clearInterval(f.interval),f.interval=setInterval(function(e){if(W.inDOM(e.dom)){e.intervalcounter++;for(var t of e.instances)t.events.service&&t.emit('service',e.intervalcounter)}else e.remove()},6e4,f),f.recompile=function(){f.clean();for(var e,t=0;t<f.schema.children.length;t++)for(e of f.schema.children[t])e.protected=!0,f.compile(f.element,e,t)},f.build=function(e,t,n){t.urlify=f.urlify,h.build(e,t,n)},null);return f.refreshio=function(e){e?t():(u&&clearTimeout(u),u=setTimeout(t,100))},f.input=function(e,t,n){n=n||NOOP;var i=e.indexOf('_'),o=e.substring(0,i),e=e.substring(i+1),i=f.instances.findItem('id',o);i?(i=i.$inputs[e])?i(t,n):n('Input "{0}" not found'.format(e)):n('Instance "{0}" not found'.format(o))},f.output=function(e){i=i||NOOP;var t=e.indexOf('_'),n=e.substring(0,t),e=e.substring(t+1),t=f.instances.findItem('id',n);t?t.output(e):i('Instance "{0}" not found'.format(n))},f.emitstate=function(e){var t,n={},i='state',o=e.instance,r=(e.instance.cache.e=null,o.parent);for(e.level=0;r&&(e.level++,n[r.id]=!0,r.events[i]&&r.emit(i,e),!e.$propagation);)r=r.parent;e.level=null,i='@state';for(t of f.instances)n[o.id]||t===e.instance||t.events[i]&&t.emit(i,e)},h.apps[h.current]=f,Object.keys(a.components).wait(function(i,o){var e=a.components[i];if('string'==typeof e){var r=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(r||(r=t,t=''),'base64'!==(t=t&&'.html'===t.charAt(0)?t.substring(1):t))t&&'html'!==t||(h.editor&&'/'===r.charAt(0)&&(r=(h.origin||'')+r),AJAX('GET '+r,function(e,t){if(t)return console.error('UI Builder:',r,t),void o();if(ERROR(e))return console.error('UI Builder:',r,e),void o();t=h.parsehtml(e);try{var n={};n.id=i,n.cls=f.class+'_'+HASH(n.id).toString(36),t.css&&(n.css=t.css),t.readme&&(n.readme=t.readme),t.html&&(n.html=t.html.replace(c,n.cls)),t.settings&&(n.settings=t.settings.replace(c,n.cls)),new Function('exports',t.js.replace(c,n.cls))(n),f.pending.push({name:i,fn:n})}finally{o()}}));else try{var n={},s=(n.id=i,n.cls=f.class+'_'+HASH(n.id).toString(36),h.parsehtml(decodeURIComponent(atob(r))));s.css&&(n.css=s.css),s.html&&(n.html=s.html.replace(c,n.cls)),new Function('exports',s.js.replace(c,n.cls))(n),f.pending.push({name:i,fn:n})}finally{o()}}else f.pending.push({name:i,fn:e}),o()},function(){f.pending.splice(0).wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=f.class+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,(f.components[e.name]=n).css&&o.push(n.css.replace(c,n.cls)),n.import instanceof Array?n.import.wait(IMPORT,t):t()},function(){a.css&&o.unshift(a.css.replace(c,f.class)),CSS(o,f.class);for(var e,t=0;t<a.children.length;t++)for(e of a.children[t])e.protected=!0,f.compile(l,e,t);f.callback=i})}),f},h.parsehtml=function(e){var t='';if(-1===e.indexOf('<script>'))return{js:e};var n,i='',o='',t='',r='',s='',a=e.indexOf('<settings>');return-1!==a&&(n=e.indexOf('</settings>',a+10),i=e.substring(a+8,n).trim(),e=e.substring(0,a)+e.substring(n+11)),-1!==(a=e.indexOf('<style>'))&&(t=e.substring(a+7,e.indexOf('</style>',a+7))),-1!==(a=e.indexOf('<body>'))&&(s=e.substring(a+6,e.indexOf('</body>',a+6))),-1!==(a=e.indexOf('<readme>'))&&(o=e.substring(a+8,e.indexOf('</readme>',a+8))),-1!==(a=e.indexOf('<script>'))&&(n=e.indexOf('<\/script>',a+8),r=e.substring(a+8,n).trim()),{js:r,css:t,settings:i,readme:o,html:s}},h.remove=function(t){var n=h.apps[t];if(n){n.interval&&clearInterval(n.interval),n.interval=null;for(var e of n.instances)e.events.destroy&&e.emit('destroy');setTimeout(function(){for(var e in n.components){e=n.components[e];e.uninstall&&e.uninstall()}n.tmp=null,CSS('',n.class),n.element.remove(),delete h.apps[t]},2)}};var a=null,f=document;function m(n,i,e){var t,o,r,s;n instanceof jQuery||(n=$(n)),null==(i=i||{}).format&&(i.format=!0),e&&(i.callback=e),a?a.element[0]!=n[0]&&(a.close(),setTimeout(m,100,n,i,e)):(i.backup=n.html(),i.html&&n.html(i.html),n.attr('contenteditable',!0),n.aclass('UI_editing'),(a={}).element=n,a.dom=n[0],a.parent=i.parent?i.parent[0]:a.dom,a.createlink=function(){if(function(e){if(f.selection&&'Text'===f.selection.type)return f.selection.createRange().htmlText;if(W.getSelection){var t=W.getSelection();if(!t.rangeCount)return'';for(var n=f.createElement('div'),i=0,o=t.rangeCount;i<o;++i)n.appendChild(t.getRangeAt(i).cloneContents());return e?n:n.innerHTML}}().trim()){for(var e=a.element,t='#link'+Date.now().toString(36),n=e[0],i=0;i<5;i++){if('A'===n.tagName)return;if(!(n=n.parentNode))break}document.execCommand('CreateLink',!1,t);var o,e=e.find('a[href="'+t+'"]');e.length&&(a&&a.close(),t=e.text(),o='',e.aclass('UI_link'),-1!==t.indexOf('@')?o='mailto:'+t:/\d+/.test(t)?o='tel:'+t:-1===t.indexOf(' ')&&-1===t.indexOf(',')&&-1!==t.indexOf('.')&&(o=/http(s):\/\//.test(t)?t:'https://'+t),t=-1!==o.indexOf('.')&&-1===o.indexOf(location.hostname)?'_blank':'',e.attr('href',o||'#'),e.attr('target',t),h.emit('link',e,NOOP))}},t=function(){a.close()},o=function(e){e.target===a.parent||a.parent.contains(e.target)||a.close()},r=function(e){if(i.keydown&&i.keydown(e),27===e.keyCode)return e.preventDefault(),e.stopPropagation(),a.key=27,void a.close();if(i.backslashremove&&8===e.keyCode&&!n.text().trim())return a.key=8,void a.close();if(13!==e.keyCode){if(9===e.keyCode)return i.tabs?(e.preventDefault(),void document.execCommand('insertHTML',!1,'&#009')):(i.endwithtab?(e.preventDefault(),a.key=9):(e.preventDefault(),e.stopPropagation()),void a.close());if(a.change=!0,e.metaKey||e.ctrlKey)if(66!==e.keyCode)if(76!==e.keyCode)if(73!==e.keyCode){var t;if(80===e.keyCode)return i.format&&!0===i.icon&&(t='<i class="ti ti-totaljs UI_icon" contenteditable="false"></i>','span'===n[0].nodeName.toLowerCase()?n.parent().prepend(t):document.execCommand('insertHTML',!1,t)),e.preventDefault(),void e.stopPropagation();85!==e.keyCode?32===e.keyCode&&(document.execCommand('insertHTML',!1,'&nbsp;'),e.preventDefault(),e.stopPropagation()):i.format&&!1!==i.underline||(e.preventDefault(),e.stopPropagation())}else i.format&&!1!==i.italic||(e.preventDefault(),e.stopPropagation());else i.format&&!1!==i.link?a.createlink():(e.preventDefault(),e.stopPropagation());else i.format&&!1!==i.bold||(e.preventDefault(),e.stopPropagation())}else i.multiline&&!e.shiftKey||(e.preventDefault(),e.stopPropagation(),a.key=13,a.close())},n.focus(),'end'===i.cursor&&((e=document.createRange()).selectNodeContents(n[0]),e.collapse(!1),(s=W.getSelection()).removeAllRanges(),s.addRange(e)),a.close=function(){var e;$(W).off('click',o),n.rattr('contenteditable'),n.off('keydown',r),n.off('contextmenu',t),n.rclass('UI_editing'),i.callback&&((e={}).text=n.text().trim(),e.html=n.html(),e.change=a.change,e.element=a.element,e.dom=a.dom,e.backup=i.backup,e.key=a.key,e.param=i.param,i.callback(e)),a.timeout&&clearTimeout(a.timeout),a=null},$(W).on('click',o),n.on('keydown',r),n.on('contextmenu',t))}function g(e,u){var t,d=this,p='function'==typeof e?e:null,n=(e=p?null:e)||d.element.find('> '+h.selectors.component),i=[],m=[];for(t of n){var o={children:[]};i.push(o),function e(t,n){var i,o,r,s=n.uibuilder;if(t.id=n.getAttribute('data-id'),t.component=s.component.id,t.config=CLONE(s.config),s.component.floating&&(o=(i=$(n)).position(),t.x=o.left,t.y=o.top,t.zindex=i.css('z-index')||m.length,t.zindex=+t.zindex,t.zindex<=0&&(t.zindex=1)),!p||p(t)){m.push(s),n.classList.contains('UI_gap')&&(t.gap=!0),s.children=[];for(r of v(d,t.id)){var a,c=[],f=r.element.find('> '+h.selectors.component);t.children||(t.children=[]),t.children.push(c);for(a of f){var l={children:[]};c.push(l),s.children.push(a.uibuilder),e(l,a)}}s.events.stringify&&s.emit('stringify',t,u)}}(o,t)}i=e?i[0]:[i];return{instances:m,children:i}}}(W.UIBuilder={});