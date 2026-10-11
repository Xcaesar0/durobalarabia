import { createClient } from '@supabase/supabase-js';

const copy = {
 ar: {brand:'دروب العربية',website:'العودة إلى الموقع ↗',space:'مساحة الإدارة',story:'رحلة التعلّم،\nتبدأ من هنا.',storyBody:'مساحتك الخاصة لإدارة دروب العربية.',restricted:'دخول مخصص لفريق الإدارة',login:'تسجيل الدخول',loginBody:'أهلاً بعودتك. أدخل بيانات حساب الإدارة.',email:'البريد الإلكتروني',password:'كلمة المرور',show:'إظهار',hide:'إخفاء',signIn:'دخول إلى لوحة الإدارة',forgot:'نسيت كلمة المرور؟',sendReset:'إرسال رابط إعادة التعيين',backLogin:'العودة لتسجيل الدخول',newPassword:'كلمة المرور الجديدة',confirmPassword:'تأكيد كلمة المرور',passwordHelp:'استخدم 12 حرفاً على الأقل.',savePassword:'حفظ كلمة المرور',note:'لا تملك حساباً؟ تواصل مع مسؤول الموقع للحصول على صلاحية الدخول.',welcome:'أهلاً بك في لوحة الإدارة',logout:'تسجيل الخروج',active:'حساب الإدارة مفعّل',dashboardBody:'تم تسجيل الدخول بأمان. أدوات تحرير المحتوى ستكون الخطوة التالية.',articles:'المقالات',articlesBody:'استعرض المقالات المنشورة على الموقع.',viewArticles:'عرض المقالات ↗',account:'حسابك',accountBody:'حافظ على أمان حساب الإدارة بكلمة مرور قوية.',changePassword:'تغيير كلمة المرور',checking:'جارٍ التحقق من الاتصال…',setup:'تسجيل الدخول غير متاح بعد. جارٍ إعداد اتصال لوحة الإدارة.',unavailable:'تعذّر الاتصال. حاول مرة أخرى بعد قليل.',invalid:'تعذّر تسجيل الدخول. تحقق من البريد وكلمة المرور وحاول مجدداً.',denied:'هذا الحساب لا يملك صلاحية دخول لوحة الإدارة.',resetTitle:'إعادة تعيين كلمة المرور',resetBody:'أدخل بريد حساب الإدارة للحصول على رابط إعادة التعيين.',resetSent:'إذا كان البريد مرتبطاً بحساب، فستصلك رسالة لإعادة تعيين كلمة المرور.',resetFailed:'تعذّر إرسال الرابط. حاول مرة أخرى بعد قليل أو تواصل مع مسؤول الموقع.',newBody:'اختر كلمة مرور قوية لحسابك.',mismatch:'كلمتا المرور غير متطابقتين.',passwordFailed:'تعذّر حفظ كلمة المرور. أعد فتح رابط صالح أو حاول مجدداً.',passwordSaved:'تم حفظ كلمة المرور. سجّل الدخول بكلمة المرور الجديدة.',expired:'الرابط غير صالح أو انتهت صلاحيته. اطلب رابطاً جديداً.',logoutFailed:'تعذّر تسجيل الخروج. حاول مجدداً.',title:'لوحة الإدارة — دروب العربية'},
 tr: {brand:'Durob Alarabia',website:'Web sitesine dön ↗',space:'Yönetim alanı',story:'Öğrenme yolculuğu\nburada başlar.',storyBody:'Durob Alarabia için özel yönetim alanınız.',restricted:'Yalnızca yönetim ekibi için',login:'Giriş yap',loginBody:'Tekrar hoş geldiniz. Yönetici hesabınızla giriş yapın.',email:'E-posta adresi',password:'Şifre',show:'Göster',hide:'Gizle',signIn:'Yönetim paneline giriş yap',forgot:'Şifrenizi mi unuttunuz?',sendReset:'Sıfırlama bağlantısı gönder',backLogin:'Giriş ekranına dön',newPassword:'Yeni şifre',confirmPassword:'Şifreyi doğrulayın',passwordHelp:'En az 12 karakter kullanın.',savePassword:'Şifreyi kaydet',note:'Hesabınız yok mu? Erişim için site yöneticisiyle iletişime geçin.',welcome:'Yönetim paneline hoş geldiniz',logout:'Çıkış yap',active:'Yönetici hesabınız etkin',dashboardBody:'Güvenli şekilde giriş yaptınız. İçerik düzenleme araçları bir sonraki adım olacak.',articles:'Makaleler',articlesBody:'Web sitesindeki yayımlanmış makaleleri görüntüleyin.',viewArticles:'Makaleleri görüntüle ↗',account:'Hesabınız',accountBody:'Yönetici hesabınızı güçlü bir şifreyle koruyun.',changePassword:'Şifreyi değiştir',checking:'Bağlantı kontrol ediliyor…',setup:'Giriş henüz kullanılamıyor. Yönetim paneli bağlantısı hazırlanıyor.',unavailable:'Bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin.',invalid:'Giriş yapılamadı. E-posta ve şifrenizi kontrol edip tekrar deneyin.',denied:'Bu hesabın yönetim paneline erişim izni yok.',resetTitle:'Şifreyi sıfırla',resetBody:'Sıfırlama bağlantısı almak için yönetici e-posta adresinizi girin.',resetSent:'Bu adres bir hesaba bağlıysa şifre sıfırlama e-postası gönderilecektir.',resetFailed:'Bağlantı gönderilemedi. Daha sonra tekrar deneyin veya site yöneticisine başvurun.',newBody:'Hesabınız için güçlü bir şifre belirleyin.',mismatch:'Şifreler eşleşmiyor.',passwordFailed:'Şifre kaydedilemedi. Geçerli bir bağlantı açın veya tekrar deneyin.',passwordSaved:'Şifre kaydedildi. Yeni şifrenizle giriş yapın.',expired:'Bağlantı geçersiz veya süresi dolmuş. Yeni bir bağlantı isteyin.',logoutFailed:'Çıkış yapılamadı. Tekrar deneyin.',title:'Yönetim paneli — Durob Alarabia'}
};
const $ = id => document.getElementById(id);
let lang = 'ar';
try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('durob-language') || 'ar'; } catch {}
if (!copy[lang]) lang = 'ar';
let mode = 'login', statusKey = 'checking', statusKind = '', busy = false, version = 0;
const fragment = new URLSearchParams(location.hash.slice(1));
let recovery = ['recovery','invite'].includes(fragment.get('type'));
const linkError = fragment.has('error') || new URLSearchParams(location.search).has('error');
const client = ADMIN_SUPABASE_URL && ADMIN_SUPABASE_KEY ? createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_KEY, {
 auth: {persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:'durob-admin-auth'}
}) : null;

