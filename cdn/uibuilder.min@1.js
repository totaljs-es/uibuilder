!function(v){var g=/CLASS/g;function u(e){var t=this;t.id=e.id,t.query=e.query,t.app=e,t.cache=e.cache,t.class=e.class,t.components=e.components,t.instances=[],t.events={},t.refs={}}function b(e){var t,n='';return n='/'!==e.charAt(0)?-1===(t=e.indexOf('/',9))?e:e.substring(0,t):n}function h(e){var t,n={},i={},o=!1;e.$rebindtimeout=null;for(r of e.instances)!r.config.path||'@'!==r.config.path.charAt(0)||(t=r.config.path.substring(1))!=r.id&&(n[t]?n[t].push(r):n[t]=[r],i[r.id]=t,o=!0);if(o)for(var r of e.instances)r.binded=n[r.id]||null,r.binder=i[r.id]?e.instances.findItem('id',i[r.id]):null}function l(){}function k(){var e=this;e.state={init:0,value:null,disabled:!1,modified:!1,readonly:!1,touched:!1,invalid:!1,delay:10,notify:!1,bind:!1,validate:!0},e.cache={},e.events={},e.$inputs={},e.$outputs={},e.iseditor=v.editor}u.prototype.find=function(e){var t,n='.'===e.charAt(0)?e.substring(1):'',e=n?'':'@'===e.charAt(0)?e.substring(1):e;for(t of this.instances)if(n){if(t.config.path===n)return t}else if(t.id===e)return t},u.prototype.urlify=function(){return this.app.urlify.apply(this.app,arguments),this},u.prototype.clfind=function(){return this.app.clfind.apply(this.app,arguments),this},u.prototype.clread=function(){return this.app.clread.apply(this.app,arguments),this},u.prototype.view=function(){return this.app.view.apply(this.app,arguments),this},u.prototype.clean=function(){return this},u.prototype.on=function(e,t){var n=this;n.events[e]?n.events[e].push(t):n.events[e]=[t]},u.prototype.rebind=function(){var e=this;e.$rebindtimeout&&clearTimeout(e.$rebindtimeout),e.$rebindtimeout=setTimeout(h,50,e)},u.prototype.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},u.prototype.emitstate=function(e,t){var n,i={},o=e.instance,r=t=t||'state',s='noemit'+t,a=(e.instance.cache[r]=null,o.parent),c=0;for(e.level=0,e.type=t;a&&(e.level++,i[a.id]=!0,!a.fork)&&(a.events[t]&&(c++,a.emit(t,e)),!e.$propagation);)a=a.parent;e.level=null,t='@'+t;for(n of this.instances)i[o.id]||n===e.instance||n.events[t]&&(c++,n.emit(t,e));o.state[s]=0===c},customElements.define('uibuilder-component',class extends HTMLElement{constructor(){super(),setTimeout(()=>this.compile(),1)}compile(){var e,t=this,n=t.parentNode,f=v.selectors.component.substring(1);for(t.classList.add('block');n;){if('BODY'===n.tagName)return;if(n.classList.contains(f)){e=n.uibuilder;break}n=n.parentNode}var i,o=!0,r=(e.fork||(o=!1,e.fork=new u(e.app),e.fork.element=e.element,e.fork.compile=A,e.root=e),(t.getAttribute('config')||'').parseConfig()),s={},a=(s.id=t.getAttribute('uid')||'ui'+GUID(10),s.config=r||{},s.component=t.getAttribute('name'),!1);for(i in r)if('#'===r[i]){var c=t.children[0];if(c&&'SCRIPT'===c.tagName)switch(c.getAttribute('type')){case'application/json':case'text/json':r[i]=PARSE(c.innerHTML.trim());break;case'text/html':case'text/plain':r[i]=c.innerHTML.trim()}else r[i]=t.innerHTML;a=!0}a&&(t.innerHTML='');var l=t.getAttribute('path'),l=(l&&(r.path=l),e.fork.components[s.component]);if(!l)return console.error('UI Builder: The component not found: '+s.component),void t.parentNode.removeChild(t);t.innerHTML&&(r.name=t.innerHTML.trim(),t.innerHTML=''),r.name||(r.name=l.name),(r.$bind||t.getAttribute('bind'))&&(s.bind=!0),(r.$notify||t.getAttribute('notify'))&&(s.notify=!0),s.readonly=!0,e.fork.compile(t,s,null,null,t),t.uibuilder&&(t.uibuilder.parent=e),e.fork.rebind();l=t.classList;l.remove('invisible'),l.remove('hidden'),o||setTimeout(e=>e.emit('fork',e.fork),1,e)}}),l.prototype.stopPropagation=function(){this.$propagation=!0};function i(){return''}var r,e=k.prototype;e.$forcecheck=function(e){e.$checktimeout=null;var t=!1;e.state.disabled||e.state.readonly?t=!1:e.validate&&(!0===(t=e.validate())||1===t||''===t||t instanceof Array&&!t.length?t=!1:!1!==t&&0!==t||(t=!0)),e.set('invalid',t)},e.$forcechange=function(e){e.$changetimeout=null,e.app.emit('change',e)},e.errors=function(){var e,t=[],n=this.state.invalid,i=typeof n;if(!n||'boolean'==i||'number'==i)return t;if('string'==i)t.push({error:n});else if(n instanceof Array)for(var o of n)o&&('string'==typeof o?t.push({error:o}):(e=o.error||o.err||o.msg||o.message)&&t.push({error:e}));else(e=n.error||n.err||n.msg||n.message)&&t.push({error:e});return t},e.change=function(){var e=this;e.app.events.change&&(e.$changetimeout&&clearTimeout(e.$changetimeout),e.$changetimeout=setTimeout(e.$forcechange,50,e))},e.check=function(e){var t=this;if(!1!==t.state.validate)return t.$checktimeout&&clearTimeout(t.$checktimeout),e?t.$forcecheck(t):t.$checktimeout=setTimeout(t.$forcecheck,50,t),t};function o(e,t,n,i){var o={};o.id=e.id+'_'+t.id,o.instanceid=e.id,o.componentid=e.component.id,o.ref=t.id,o.icon=t.icon,o.color=t.color,o.note=t.note,o.name=t.name,o.component=e.component,o.app=e.app,o.instance=e,o.err=n,o.data=i,e.app.emit('output',o),v.emit('output',o)}function s(){r=null;var e,t=[];for(e in v.components){var n=v.components[e];n.css&&t.push(n.css)}CSS(t,'uibuilder')}function A(l,e,u,t,n,i){var o=this,r=o.components[e.component];if(r){var s=n||document.createElement('DIV'),f=new k;if(s.classList.add('ui_'+r.id),e.gap&&s.classList.add('UI_gap'),r.floating&&(s.classList.add('UI_floating'),s.style='left:{0}px;top:{1}px;z-index:{2};position:absolute'.format(e.x||0,e.y||0,e.zindex||1)),e.bind&&(f.state.bind=!0),e.notify&&(f.state.notify=!0),r.config||(r.config={}),f.id=e.id,f.args=o.args,f.newbie=i||e.newbie,f.element=$(s),f.element.aclass(v.selectors.component.substring(1)+' '+r.cls).attrd('id',e.id),f.dom=s,f.events={},f.config=CLONE(r.config),f.app=o,f.component=r,f.protected=e.protected,f.meta=e,f.edit=d,e.newbie&&delete e.newbie,n&&(f.forked=!0),e.config)for(var a in e.config)f.config[a]=e.config[a];if(f.config.name||(f.config.name=r.name),o.instances.push(f),!n||(i=l.getAttribute('uid'))&&(o.refs[i]=f),s.uibuilder=f,!n){var c=l.closest(v.selectors.component);if(c&&c.length&&(f.parent=c[0].uibuilder,f.parent&&((i=f.parent).children||(i.children=[]),i.containers||(i.containers={}),a='container'+u,i.children.push(f),i.containers[a]?null==t?i.containers[a].push(f):i.containers[a].splice(t,0,f):i.containers[a]=[f])),c=$(l),null==t)c.append(s);else{for(var p=!1,m=0;m<c[0].children.length;m++)if(m===t){c[0].insertBefore(s,c[0].children[m]),p=!0;break}p||c.append(s)}}r.make&&r.make(f,f.config,f.element,f.component.cls,v.editor),v.events.make&&v.emit('make',f),n||(e.children instanceof Array?setTimeout(function(e,t){for(var n=y(e,t.id),i=0;i<t.children.length;i++){var o=n.findItem('index',i);if(o)for(l of t.children[i])e.compile(o.element,l,i)}var r=e.components[t.component];if(r.children)for(var s={},a=CLONE(r.children),c=function(e){for(var t of e)for(var n of t)s[n.id]=f.id+'X'+HASH(n.id).toString(36),n.children&&n.children.length&&c(n.children)},r=(c(a),Object.keys(s)),r=new RegExp(r.join('|'),'g'),a=PARSE(JSON.stringify(a).replace(r,e=>s[e])),i=0;i<a.length;i++){var l,o=n.findItem('index',i);if(o)for(l of a[i])e.compile(o.element,l,i)}e.refreshio()},1,o,e):o.refreshio())}else console.error('UI Builder: The component "{0}" not found'.format(e.component))}function x(){for(var e=0,t=0,n=[];;){var i=this.instances[e];if(!i)break;if(function(e){if(e){if('BODY'===e.tagName)return 1;for(var t=e.parentNode;t;){if('BODY'===t.tagName)return 1;t=t.parentNode}}}(i.dom))e++;else{if(t++,i.removecss)for(var o of i.removecss)CSS('',o);i.events.destroy&&i.emit('destroy'),this.instances.splice(e,1),n.push(i)}}if(this.refreshio(),t)for(var r of this.instances)r.events.refresh&&r.emit('refresh',{type:'remove',items:n})}e.maketemplate=function(e){var t=this;if(!(e=e||t.component.html))return i;var n=HASH(e).toString(36);return t.app.cache[n]||(t.app.cache[n]=-1===e.indexOf('{{')?()=>e:Tangular.compile(e),t.app.cache[n])},e.error=function(e){var t=this.config;console.error('UIBuilder:',this.component.name+' - '+t.name+(t.path?' ({0})'.format(t.path):''),e)},e.clone=function(e){var t=e;return'object'==typeof e&&(!e||e instanceof Date||(t=CLONE(e))),t},e.set=function(e,t,n,i){var o,r,s=this,a=!1;switch(e){case'disabled':case'modified':case'readonly':case'touched':a=!0,t=!!t;break;case'invalid':a=!0}if('touched'===e&&s.check(),s.state.noemitsomething||((r=s.cache.something)?s.cache.something.changes[e]=1:((r=s.cache.something=new l).id=s.id,r.instance=s,r.state=s.state,r.element=s.element,r.changes={},r.changes[e]=1,r.kind=n,setTimeout(e=>e.app.emitstate(e.cache.something,'something'),222,s))),'force'!==n&&(null==t||'object'!=typeof t)&&s.state[e]===t)return!1;if(s.state[e]=t,s.events.set&&s.emit('set',e,t,n),s.change(),'value'===e){if(s.events.value&&s.emit('value',t,n),s.binded)for(var c of s.binded)c!==i&&(o=s.clone(t),c.state.notify?c.emit('notify',o,s):c.set('value',o,i?'noemitstate':'',s));s.binder&&!s.state.notify&&s.binder!==i&&s.binder.set('value',s.clone(t),i?'noemitstate':'',s),s.check()}return'noemitstate'!==n?(a&&s.element.tclass('UI_'+e,!!t),s.state.noemitstate||((r=s.cache.state)?s.cache.state.changes[e]=1:((r=s.cache.state=new l).id=s.id,r.instance=s,r.state=s.state,r.element=s.element,r.changes={},r.changes[e]=1,r.kind=n,setTimeout(e=>e.app.emitstate(e.cache.state),s.state.delay,s))),!0):void 0},e.input=function(e,t){return this.$inputs[e]=t,this},e.output=function(e,t){var n=this,i=(n.component.outputs||EMPTYARRAY).findItem('id',e);if(i)return void 0!==t?'function'==typeof t?n.$outputs[e]=t:o(n,i,null,t):(t=n.$outputs[e])&&t((e,t)=>o(n,i,e,t)),n;console.error('UI Builder: Output "{0}" not found in the "{1}" component'.format(e,n.component.name))},e.family=function(e){var n=[],i=function(e){if(e.children)for(var t of e.children)n.push(t),t.component.scope||i(t)};if(null!=e){'object'==typeof e&&(e=ATTRD(e,'index'));e=this.containers?this.containers['container'+e]:null;if(e)for(var t of e)n.push(t),i(t)}else i(this);return n},e.remove=function(){this.element.remove(),this.app.clean()},e.readvalue=function(e){if(!e)return this.state.value;e=this.find(e);return e?e.state.value:null},e.view=function(e,t,n){return e&&('function'==typeof t&&(n=t,t=null),'#'===e.charAt(0)&&(e=e.substring(1)),this.app.view(e,t,n)),this},e.datasource=function(e,t){var n=this;if(!e)return n;function i(e){e&&(e=!(e instanceof Array)&&e.items instanceof Array?e.items:e)instanceof Array&&t(CLONE(e))}var o=e.charAt(0);return'#'===o?n.view(e,null,t):'@'===o?(o=n.find(e))&&(o.on('value',i),i(o.state.value)):n.clfind(e,i),n},e.clfind=function(t,n,i){var o=this;if('function'==typeof n&&(i=n,n=''),!i)return new Promise(e=>o.app.clfind(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return o.app.clfind(t,n,i),o;e=o.find(t);if(e&&e.state.value instanceof Array){var r,s=[];n=n&&n.toSearch();for(r of e.state.value)!r.name||n&&-1===r.name.toSearch().indexOf(n)||s.push(r);i(s)}else i([])}else o.view(t,{search:n},function(e){e?(e.items instanceof Array&&(e=e.items),i(e)):i([])})},e.clread=function(t,n,i){var o=this;if(!i)return new Promise(e=>o.app.clread(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return o.app.clread(t,n,i),o;(e=o.find(t))&&e.state.value instanceof Array?i(e.state.value.findItem('id',n)):i(null)}else o.view(t,{id:n},function(e){e?(e=e.items instanceof Array?e.items:e)instanceof Array?i(e.findItem('id',n)):i(e):i(null)})},e.find=function(e){return this.app.find(e)},e.hidden=function(){return HIDDEN(this.dom)},e.reset=function(){return this.events.reset&&this.emit('reset'),this},e.reconfigure=function(e){var t=this,n={};if(e)for(var i in e){var o=t.config[i],r=e[i];r!==o&&(n[i]=o,t.config[i]=r)}if(t.events.configure&&t.emit('configure',n),v.editor){for(var s of t.app.instances)s.events.refresh&&s.emit('refresh',{type:'configure',item:t});t.app.refreshio()}return t},e.get=function(e){return this.state[e||'value']},e.on=function(e,t){var n;for(n of e.split(/\+|\s/).trim())this.events[n]?this.events[n].push(t):this.events[n]=[t]},e.off=function(e,t){var n;for(n of e.split(/\+|\s/).trim()){var i,o=this.events[n];o&&(t?-1!==(i=o.indexOf(t))&&(o.splice(i,1),o.length||delete this.events[n]):delete this.events[n])}return this},e.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},v.makeimage=e.makeimage=function(e,t,n){var i=document.createElement('CANVAS'),e=(i.width=e,i.height=t,i.getContext('2d'));return e.fillStyle=n||'#D91500',e.fillRect(0,0,i.width,i.height),i.toDataURL('image/png')},e.bindable=function(e){return(!this.config.path||'@'!==this.config.path.charAt(0))&&this.config.path===e},e.write=function(e,t,n){if(!t||'@'===t.charAt(0))return n;for(var i=t.split('.'),o=0;o<i.length-1;o++){var r=e[i[o]];e=r=null==r?e[i[o]]={}:r}return e[i[o]]=n,e},e.include=function(o,m,r){var d=this,h=[];return(m.import||EMPTYARRAY).wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},function(){var p=Object.keys(m.components);p.wait(function(c,l){if(d.app.components[c])l();else{var e=m.components[c];if('string'==typeof e){if('@'===e||'#'===e)return v.components[c]?d.app.pending.push({name:c,fn:v.components[c],local:!0}):console.error('UI Builder: The component "{0}" not found.'.format(c)),void l();var f,u=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(u||(u=t,t=''),'base64'!==(t=t&&'.'===t.charAt(0)?t.substring(1):t))t&&'html'!==t&&'json'!==t||('@'===u.charAt(0)&&(u=u.substring(1)),f=(u=v.editor&&'/'===u.charAt(0)?(v.origin||'')+u:u).format(c),AJAX('GET '+f+(v.cachecomponents?' <{0}>'.format(1==v.cachecomponents?'session':v.cachecomponents):''),function(e,t){if(t)return console.error('UI Builder:',u,t),void l();if(ERROR(e))return console.error('UI Builder:',u,e),void l();if('object'!=typeof e){var t='@'===e.charAt(0),n=(t&&(e=e.substring(1)),v.parsehtml(e));try{var i={};if(i.id=c,i.isexternal=t,i.cls=d.app.class+'_'+HASH(i.id).toString(36),n.css&&(i.css=n.css),n.readme&&(i.readme=n.readme),n.html&&(i.html=n.html.replace(g,i.cls)),n.settings&&(i.settings=n.settings.replace(g,i.cls)),new Function('exports',n.js.replace(g,i.cls))(i),i.components)for(var o in i.components)m.components[o]||(m.components[o]=i.components[o],p.push(o));var r=u.indexOf('/',10);-1!==r&&(i.origin=u.substring(0,r),v.origin!==i.origin&&(i.render&&'/'===i.render.charAt(0)&&(i.render=i.origin+i.render),i.settings&&'/'===i.settings.charAt(0)&&(i.settings=i.origin+i.settings))),'auto'===i.render&&(i.render=f.replace('editor.html','render.html')),'auto'===i.settings&&(i.settings=f.replace('editor.html','settings.html')),h.push({name:c,fn:i})}finally{l()}}else{var s=b(tmp);for(o in e){var a=e[o];'/'===a.charAt(0)&&(a=s+a),m.components[o]||(m.components[o]='@'+a,p.push(o))}l()}}));else try{var n=v.parsehtml(decodeURIComponent(atob(u))),i={};if(i.id=c,i.cls=d.app.class+'_'+HASH(i.id).toString(36),n.css&&(i.css=n.css),n.html&&(i.html=n.html.replace(g,i.cls)),new Function('exports',n.js.replace(g,i.cls))(i),i.components)for(var o in i.components)m.components[o]||(m.components[o]=i.components[o],p.push(o));h.push({name:c,fn:i})}finally{l()}}else h.push({name:c,fn:e}),l()}},function(){var e=h.splice(0),i=[];e.wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=(e.local?'uibuilder':d.app.class)+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,d.app.components[e.name]=n,e.local?t():(n.css&&i.push(n.css.replace(g,n.cls)),n.import instanceof Array?n.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},t):t())},function(){var e;m.css&&i.unshift(m.css.replace(g,d.app.class)),i.length&&(e=d.app.class+'_'+GUID(5),CSS(i.join('\n'),e),d.removecss||(d.removecss=[]),d.removecss.push(e));for(var t,n=0;n<m.children.length;n++)for(t of m.children[n])d.app.compile(o,t,n);r&&r()})},3)}),d},e.watch=function(e,t,n){'function'==typeof t&&(n=t,t='value');e=this.app.instances.findItem('id',e);return e&&e.on(t,n),this},e.read=function(e,t){if(!t||'@'===t.charAt(0))return e;for(var n=t.split('.'),i=0;i<n.length;i++)if(!(e=e[n[i]]))return;return e},e.replace=e.variables=function(e,o,r){var s=this;return e.replace(/\{[a-z0-9_.-]+\}/gi,function(e){var t=e.substring(1,e.length-1).trim(),n='',i=t.substring(0,4);if('user'===i)W.user&&(n=-1===(t=t.substring(5)).indexOf('.')?W.user[t]:s.read(W.user,t));else if('args'===i)t=t.substring(5),n=s.args[t];else if('data'===i)o&&(n=-1===(t=t.substring(4)).indexOf('.')?o:s.read(o,t.substring(1)));else if('query'===t.substring(0,5)){if(-1===(t=t.substring(5)).indexOf('.'))return QUERIFY(s.query).substring(1);n=s.query[t.substring(1)]}if(null==n)return e;if('function'==typeof r)return r(n);switch(r){case'url':case'urlencode':case'encode':return encodeURIComponent(n);case'escape':case'html':return Thelpers.encode(n);case'json':return JSON.stringify(n)}return n})},e.wait=function(e,t){function n(){e()?t():setTimeout(n,300)}return n(),this},e.querify=function(e,t){return this.app.urlify(this.variables(t?QUERIFY(e,t):e))},e.urlify=function(e){return this.app.urlify(this.variables(e))},e.settings=function(){this.app.emit('settings',this),v.emit('settings',this)},v.version=1.18,v.selectors={component:'.UI_component',components:'.UI_components'},v.current='default',v.events={},v.apps={},v.cache={},v.components={},v.loader=0,v.component=function(e,t,n){var i,o;r&&clearTimeout(r),'string'==typeof t&&((i={}).id=e,i.cls='uibuilder_'+HASH(i.id).toString(36),o=v.parsehtml('base64 '===t.substring(0,7)?decodeURIComponent(atob(t.substring(7))):t),new Function('exports',o.js.replace(g,i.cls))(i),t=i,o.css&&(t.css=o.css),o.html&&(t.html=o.html)),t.id=e,t.cls||(t.cls='uibuilder_'+HASH(t.id).toString(36)),t.css&&(t.css=t.css.replace(g,t.cls)),t.html&&(t.html=t.html.replace(g,t.cls)),t.import instanceof Array?(v.loader++,t.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},function(){v.loader--,r&&clearTimeout(r),r=setTimeout(s,2),v.components[e]=t,n&&n(null,t)})):(r&&clearTimeout(r),v.components[e]=t,n&&n(null,t))},v.resize=function(){for(var e in v.apps){var t;for(t of v.apps[e].instances)t.events.resize&&t.emit('resize')}},ON('resize + resize2',v.resize),v.on=function(e,t){this.events[e]?this.events[e].push(t):this.events[e]=[t]},v.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},v.register=function(e,t){v.apps[v.current].pending.push({name:e,fn:t})};var y=function(e,t){var n=e.element,i=[];for(n of n.find(v.selectors.component+'[data-id="{0}"] {1}'.format(t,v.selectors.components)))(n=$(n)).closest(v.selectors.component).attrd('id')===t&&i.push({index:+n.attrd('index'),element:n});return i.quicksort('index'),i};function T(e,t,n,i,o,r,s){if('string'==typeof n){if(!this.components[n])return void console.error('UI Builder: The component "{0}" not found'.format(n));n={id:'cid'+Date.now().toString(36),component:n,children:[],config:n.config||{},gap:0!=n.gap}}if(r&&COPY(r,n),o)for(var a in o)n.config[a]=o[a];r=y(this,e);if(r.length)for(var c of r)c.index==t&&this.compile(c.element,n,t,i,null,s);return this.refreshio(),n}v.build=function(e,m,i){var t,s,d,o,a,c,n;if(!v.loader)return v.apps[m.id]?(v.remove(m.id),void setTimeout(v.build,100,e,m,i)):m.components&&m.children?(v.current=m.id,t=document.createElement('DIV'),(s=$(t)).attrd('id',m.id),s.aclass('UI_app invisible'),s.empty(),$(e)[0].appendChild(t),o=[],(d={}).id=v.current,d.components={},d.args=m.args||{},d.query=m.query||CLONE(NAV.query),d.schema=m,d.events={},d.cache={},d.refs={},d.compile=A,d.stringify=I,d.clean=x,d.add=T,d.remove=()=>v.remove(d.id),d.class='ui_'+HASH(v.current).toString(36),d.element=s,d.dom=s[0],d.pending=[],d.instances=[],d.removecss=[],m.urlify?d.urlify=m.urlify:d.urlify=e=>e,s.aclass(d.class),d.view=function(e,t,n){v.view?v.view.call(d,e,t,n):n(EMPTYARRAY)},v.clfind?d.clfind=v.clfind:d.clfind=function(e,t,n){n(EMPTYARRAY)},v.clread?d.clread=v.clread:d.clread=function(e,t,n){n(EMPTYOBJECT)},d.on=u.prototype.on,d.find=u.prototype.find,d.emit=u.prototype.emit,d.emitstate=u.prototype.emitstate,d.intervalcounter=0,d.interval&&clearInterval(d.interval),d.interval=setInterval(function(t){if(W.inDOM(t.dom)){t.intervalcounter++;var e,n=e=>e.events.service&&e.emit('service',t.intervalcounter);for(e of t.instances)e.events.service&&e.emit('service',t.intervalcounter),e.fork&&a(e,n)}else t.remove()},6e4,d),d.recompile=function(){d.clean();for(var e,t=0;t<d.schema.children.length;t++)for(e of d.schema.children[t])e.protected=!0,d.compile(d.element,e,t)},d.build=function(e,t,n){t.urlify=d.urlify,v.build(e,t,n)},a=function(e,t){for(var n of e.fork.instances)t(n),n.fork&&a(n,t)},c=null,n=function(){if(c=null,v.editor){d.inputs=[],d.outputs=[],d.list=[],d.zindex=1;for(var e of d.instances)if(e.dom.parentNode){e.component.floating&&(d.zindex=(e.element.css('z-index')||'').parseInt(),d.zindex<=0&&(d.zindex=1));var t=e.component.inputs,n=e.config.name||e.component.name;if(d.list&&d.list.push({id:e.id,componentid:e.component.id,name:n,icon:e.component.icon,color:e.component.color}),t)for(var i of t)d.inputs.push({id:e.id+'_'+i.id,ref:i.id,name:n+': '+i.name,componentid:e.component.id,component:e.component.name,input:i.name,icon:e.component.icon,color:e.component.color,note:i.note,schema:i.schema});if((t=e.component.outputs)&&t.length)for(var i of t)d.outputs.push({id:e.id+'_'+i.id,ref:i.id,name:n+': '+i.name,componentid:e.component.id,component:e.component.name,output:i.name,icon:e.component.icon,color:e.component.color,note:i.note,schema:i.schema})}}if(!d.ready){d.ready=!0,d.callback&&d.callback(d),s.rclass('invisible'),h(d);function o(e){e.state.init=1,e.events.ready&&e.emit('ready')}var r;for(r of d.instances)r.fork&&a(r,o),r.state.init=1,r.events.ready&&r.emit('ready');v.emit('app',d),d.emit('ready')}d.emit('io',d),v.emit('io',d)},d.refreshio=function(e){e?n():(c&&clearTimeout(c),c=setTimeout(n,100))},d.input=function(e,t,n){n=n||NOOP;var i=e.indexOf('_'),o=e.substring(0,i),e=e.substring(i+1),i=d.instances.findItem('id',o);i?(i=i.$inputs[e])?i(t,n):n('Input "{0}" not found'.format(e)):n('Instance "{0}" not found'.format(o))},d.output=function(e){i=i||NOOP;var t=e.indexOf('_'),n=e.substring(0,t),e=e.substring(t+1),t=d.instances.findItem('id',n);t?t.output(e):i('Instance "{0}" not found'.format(n))},v.apps[v.current]=d,(m.import||EMPTYARRAY).wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},function(){var p=Object.keys(m.components);p.wait(function(a,c){var e=m.components[a];if('string'==typeof e){if('@'===e||'#'===e)return v.components[a]?d.pending.push({name:a,fn:v.components[a],local:!0}):console.error('UI Builder: The component "{0}" not found.'.format(a)),void c();var l,f,u=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(u||(u=t,t=''),'base64'!==(t=t&&'.html'===t.charAt(0)?t.substring(1):t))t&&'html'!==t||((l='@'===u.charAt(0))&&(u=u.substring(1)),f=(u=v.editor&&'/'===u.charAt(0)?(v.origin||'')+u:u).format(a),AJAX('GET '+f+(v.cachecomponents?' <{0}>'.format(1==v.cachecomponents?'session':v.cachecomponents):''),function(e,t){if(t)return console.error('UI Builder:',f,t),void c();if(ERROR(e))return console.error('UI Builder:',f,e),void c();if(!e)return console.error('UI Builder:',f,'empty file'),void c();if('object'!=typeof e){t=v.parsehtml(e);try{var n={};if(n.id=a,n.isexternal=l,n.cls=d.class+'_'+HASH(n.id).toString(36),t.css&&(n.css=t.css),t.readme&&(n.readme=t.readme),t.html&&(n.html=t.html.replace(g,n.cls)),t.settings&&(n.settings=t.settings.replace(g,n.cls)),new Function('exports',t.js.replace(g,n.cls))(n),n.components)for(var i in n.components)m.components[i]||(m.components[i]=n.components[i],p.push(i));var o=u.indexOf('/',10);-1!==o&&(n.origin=u.substring(0,o),v.origin!==n.origin&&(n.render&&'/'===n.render.charAt(0)&&(n.render=n.origin+n.render),n.settings&&'/'===n.settings.charAt(0)&&(n.settings=n.origin+n.settings))),'auto'===n.render&&(n.render=f.replace('editor.html','render.html')),'auto'===n.settings&&(n.settings=f.replace('editor.html','settings.html')),d.pending.push({name:a,fn:n})}finally{c()}}else{var r=b(f);for(i in e){var s=e[i];'/'===s.charAt(0)&&(s=r+s),m.components[i]||(m.components[i]='@'+s,p.push(i))}c()}}));else try{var n={},i=(n.id=a,n.cls=d.class+'_'+HASH(n.id).toString(36),v.parsehtml(decodeURIComponent(atob(u))));if(i.css&&(n.css=i.css),i.readme&&(n.readme=i.readme),i.html&&(n.html=i.html.replace(g,n.cls)),i.settings&&(n.settings=i.settings.replace(g,n.cls)),new Function('exports',i.js.replace(g,n.cls))(n),n.components)for(var o in n.components)m.components[o]||(m.components[o]=n.components[o],p.push(o));d.pending.push({name:a,fn:n})}finally{c()}}else d.pending.push({name:a,fn:e}),c()},function(){d.pending.splice(0).wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=(e.local?'uibuilder':d.class)+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,d.components[e.name]=n,e.local?t():(n.css&&o.push(n.css.replace(g,n.cls)),n.import instanceof Array?n.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},t):t())},function(){m.css&&o.unshift(m.css.replace(g,d.class)),CSS(o,d.class);for(var e,t=0;t<m.children.length;t++)for(e of m.children[t])e.protected=!0,d.compile(s,e,t);d.callback=i})},1)}),d):void WARN('Invalid UI Builder metadata:',m.id);setTimeout(v.build,100,e,m,i)},v.parsehtml=function(e){var t='';if(-1===e.indexOf('<script>'))return{js:e};var n,i='',o='',t='',r='',s='',a=e.indexOf('<settings>');return-1!==a&&(n=e.indexOf('</settings>',a+10),i=e.substring(a+10,n).trim(),e=e.substring(0,a)+e.substring(n+11)),-1!==(a=e.indexOf('<style>'))&&(t=e.substring(a+7,e.indexOf('</style>',a+7))),-1!==(a=e.indexOf('<body>'))&&(s=e.substring(a+6,e.indexOf('</body>',a+6))),-1!==(a=e.indexOf('<readme>'))&&(o=e.substring(a+8,e.indexOf('</readme>',a+8))),-1!==(a=e.indexOf('<script>'))&&(n=e.indexOf('<\/script>',a+8),r=e.substring(a+8,n).trim()),{js:r,css:t,settings:i,readme:o,html:s}},v.remove=function(t){var n=v.apps[t];if(n){n.interval&&clearInterval(n.interval),n.interval=null;for(var e of n.instances){if(e.removecss)for(var i of e.removecss)CSS('',i);e.events.destroy&&e.emit('destroy')}setTimeout(function(){for(var e in n.components){e=n.components[e];e.uninstall&&e.uninstall()}n.tmp=null,CSS('',n.class),n.element.remove(),delete v.apps[t]},2)}};var f=null,p=document;function d(i,r,e){var t,n,o,s,a,c,l=(i=!(i instanceof jQuery)?$(i):i).closest('.UI_component')[0];!l||l.uibuilder.meta.readonly||l.uibuilder.forked||(null==(r=r||{}).format&&(r.format=!0),r.format&&null==r.icon&&(r.icon=!0),e&&(r.callback=e),f?f.element[0]!=i[0]&&(f.close(),setTimeout(d,100,i,r,e)):(r.backup=i.html(),r.html&&i.html(r.html),i.attr('contenteditable',!0),i.aclass('UI_editing'),(f={}).element=i,f.dom=i[0],f.instance=l.uibuilder,f.parent=r.parent?r.parent[0]:f.dom,f.createlink=function(){if(function(e){if(p.selection&&'Text'===p.selection.type)return p.selection.createRange().htmlText;if(W.getSelection){var t=W.getSelection();if(!t.rangeCount)return'';for(var n=p.createElement('div'),i=0,o=t.rangeCount;i<o;++i)n.appendChild(t.getRangeAt(i).cloneContents());return e?n:n.innerHTML}}().trim()){for(var e=f.element,t='#link'+Date.now().toString(36),n=e[0],i=0;i<5;i++){if('A'===n.tagName)return;if(!(n=n.parentNode))break}document.execCommand('CreateLink',!1,t);var o,e=e.find('a[href="'+t+'"]');e.length&&(f&&f.close(),t=e.text(),o='',e.aclass('UI_link'),r.cms&&e.aclass('CMS_edit CMS_remove'),-1!==t.indexOf('@')?o='mailto:'+t:/\d+/.test(t)?o='tel:'+t:-1===t.indexOf(' ')&&-1===t.indexOf(',')&&-1!==t.indexOf('.')&&(o=/http(s):\/\//.test(t)?t:'https://'+t),t=-1!==o.indexOf('.')&&-1===o.indexOf(location.hostname)?'_blank':'',e.attr('href',o||'#'),e.attr('target',t),v.emit('link',e))}},t=function(){f.close()},n=function(e){e.target===f.parent||f.parent.contains(e.target)||f.close()},o=function(e){e.preventDefault();e=(e.originalEvent||e).clipboardData.getData('text/plain');document.execCommand('insertHTML',!1,e)},s=function(e){if(r.keydown&&r.keydown(e),27===e.keyCode)return e.preventDefault(),e.stopPropagation(),f.key=27,void f.close();if(r.backslashremove&&8===e.keyCode&&!i.text().trim())return f.key=8,void f.close();if(13!==e.keyCode){if(9===e.keyCode)return r.tabs?(e.preventDefault(),void document.execCommand('insertHTML',!1,'&#009')):(r.endwithtab?(e.preventDefault(),f.key=9):(e.preventDefault(),e.stopPropagation()),void f.close());if(f.change=!0,e.metaKey||e.ctrlKey)if(66!==e.keyCode)if(76!==e.keyCode)if(73!==e.keyCode){var t,n;if(80===e.keyCode)return r.format&&!0===r.icon&&(t=i[0].nodeName.toLowerCase(),n='<i class="ti ti-totaljs UI_icon'+(r.cms?' CMS_edit CMS_remove':'')+'" contenteditable="false"></i>','span'===t?i.parent().prepend(n):document.execCommand('insertHTML',!1,n)),e.preventDefault(),void e.stopPropagation();85!==e.keyCode?32===e.keyCode&&(document.execCommand('insertHTML',!1,'&nbsp;'),e.preventDefault(),e.stopPropagation()):r.format&&!1!==r.underline||(e.preventDefault(),e.stopPropagation())}else r.format&&!1!==r.italic||(e.preventDefault(),e.stopPropagation());else r.format&&!1!==r.link?f.createlink():(e.preventDefault(),e.stopPropagation());else r.format&&!1!==r.bold||(e.preventDefault(),e.stopPropagation())}else r.multiline&&!e.shiftKey||(e.preventDefault(),e.stopPropagation(),f.key=13,f.close())},i.focus(),'end'===r.cursor&&((e=document.createRange()).selectNodeContents(i[0]),e.collapse(!1),(l=W.getSelection()).removeAllRanges(),l.addRange(e)),f.close=function(){var e;$(W).off('click',n),i.rattr('contenteditable'),i.off('keydown',s),i.off('contextmenu',t),i.off('paste',o),i.rclass('UI_editing'),r.callback&&((e={}).text=i.text().trim(),e.html=i.html(),e.change=f.change,e.element=f.element,e.dom=f.dom,e.backup=r.backup,e.key=f.key,e.param=r.param,e.instance=f.instance,r.callback(e)),f.timeout&&clearTimeout(f.timeout),f=null},a=r.placeholder,c=!1,f.checkplaceholder=function(){var e;a&&(e=0<i[0].innerHTML.length,c!==e&&(c=e,a.classList.toggle('hidden',e)))},$(W).on('click',n),i.on('keydown',s),i.on('contextmenu',t),r.placeholder&&a&&i.on('input',f.checkplaceholder),i.on('paste',o)))}function I(e,u){var t,p=this,m='function'==typeof e?e:null,n=(e=m?null:e)||p.element.find('> '+v.selectors.component),i=[],d=[],h={};for(t of n){var o={children:[]};i.push(o),function e(t,n){var i,o,r,s=n.uibuilder;if(t.id=n.getAttribute('data-id'),t.component=s.component.id,t.config=CLONE(s.config),h[s.component.id]||(i=p.schema.components[s.component.id])&&(h[s.component.id]=i),s.component.floating&&(o=(i=$(n)).position(),t.x=o.left,t.y=o.top,t.zindex=i.css('z-index')||d.length,t.zindex=+t.zindex,t.zindex<=0&&(t.zindex=1)),!m||m(t)){if(d.push(s),n.classList.contains('UI_gap')&&(t.gap=!0),s.children=[],!s.component.children)for(r of y(p,t.id)){var a,c=[],f=r.element.find('> '+v.selectors.component);t.children||(t.children=[]),t.children.push(c);for(a of f){var l={children:[]};c.push(l),s.children.push(a.uibuilder),e(l,a)}}s.events.stringify&&s.emit('stringify',t,u)}}(o,t)}i=e?i[0]:[i];return{instances:d,children:i,components:h}}v.edit=d}(W.UIBuilder={});