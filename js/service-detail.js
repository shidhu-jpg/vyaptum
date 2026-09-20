/* ============================================
   VYAPTUM ADVISORY — SERVICE DETAIL PAGE
   ------------------------------------------------
   Reads ?name=&category= from the URL and fills in
   the generic template with that service's info.
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '916209005226';
  const LEGAL_FRAMEWORKS = {
    'Private Limited Company': 'Companies Act, 2013; Companies (Incorporation) Rules, 2014; and MCA incorporation forms and filing requirements.',
    'Public Limited Company': 'Companies Act, 2013; Companies (Incorporation) Rules, 2014; and applicable corporate governance and capital requirements.',
    'Partnership': 'Indian Partnership Act, 1932; applicable state registration rules; and the terms recorded in the partnership deed.',
    'One Person Company': 'Companies Act, 2013; Companies (Incorporation) Rules, 2014; and the requirements applicable to nominee and member details.',
    'Digital Signature Certificate (DSC)': 'Information Technology Act, 2000; applicable electronic signature rules; and the requirements of the relevant certifying authority and filing portal.',
    'Annual Filing': 'Companies Act, 2013; applicable annual-return and financial-statement rules; and MCA filing requirements.',
    'GST Return': 'Central Goods and Services Tax Act, 2017; related GST rules; and applicable forms, notifications and due dates.',
    'Income Tax Return': 'Income-tax Act, 1961; Income-tax Rules, 1962; and the applicable return form, assessment year and reporting requirements.',
    'ROC Compliance': 'Companies Act, 2013; related rules; MCA forms; and event-based or recurring Registrar of Companies requirements.',
    'Trademark Registration': 'Trade Marks Act, 1999; Trade Marks Rules, 2017; and the examination, publication and opposition procedure.',
    'Patent Registration': 'Patents Act, 1970; Patents Rules, 2003; and the applicable filing, examination and prosecution requirements.',
    'Copyright Registration': 'Copyright Act, 1957; Copyright Rules, 2013; and the requirements for recording authorship and ownership.',
    'Design Registration': 'Designs Act, 2000; Designs Rules, 2001; and the requirements for representations, classification and examination.',
    'Talk to a Lawyer': 'The law applicable to the facts, documents, agreements and jurisdiction involved in the client’s specific matter.',
    'Legal Notice': 'The governing contract or statute, applicable limitation principles, procedural requirements and the facts supporting the notice.',
    'Contract Drafting': 'The Indian Contract Act, 1872; applicable commercial laws; and sector-specific rules relevant to the proposed agreement.',
    'Legal Documentation': 'The law governing the document’s purpose, parties, transaction and intended use, together with applicable execution and stamping requirements.',
    'Share Types': 'Companies Act, 2013; applicable share and securities rules; and the company’s constitutional documents and shareholder arrangements.',
    'Loans & CC': 'The facility terms, applicable banking and lending regulations, security documentation and any sector-specific requirements.'
  };
  const SERVICE_DETAILS = {
    'Private Limited Company': {
      intro: 'Build a credible company structure with limited liability, clear ownership and a compliance foundation that can support future growth.',
      focus: 'company name, directors, shareholding and incorporation route',
      work: 'name reservation, incorporation forms, charter documents and certificate follow-up',
      benefits: ['Separate legal identity and limited liability for owners', 'Stronger credibility with customers, vendors and banks', 'A clear shareholding structure for future investment', 'Guidance on immediate post-incorporation compliances'],
      documents: 'PAN and address proof for directors, registered-office proof, photographs and proposed business details.',
      timeline: 'Most applications can move from document readiness to incorporation in about 7 to 15 working days, subject to name and government approval.',
      pricing: 'Pricing depends on the number of directors, state, government fees and any additional registrations required.'
    },
    'Public Limited Company': {
      intro: 'Plan a public company structure for a larger ownership base, stronger governance and a business prepared for future capital raising.',
      focus: 'promoters, directors, capital structure and governance requirements',
      work: 'name review, constitutional documents, incorporation filings and approval coordination',
      benefits: ['Structured ownership for a growing enterprise', 'Improved governance and reporting discipline', 'A foundation suitable for wider capital participation', 'Coordinated support through incorporation formalities'],
      documents: 'Identity and address proof of promoters and directors, registered-office proof, capital details and business activity information.',
      timeline: 'A typical incorporation may take 15 to 30 working days, depending on approvals, documentation and the proposed structure.',
      pricing: 'Pricing is scoped around the capital structure, number of stakeholders, statutory fees and governance documentation.'
    },
    'Partnership': {
      intro: 'Set up a partnership with clear roles, contribution terms and decision-making rules agreed between the partners from day one.',
      focus: 'partner contributions, profit sharing, responsibilities and dispute safeguards',
      work: 'partnership deed preparation, registration support and document submission',
      benefits: ['Written clarity on ownership and profit sharing', 'Defined responsibilities for each partner', 'A practical structure for jointly operated businesses', 'Better documentation for banking and commercial relationships'],
      documents: 'Partner identity and address proof, office proof, proposed business activity and agreed contribution and profit-sharing details.',
      timeline: 'The process commonly takes 7 to 15 working days after all partner and office documents are ready.',
      pricing: 'Pricing depends on the number of partners, deed complexity, registration choice and applicable government charges.'
    },
    'One Person Company': {
      intro: 'Create a formal company structure for a single entrepreneur while keeping ownership simple and liability separate from personal assets.',
      focus: 'single-member ownership, nominee details and registered-office requirements',
      work: 'name selection, incorporation documents, nominee paperwork and filing follow-up',
      benefits: ['Company status for a solo founder', 'Limited liability separation for business activity', 'Clear ownership without a partner requirement', 'A structure that can support future expansion'],
      documents: 'Owner and nominee identity proof, address proof, consent documents, office proof and business activity details.',
      timeline: 'Once documents are complete, incorporation generally takes about 7 to 15 working days, subject to approval.',
      pricing: 'Pricing varies with government fees, nominee documentation and any additional registrations requested.'
    },
    'Digital Signature Certificate (DSC)': {
      intro: 'Get a verified digital signature for secure electronic signing on relevant government and business portals.',
      focus: 'certificate type, applicant role, identity verification and intended filing portal',
      work: 'certificate selection, document verification, issuance coordination and usage guidance',
      benefits: ['Secure electronic authentication for eligible filings', 'Faster execution of online forms and declarations', 'A reusable certificate for applicable business requirements', 'Clear guidance on certificate validity and responsible use'],
      documents: 'PAN or identity proof, address proof, email address, mobile number, photograph and applicant or entity details as required by the issuing process.',
      timeline: 'Issuance may be completed within 1 to 3 working days after successful verification, subject to the provider and applicant response time.',
      pricing: 'Pricing depends on certificate class, validity period, token or delivery requirements and verification charges.'
    },
    'Annual Filing': {
      intro: 'Keep your company records current with organized annual filings, document review and a clear compliance calendar.',
      focus: 'financial statements, annual return information and filing deadlines',
      work: 'data collection, form preparation, review, filing and acknowledgement tracking',
      benefits: ['Reduced risk of missed statutory deadlines', 'Better-maintained company records', 'Early visibility of missing information', 'A repeatable annual compliance routine'],
      documents: 'Books and financial statements, director and shareholding details, previous filing acknowledgements and statutory registers where applicable.',
      timeline: 'Timing depends on the financial year, accounts readiness and statutory due dates; we confirm the filing plan after review.',
      pricing: 'Pricing depends on entity type, filing period, transaction volume and whether overdue filings need to be regularized.'
    },
    'GST Return': {
      intro: 'Manage GST return preparation with transaction review, reconciliation support and filing reminders suited to your filing frequency.',
      focus: 'sales, purchases, input tax credit and outward tax liability',
      work: 'data collection, return preparation, reconciliation checks and filing confirmation',
      benefits: ['More consistent filing discipline', 'Better visibility of input tax credit differences', 'Reduced last-minute compliance pressure', 'Organized records for notices and reviews'],
      documents: 'Sales and purchase data, GST invoices, credit and debit notes, payment details and prior return or reconciliation records.',
      timeline: 'Returns are prepared around your applicable monthly or quarterly due dates after the period data is received.',
      pricing: 'Pricing depends on filing frequency, transaction volume, branches and the level of reconciliation required.'
    },
    'Income Tax Return': {
      intro: 'Prepare an accurate income tax return with a structured review of income, deductions, tax payments and supporting records.',
      focus: 'income sources, deductions, tax credits and filing category',
      work: 'information review, computation, return preparation, filing and acknowledgement support',
      benefits: ['A clearer view of taxable income and tax liability', 'Better use of eligible deductions and credits', 'Reduced data-entry and filing errors', 'Organized support for future assessments or queries'],
      documents: 'Form 16 or business income records, bank statements, investment proofs, tax payment details and prior return information.',
      timeline: 'The return can usually be prepared within 3 to 7 working days after complete information is received.',
      pricing: 'Pricing depends on income sources, books of account, number of schedules and any review or correction work required.'
    },
    'ROC Compliance': {
      intro: 'Stay on top of Registrar of Companies obligations with a practical calendar for event-based and recurring corporate filings.',
      focus: 'company events, director information, registers and statutory due dates',
      work: 'compliance review, form preparation, supporting-document checks and filing tracking',
      benefits: ['A clearer view of upcoming ROC obligations', 'Lower risk of avoidable additional fees and penalties', 'Current company records for banking and business needs', 'Support when company details or officers change'],
      documents: 'Company master data, previous filings, board or shareholder resolutions, financial information and event-specific supporting documents.',
      timeline: 'The timeline depends on the filing type and due date; urgent event-based filings are prioritized after document review.',
      pricing: 'Pricing depends on the filing type, company status, number of pending events and whether additional compliance work is needed.'
    },
    'Trademark Registration': {
      intro: 'Protect your brand identity with a structured trademark filing strategy covering search, class selection and application follow-up.',
      focus: 'brand name or logo, relevant classes and potential conflicts',
      work: 'preliminary search, class guidance, application preparation and status follow-up',
      benefits: ['Stronger protection for your brand identity', 'A clearer view of conflicts before filing', 'Correct class selection for intended business activity', 'Organized support through examination or objection stages'],
      documents: 'Applicant identity or incorporation proof, brand artwork, user details if applicable and a description of goods or services.',
      timeline: 'Application filing can be completed after document readiness; examination and registration timelines depend on the authority and any objections.',
      pricing: 'Pricing depends on applicant type, number of classes, search scope and whether objections or hearings require support.'
    },
    'Patent Registration': {
      intro: 'Move an invention toward patent protection with an early review of novelty, documentation and the appropriate filing route.',
      focus: 'invention description, novelty, inventorship and filing strategy',
      work: 'invention brief review, documentation coordination, filing preparation and status support',
      benefits: ['A structured record of the invention and inventorship', 'Earlier identification of documentation gaps', 'Guidance on provisional or complete filing routes', 'Organized support through prosecution milestones'],
      documents: 'Technical description, drawings or diagrams, inventor details, applicant documents and any prior-publication or disclosure information.',
      timeline: 'Preparation depends on technical complexity; authority examination and grant timelines vary significantly by application.',
      pricing: 'Pricing depends on technical complexity, filing route, number of inventors and the level of prosecution support required.'
    },
    'Copyright Registration': {
      intro: 'Create a clear record of ownership for original creative work through copyright application preparation and filing support.',
      focus: 'work type, authorship, ownership and the material being submitted',
      work: 'work review, applicant documentation, application preparation and status follow-up',
      benefits: ['A formal record supporting ownership claims', 'Clearer documentation of authorship and assignment', 'Support for creative, software and content-based businesses', 'Organized filing records for future commercial use'],
      documents: 'Copy of the work, applicant and author details, ownership or assignment documents and business information where relevant.',
      timeline: 'Application preparation is usually quick after the work and ownership documents are ready; authority processing may take longer.',
      pricing: 'Pricing depends on the work type, number of works and whether ownership or assignment documentation needs review.'
    },
    'Design Registration': {
      intro: 'Protect the distinctive visual appearance of a product with design filing support focused on originality, representations and class selection.',
      focus: 'product appearance, representations, originality and classification',
      work: 'representation review, classification guidance, application preparation and filing follow-up',
      benefits: ['Protection for the visual features of a product', 'A clearer filing record for commercial designs', 'Early review of representation and classification requirements', 'Support through examination-related correspondence'],
      documents: 'Clear product views, applicant and creator details, priority information if relevant and a description of the design.',
      timeline: 'Filing preparation depends on the quality of product representations; examination timelines depend on the authority.',
      pricing: 'Pricing depends on the number of designs, representations, applicant type and any examination support needed.'
    },
    'Talk to a Lawyer': {
      intro: 'Get a focused conversation with a lawyer to understand your business or personal legal question and decide the next practical step.',
      focus: 'the facts, documents, urgency and outcome you need from the consultation',
      work: 'issue intake, document review, lawyer consultation and next-step summary',
      benefits: ['A clearer understanding of your legal position', 'Practical options before you take action', 'An opportunity to identify risks early', 'A documented direction for the next step'],
      documents: 'A short issue summary, relevant agreements or notices, identity details and any correspondence connected to the matter.',
      timeline: 'Consultation availability depends on the subject and lawyer schedule; urgent matters are triaged during the first contact.',
      pricing: 'Pricing depends on consultation length, subject complexity and whether drafting, review or follow-on representation is required.'
    },
    'Legal Notice': {
      intro: 'Prepare a clear, proportionate legal notice that records the issue, requested remedy and response timeline without unnecessary escalation.',
      focus: 'facts, contractual rights, breach, remedy and supporting evidence',
      work: 'case intake, document review, notice drafting and delivery coordination',
      benefits: ['A structured statement of your position', 'Clear communication of the requested remedy', 'Better preservation of relevant facts and documents', 'Guidance on practical next steps after delivery'],
      documents: 'Agreement or transaction records, invoices, messages, notices, chronology and the outcome you want to seek.',
      timeline: 'A first draft can often be prepared within 3 to 7 working days after complete facts and documents are received.',
      pricing: 'Pricing depends on the subject, document volume, urgency and whether revisions or follow-up responses are needed.'
    },
    'Contract Drafting': {
      intro: 'Turn a commercial understanding into a practical contract with clear obligations, payment terms, risk allocation and exit provisions.',
      focus: 'commercial objectives, responsibilities, payment, confidentiality and termination',
      work: 'requirement call, clause planning, first draft, review discussion and finalization',
      benefits: ['Clearer expectations between the parties', 'Better protection against common commercial misunderstandings', 'Terms aligned to the actual transaction', 'A reusable foundation for future engagements'],
      documents: 'Party details, commercial terms, scope or statement of work, pricing, timelines and any existing draft or reference agreement.',
      timeline: 'A first draft is commonly prepared within 3 to 7 working days, depending on complexity and negotiation needs.',
      pricing: 'Pricing depends on contract type, length, number of parties, negotiation rounds and specialist clauses required.'
    },
    'Legal Documentation': {
      intro: 'Prepare and organize business documents that are clear, consistent and suited to the transaction or compliance need at hand.',
      focus: 'purpose, parties, obligations, approvals and supporting records',
      work: 'requirement mapping, document drafting or review, revisions and final delivery',
      benefits: ['More consistent business paperwork', 'Fewer gaps between commercial intent and written terms', 'Better records for internal and external use', 'A clear review trail before signature or submission'],
      documents: 'Existing drafts, party details, business context, supporting records and the required format or submission instructions.',
      timeline: 'Most standard documents can be prepared within 3 to 7 working days after the requirements are confirmed.',
      pricing: 'Pricing depends on document type, complexity, number of documents and the number of review rounds.'
    },
    'Share Types': {
      intro: 'Understand how different share types affect ownership, voting, dividends and fundraising before choosing a structure for your company.',
      focus: 'ordinary or preference rights, voting, dividends and transfer restrictions',
      work: 'business context review, option comparison and documentation or implementation guidance',
      benefits: ['Better-informed ownership decisions', 'Clearer conversations with founders and investors', 'Improved alignment between rights and business goals', 'Early visibility of governance and documentation needs'],
      documents: 'Current constitutional documents, cap table, proposed investment terms and the objectives of founders or shareholders.',
      timeline: 'An initial structure discussion can usually be completed within a few working days after the company information is available.',
      pricing: 'Pricing depends on the ownership structure, number of stakeholders and whether documents need to be drafted or amended.'
    },
    'Loans & CC': {
      intro: 'Prepare your business for loan or cash-credit discussions with clearer financial information, documentation and lender-ready presentation.',
      focus: 'funding requirement, repayment capacity, security and lender documentation',
      work: 'requirement review, document checklist, application presentation and coordination support',
      benefits: ['A clearer view of the funding requirement', 'Better-prepared lender documentation', 'More organized communication with banks or institutions', 'Practical guidance on facility terms and next steps'],
      documents: 'KYC, bank statements, financial statements, tax records, business proof, projections and security details where applicable.',
      timeline: 'Preparation commonly takes 7 to 15 working days; lender appraisal and sanction timelines are outside our control.',
      pricing: 'Pricing depends on facility type, loan size, business complexity and the depth of preparation or coordination required.'
    }
  };

  const fallbackDetails = {
    intro: 'Get structured guidance, document support and clear next steps for your business requirement from the Vyaptum Advisory team.',
    focus: 'your requirement, documents, deadlines and intended outcome',
    work: 'consultation, document preparation, submission support and status tracking',
    benefits: ['Clearer next steps for your requirement', 'Organized documents and communication', 'Support from preparation through completion', 'A practical route to speak with an expert'],
    documents: 'We will confirm the exact checklist after understanding your requirement and reviewing the relevant records.',
    timeline: 'The timeline depends on the service, document readiness and any authority or third-party processing involved.',
    pricing: 'Pricing depends on the scope, complexity and external fees involved; we provide a clear quote after review.'
  };
  const params = new URLSearchParams(window.location.search);
  const serviceName = params.get('name') || 'Our Services';
  const categoryName = params.get('category') || '';
  const details = SERVICE_DETAILS[serviceName] || fallbackDetails;
  const legalFramework = LEGAL_FRAMEWORKS[serviceName] || 'The applicable central and state laws, rules, forms and authority requirements for the selected service.';

  const buildWhatsAppLink = (topic) => {
    const text = `Hi, I'd like to know more about ${topic}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  document.title = `${serviceName} | Vyaptum Advisory`;
  const metaDesc = document.getElementById('pageDescription');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${details.intro} Talk to a Vyaptum Advisory expert about ${serviceName}.`);
  }

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('svcCategoryCrumb', categoryName || 'Services');
  setText('svcNameCrumb', serviceName);
  setText('svcCategoryLabel', categoryName || 'Service');
  setText('svcNameHeading', serviceName);
  setText('svcIntro', details.intro);
  setText('svcAudience', `${categoryName || 'Business'} clients who need support with ${details.focus}.`);
  setText('svcDeliverables', `You receive support with ${details.work}, a tailored document checklist, filing coordination and completion updates.`);
  setText('svcConsiderations', `${details.timeline} ${details.pricing}`);
  setText('svcCaseStudyContext', `A ${categoryName || 'business'} client needs help with ${details.focus}, but wants a clear plan before submitting anything.`);
  setText('svcCaseStudyOutcome', `The engagement is organized around ${details.work}. The client receives a checklist covering ${details.documents}`);
  setText('svcWhy', `${serviceName} matters because it helps you address ${details.focus} with a documented route instead of relying on last-minute decisions.`);
  setText('svcWhat', `It covers ${details.work}, supported by a checklist for ${details.documents}`);
  setText('svcBenefitsSummary', `${details.benefits[0]}, ${details.benefits[1].toLowerCase()}, and ${details.benefits[2].toLowerCase()}.`);
  setText('svcTips', `Prepare ${details.documents.toLowerCase()} Keep copies of submissions and respond promptly when clarification is requested.`);
  setText('svcGuideTitle', `Understanding ${serviceName}`);
  setText('svcGuideIntro', `${serviceName} is a structured way for ${categoryName || 'business'} clients to address ${details.focus}.`);
  setText('svcGuideDetail', `The engagement usually combines ${details.work}. It is designed to turn a complex requirement into clear actions, organized records and timely follow-up.`);
  setText('svcGuideWhyTitle', `Why ${serviceName} matters`);
  setText('svcGuideWhy', `Good preparation for ${serviceName} helps reduce avoidable corrections, missed information and uncertainty during the process. ${details.timeline}`);
  setText('svcAboutTitle', `About ${serviceName}`);
  setText('svcAboutIntro', `${serviceName} helps ${categoryName || 'business'} clients move from an open requirement to a documented, manageable next step.`);
  setText('svcAboutWhat', `${serviceName} addresses ${details.focus}. The work includes ${details.work}.`);
  setText('svcAboutWho', `${categoryName || 'Business'} owners and entrepreneurs who need support with ${details.focus}.`);
  setText('svcAboutWhen', `Consider it when you need to organize ${details.documents.toLowerCase()} or meet a relevant deadline, filing or business objective.`);
  setText('svcAboutGoal', `The goal is to complete the right preparation and follow-up for ${serviceName}, with clear communication throughout. ${details.timeline}`);
  setText('svcLawIntro', `${serviceName} is handled with reference to the relevant legal framework, authority process and current documentation requirements.`);
  setText('svcLawActs', legalFramework);
  setText('svcLawMeaning', `This means the correct documents, declarations, approvals and filing route must be checked against the requirements that apply to ${serviceName}.`);
  setText('svcDscIntro', `A Digital Signature Certificate (DSC) is an electronic signature used to authenticate documents and filings connected with ${serviceName} when the relevant portal requires it.`);
  setText('svcDscWhy', `For ${serviceName}, a DSC may be needed by a director, partner, authorized signatory, applicant or professional for secure online signing and submission. It is confirmed based on the filing type and portal.`);
  setText('svcDscDocuments', `Typical verification may require identity and address proof, PAN or entity details, an active email address, mobile number and a recent photograph or video verification where required.`);
  setText('svcDscProcess', `We identify the appropriate certificate type, collect the verification details, coordinate issuance and explain how the DSC should be used for ${serviceName}.`);

  const guideList = document.getElementById('svcGuideList');
  if (guideList) {
    [
      details.benefits[0],
      details.benefits[1],
      `Keep ready: ${details.documents}`,
      `Plan for: ${details.timeline}`
    ].forEach((point) => {
      const li = document.createElement('li');
      li.textContent = point;
      guideList.appendChild(li);
    });
  }

  const planTable = document.getElementById('svcPlanTableBody');
  if (planTable) {
    [
      ['01. Discovery', `Clarify ${details.focus} and confirm the right route.`, 'Business context, goals and current records.'],
      ['02. Preparation', `Coordinate ${details.work}.`, details.documents],
      ['03. Submission', 'Review the final pack, submit where applicable and share confirmation.', 'Approvals, signatures and timely responses.'],
      ['04. Follow-up', 'Track progress, communicate updates and explain the next action.', 'Any additional information requested during processing.']
    ].forEach((row) => {
      const tr = document.createElement('tr');
      row.forEach((cell) => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      planTable.appendChild(tr);
    });
  }

  const includedList = document.getElementById('svcIncludedList');
  if (includedList) {
    const includedItems = [
      `A consultation focused on ${details.focus}`,
      `Support with ${details.work}`,
      `A service-specific checklist covering ${details.documents}`,
      'Regular status updates and clear next steps until completion'
    ];
    includedItems.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      li.appendChild(document.createTextNode(` ${item}`));
      includedList.appendChild(li);
    });
  }

  details.benefits.forEach((benefit, index) => setText(`svcBenefit${index + 1}`, benefit));
  setText('svcFaqAnswer1', details.timeline);
  setText('svcFaqAnswer2', details.documents);
  setText('svcFaqAnswer3', details.pricing);
  setText('svcFaqAnswer4', `For ${serviceName}, delays can come from incomplete documents, corrections, missing approvals or external processing times. We flag gaps early and explain the next action.`);
  setText('svcFaqAnswer5', `Yes. We share clear progress updates and tell you when an approval, signature or additional document is needed for ${serviceName}.`);
  setText('svcFaqAnswer6', `Yes. We can review the current status, identify missing or incorrect information and recommend the most practical next step for ${serviceName}.`);

  document.querySelectorAll('.svc-name-inline').forEach(el => {
    el.textContent = serviceName;
  });

  const waLink = buildWhatsAppLink(serviceName);
  ['svcWhatsAppBtn', 'svcWhatsAppBtn2'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.href = waLink;
  });

});