function translate() {
 document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr'; document.title=copy[lang].title;
 document.querySelectorAll('[data-i18n]').forEach(el => el.textContent=copy[lang][el.dataset.i18n]);
 document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
 $('articles-link').href=lang==='tr'?'/tr/articles/':'/articles/';
 document.querySelectorAll('.admin-brand, .admin-top-actions > a').forEach(el=>el.href='/?lang='+lang);
 $('show-password').textContent=copy[lang][$('password').type==='password'?'show':'hide'];
 $('login-heading').textContent=copy[lang][mode==='reset'?'resetTitle':mode==='password'?'newPassword':'login'];
 $('form-description').textContent=copy[lang][mode==='reset'?'resetBody':mode==='password'?'newBody':'loginBody'];
 $('auth-status').textContent=statusKey?copy[lang][statusKey]:'';
 $('auth-status').dataset.kind=statusKind;
}
function status(key='',kind='') {statusKey=key;statusKind=kind;translate();}
function show(next) {
 mode=next;
 $('auth-view').hidden=next==='dashboard';$('dashboard-view').hidden=next!=='dashboard';
 ['login','reset','password'].forEach(form=>$(form+'-form').hidden=next!==form);
 translate();
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
   clearPasswords();show('login');status(linkError?'expired':connectionError?'unavailable':'',linkError || connectionError?'error':'');return;
  }
  const {data:member,error:memberError}=await client.from('admin_members').select('user_id').eq('user_id',data.user.id).maybeSingle();
  if(current!==version)return;
  if(memberError){show('login');status('unavailable','error');return;}
  if(!member){await client.auth.signOut({scope:'local'});show('login');status('denied','error');return;}
  $('account-email').textContent=data.user.email || '';
  status(''); show(recovery || mode==='password'?'password':'dashboard');
 }catch{if(current===version){show('login');status('unavailable','error');}}
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
 lang=button.dataset.lang;try{localStorage.setItem('durob-language',lang);}catch{}
 const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);translate();
}));
$('show-password').addEventListener('click',()=>{const visible=$('password').type==='password';$('password').type=visible?'text':'password';$('show-password').setAttribute('aria-pressed',String(visible));translate();});
$('forgot-password').addEventListener('click',()=>{$('reset-email').value=$('email').value;show('reset');status('');$('reset-email').focus();});
$('back-login').addEventListener('click',()=>{show('login');status('');});
$('cancel-password').addEventListener('click',async()=>{recovery=false;clearPasswords();if(client)await client.auth.signOut({scope:'local'});show('login');status('');});
$('login-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!client)return;setBusy(true);status('checking');
 try{const {error}=await client.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});
  $('password').value='';if(error){status('invalid','error');}else{recovery=false;await verifyAccess();}
 }catch{status('unavailable','error');}finally{setBusy(false);}
});
$('reset-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!client)return;setBusy(true);status('checking');
 try{const {error}=await client.auth.resetPasswordForEmail($('reset-email').value.trim(),{redirectTo:location.origin+'/admin/?lang='+lang});status(error?'resetFailed':'resetSent',error?'error':'success');}
 catch{status('resetFailed','error');}finally{setBusy(false);}
});
$('password-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!client)return;
 if($('new-password').value!==$('confirm-password').value){status('mismatch','error');return;}
 setBusy(true);
 try{const {error}=await client.auth.updateUser({password:$('new-password').value});
  if(error){status('passwordFailed','error');return;}
  recovery=false;clearPasswords();await client.auth.signOut({scope:'global'});show('login');status('passwordSaved','success');
 }catch{status('passwordFailed','error');}finally{setBusy(false);}
});
$('change-password').addEventListener('click',()=>{show('password');status('');$('new-password').focus();});
$('sign-out').addEventListener('click',async()=>{
 setBusy(true);try{const {error}=await client.auth.signOut();if(error){$('dashboard-status').textContent=copy[lang].logoutFailed;return;}recovery=false;clearPasswords();show('login');status('');}
 catch{$('dashboard-status').textContent=copy[lang].logoutFailed;}finally{setBusy(false);}
});
$('year').textContent=new Date().getFullYear();translate();
if(!client){show('login');setBusy(true);document.querySelectorAll('form input').forEach(el=>el.disabled=true);status('setup');}
else{
 // Callbacks must stay synchronous: auth operations inside them can deadlock.
 client.auth.onAuthStateChange((event)=>{
  if(event==='PASSWORD_RECOVERY')recovery=true;
  if(event==='SIGNED_OUT'){version++;clearPasswords();show('login');}
  if(['INITIAL_SESSION','SIGNED_IN','PASSWORD_RECOVERY','TOKEN_REFRESHED'].includes(event))setTimeout(()=>{if(!busy)verifyAccess();},0);
 });
 await verifyAccess();
}
