const fieldCards = [
  {
    slug: "health",
    name: "الصحة والعلوم الطبية",
    description: "أبحاث طبية قائمة على الأدلة، رؤى علاجية، ملخصات بيانات، وأدوات ميدانية.",
    color: "var(--color-success)"
  },
  {
    slug: "energy",
    name: "الهندسة النفطية والطاقة",
    description: "أنظمة الطاقة، تحليل الاحتياطيات، لوحات التشغيل، ومعايير فنية متقدمة.",
    color: "var(--color-warning)"
  },
  {
    slug: "business",
    name: "الأعمال",
    description: "الاستراتيجية، العمليات، أبحاث السوق، وتقارير الأعمال الجاهزة للمديرين.",
    color: "var(--color-business)"
  }
];

const resourceCards = [
  {
    type: "تقرير",
    title: "توقعات الطاقة الوطنية 2026",
    meta: "بحث · 4 دقائق",
    tag: "الطاقة"
  },
  {
    type: "عرض",
    title: "إطار إعداد التقارير الصحية",
    meta: "شرائح · 12 صفحة",
    tag: "الصحة"
  },
  {
    type: "ورقة بيضاء",
    title: "دليل نمو العمليات",
    meta: "استراتيجية · 21 صفحة",
    tag: "الأعمال"
  },
  {
    type: "دراسة حالة",
    title: "حوكمة البيانات في مختبرات البحث",
    meta: "دراسة حالة · 8 صفحات",
    tag: "البحث"
  }
];

const datasetCards = [
  {
    id: "health-smart",
    title: "حزمة بيانات الصحة الذكية",
    summary: "مجموعة بيانات صحية موثقة ومحدثة تغطي مقاييس الأداء، التدخلات، والتوزيع الجغرافي للمرضى في المؤسسات الصحية.",
    tag: "الصحة",
    users: "8,420",
    downloads: "2,164",
    sources: "142",
    version: "الإصدار 3.4",
    updated: "2026/10/06",
    source: "MDL — مكتبة بيانات وادي الرافدين",
    type: "CSV / JSON / XLSX",
    reliability: "96%",
    publicationDate: "2025/09/18",
    updateCycle: "كل 7 أيام",
    coverage: "الصحة، الطاقة، الأعمال",
    status: "متاحة للاستخدام الداخلي والبحثي",
    quality: "مفعّلة والتحقق المستمر جاري",
    stats: {
      views: "18.4K",
      downloads: "2,164",
      subscribers: "860"
    }
  },
  {
    id: "energy-ops",
    title: "حزمة بيانات الطاقة التشغيلية",
    summary: "بيانات تشغيلية عن الاستهلاك، الإنتاج، والقدرة التشغيلية مع فواصل زمنية يومية وشهرية لخرائط الأداء.",
    tag: "الطاقة",
    users: "5,980",
    downloads: "1,640",
    sources: "96",
    version: "الإصدار 2.9",
    updated: "2026/09/28",
    source: "أمانة الطاقة الوطنية",
    type: "CSV / Parquet",
    reliability: "94%",
    publicationDate: "2025/08/11",
    updateCycle: "كل 5 أيام",
    coverage: "الطاقة، الإنتاج، الوقود",
    status: "مفتوحة للبحث والتخطيط",
    quality: "مفعّلة ضمن مراقبة جودة دورية",
    stats: {
      views: "12.6K",
      downloads: "1,640",
      subscribers: "620"
    }
  },
  {
    id: "market-business",
    title: "حزمة بيانات السوق والأعمال",
    summary: "بيانات سوقية وتقارير أداء تشغيلية تساعد الفرق في تحليل النمو، التوزيع، وقرارات الاستثمار بالاستناد إلى مؤشرات موثقة.",
    tag: "الأعمال",
    users: "4,360",
    downloads: "1,120",
    sources: "88",
    version: "الإصدار 1.8",
    updated: "2026/09/19",
    source: "مؤسسة التحليل الاقتصادي",
    type: "CSV / XLSX",
    reliability: "92%",
    publicationDate: "2025/07/30",
    updateCycle: "كل 10 أيام",
    coverage: "السوق، الاستراتيجية، الأداء",
    status: "مفعّلة للجلسات الاستراتيجية",
    quality: "تراجع دوري للبيانات مستمر",
    stats: {
      views: "9.8K",
      downloads: "1,120",
      subscribers: "510"
    }
  }
];

