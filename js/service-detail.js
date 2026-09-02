/* ============================================
   VYAPTUM ADVISORY — SERVICE DETAIL PAGE
   ------------------------------------------------
   Reads ?name=&category= from the URL and fills in
   the generic template with that service's info.
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '916209005226';
  const params = new URLSearchParams(window.location.search);
  const serviceName = params.get('name') || 'Our Services';
  const categoryName = params.get('category') || '';

  const buildWhatsAppLink = (topic) => {
    const text = `Hi, I'd like to know more about ${topic}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  document.title = `${serviceName} | Vyaptum Advisory`;
  const metaDesc = document.getElementById('pageDescription');
  if (metaDesc) {
    metaDesc.setAttribute('content', `Learn about ${serviceName}${categoryName ? ' under ' + categoryName : ''} and talk to a Vyaptum Advisory expert on WhatsApp.`);
  }

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('svcCategoryCrumb', categoryName || 'Services');
  setText('svcNameCrumb', serviceName);
  setText('svcCategoryLabel', categoryName || 'Service');
  setText('svcNameHeading', serviceName);
  setText('svcIntro', `Everything you need to know about ${serviceName}${categoryName ? ' under our ' + categoryName + ' services' : ''}. Our team handles the paperwork end-to-end so you can focus on running your business — talk to an expert to get started.`);

  document.querySelectorAll('.svc-name-inline').forEach(el => {
    el.textContent = serviceName;
  });

  const waLink = buildWhatsAppLink(serviceName);
  ['svcWhatsAppBtn', 'svcWhatsAppBtn2'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.href = waLink;
  });

});
