import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=(await readFile(new URL('../js/admin.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/,'');
async function boot({user=null,userError=null,member=null,memberError=null,configured=true,hash=''}={}) {
 const elements=new Map(), events={};let signedOut=0,filter;
 const element=id=>{
  if(!elements.has(id))elements.set(id,{value:'',type:'password',hidden:false,dataset:{},textContent:'',disabled:false,handlers:{},setAttribute(){},focus(){},addEventListener(event,handler){this.handlers[event]=handler;}});
  return elements.get(id);
 };
 const client={auth:{getUser:async()=>({data:{user},error:userError}),signOut:async()=>{signedOut++;return {error:null};},onAuthStateChange:callback=>{events.auth=callback;},signInWithPassword:async()=>({error:{message:'invalid'}}),resetPasswordForEmail:async()=>({error:null}),updateUser:async()=>({error:null})},from:name=>{
  assert.equal(name,'admin_members');return {select:()=>({eq:(column,id)=>{filter={column,id};return {maybeSingle:async()=>({data:member,error:memberError})};}})};
 }};
 const context=vm.createContext({createClient:()=>client,ADMIN_SUPABASE_URL:configured?'https://example.supabase.co':'',ADMIN_SUPABASE_KEY:configured?'sb_publishable_example':'',ADMIN_USERNAME:'admin',ADMIN_LOGIN_ID:'admin@example.org',document:{getElementById:element,documentElement:{},querySelectorAll:()=>[]},location:{href:'https://example.org/admin/',origin:'https://example.org',search:'',hash},localStorage:{getItem:()=>null,setItem(){}},history:{replaceState(){}},URLSearchParams,URL,Date,setTimeout:callback=>{events.scheduled=callback;}});
 await vm.runInContext('(async()=>{'+source+';globalThis.testApp={verifyAccess,show};})()',context);
 return {element,context,events,signedOut:()=>signedOut,filter:()=>filter,client};
}
test('anonymous visitors get login and never dashboard',async()=>{const app=await boot();assert.equal(app.element('login-form').hidden,false);assert.equal(app.element('dashboard-view').hidden,true);});
test('Supabase missing-session response is a normal login state',async()=>{const app=await boot({userError:{name:'AuthSessionMissingError',status:400}});assert.equal(app.element('auth-status').textContent,'');assert.equal(app.element('login-form').hidden,false);assert.equal(app.element('dashboard-view').hidden,true);});
test('an authenticated user without administrator membership is rejected and signed out',async()=>{const app=await boot({user:{id:'non-admin',email:'test@example.org'}});assert.equal(app.signedOut(),1);assert.equal(app.element('dashboard-view').hidden,true);assert.match(app.element('auth-status').textContent,/صلاحية/);assert.deepEqual(app.filter(),{column:'user_id',id:'non-admin'});});
test('membership lookup errors fail closed',async()=>{const app=await boot({user:{id:'admin'},memberError:{message:'network'}});assert.equal(app.element('dashboard-view').hidden,true);assert.match(app.element('auth-status').textContent,/الاتصال/);});
test('verified administrators get dashboard; sign-out hides it',async()=>{const app=await boot({user:{id:'admin',email:'admin@example.org'},member:{user_id:'admin'}});assert.equal(app.element('dashboard-view').hidden,false);assert.equal(app.element('account-email').textContent,'admin');app.events.auth('SIGNED_OUT');assert.equal(app.element('dashboard-view').hidden,true);});
test('missing project configuration displays login with submission disabled',async()=>{const app=await boot({configured:false});assert.equal(app.element('login-form').hidden,false);assert.equal(app.element('dashboard-view').hidden,true);assert.match(app.element('auth-status').textContent,/إعداد/);});
test('mismatched password confirmation never changes credentials',async()=>{const app=await boot({user:{id:'admin'},member:{user_id:'admin'}});let called=false;app.client.auth.updateUser=async()=>{called=true;};app.element('new-password').value='123456789012';app.element('confirm-password').value='different';await app.element('password-form').handlers.submit({preventDefault(){}});assert.equal(called,false);});
test('invalid password does not expose dashboard and password input is cleared',async()=>{const app=await boot();app.element('username').value='admin';app.element('password').value='invalid';await app.element('login-form').handlers.submit({preventDefault(){}});assert.equal(app.element('password').value,'');assert.equal(app.element('dashboard-view').hidden,true);});

test('unknown usernames never attempt provider login',async()=>{const app=await boot();let called=false;app.client.auth.signInWithPassword=async()=>{called=true;};app.element('username').value='other';app.element('password').value='invalid';await app.element('login-form').handlers.submit({preventDefault(){}});assert.equal(called,false);assert.equal(app.element('dashboard-view').hidden,true);});
test('admin username maps to the single internal account without sending email',async()=>{const app=await boot();let input;app.client.auth.signInWithPassword=async value=>{input=value;return {error:{message:'invalid'}};};app.element('username').value='admin';app.element('password').value='test-only';await app.element('login-form').handlers.submit({preventDefault(){}});assert.equal(input.email,'admin@example.org');assert.equal(app.element('password').value,'');});