const getDatasetById = (id) => datasetCards.find((item) => item.id === id) || datasetCards[0];

const getCurrentDatasetId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || datasetCards[0].id;
};

const getDatasetPageUrl = (id) => {
  const currentUrl = new URL(window.location.href);
  const targetUrl = currentUrl.pathname.includes("/pages/")
    ? new URL("../data.html", currentUrl.href)
    : new URL("pages/data.html", currentUrl.href);
  targetUrl.searchParams.set("id", id);
  return targetUrl.href;
};

const state = {
  filter: "all",
  search: ""
};

const showToast = (message) => {
  let toast = document.querySelector("#appToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
};

const buildFieldLink = (slug) => {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const dirDepth = Math.max(segments.length - (segments[segments.length - 1]?.includes(".html") ? 1 : 0), 0);
  const upward = dirDepth > 0 ? "../".repeat(dirDepth) : "";
  return `${upward}pages/fields/${slug}.html`;
};

const cardMarkup = (item) => `
  <article class="resource-card">
    <div class="resource-card__top">
      <span class="resource-card__type">${item.type}</span>
      <span class="chip">${item.tag}</span>
    </div>
    <h3>${item.title}</h3>
    <p>${item.meta}</p>
    <div class="resource-card__actions">
      <button class="btn btn--secondary btn--small" type="button" data-action="preview" data-label="${item.title}">معاينة</button>
      <button class="btn btn--primary btn--small" type="button" data-action="download" data-label="${item.title}">تحميل</button>
    </div>
  </article>
`;

const renderCards = (root, items, type) => {
  if (!root) return;

  root.innerHTML = items.map((item) => {
    if (type === "field") {
      return `
        <article class="field-card">
          <span class="field-card__dot" style="background:${item.color};"></span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <a href="${buildFieldLink(item.slug)}" class="text-link">استكشف المجال</a>
        </article>
      `;
    }

    if (type === "dataset") {
      return `
        <article class="dataset-card">
          <div class="dataset-card__header">
            <span class="chip">${item.tag}</span>
            <span class="dataset-card__status">محدثة</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="dataset-card__metrics">
            <div>
              <strong>${item.users}</strong>
              <span>مستخدم</span>
            </div>
            <div>
              <strong>${item.downloads}</strong>
              <span>تحميل</span>
            </div>
            <div>
              <strong>${item.sources}</strong>
              <span>مصدر</span>
            </div>
          </div>
          <div class="dataset-card__meta">
            <span>${item.version}</span>
            <span>${item.updated}</span>
          </div>
          <div class="resource-card__actions dataset-card__actions">
            <button class="btn btn--secondary btn--small" type="button" data-action="preview" data-dataset-id="${item.id}" data-label="${item.title}">معاينة</button>
            <button class="btn btn--primary btn--small" type="button" data-action="download" data-dataset-id="${item.id}" data-label="${item.title}">تحميل</button>
          </div>
        </article>
      `;
    }

    return cardMarkup(item);
  }).join("");
};

const getFilteredResources = () => {
  const normalizedSearch = state.search.trim().toLowerCase();

  return resourceCards.filter((item) => {
    const matchesFilter = state.filter === "all" || item.tag.toLowerCase() === state.filter.toLowerCase();
    const matchesSearch = !normalizedSearch || item.title.toLowerCase().includes(normalizedSearch) || item.type.toLowerCase().includes(normalizedSearch) || item.tag.toLowerCase().includes(normalizedSearch);
    return matchesFilter && matchesSearch;
  });
};

const renderResourceList = (container) => {
  if (!container) return;

  const filtered = getFilteredResources();

  container.innerHTML = filtered.length ? filtered.map(cardMarkup).join("") : `
    <div class="empty-state">
      <h3>لم يتم العثور على موارد</h3>
      <p>جرّب بحثاً أو فلترة مختلفة.</p>
    </div>
  `;
};

const initFilters = () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const resourceContainer = document.querySelector("[data-render='resources']");

  if (!filterButtons.length || !resourceContainer) return;

  const searchInput = document.querySelector("[data-resource-search]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter || "all";
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderResourceList(resourceContainer);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.search = event.target.value;
      renderResourceList(resourceContainer);
    });
  }
};

