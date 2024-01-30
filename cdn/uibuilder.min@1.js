!function(v){var g=/CLASS/g;function u(e){var t=this;t.id=e.id,t.query=e.query,t.app=e,t.cache=e.cache,t.class=e.class,t.components=e.components,t.instances=[],t.events={},t.refs={}}function b(e){var t,n='';return n='/'!==e.charAt(0)?-1===(t=e.indexOf('/',9))?e:e.substring(0,t):n}function h(e){var t,n={},i={},r=!1;e.$rebindtimeout=null;for(o of e.instances)!o.config.path||'@'!==o.config.path.charAt(0)||(t=o.config.path.substring(1))!=o.id&&(n[t]?n[t].push(o):n[t]=[o],i[o.id]=t,r=!0);if(r)for(var o of e.instances)o.binded=n[o.id]||null,o.binder=i[o.id]?e.instances.findItem('id',i[o.id]):null}function l(){}function k(){var e=this;e.state={init:0,value:null,disabled:!1,modified:!1,readonly:!1,touched:!1,invalid:!1,delay:10,notify:!1,bind:!1,validate:!0},e.cache={},e.events={},e.$inputs={},e.$outputs={},e.iseditor=v.editor}u.prototype.find=function(e){var t,n='.'===e.charAt(0)?e.substring(1):'',e=n?'':'@'===e.charAt(0)?e.substring(1):e;for(t of this.instances)if(n){if(t.config.path===n)return t}else if(t.id===e)return t},u.prototype.urlify=function(){return this.app.urlify.apply(this.app,arguments),this},u.prototype.clfind=function(){return this.app.clfind.apply(this.app,arguments),this},u.prototype.clread=function(){return this.app.clread.apply(this.app,arguments),this},u.prototype.view=function(){return this.app.view.apply(this.app,arguments),this},u.prototype.clean=function(){return this},u.prototype.on=function(e,t){var n=this;n.events[e]?n.events[e].push(t):n.events[e]=[t]},u.prototype.rebind=function(){var e=this;e.$rebindtimeout&&clearTimeout(e.$rebindtimeout),e.$rebindtimeout=setTimeout(h,50,e)},u.prototype.emit=function(e,t,n,i,r,o){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,r,o)},u.prototype.emitstate=function(e,t){var n,i={},r=e.instance,o=t=t||'state',s='noemit'+t,a=(e.instance.cache[o]=null,r.parent),c=0;for(e.level=0,e.type=t;a&&(e.level++,i[a.id]=!0,!a.fork)&&(a.events[t]&&(c++,a.emit(t,e)),!e.$propagation);)a=a.parent;e.level=null,t='@'+t;for(n of this.instances)i[r.id]||n===e.instance||n.events[t]&&(c++,n.emit(t,e));r.state[s]=0===c},customElements.define('uibuilder-component',class extends HTMLElement{constructor(){super(),setTimeout(()=>this.compile(),1)}compile(){var e,t=this,n=t.parentNode,f=v.selectors.component.substring(1);for(t.classList.add('block');n;){if('BODY'===n.tagName)return;if(n.classList.contains(f)){e=n.uibuilder;break}n=n.parentNode}var i,r=!0,o=(e.fork||(r=!1,e.fork=new u(e.app),e.fork.element=e.element,e.fork.compile=A,e.root=e),(t.getAttribute('config')||'').parseConfig()),s={},a=(s.id=t.getAttribute('uid')||'ui'+GUID(10),s.config=o||{},s.component=t.getAttribute('name'),!1);for(i in o)if('#'===o[i]){var c=t.children[0];if(c&&'SCRIPT'===c.tagName)switch(c.getAttribute('type')){case'application/json':case'text/json':o[i]=PARSE(c.innerHTML.trim());break;case'text/html':case'text/plain':o[i]=c.innerHTML.trim()}else o[i]=t.innerHTML;a=!0}a&&(t.innerHTML='');var l=t.getAttribute('path'),l=(l&&(o.path=l),e.fork.components[s.component]);if(!l)return console.error('UI Builder: The component not found: '+s.component),void t.parentNode.removeChild(t);t.innerHTML&&(o.name=t.innerHTML.trim(),t.innerHTML=''),o.name||(o.name=l.name),(o.$bind||t.getAttribute('bind'))&&(s.bind=!0),(o.$notify||t.getAttribute('notify'))&&(s.notify=!0),s.readonly=!0,e.fork.compile(t,s,null,null,t),t.uibuilder&&(t.uibuilder.parent=e),e.fork.rebind();l=t.classList;l.remove('invisible'),l.remove('hidden'),r||setTimeout(e=>e.emit('fork',e.fork),1,e)}}),l.prototype.stopPropagation=function(){this.$propagation=!0};function i(){return''}var o,e=k.prototype;e.$forcecheck=function(e){e.$checktimeout=null;var t=!1;e.state.disabled||e.state.readonly?t=!1:e.validate&&(!0===(t=e.validate())||1===t||''===t||t instanceof Array&&!t.length?t=!1:!1!==t&&0!==t||(t=!0)),e.set('invalid',t)},e.$forcechange=function(e){e.$changetimeout=null,e.app.emit('change',e)},e.errors=function(){var e,t=[],n=this.state.invalid,i=typeof n;if(!n||'boolean'==i||'number'==i)return t;if('string'==i)t.push({error:n});else if(n instanceof Array)for(var r of n)r&&('string'==typeof r?t.push({error:r}):(e=r.error||r.err||r.msg||r.message)&&t.push({error:e}));else(e=n.error||n.err||n.msg||n.message)&&t.push({error:e});return t},e.change=function(){var e=this;e.app.events.change&&(e.$changetimeout&&clearTimeout(e.$changetimeout),e.$changetimeout=setTimeout(e.$forcechange,50,e))},e.check=function(e){var t=this;if(!1!==t.state.validate)return t.$checktimeout&&clearTimeout(t.$checktimeout),e?t.$forcecheck(t):t.$checktimeout=setTimeout(t.$forcecheck,50,t),t};function r(e,t,n,i){var r={};r.id=e.id+'_'+t.id,r.instanceid=e.id,r.componentid=e.component.id,r.ref=t.id,r.icon=t.icon,r.color=t.color,r.note=t.note,r.name=t.name,r.component=e.component,r.app=e.app,r.instance=e,r.err=n,r.data=i,e.app.emit('output',r),v.emit('output',r)}function s(){o=null;var e,t=[];for(e in v.components){var n=v.components[e];n.css&&t.push(n.css)}CSS(t,'uibuilder')}function A(l,e,u,t,n,i){var r=this,o=r.components[e.component];if(o){var s=n||document.createElement('DIV'),f=new k;if(s.classList.add('ui_'+o.id),e.gap&&s.classList.add('UI_gap'),o.floating&&(s.classList.add('UI_floating'),s.style='left:{0}px;top:{1}px;z-index:{2};position:absolute'.format(e.x||0,e.y||0,e.zindex||1)),e.bind&&(f.state.bind=!0),e.notify&&(f.state.notify=!0),o.config||(o.config={}),f.id=e.id,f.args=r.args,f.newbie=i||e.newbie,f.element=$(s),f.element.aclass(v.selectors.component.substring(1)+' '+o.cls).attrd('id',e.id),f.dom=s,f.events={},f.config=CLONE(o.config),f.app=r,f.component=o,f.protected=e.protected,f.meta=e,f.edit=m,e.newbie&&delete e.newbie,n&&(f.forked=!0),e.config)for(var a in e.config)f.config[a]=e.config[a];if(f.config.name||(f.config.name=o.name),r.instances.push(f),!n||(i=l.getAttribute('uid'))&&(r.refs[i]=f),s.uibuilder=f,!n){var c=l.closest(v.selectors.component);if(c&&c.length&&(f.parent=c[0].uibuilder,f.parent&&((i=f.parent).children||(i.children=[]),i.containers||(i.containers={}),a='container'+u,i.children.push(f),i.containers[a]?null==t?i.containers[a].push(f):i.containers[a].splice(t,0,f):i.containers[a]=[f])),c=$(l),null==t)c.append(s);else{for(var p=!1,d=0;d<c[0].children.length;d++)if(d===t){c[0].insertBefore(s,c[0].children[d]),p=!0;break}p||c.append(s)}}o.make&&o.make(f,f.config,f.element,f.component.cls,v.editor),v.events.make&&v.emit('make',f),n||(e.children instanceof Array?setTimeout(function(e,t){for(var n=y(e,t.id),i=0;i<t.children.length;i++){var r=n.findItem('index',i);if(r)for(l of t.children[i])e.compile(r.element,l,i)}var o=e.components[t.component];if(o.children)for(var s={},a=CLONE(o.children),c=function(e){for(var t of e)for(var n of t)s[n.id]=f.id+'X'+HASH(n.id).toString(36),n.children&&n.children.length&&c(n.children)},o=(c(a),Object.keys(s)),o=new RegExp(o.join('|'),'g'),a=PARSE(JSON.stringify(a).replace(o,e=>s[e])),i=0;i<a.length;i++){var l,r=n.findItem('index',i);if(r)for(l of a[i])e.compile(r.element,l,i)}e.refreshio()},1,r,e):r.refreshio())}else console.error('UI Builder: The component "{0}" not found'.format(e.component))}function x(){for(var e=0,t=0,n=[];;){var i=this.instances[e];if(!i)break;if(function(e){if(e){if('BODY'===e.tagName)return 1;for(var t=e.parentNode;t;){if('BODY'===t.tagName)return 1;t=t.parentNode}}}(i.dom))e++;else{if(t++,i.removecss)for(var r of i.removecss)CSS('',r);i.events.destroy&&i.emit('destroy'),this.instances.splice(e,1),n.push(i)}}if(this.refreshio(),t)for(var o of this.instances)o.events.refresh&&o.emit('refresh',{type:'remove',items:n})}e.maketemplate=function(e){var t=this;if(!(e=e||t.component.html))return i;var n=HASH(e).toString(36);return t.app.cache[n]||(t.app.cache[n]=-1===e.indexOf('{{')?()=>e:Tangular.compile(e),t.app.cache[n])},e.error=function(e){var t=this.config;console.error('UIBuilder:',this.component.name+' - '+t.name+(t.path?' ({0})'.format(t.path):''),e)},e.clone=function(e){var t=e;return'object'==typeof e&&(!e||e instanceof Date||(t=CLONE(e))),t},e.set=function(e,t,n,i){var r,o,s=this,a=!1;switch(e){case'disabled':case'modified':case'readonly':case'touched':a=!0,t=!!t;break;case'invalid':a=!0}if('touched'===e&&s.check(),s.state.noemitsomething||((o=s.cache.something)?s.cache.something.changes[e]=1:((o=s.cache.something=new l).id=s.id,o.instance=s,o.state=s.state,o.element=s.element,o.changes={},o.changes[e]=1,o.kind=n,setTimeout(e=>e.app.emitstate(e.cache.something,'something'),222,s))),'force'!==n&&(null==t||'object'!=typeof t)&&s.state[e]===t)return!1;if(s.state[e]=t,s.events.set&&s.emit('set',e,t,n),s.change(),'value'===e){if(s.events.value&&s.emit('value',t,n),s.binded)for(var c of s.binded)c!==i&&(r=s.clone(t),c.state.notify?c.emit('notify',r,s):c.set('value',r,i?'noemitstate':'',s));s.binder&&!s.state.notify&&s.binder!==i&&s.binder.set('value',s.clone(t),i?'noemitstate':'',s),s.check()}return'noemitstate'!==n?(a&&s.element.tclass('UI_'+e,!!t),s.state.noemitstate||((o=s.cache.state)?s.cache.state.changes[e]=1:((o=s.cache.state=new l).id=s.id,o.instance=s,o.state=s.state,o.element=s.element,o.changes={},o.changes[e]=1,o.kind=n,setTimeout(e=>e.app.emitstate(e.cache.state),s.state.delay,s))),!0):void 0},e.input=function(e,t){return this.$inputs[e]=t,this},e.output=function(e,t){var n=this,i=(n.component.outputs||EMPTYARRAY).findItem('id',e);if(i)return void 0!==t?'function'==typeof t?n.$outputs[e]=t:r(n,i,null,t):(t=n.$outputs[e])&&t((e,t)=>r(n,i,e,t)),n;console.error('UI Builder: Output "{0}" not found in the "{1}" component'.format(e,n.component.name))},e.family=function(e){var n=[],i=function(e){if(e.children)for(var t of e.children)n.push(t),t.component.scope||i(t)};if(null!=e){'object'==typeof e&&(e=ATTRD(e,'index'));e=this.containers?this.containers['container'+e]:null;if(e)for(var t of e)n.push(t),i(t)}else i(this);return n},e.remove=function(){this.element.remove(),this.app.clean()},e.readvalue=function(e){if(!e)return this.state.value;e=this.find(e);return e?e.state.value:null},e.view=function(e,t,n){return e&&('function'==typeof t&&(n=t,t=null),'#'===e.charAt(0)&&(e=e.substring(1)),this.app.view(e,t,n)),this},e.datasource=function(e,t){var n=this;if(!e)return n;function i(e){e&&(e=!(e instanceof Array)&&e.items instanceof Array?e.items:e)instanceof Array&&t(CLONE(e))}var r=e.charAt(0);return'#'===r?n.view(e,null,t):'@'===r?(r=n.find(e))&&(r.on('value',i),i(r.state.value)):n.clfind(e,i),n},e.clfind=function(t,n,i){var r=this;if('function'==typeof n&&(i=n,n=''),!i)return new Promise(e=>r.app.clfind(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return r.app.clfind(t,n,i),r;e=r.find(t);if(e&&e.state.value instanceof Array){var o,s=[];n=n&&n.toSearch();for(o of e.state.value)!o.name||n&&-1===o.name.toSearch().indexOf(n)||s.push(o);i(s)}else i([])}else r.view(t,{search:n},function(e){e?(e.items instanceof Array&&(e=e.items),i(e)):i([])})},e.clread=function(t,n,i){var r=this;if(!i)return new Promise(e=>r.app.clread(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return r.app.clread(t,n,i),r;(e=r.find(t))&&e.state.value instanceof Array?i(e.state.value.findItem('id',n)):i(null)}else r.view(t,{id:n},function(e){e?(e=e.items instanceof Array?e.items:e)instanceof Array?i(e.findItem('id',n)):i(e):i(null)})},e.find=function(e){return this.app.find(e)},e.hidden=function(){return HIDDEN(this.dom)},e.reset=function(){return this.events.reset&&this.emit('reset'),this},e.reconfigure=function(e){var t=this,n={};if(e)for(var i in e){var r=t.config[i],o=e[i];o!==r&&(n[i]=r,t.config[i]=o)}if(t.events.configure&&t.emit('configure',n),v.editor){for(var s of t.app.instances)s.events.refresh&&s.emit('refresh',{type:'configure',item:t});t.app.refreshio()}return t},e.get=function(e){return this.state[e||'value']},e.on=function(e,t){var n;for(n of e.split(/\+|\s/).trim())this.events[n]?this.events[n].push(t):this.events[n]=[t]},e.off=function(e,t){var n;for(n of e.split(/\+|\s/).trim()){var i,r=this.events[n];r&&(t?-1!==(i=r.indexOf(t))&&(r.splice(i,1),r.length||delete this.events[n]):delete this.events[n])}return this},e.emit=function(e,t,n,i,r,o){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,r,o)},v.makeimage=e.makeimage=function(e,t,n){var i=document.createElement('CANVAS'),e=(i.width=e,i.height=t,i.getContext('2d'));return e.fillStyle=n||'#D91500',e.fillRect(0,0,i.width,i.height),i.toDataURL('image/png')},e.bindable=function(e){return(!this.config.path||'@'!==this.config.path.charAt(0))&&this.config.path===e},e.write=function(e,t,n){if(!t||'@'===t.charAt(0))return n;for(var i=t.split('.'),r=0;r<i.length-1;r++){var o=e[i[r]];e=o=null==o?e[i[r]]={}:o}return e[i[r]]=n,e},e.include=function(r,d,o){var m=this,h=[];return(d.import||EMPTYARRAY).wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},function(){var p=Object.keys(d.components);p.wait(function(c,l){if(m.app.components[c])l();else{var e=d.components[c];if('string'==typeof e){if('@'===e||'#'===e)return v.components[c]?m.app.pending.push({name:c,fn:v.components[c],local:!0}):console.error('UI Builder: The component "{0}" not found.'.format(c)),void l();var f,u=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(u||(u=t,t=''),'base64'!==(t=t&&'.'===t.charAt(0)?t.substring(1):t))t&&'html'!==t&&'json'!==t||('@'===u.charAt(0)&&(u=u.substring(1)),f=(u=v.editor&&'/'===u.charAt(0)?(v.origin||'')+u:u).format(c),AJAX('GET '+f+(v.cachecomponents?' <{0}>'.format(1==v.cachecomponents?'session':v.cachecomponents):''),function(e,t){if(t)return console.error('UI Builder:',u,t),void l();if(ERROR(e))return console.error('UI Builder:',u,e),void l();if('object'!=typeof e){var t='@'===e.charAt(0),n=(t&&(e=e.substring(1)),v.parsehtml(e));try{var i={};if(i.id=c,i.isexternal=t,i.cls=m.app.class+'_'+HASH(i.id).toString(36),n.css&&(i.css=n.css),n.readme&&(i.readme=n.readme),n.html&&(i.html=n.html.replace(g,i.cls)),n.settings&&(i.settings=n.settings.replace(g,i.cls)),new Function('exports',n.js.replace(g,i.cls))(i),i.components)for(var r in i.components)d.components[r]||(d.components[r]=i.components[r],p.push(r));var o=u.indexOf('/',10);-1!==o&&(i.origin=u.substring(0,o),v.origin!==i.origin&&(i.render&&'/'===i.render.charAt(0)&&(i.render=i.origin+i.render),i.settings&&'/'===i.settings.charAt(0)&&(i.settings=i.origin+i.settings))),'auto'===i.render&&(i.render=f.replace('editor.html','render.html')),'auto'===i.settings&&(i.settings=f.replace('editor.html','settings.html')),h.push({name:c,fn:i})}finally{l()}}else{var s=b(tmp);for(r in e){var a=e[r];'/'===a.charAt(0)&&(a=s+a),d.components[r]||(d.components[r]='@'+a,p.push(r))}l()}}));else try{var n=v.parsehtml(decodeURIComponent(atob(u))),i={};if(i.id=c,i.cls=m.app.class+'_'+HASH(i.id).toString(36),n.css&&(i.css=n.css),n.html&&(i.html=n.html.replace(g,i.cls)),new Function('exports',n.js.replace(g,i.cls))(i),i.components)for(var r in i.components)d.components[r]||(d.components[r]=i.components[r],p.push(r));h.push({name:c,fn:i})}finally{l()}}else h.push({name:c,fn:e}),l()}},function(){var e=h.splice(0),i=[];e.wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=(e.local?'uibuilder':m.app.class)+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,m.app.components[e.name]=n,e.local?t():(n.css&&i.push(n.css.replace(g,n.cls)),n.import instanceof Array?n.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},t):t())},function(){var e;d.css&&i.unshift(d.css.replace(g,m.app.class)),i.length&&(e=m.app.class+'_'+GUID(5),CSS(i.join('\n'),e),m.removecss||(m.removecss=[]),m.removecss.push(e));for(var t,n=0;n<d.children.length;n++)for(t of d.children[n])m.app.compile(r,t,n);o&&o()})},3)}),m},e.watch=function(e,t,n){'function'==typeof t&&(n=t,t='value');e=this.app.instances.findItem('id',e);return e&&e.on(t,n),this},e.read=function(e,t){if(!t||'@'===t.charAt(0))return e;for(var n=t.split('.'),i=0;i<n.length;i++)if(!(e=e[n[i]]))return e;return e},e.replace=e.variables=function(e,r,o){var s=this;return e.replace(/\{[a-z0-9_.-]+\}/gi,function(e){var t=e.substring(1,e.length-1).trim(),n='',i=t.substring(0,4);if('user'===i)W.user&&(n=-1===(t=t.substring(5)).indexOf('.')?W.user[t]:s.read(W.user,t));else if('args'===i)t=t.substring(5),n=s.args[t];else if('data'===i)r&&(n=-1===(t=t.substring(4)).indexOf('.')?r:s.read(r,t.substring(1)));else if('query'===t.substring(0,5)){if(-1===(t=t.substring(5)).indexOf('.'))return QUERIFY(s.query).substring(1);n=s.query[t.substring(1)]}if(null==n)return e;if('function'==typeof o)return o(n);switch(o){case'url':case'urlencode':case'encode':return encodeURIComponent(n);case'escape':case'html':return Thelpers.encode(n);case'json':return JSON.stringify(n)}return n})},e.wait=function(e,t){function n(){e()?t():setTimeout(n,300)}return n(),this},e.querify=function(e,t){return this.app.urlify(this.variables(t?QUERIFY(e,t):e))},e.urlify=function(e){return this.app.urlify(this.variables(e))},e.settings=function(){this.app.emit('settings',this),v.emit('settings',this)},v.version=1.19,v.selectors={component:'.UI_component',components:'.UI_components'},v.current='default',v.events={},v.apps={},v.cache={},v.components={},v.loader=0,v.component=function(e,t,n){var i,r;o&&clearTimeout(o),'string'==typeof t&&((i={}).id=e,i.cls='uibuilder_'+HASH(i.id).toString(36),r=v.parsehtml('base64 '===t.substring(0,7)?decodeURIComponent(atob(t.substring(7))):t),new Function('exports',r.js.replace(g,i.cls))(i),t=i,r.css&&(t.css=r.css),r.html&&(t.html=r.html)),t.id=e,t.cls||(t.cls='uibuilder_'+HASH(t.id).toString(36)),t.css&&(t.css=t.css.replace(g,t.cls)),t.html&&(t.html=t.html.replace(g,t.cls)),t.import instanceof Array?(v.loader++,t.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},function(){v.loader--,o&&clearTimeout(o),o=setTimeout(s,2),v.components[e]=t,n&&n(null,t)})):(o&&clearTimeout(o),v.components[e]=t,n&&n(null,t))},v.resize=function(){for(var e in v.apps){var t,e=v.apps[e],n=e.element,i={width:n.width(),height:n.height(),display:WIDTH(n)};for(t of e.instances)t.events.resize&&t.emit('resize',i)}},ON('resize + resize2',v.resize),v.on=function(e,t){this.events[e]?this.events[e].push(t):this.events[e]=[t]},v.emit=function(e,t,n,i,r,o){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,r,o)},v.register=function(e,t){v.apps[v.current].pending.push({name:e,fn:t})};var y=function(e,t){var n=e.element,i=[];for(n of n.find(v.selectors.component+'[data-id="{0}"] {1}'.format(t,v.selectors.components)))(n=$(n)).closest(v.selectors.component).attrd('id')===t&&i.push({index:+n.attrd('index'),element:n});return i.quicksort('index'),i};function T(e,t,n,i,r,o,s){if('string'==typeof n){if(!this.components[n])return void console.error('UI Builder: The component "{0}" not found'.format(n));n={id:'cid'+Date.now().toString(36),component:n,children:[],config:n.config||{},gap:0!=n.gap}}if(o&&COPY(o,n),r)for(var a in r)n.config[a]=r[a];o=y(this,e);if(o.length)for(var c of o)c.index==t&&this.compile(c.element,n,t,i,null,s);return this.refreshio(),n}v.build=function(e,d,i){var t,a,m,r,c,l,n;if(!v.loader)return v.apps[d.id]?(v.remove(d.id),void setTimeout(v.build,100,e,d,i)):d.components&&d.children?(v.current=d.id,t=document.createElement('DIV'),(a=$(t)).attrd('id',d.id),a.aclass('UI_app invisible'),a.empty(),$(e)[0].appendChild(t),r=[],(m={}).id=v.current,m.components={},m.args=d.args||{},m.query=d.query||CLONE(NAV.query),m.schema=d,m.events={},m.cache={},m.refs={},m.compile=A,m.stringify=I,m.clean=x,m.add=T,m.remove=()=>v.remove(m.id),m.class='ui_'+HASH(v.current).toString(36),m.element=a,m.dom=a[0],m.pending=[],m.instances=[],m.removecss=[],d.urlify?m.urlify=d.urlify:m.urlify=e=>e,a.aclass(m.class),m.view=function(e,t,n){v.view?v.view.call(m,e,t,n):n(EMPTYARRAY)},v.clfind?m.clfind=v.clfind:m.clfind=function(e,t,n){n(EMPTYARRAY)},v.clread?m.clread=v.clread:m.clread=function(e,t,n){n(EMPTYOBJECT)},m.on=u.prototype.on,m.find=u.prototype.find,m.emit=u.prototype.emit,m.emitstate=u.prototype.emitstate,m.intervalcounter=0,m.interval&&clearInterval(m.interval),m.interval=setInterval(function(t){if(W.inDOM(t.dom)){t.intervalcounter++;var e,n=e=>e.events.service&&e.emit('service',t.intervalcounter);for(e of t.instances)e.events.service&&e.emit('service',t.intervalcounter),e.fork&&c(e,n)}else t.remove()},6e4,m),m.recompile=function(){m.clean();for(var e,t=0;t<m.schema.children.length;t++)for(e of m.schema.children[t])e.protected=!0,m.compile(m.element,e,t)},m.build=function(e,t,n){t.urlify=m.urlify,v.build(e,t,n)},c=function(e,t){for(var n of e.fork.instances)t(n),n.fork&&c(n,t)},l=null,n=function(){if(l=null,v.editor){m.inputs=[],m.outputs=[],m.list=[],m.zindex=1;for(var e of m.instances)if(e.dom.parentNode){var t=e.component,n=(t.floating&&(m.zindex=(e.element.css('z-index')||'').parseInt(),m.zindex<=0&&(m.zindex=1)),t.inputs),i=e.config.name||t.name;if(m.list&&m.list.push({id:e.id,componentid:t.id,name:i,icon:t.icon,color:t.color}),n)for(var r of n)m.inputs.push({id:e.id+'_'+r.id,ref:r.id,name:i+(1<n.length?': '+r.name:''),componentid:t.id,component:t.name,input:r.name,icon:t.icon,color:t.color,note:r.note,schema:r.schema});if((n=t.outputs)&&n.length)for(var r of n)m.outputs.push({id:e.id+'_'+r.id,ref:r.id,name:i+(1<n.length?': '+r.name:''),componentid:t.id,component:t.name,output:r.name,icon:t.icon,color:t.color,note:r.note,schema:r.schema})}}if(!m.ready){m.ready=!0,m.callback&&m.callback(m),a.rclass('invisible'),h(m);function o(e){e.state.init=1,e.events.ready&&e.emit('ready')}var s;for(s of m.instances)s.fork&&c(s,o),s.state.init=1,s.events.ready&&s.emit('ready');v.emit('app',m),m.emit('ready')}m.emit('io',m),v.emit('io',m)},m.refreshio=function(e){e?n():(l&&clearTimeout(l),l=setTimeout(n,100))},m.input=function(e,t,n){n=n||NOOP;var i=e.indexOf('_'),r=e.substring(0,i),e=e.substring(i+1),i=m.instances.findItem('id',r);i?(i=i.$inputs[e])?i(t,n):n('Input "{0}" not found'.format(e)):n('Instance "{0}" not found'.format(r))},m.output=function(e){i=i||NOOP;var t=e.indexOf('_'),n=e.substring(0,t),e=e.substring(t+1),t=m.instances.findItem('id',n);t?t.output(e):i('Instance "{0}" not found'.format(n))},v.apps[v.current]=m,(d.import||EMPTYARRAY).wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},function(){var p=Object.keys(d.components);p.wait(function(a,c){var e=d.components[a];if('string'==typeof e){if('@'===e||'#'===e)return v.components[a]?m.pending.push({name:a,fn:v.components[a],local:!0}):console.error('UI Builder: The component "{0}" not found.'.format(a)),void c();var l,f,u=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(u||(u=t,t=''),'base64'!==(t=t&&'.html'===t.charAt(0)?t.substring(1):t))t&&'html'!==t||((l='@'===u.charAt(0))&&(u=u.substring(1)),f=(u=v.editor&&'/'===u.charAt(0)?(v.origin||'')+u:u).format(a),AJAX('GET '+f+(v.cachecomponents?' <{0}>'.format(1==v.cachecomponents?'session':v.cachecomponents):''),function(e,t){if(t)return console.error('UI Builder:',f,t),void c();if(ERROR(e))return console.error('UI Builder:',f,e),void c();if(!e)return console.error('UI Builder:',f,'empty file'),void c();if('object'!=typeof e){t=v.parsehtml(e);try{var n={};if(n.id=a,n.isexternal=l,n.cls=m.class+'_'+HASH(n.id).toString(36),t.css&&(n.css=t.css),t.readme&&(n.readme=t.readme),t.html&&(n.html=t.html.replace(g,n.cls)),t.settings&&(n.settings=t.settings.replace(g,n.cls)),new Function('exports',t.js.replace(g,n.cls))(n),n.components)for(var i in n.components)d.components[i]||(d.components[i]=n.components[i],p.push(i));var r=u.indexOf('/',10);-1!==r&&(n.origin=u.substring(0,r),v.origin!==n.origin&&(n.render&&'/'===n.render.charAt(0)&&(n.render=n.origin+n.render),n.settings&&'/'===n.settings.charAt(0)&&(n.settings=n.origin+n.settings))),'auto'===n.render&&(n.render=f.replace('editor.html','render.html')),'auto'===n.settings&&(n.settings=f.replace('editor.html','settings.html')),m.pending.push({name:a,fn:n})}finally{c()}}else{var o=b(f);for(i in e){var s=e[i];'/'===s.charAt(0)&&(s=o+s),d.components[i]||(d.components[i]='@'+s,p.push(i))}c()}}));else try{var n={},i=(n.id=a,n.cls=m.class+'_'+HASH(n.id).toString(36),v.parsehtml(decodeURIComponent(atob(u))));if(i.css&&(n.css=i.css),i.readme&&(n.readme=i.readme),i.html&&(n.html=i.html.replace(g,n.cls)),i.settings&&(n.settings=i.settings.replace(g,n.cls)),new Function('exports',i.js.replace(g,n.cls))(n),n.components)for(var r in n.components)d.components[r]||(d.components[r]=n.components[r],p.push(r));m.pending.push({name:a,fn:n})}finally{c()}}else m.pending.push({name:a,fn:e}),c()},function(){m.pending.splice(0).wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=(e.local?'uibuilder':m.class)+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,m.components[e.name]=n,e.local?t():(n.css&&r.push(n.css.replace(g,n.cls)),n.import instanceof Array?n.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,'/'===e.charAt(0)&&(e=(v.origin||'')+e),IMPORT(e,t))},t):t())},function(){d.css&&r.unshift(d.css.replace(g,m.class)),CSS(r,m.class);for(var e,t=0;t<d.children.length;t++)for(e of d.children[t])e.protected=!0,m.compile(a,e,t);m.callback=i})},1)}),m):void WARN('Invalid UI Builder metadata:',d.id);setTimeout(v.build,100,e,d,i)},v.parsehtml=function(e){var t='';if(-1===e.indexOf('<script>'))return{js:e};var n,i='',r='',t='',o='',s='',a=e.indexOf('<settings>');return-1!==a&&(n=e.indexOf('</settings>',a+10),i=e.substring(a+10,n).trim(),e=e.substring(0,a)+e.substring(n+11)),-1!==(a=e.indexOf('<style>'))&&(t=e.substring(a+7,e.indexOf('</style>',a+7))),-1!==(a=e.indexOf('<body>'))&&(s=e.substring(a+6,e.indexOf('</body>',a+6))),-1!==(a=e.indexOf('<readme>'))&&(r=e.substring(a+8,e.indexOf('</readme>',a+8))),-1!==(a=e.indexOf('<script>'))&&(n=e.indexOf('<\/script>',a+8),o=e.substring(a+8,n).trim()),{js:o,css:t,settings:i,readme:r,html:s}},v.remove=function(t){var n=v.apps[t];if(n){n.interval&&clearInterval(n.interval),n.interval=null;for(var e of n.instances){if(e.removecss)for(var i of e.removecss)CSS('',i);e.events.destroy&&e.emit('destroy')}setTimeout(function(){for(var e in n.components){e=n.components[e];e.uninstall&&e.uninstall()}n.tmp=null,CSS('',n.class),n.element.remove(),delete v.apps[t]},2)}};var f=null,p=document;function m(i,o,e){var t,n,r,s,a,c,l=(i=!(i instanceof jQuery)?$(i):i).closest('.UI_component')[0];!l||l.uibuilder.meta.readonly||l.uibuilder.forked||(null==(o=o||{}).format&&(o.format=!0),o.format&&null==o.icon&&(o.icon=!0),e&&(o.callback=e),f?f.element[0]!=i[0]&&(f.close(),setTimeout(m,100,i,o,e)):(o.backup=i.html(),o.html&&i.html(o.html),i.attr('contenteditable',!0),i.aclass('UI_editing'),(f={}).element=i,f.dom=i[0],f.instance=l.uibuilder,f.parent=o.parent?o.parent[0]:f.dom,f.createlink=function(){if(function(e){if(p.selection&&'Text'===p.selection.type)return p.selection.createRange().htmlText;if(W.getSelection){var t=W.getSelection();if(!t.rangeCount)return'';for(var n=p.createElement('div'),i=0,r=t.rangeCount;i<r;++i)n.appendChild(t.getRangeAt(i).cloneContents());return e?n:n.innerHTML}}().trim()){for(var e=f.element,t='#link'+Date.now().toString(36),n=e[0],i=0;i<5;i++){if('A'===n.tagName)return;if(!(n=n.parentNode))break}document.execCommand('CreateLink',!1,t);var r,e=e.find('a[href="'+t+'"]');e.length&&(f&&f.close(),t=e.text(),r='',e.aclass('UI_link'),o.cms&&e.aclass('CMS_edit CMS_remove'),-1!==t.indexOf('@')?r='mailto:'+t:/\d+/.test(t)?r='tel:'+t:-1===t.indexOf(' ')&&-1===t.indexOf(',')&&-1!==t.indexOf('.')&&(r=/http(s):\/\//.test(t)?t:'https://'+t),t=-1!==r.indexOf('.')&&-1===r.indexOf(location.hostname)?'_blank':'',e.attr('href',r||'#'),e.attr('target',t),v.emit('link',e))}},t=function(){f.close()},n=function(e){e.target===f.parent||f.parent.contains(e.target)||f.close()},r=function(e){e.preventDefault();e=(e.originalEvent||e).clipboardData.getData('text/plain');document.execCommand('insertHTML',!1,e)},s=function(e){if(o.keydown&&o.keydown(e),27===e.keyCode)return e.preventDefault(),e.stopPropagation(),f.key=27,void f.close();if(o.backslashremove&&8===e.keyCode&&!i.text().trim())return f.key=8,void f.close();if(13!==e.keyCode){if(9===e.keyCode)return o.tabs?(e.preventDefault(),void document.execCommand('insertHTML',!1,'&#009')):(o.endwithtab?(e.preventDefault(),f.key=9):(e.preventDefault(),e.stopPropagation()),void f.close());if(f.change=!0,e.metaKey||e.ctrlKey)if(66!==e.keyCode)if(76!==e.keyCode)if(73!==e.keyCode){var t,n;if(80===e.keyCode)return o.format&&!0===o.icon&&(t=i[0].nodeName.toLowerCase(),n='<i class="ti ti-totaljs UI_icon'+(o.cms?' CMS_edit CMS_remove':'')+'" contenteditable="false"></i>','span'===t?i.parent().prepend(n):document.execCommand('insertHTML',!1,n)),e.preventDefault(),void e.stopPropagation();85!==e.keyCode?32===e.keyCode&&(document.execCommand('insertHTML',!1,'&nbsp;'),e.preventDefault(),e.stopPropagation()):o.format&&!1!==o.underline||(e.preventDefault(),e.stopPropagation())}else o.format&&!1!==o.italic||(e.preventDefault(),e.stopPropagation());else o.format&&!1!==o.link?f.createlink():(e.preventDefault(),e.stopPropagation());else o.format&&!1!==o.bold||(e.preventDefault(),e.stopPropagation())}else o.multiline&&!e.shiftKey||(e.preventDefault(),e.stopPropagation(),f.key=13,f.close())},i.focus(),'end'===o.cursor&&((e=document.createRange()).selectNodeContents(i[0]),e.collapse(!1),(l=W.getSelection()).removeAllRanges(),l.addRange(e)),f.close=function(){var e;$(W).off('click',n),i.rattr('contenteditable'),i.off('keydown',s),i.off('contextmenu',t),i.off('paste',r),i.rclass('UI_editing'),o.callback&&((e={}).text=i.text().trim(),e.html=i.html(),e.change=f.change,e.element=f.element,e.dom=f.dom,e.backup=o.backup,e.key=f.key,e.param=o.param,e.instance=f.instance,o.callback(e)),f.timeout&&clearTimeout(f.timeout),f=null},a=o.placeholder,c=!1,f.checkplaceholder=function(){var e;a&&(e=0<i[0].innerHTML.length,c!==e&&(c=e,a.classList.toggle('hidden',e)))},$(W).on('click',n),i.on('keydown',s),i.on('contextmenu',t),o.placeholder&&a&&i.on('input',f.checkplaceholder),i.on('paste',r)))}function I(e,u){var t,p=this,d='function'==typeof e?e:null,n=(e=d?null:e)||p.element.find('> '+v.selectors.component),i=[],m=[],h={};for(t of n){var r={children:[]};i.push(r),function e(t,n){var i,r,o,s=n.uibuilder;if(t.id=n.getAttribute('data-id'),t.component=s.component.id,t.config=CLONE(s.config),h[s.component.id]||(i=p.schema.components[s.component.id])&&(h[s.component.id]=i),s.component.floating&&(r=(i=$(n)).position(),t.x=r.left,t.y=r.top,t.zindex=i.css('z-index')||m.length,t.zindex=+t.zindex,t.zindex<=0&&(t.zindex=1)),!d||d(t)){if(m.push(s),n.classList.contains('UI_gap')&&(t.gap=!0),s.children=[],!s.component.children)for(o of y(p,t.id)){var a,c=[],f=o.element.find('> '+v.selectors.component);t.children||(t.children=[]),t.children.push(c);for(a of f){var l={children:[]};c.push(l),s.children.push(a.uibuilder),e(l,a)}}s.events.stringify&&s.emit('stringify',t,u)}}(r,t)}i=e?i[0]:[i];return{instances:m,children:i,components:h}}v.edit=m}(W.UIBuilder={});