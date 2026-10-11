import { createClient } from '@supabase/supabase-js';
import { createDashboard } from './dashboard.js';

const copy = {
 ar: {brand:'دروب العربية',website:'العودة إلى الموقع ↗',space:'مساحة الإدارة',story:'رحلة التعلّم،\nتبدأ من هنا.',storyBody:'مساحتك الخاصة لإدارة دروب العربية.',restricted:'دخول مخصص لفريق الإدارة',login:'تسجيل الدخول',loginBody:'أهلاً بعودتك. أدخل بيانات حساب الإدارة.',username:'اسم المستخدم',password:'كلمة المرور',show:'إظهار',hide:'إخفاء',signIn:'دخول إلى لوحة الإدارة',backLogin:'العودة لتسجيل الدخول',newPassword:'كلمة المرور الجديدة',confirmPassword:'تأكيد كلمة المرور',passwordHelp:'استخدم 12 حرفاً على الأقل.',savePassword:'حفظ كلمة المرور',note:'دخول مخصص لمسؤول الموقع.',welcome:'أهلاً بك في لوحة الإدارة',logout:'تسجيل الخروج',active:'حساب الإدارة مفعّل',dashboardBody:'تم تسجيل الدخول بأمان. أدوات تحرير المحتوى ستكون الخطوة التالية.',articles:'المقالات',articlesBody:'استعرض المقالات المنشورة على الموقع.',viewArticles:'عرض المقالات ↗',account:'حسابك',accountBody:'حافظ على أمان حساب الإدارة بكلمة مرور قوية.',changePassword:'تغيير كلمة المرور',checking:'جارٍ التحقق من الاتصال…',setup:'تسجيل الدخول غير متاح بعد. جارٍ إعداد اتصال لوحة الإدارة.',unavailable:'تعذّر الاتصال. حاول مرة أخرى بعد قليل.',invalid:'تعذّر تسجيل الدخول. تحقق من اسم المستخدم وكلمة المرور وحاول مجدداً.',denied:'هذا الحساب لا يملك صلاحية دخول لوحة الإدارة.',newBody:'اختر كلمة مرور قوية لحسابك.',mismatch:'كلمتا المرور غير متطابقتين.',passwordFailed:'تعذّر حفظ كلمة المرور. حاول مجدداً.',passwordSaved:'تم حفظ كلمة المرور. سجّل الدخول بكلمة المرور الجديدة.',logoutFailed:'تعذّر تسجيل الخروج. حاول مجدداً.',title:'لوحة الإدارة — دروب العربية'},
 tr: {brand:'Durob Alarabia',website:'Web sitesine dön ↗',space:'Yönetim alanı',story:'Öğrenme yolculuğu\nburada başlar.',storyBody:'Durob Alarabia için özel yönetim alanınız.',restricted:'Yalnızca yönetim ekibi için',login:'Giriş yap',loginBody:'Tekrar hoş geldiniz. Yönetici hesabınızla giriş yapın.',username:'Kullanıcı adı',password:'Şifre',show:'Göster',hide:'Gizle',signIn:'Yönetim paneline giriş yap',backLogin:'Giriş ekranına dön',newPassword:'Yeni şifre',confirmPassword:'Şifreyi doğrulayın',passwordHelp:'En az 12 karakter kullanın.',savePassword:'Şifreyi kaydet',note:'Yalnızca site yöneticisi için.',welcome:'Yönetim paneline hoş geldiniz',logout:'Çıkış yap',active:'Yönetici hesabınız etkin',dashboardBody:'Güvenli şekilde giriş yaptınız. İçerik düzenleme araçları bir sonraki adım olacak.',articles:'Makaleler',articlesBody:'Web sitesindeki yayımlanmış makaleleri görüntüleyin.',viewArticles:'Makaleleri görüntüle ↗',account:'Hesabınız',accountBody:'Yönetici hesabınızı güçlü bir şifreyle koruyun.',changePassword:'Şifreyi değiştir',checking:'Bağlantı kontrol ediliyor…',setup:'Giriş henüz kullanılamıyor. Yönetim paneli bağlantısı hazırlanıyor.',unavailable:'Bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin.',invalid:'Giriş yapılamadı. Kullanıcı adı ve şifrenizi kontrol edip tekrar deneyin.',denied:'Bu hesabın yönetim paneline erişim izni yok.',newBody:'Hesabınız için güçlü bir şifre belirleyin.',mismatch:'Şifreler eşleşmiyor.',passwordFailed:'Şifre kaydedilemedi. Tekrar deneyin.',passwordSaved:'Şifre kaydedildi. Yeni şifrenizle giriş yapın.',logoutFailed:'Çıkış yapılamadı. Tekrar deneyin.',title:'Yönetim paneli — Durob Alarabia'}
};
const $ = id => document.getElementById(id);
let lang = 'ar';
try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('durob-language') || 'ar'; } catch {}
if (!copy[lang]) lang = 'ar';
let mode = 'login', statusKey = 'checking', statusKind = '', busy = false, version = 0;