const renderDatasetDetail = (datasetId) => {
  const dataset = getDatasetById(datasetId);
  const detailRoot = document.querySelector("[data-detail='dataset']");
  if (!detailRoot || !dataset) return;

  const url = new URL(window.location.href);
  url.searchParams.set("id", dataset.id);
  history.replaceState({}, "", url);

  detailRoot.innerHTML = `
    <article class="detail-panel">
      <div class="dataset-detail__header">
        <div>
          <span class="eyebrow">حزمة البيانات</span>
          <h2>${dataset.title}</h2>
        </div>
        <span class="chip">${dataset.tag}</span>
      </div>

      <p>${dataset.summary}</p>

      <div class="dataset-detail__stats">
        <div class="mini-stat"><span>${dataset.users}</span><small>عدد المستخدمين</small></div>
        <div class="mini-stat"><span>${dataset.downloads}</span><small>عدد التحميلات</small></div>
        <div class="mini-stat"><span>${dataset.sources}</span><small>المصادر الموثقة</small></div>
      </div>

      <div class="detail-list">
        <div class="detail-item"><strong>اسم المنشأ</strong><span>${dataset.source}</span></div>
        <div class="detail-item"><strong>نوع الملف</strong><span>${dataset.type}</span></div>
        <div class="detail-item"><strong>نسبة الموثوقية</strong><span>${dataset.reliability}</span></div>
        <div class="detail-item"><strong>تاريخ النشر</strong><span>${dataset.publicationDate}</span></div>
        <div class="detail-item"><strong>تكرار التحديث</strong><span>${dataset.updateCycle}</span></div>
        <div class="detail-item"><strong>نطاق التغطية</strong><span>${dataset.coverage}</span></div>
        <div class="detail-item"><strong>حالة الاستخدام</strong><span>${dataset.status}</span></div>
        <div class="detail-item"><strong>حالة الجودة</strong><span>${dataset.quality}</span></div>
      </div>
    </article>

    <aside class="side-panel">
      <h2>مؤشرات الاستخدام</h2>
      <div class="stats-stack">
        <div class="mini-stat"><span>${dataset.stats.views}</span><small>المشاهدات</small></div>
        <div class="mini-stat"><span>${dataset.stats.downloads}</span><small>التنزيلات</small></div>
        <div class="mini-stat"><span>${dataset.stats.subscribers}</span><small>الاشتراكات</small></div>
      </div>
      <div class="dataset-actions">
        <button class="btn btn--primary" type="button" data-action="download" data-dataset-id="${dataset.id}" data-label="${dataset.title}">تحميل الحزمة</button>
      </div>
    </aside>
  `;
};

const renderDatasetCardsForField = (fieldSlug) => {
  const datasetContainer = document.querySelector("[data-field-datasets]");
  if (!datasetContainer) return;

  const filtered = datasetCards.filter((dataset) => {
    if (fieldSlug === "health") return dataset.tag === "الصحة";
    if (fieldSlug === "energy") return dataset.tag === "الطاقة";
    if (fieldSlug === "business") return dataset.tag === "الأعمال";
    return false;
  });

  datasetContainer.innerHTML = filtered.map((item) => `
    <article class="dataset-card">
      <div class="dataset-card__header">
        <span class="chip">${item.tag}</span>
        <span class="dataset-card__status">محدثة</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <div class="dataset-card__metrics">
        <div><strong>${item.users}</strong><span>مستخدم</span></div>
        <div><strong>${item.downloads}</strong><span>تحميل</span></div>
        <div><strong>${item.sources}</strong><span>مصدر</span></div>
      </div>
      <div class="dataset-card__meta">
        <span>${item.version}</span>
        <span>${item.updated}</span>
      </div>
      <div class="resource-card__actions dataset-card__actions">
        <a class="btn btn--secondary btn--small" href="${getDatasetPageUrl(item.id)}">معاينة</a>
        <button class="btn btn--primary btn--small" type="button" data-action="download" data-dataset-id="${item.id}" data-label="${item.title}">تحميل</button>
      </div>
    </article>
  `).join("");
};

const initActionButtons = () => {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const datasetId = button.dataset.datasetId;
      const label = button.dataset.label || "العنصر";

      if (action === "preview") {
        if (datasetId) {
          const targetUrl = getDatasetPageUrl(datasetId);
          window.location.href = targetUrl;
        }
        return;
      }

      if (action === "download") {
        const content = `MDL — ${label}\nتمت عملية التحميل بنجاح.`;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${label.replace(/\s+/g, "-")}.txt`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
        showToast(`تم تحميل: ${label}`);
      }
    });
  });
};

const initContactForm = () => {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.querySelector(".form-success");
    if (success) {
      success.hidden = false;
      form.reset();
    }
    showToast("تم استلام رسالتك وسنتواصل معك قريباً.");
  });
};

const initAuthForms = () => {
  document.querySelectorAll(".auth-form").forEach((form) => {
    const existingSuccess = form.querySelector(".form-success");
    const success = existingSuccess || document.createElement("div");

    if (!existingSuccess) {
      success.className = "form-success";
      success.hidden = true;
      form.appendChild(success);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = form.closest(".auth-panel")?.querySelector("h1")?.textContent || "النموذج";
      success.innerHTML = `
        <span class="form-success__icon">✓</span>
        <div>
          <strong>تمت العملية بنجاح.</strong>
          <div>${title}</div>
        </div>
      `;
      success.hidden = false;
      form.reset();
      showToast("تمت العملية بنجاح");
    });
  });
};

const initProfileEditor = () => {
  const profileForm = document.querySelector("#profileForm");
  if (!profileForm) return;

  const editorPanel = document.querySelector("#profileEditorPanel");
  const profileLayout = profileForm.closest(".profile-layout");
  const toggleButton = document.querySelector("#toggleProfileEdit");
  const fields = [...profileForm.querySelectorAll("input, textarea")];
  const status = document.querySelector("#profileStatus");
  const summaryFields = {
    name: document.querySelector("#profileNameValue"),
    role: document.querySelector("#profileRoleValue"),
    email: document.querySelector("#profileEmailValue"),
    organization: document.querySelector("#profileOrgValue"),
    bio: document.querySelector("#profileBioValue")
  };

  const syncSummary = () => {
    if (summaryFields.name) summaryFields.name.textContent = profileForm.elements.name.value.trim() || "غير محدد";
    if (summaryFields.role) summaryFields.role.textContent = profileForm.elements.role.value.trim() || "غير محدد";
    if (summaryFields.email) summaryFields.email.textContent = profileForm.elements.email.value.trim() || "غير محدد";
    if (summaryFields.organization) summaryFields.organization.textContent = profileForm.elements.organization.value.trim() || "غير محدد";
    if (summaryFields.bio) summaryFields.bio.textContent = profileForm.elements.bio.value.trim() || "لا يوجد وصف";
  };

  const showEditor = () => {
    if (editorPanel) {
      editorPanel.hidden = false;
    }
    profileLayout?.classList.add("is-editing");
    if (toggleButton) {
      toggleButton.textContent = "إلغاء التعديل";
    }
    fields[0]?.focus();
    if (status) {
      status.hidden = true;
    }
  };

  const hideEditor = () => {
    if (editorPanel) {
      editorPanel.hidden = true;
    }
    profileLayout?.classList.remove("is-editing");
    if (toggleButton) {
      toggleButton.textContent = "تعديل الملف";
    }
    if (status) {
      status.hidden = true;
    }
  };

  if (editorPanel) {
    editorPanel.hidden = true;
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      if (editorPanel && editorPanel.hidden) {
        showEditor();
      } else {
        hideEditor();
      }
    });
  }

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    syncSummary();
    hideEditor();
    if (status) {
      status.hidden = false;
      status.textContent = "تم حفظ التغييرات بنجاح.";
    }
    showToast("تم حفظ الملف الشخصي");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderCards(document.querySelector("[data-render='fields']"), fieldCards, "field");
  renderCards(document.querySelector("[data-render='resources']"), resourceCards, "resource");

  if (document.querySelector("[data-detail='dataset']")) {
    renderDatasetDetail(getCurrentDatasetId());
  }

  if (document.querySelector("[data-render='datasets']")) {
    renderCards(document.querySelector("[data-render='datasets']"), datasetCards, "dataset");
  }

  const fieldSlug = (window.location.pathname.match(/\/fields\/([a-z-]+)\.html$/) || [])[1];
  if (fieldSlug) {
    renderDatasetCardsForField(fieldSlug);
  }

  if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
    renderCards(document.querySelector("[data-render='datasets']"), datasetCards, "dataset");
  }

  initFilters();
  initActionButtons();
  initContactForm();
  initAuthForms();
  initProfileEditor();
});