const client = ADMIN_SUPABASE_URL && ADMIN_SUPABASE_KEY ? createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_KEY, {
 auth: {persistSession:true,autoRefreshToken:true,detectSessionInUrl:false,storageKey:'durob-admin-auth'}
}) : null;
const dashboard = client ? createDashboard(client, () => lang) : null;

function translate() {
 document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr'; document.title=copy[lang].title;
 document.querySelectorAll('[data-i18n]').forEach(el => el.textContent=copy[lang][el.dataset.i18n]);
 document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
 $('articles-link').href=lang==='tr'?'/tr/articles/':'/articles/';
 document.querySelectorAll('.admin-brand, .admin-top-actions > a').forEach(el=>el.href='/?lang='+lang);
 $('show-password').textContent=copy[lang][$('password').type==='password'?'show':'hide'];
 $('login-heading').textContent=copy[lang][mode==='password'?'newPassword':'login'];
 $('form-description').textContent=copy[lang][mode==='password'?'newBody':'loginBody'];
 $('auth-status').textContent=statusKey?copy[lang][statusKey]:'';
 $('auth-status').dataset.kind=statusKind;
 dashboard?.setLanguage();
}
function status(key='',kind='') {statusKey=key;statusKind=kind;translate();}
function show(next) {
 mode=next;
 $('auth-view').hidden=next==='dashboard';$('dashboard-view').hidden=next!=='dashboard';
 ['login','password'].forEach(form=>$(form+'-form').hidden=next!==form);
 translate();
 if(next==='dashboard')dashboard?.start();else dashboard?.stop();
}
function setBusy(value) { busy=value; document.querySelectorAll('form button, #sign-out, #change-password').forEach(el=>el.disabled=value); }
function clearPasswords() {['password','new-password','confirm-password'].forEach(id=>$(id).value='');}
async function verifyAccess() {
 const current=++version;
 try {
  const {data,error}=await client.auth.getUser();
  if(current!==version)return;
  if(error || !data.user){
   const connectionError=error && error.name!=='AuthSessionMissingError' && error.status!==401 && error.status!==403;
   clearPasswords();show('login');status(connectionError?'unavailable':'',connectionError?'error':'');return;
  }
  const {data:member,error:memberError}=await client.from('admin_members').select('user_id').eq('user_id',data.user.id).maybeSingle();
  if(current!==version)return;
  if(memberError){show('login');status('unavailable','error');return;}
  if(!member){await client.auth.signOut({scope:'local'});show('login');status('denied','error');return;}
  $('account-email').textContent=ADMIN_USERNAME;
  status(''); show(mode==='password'?'password':'dashboard');
 }catch{if(current===version){show('login');status('unavailable','error');}}
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
 lang=button.dataset.lang;try{localStorage.setItem('durob-language',lang);}catch{}
 const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);translate();
}));
$('show-password').addEventListener('click',()=>{const visible=$('password').type==='password';$('password').type=visible?'text':'password';$('show-password').setAttribute('aria-pressed',String(visible));translate();});
$('cancel-password').addEventListener('click',async()=>{clearPasswords();if(client)await client.auth.signOut({scope:'local'});show('login');status('');});
$('login-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!client)return;setBusy(true);status('checking');
 try{if($('username').value.trim()!==ADMIN_USERNAME){$('password').value='';status('invalid','error');return;}
  const {error}=await client.auth.signInWithPassword({email:ADMIN_LOGIN_ID,password:$('password').value});
  $('password').value='';if(error){status('invalid','error');}else{await verifyAccess();}
 }catch{status('unavailable','error');}finally{setBusy(false);}
});
$('password-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!client)return;
 if($('new-password').value!==$('confirm-password').value){status('mismatch','error');return;}
 setBusy(true);
 try{const {error}=await client.auth.updateUser({password:$('new-password').value});
  if(error){status('passwordFailed','error');return;}
  clearPasswords();await client.auth.signOut({scope:'global'});show('login');status('passwordSaved','success');
 }catch{status('passwordFailed','error');}finally{setBusy(false);}
});
$('change-password').addEventListener('click',()=>{show('password');status('');$('new-password').focus();});
$('sign-out').addEventListener('click',async()=>{
 setBusy(true);try{const {error}=await client.auth.signOut();if(error){$('dashboard-status').textContent=copy[lang].logoutFailed;return;}clearPasswords();show('login');status('');}
 catch{$('dashboard-status').textContent=copy[lang].logoutFailed;}finally{setBusy(false);}
});
$('year').textContent=new Date().getFullYear();translate();
if(!client){show('login');setBusy(true);document.querySelectorAll('form input').forEach(el=>el.disabled=true);status('setup');}
else{
 // Callbacks must stay synchronous: auth operations inside them can deadlock.
 client.auth.onAuthStateChange((event)=>{
  if(event==='SIGNED_OUT'){version++;clearPasswords();show('login');}
  if(['INITIAL_SESSION','SIGNED_IN','TOKEN_REFRESHED'].includes(event))setTimeout(()=>{if(!busy)verifyAccess();},0);
 });
 await verifyAccess();
}
