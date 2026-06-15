"use strict";

const DATA_URL = "assets/fabrics.json";
const STORAGE_KEY = "silicore-fabric-cart-v1";
const LANGUAGE_KEY = "agent-fur-language-v1";
const EXPORT_VERSION = 1;
const RND_ICON_URL = "icon-recommended.svg";
const NRND_ICON_URL = "icon-not-recommended.svg";

const STRINGS = {
  en: {
    documentTitle: "Agent Fur Fabric Selector",
    eyebrow: "//FUR FABRIC SELECTOR",
    appTitle: "Fabric Selector",
    loading: "Loading fabric database...",
    searchLabel: "ID Search",
    searchPlaceholder: "Example 3073",
    manufacturerLabel: "Manufacturer",
    allManufacturers: "All manufacturers",
    allStatuses: "All statuses",
    unmarked: "Unmarked",
    targetColor: "Target Color",
    sortByColor: "Sort by Color",
    resetSort: "Reset",
    defaultStatus: "Showing fabrics in database order.",
    sortedStatus: "Sorted by target color.",
    colorChanged: "Target color changed. Click Sort by Color to update the order.",
    noData: "No fabric data was loaded.",
    detailEmpty: "Select a fabric to view the large image and details.",
    recommendationStatus: "Status",
    recommendedNewDesign: "Recommended for new designs",
    notRecommendedNewDesign: "Not recommended for new designs",
    addToCart: "Add to Cart",
    cartTitle: "Cart",
    cartEmpty: "The cart is empty.",
    exportImage: "Export Image",
    exportText: "Export Code",
    importBase64: "Import from Code",
    importPlaceholder: "Paste exported code",
    importAppend: "Add from Code",
    importReplace: "Replace from Code",
    makerTools: "Maker Tools",
    exportBom: "Export BOM.csv",
    exportChecker: "Export Checker.png",
    expand: "Expand",
    collapse: "Collapse",
    languageToggle: "中文",
    languageToggleLabel: "Switch to Chinese",
    partNotePlaceholder: "Part note",
    moveUp: "Move up",
    moveDown: "Move down",
    remove: "Remove",
    itemCount: "{count} {unit}",
    itemSingular: "item",
    itemPlural: "items",
    summary: "{total} fabrics, showing {visible}",
    unnamed: "Unnamed",
    emptyBase64: "Paste an exported code first.",
    invalidBase64: "Code could not be decoded.",
    imported: "Imported {count} item(s){skipped}.",
    skipped: ", skipped {count} invalid ID(s)",
    cartEmptyExportText: "The cart is empty. Code export is unavailable.",
    cartEmptyExportImage: "The cart is empty. Image export is unavailable.",
    cartEmptyBom: "The cart is empty. BOM.csv export is unavailable.",
    cartEmptyChecker: "The cart is empty. Checker.png export is unavailable.",
    exportTextDone: "Code generated and copied when possible.",
    exportImageDone: "Cart image exported.",
    exportBomDone: "BOM.csv exported.",
    exportCheckerDone: "Checker.png exported: {width}x{height}px.",
    imageExportFailed: "Image export failed.",
    exportImageTitle: "Agent Fur Fabric Selection",
    exportImageMeta: "{count} item(s) / {date}",
    colorLabel: "Color {hex}",
    partLabel: "Part: {note}",
    rndAria: "Recommended",
    nrndAria: "Not recommended",
  },
  zh: {
    documentTitle: "Agent Fur 毛布选择工具",
    eyebrow: "//毛布选择工具",
    appTitle: "毛布选择工具",
    loading: "正在读取毛布数据库...",
    searchLabel: "ID 搜索",
    searchPlaceholder: "例如 3073",
    manufacturerLabel: "制造商",
    allManufacturers: "全部制造商",
    allStatuses: "全部状态",
    unmarked: "未标记",
    targetColor: "目标颜色",
    sortByColor: "按色差排序",
    resetSort: "恢复默认",
    defaultStatus: "默认按数据库顺序显示。",
    sortedStatus: "已按目标颜色排序。",
    colorChanged: "目标颜色已改变，点击“按色差排序”后更新结果。",
    noData: "没有读取到毛布数据。",
    detailEmpty: "选择一个毛布查看清晰图和详细信息。",
    recommendationStatus: "推荐状态",
    recommendedNewDesign: "建议用于新设计",
    notRecommendedNewDesign: "不建议用于新设计",
    addToCart: "加入购物车",
    cartTitle: "购物车",
    cartEmpty: "购物车为空。",
    exportImage: "导出图片",
    exportText: "导出 Code",
    importBase64: "从 Code 导入",
    importPlaceholder: "粘贴导出的 Code",
    importAppend: "从 Code 加入",
    importReplace: "用 Code 替换",
    makerTools: "制作师工具",
    exportBom: "导出 BOM.csv",
    exportChecker: "导出 Checker.png",
    expand: "展开",
    collapse: "收起",
    languageToggle: "EN",
    languageToggleLabel: "切换到英文",
    partNotePlaceholder: "用于哪个部位",
    moveUp: "上移",
    moveDown: "下移",
    remove: "删除",
    itemCount: "{count} 项",
    itemSingular: "项",
    itemPlural: "项",
    summary: "共 {total} 个毛布，当前显示 {visible} 个",
    unnamed: "未命名",
    emptyBase64: "请先粘贴导出的 Code。",
    invalidBase64: "Code 无法解码。",
    imported: "已导入 {count} 项{skipped}。",
    skipped: "，跳过 {count} 个无效 ID",
    cartEmptyExportText: "购物车为空，无法导出 Code。",
    cartEmptyExportImage: "购物车为空，无法导出图片。",
    cartEmptyBom: "购物车为空，无法导出 BOM.csv。",
    cartEmptyChecker: "购物车为空，无法导出 Checker.png。",
    exportTextDone: "已生成 Code，并尝试复制到剪贴板。",
    exportImageDone: "已导出购物车图片。",
    exportBomDone: "已导出 BOM.csv。",
    exportCheckerDone: "已导出 Checker.png：{width}x{height}px。",
    imageExportFailed: "导出图片失败。",
    exportImageTitle: "Agent Fur 毛布选择清单",
    exportImageMeta: "共 {count} 项 / {date}",
    colorLabel: "颜色 {hex}",
    partLabel: "部位：{note}",
    rndAria: "建议用于新设计",
    nrndAria: "不建议用于新设计",
  },
};

const state = {
  fabrics: [],
  byId: new Map(),
  selectedId: null,
  sortedByColor: false,
  targetLab: null,
  query: "",
  manufacturer: "",
  designStatus: "",
  cart: [],
  dragIndex: null,
  mobileDetailCollapsed: true,
  language: localStorage.getItem(LANGUAGE_KEY) === "zh" ? "zh" : "en",
};

const dom = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindDom();
  bindEvents();
  applyLanguage();
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Unable to read ${DATA_URL}: ${response.status}`);
    }
    const payload = await response.json();
    state.fabrics = payload.fabrics || [];
    state.byId = new Map(state.fabrics.map((fabric) => [String(fabric.original_id), fabric]));
    state.targetLab = rgbToLab(...hexToRgb(dom.colorPicker.value));
    loadCart();
    hydrateManufacturers();
    renderAll();
  } catch (error) {
    setStatus(error.message, true);
  }
}

function bindDom() {
  const ids = [
    "catalogSummary",
    "languageToggle",
    "advanceMode",
    "searchInput",
    "manufacturerFilter",
    "statusFilter",
    "colorPicker",
    "sortByColorButton",
    "resetSortButton",
    "statusBar",
    "fabricGrid",
    "detailEmpty",
    "detailContent",
    "detailImage",
    "detailName",
    "detailId",
    "detailManufacturer",
    "detailFlagsRow",
    "detailFlags",
    "detailCollapseButton",
    "addSelectedButton",
    "cartCount",
    "cartList",
    "cartEmpty",
    "exportImageButton",
    "exportTextButton",
    "importText",
    "importAppendButton",
    "importReplaceButton",
    "exportTextOutput",
    "adminPanel",
    "exportBomButton",
    "exportCheckerButton",
  ];
  for (const id of ids) {
    dom[id] = document.getElementById(id);
  }
  dom.fabricTemplate = document.getElementById("fabricCardTemplate");
  dom.cartTemplate = document.getElementById("cartItemTemplate");
  dom.detailPanel = dom.detailContent.closest(".detail-panel");
}

function bindEvents() {
  dom.languageToggle.addEventListener("click", () => {
    setLanguage(state.language === "en" ? "zh" : "en");
  });

  dom.searchInput.addEventListener("input", () => {
    state.query = dom.searchInput.value.trim();
    renderGrid();
  });

  dom.manufacturerFilter.addEventListener("change", () => {
    state.manufacturer = dom.manufacturerFilter.value;
    renderGrid();
  });

  dom.statusFilter.addEventListener("change", () => {
    state.designStatus = dom.statusFilter.value;
    renderGrid();
  });

  dom.colorPicker.addEventListener("input", () => {
    if (state.sortedByColor) {
      setStatus(t("colorChanged"), false);
    }
  });

  dom.sortByColorButton.addEventListener("click", () => {
    state.sortedByColor = true;
    state.targetLab = rgbToLab(...hexToRgb(dom.colorPicker.value));
    renderGrid();
  });

  dom.resetSortButton.addEventListener("click", () => {
    state.sortedByColor = false;
    renderGrid();
  });

  dom.addSelectedButton.addEventListener("click", () => {
    if (state.selectedId) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      addToCart(state.selectedId);
      restoreScrollPosition(scrollX, scrollY);
    }
  });

  dom.detailCollapseButton.addEventListener("click", () => {
    setMobileDetailCollapsed(!state.mobileDetailCollapsed);
  });

  dom.advanceMode.addEventListener("click", () => {
    const isEnabled = dom.advanceMode.getAttribute("aria-pressed") === "true";
    setAdvanceMode(!isEnabled);
  });

  dom.exportTextButton.addEventListener("click", exportCartText);
  dom.exportImageButton.addEventListener("click", exportCartImage);
  dom.importAppendButton.addEventListener("click", () => importCartText(false));
  dom.importReplaceButton.addEventListener("click", () => importCartText(true));
  dom.exportBomButton.addEventListener("click", exportBomCsv);
  dom.exportCheckerButton.addEventListener("click", exportCheckerPng);
  window.addEventListener("resize", renderMobileDetailState);
}

function setLanguage(language) {
  state.language = language;
  localStorage.setItem(LANGUAGE_KEY, language);
  applyLanguage();
  hydrateManufacturers();
  renderAll();
}

function applyLanguage() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.title = t("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  dom.languageToggle.textContent = t("languageToggle");
  dom.languageToggle.setAttribute("aria-label", t("languageToggleLabel"));
  dom.languageToggle.title = t("languageToggleLabel");
  dom.detailPanel?.style.setProperty(
    "--detail-heading",
    state.language === "zh" ? '"毛布详情"' : '"FABRIC_DETAIL"',
  );
  renderMobileDetailState();
}

function t(key, values = {}) {
  const template = STRINGS[state.language]?.[key] ?? STRINGS.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function setAdvanceMode(enabled) {
  dom.advanceMode.setAttribute("aria-pressed", String(enabled));
  dom.adminPanel.classList.toggle("hidden", !enabled);
}

function hydrateManufacturers() {
  if (!dom.manufacturerFilter) {
    return;
  }
  const selected = state.manufacturer;
  const option = document.createElement("option");
  option.value = "";
  option.textContent = t("allManufacturers");
  dom.manufacturerFilter.replaceChildren(option);

  const manufacturers = [...new Set(state.fabrics.map((fabric) => fabric.manufacturer))]
    .filter(Boolean)
    .map((value) => ({
      value,
      label: localizedManufacturer({ manufacturer: value, manufacturer_en: manufacturerEn(value) }),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, state.language === "zh" ? "zh-Hans-CN" : "en"));

  for (const manufacturer of manufacturers) {
    const manufacturerOption = document.createElement("option");
    manufacturerOption.value = manufacturer.value;
    manufacturerOption.textContent = manufacturer.label;
    dom.manufacturerFilter.appendChild(manufacturerOption);
  }
  dom.manufacturerFilter.value = selected;
}

function manufacturerEn(manufacturer) {
  const found = state.fabrics.find((fabric) => fabric.manufacturer === manufacturer);
  return found?.manufacturer_en || manufacturer;
}

function renderAll() {
  renderGrid();
  renderDetail();
  renderCart();
}

function renderGrid() {
  const fragment = document.createDocumentFragment();
  const fabrics = getVisibleFabrics();

  for (const fabric of fabrics) {
    const card = dom.fabricTemplate.content.firstElementChild.cloneNode(true);
    const image = card.querySelector("img");
    const strip = card.querySelector(".id-strip");
    const statusBadge = card.querySelector(".status-badge");
    const label = fabricLabel(fabric);
    const designStatus = getDesignStatus(fabric);

    card.dataset.id = fabric.original_id;
    card.style.setProperty("--fabric-color", fabric.hex_code);
    card.style.setProperty("--label-text", readableTextColor(fabric.r, fabric.g, fabric.b));
    card.classList.toggle("selected", fabric.original_id === state.selectedId);
    card.classList.toggle("rnd-card", designStatus === "RND");
    card.setAttribute("aria-label", label);
    image.src = fabric.thumb_path;
    image.alt = label;
    strip.textContent = fabric.original_id;
    renderStatusBadge(statusBadge, fabric);

    card.addEventListener("click", () => {
      state.selectedId = fabric.original_id;
      renderGrid();
      setMobileDetailCollapsed(false);
      renderDetail();
    });
    fragment.appendChild(card);
  }

  dom.fabricGrid.replaceChildren(fragment);
  dom.catalogSummary.textContent = t("summary", {
    total: state.fabrics.length,
    visible: fabrics.length,
  });
  if (!state.fabrics.length) {
    setStatus(t("noData"), true);
  } else {
    setStatus(state.sortedByColor ? t("sortedStatus") : t("defaultStatus"), false);
  }
}

function getVisibleFabrics() {
  const query = state.query.toLowerCase();
  let fabrics = state.fabrics.filter((fabric) => {
    const manufacturerOk = !state.manufacturer || fabric.manufacturer === state.manufacturer;
    const status = getDesignStatus(fabric);
    const statusOk =
      !state.designStatus ||
      (state.designStatus === "none" ? !status : status === state.designStatus);
    const searchParts = [
      fabric.original_id,
      fabric.name,
      fabric.name_en,
      fabric.manufacturer,
      fabric.manufacturer_en,
    ].map((value) => String(value || "").toLowerCase());
    const queryOk = !query || searchParts.some((part) => part.includes(query));
    return manufacturerOk && statusOk && queryOk;
  });

  if (state.sortedByColor && state.targetLab) {
    fabrics = fabrics
      .map((fabric) => ({
        ...fabric,
        delta_e: deltaE2000(state.targetLab, fabric.lab),
      }))
      .sort((a, b) => a.delta_e - b.delta_e || naturalIdSort(a.original_id, b.original_id));
  }

  return fabrics;
}

function renderDetail() {
  const fabric = state.byId.get(state.selectedId);
  dom.detailEmpty.classList.toggle("hidden", Boolean(fabric));
  dom.detailContent.classList.toggle("hidden", !fabric);
  dom.addSelectedButton.disabled = !fabric;
  renderMobileDetailState();

  if (!fabric) {
    return;
  }

  dom.detailImage.src = fabric.large_path;
  dom.detailImage.alt = fabricLabel(fabric);
  dom.detailName.textContent = localizedName(fabric) || t("unnamed");
  dom.detailId.textContent = `#${fabric.original_id}`;
  dom.detailManufacturer.textContent = localizedManufacturer(fabric);
  renderDetailFlags(fabric);
}

function renderDetailFlags(fabric) {
  const status = getDesignStatus(fabric);
  dom.detailFlags.replaceChildren();
  dom.detailFlagsRow.classList.toggle("hidden", !status);
  if (!status) {
    return;
  }

  const icon = document.createElement("span");
  icon.className = `${status === "RND" ? "rnd-icon" : "nrnd-icon"} detail-status-icon`;
  if (status === "RND") {
    icon.style.setProperty("--rnd-icon-url", `url("${RND_ICON_URL}")`);
    dom.detailFlags.append(icon, document.createTextNode(t("recommendedNewDesign")));
  } else {
    icon.style.setProperty("--nrnd-icon-url", `url("${NRND_ICON_URL}")`);
    dom.detailFlags.append(icon, document.createTextNode(t("notRecommendedNewDesign")));
  }
}

function setMobileDetailCollapsed(collapsed) {
  state.mobileDetailCollapsed = collapsed;
  renderMobileDetailState();
}

function renderMobileDetailState() {
  if (!dom.detailCollapseButton || !dom.detailPanel) {
    return;
  }
  const isMobile = window.matchMedia("(max-width: 780px)").matches;
  const isCollapsed = isMobile && state.mobileDetailCollapsed;
  dom.detailPanel.classList.toggle("mobile-collapsed", isCollapsed);
  dom.detailCollapseButton.setAttribute("aria-expanded", String(!isCollapsed));
  dom.detailCollapseButton.querySelector(".detail-collapse-label").textContent = isCollapsed
    ? t("expand")
    : t("collapse");
}

function restoreScrollPosition(scrollX, scrollY) {
  requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY);
    requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
  });
}

function addToCart(id, note = "") {
  const fabric = state.byId.get(id);
  if (!fabric) {
    return false;
  }
  state.cart.push({
    uid: makeUid(),
    id,
    note,
  });
  saveCart();
  renderCart();
  return true;
}

function renderCart() {
  const fragment = document.createDocumentFragment();
  state.cart.forEach((item, index) => {
    const fabric = state.byId.get(item.id);
    if (!fabric) {
      return;
    }
    const row = dom.cartTemplate.content.firstElementChild.cloneNode(true);
    const image = row.querySelector("img");
    const strong = row.querySelector("strong");
    const subtitle = row.querySelector("span");
    const input = row.querySelector("input");

    row.dataset.index = String(index);
    row.style.setProperty("--fabric-color", fabric.hex_code);
    image.src = fabric.thumb_path;
    image.alt = fabricLabel(fabric);
    strong.textContent = `#${fabric.original_id}`;
    subtitle.textContent = `${localizedManufacturer(fabric)} / ${localizedName(fabric)}`;
    input.placeholder = t("partNotePlaceholder");
    input.value = item.note || "";
    input.addEventListener("input", () => {
      state.cart[index].note = input.value;
      saveCart();
    });

    row.querySelector(".move-up").title = t("moveUp");
    row.querySelector(".move-down").title = t("moveDown");
    row.querySelector(".remove-item").title = t("remove");
    row.querySelector(".move-up").addEventListener("click", () => moveCartItem(index, index - 1));
    row.querySelector(".move-down").addEventListener("click", () => moveCartItem(index, index + 1));
    row.querySelector(".remove-item").addEventListener("click", () => {
      state.cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    row.addEventListener("dragstart", (event) => {
      state.dragIndex = index;
      row.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
    });
    row.addEventListener("dragend", () => {
      state.dragIndex = null;
      row.classList.remove("dragging");
    });
    row.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      const from = state.dragIndex ?? Number(event.dataTransfer.getData("text/plain"));
      moveCartItem(from, index);
    });

    fragment.appendChild(row);
  });

  dom.cartList.replaceChildren(fragment);
  dom.cartCount.textContent = itemCountText(state.cart.length);
  dom.cartEmpty.classList.toggle("hidden", state.cart.length > 0);
}

function itemCountText(count) {
  if (state.language === "zh") {
    return t("itemCount", { count });
  }
  return t("itemCount", {
    count,
    unit: count === 1 ? t("itemSingular") : t("itemPlural"),
  });
}

function moveCartItem(fromIndex, toIndex) {
  if (
    Number.isNaN(fromIndex) ||
    Number.isNaN(toIndex) ||
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= state.cart.length ||
    toIndex >= state.cart.length
  ) {
    return;
  }
  const [item] = state.cart.splice(fromIndex, 1);
  state.cart.splice(toIndex, 0, item);
  saveCart();
  renderCart();
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed.items) ? parsed.items : [];
    state.cart = items
      .filter((item) => state.byId.has(String(item.id)))
      .map((item) => ({
        uid: item.uid || makeUid(),
        id: String(item.id),
        note: String(item.note || ""),
      }));
  } catch {
    state.cart = [];
  }
}

function saveCart() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: EXPORT_VERSION,
      items: state.cart.map(({ uid, id, note }) => ({ uid, id, note })),
    }),
  );
}

function exportCartText() {
  if (!state.cart.length) {
    setStatus(t("cartEmptyExportText"), true);
    return;
  }
  const payload = {
    version: EXPORT_VERSION,
    exported_at: new Date().toISOString(),
    items: state.cart.map((item) => ({
      id: item.id,
      note: item.note || "",
    })),
  };
  const encoded = encodeBase64Json(payload);
  dom.exportTextOutput.value = encoded;
  dom.exportTextOutput.classList.add("has-output");
  dom.exportTextOutput.select();
  navigator.clipboard?.writeText(encoded).catch(() => {});
  setStatus(t("exportTextDone"), false);
}

function importCartText(replace) {
  const raw = dom.importText.value.trim();
  if (!raw) {
    setStatus(t("emptyBase64"), true);
    return;
  }
  let payload;
  try {
    payload = decodeBase64Json(raw);
  } catch {
    setStatus(t("invalidBase64"), true);
    return;
  }
  const items = Array.isArray(payload.items) ? payload.items : [];
  const imported = [];
  const skipped = [];
  for (const item of items) {
    const id = String(item.id || "").trim();
    if (!state.byId.has(id)) {
      skipped.push(id || "(empty)");
      continue;
    }
    imported.push({
      uid: makeUid(),
      id,
      note: String(item.note || ""),
    });
  }
  if (replace) {
    state.cart = imported;
  } else {
    state.cart.push(...imported);
  }
  saveCart();
  renderCart();
  setStatus(
    t("imported", {
      count: imported.length,
      skipped: skipped.length ? t("skipped", { count: skipped.length }) : "",
    }),
    false,
  );
}

async function exportCartImage() {
  if (!state.cart.length) {
    setStatus(t("cartEmptyExportImage"), true);
    return;
  }
  const rowHeight = 112;
  const width = 1180;
  const height = 92 + state.cart.length * rowHeight + 40;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f5f1e8";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#222222";
  ctx.font = "700 32px Microsoft YaHei, Arial, sans-serif";
  ctx.fillText(t("exportImageTitle"), 36, 48);
  ctx.font = "16px Microsoft YaHei, Arial, sans-serif";
  ctx.fillStyle = "#666055";
  ctx.fillText(
    t("exportImageMeta", {
      count: state.cart.length,
      date: new Date().toLocaleString(),
    }),
    36,
    76,
  );

  for (let index = 0; index < state.cart.length; index += 1) {
    const item = state.cart[index];
    const fabric = state.byId.get(item.id);
    if (!fabric) {
      continue;
    }
    const y = 104 + index * rowHeight;
    ctx.fillStyle = "#fffdf8";
    ctx.fillRect(30, y, width - 60, rowHeight - 12);
    ctx.strokeStyle = fabric.hex_code;
    ctx.lineWidth = 5;
    ctx.strokeRect(30, y, width - 60, rowHeight - 12);
    const image = await loadImage(fabric.thumb_path);
    ctx.drawImage(image, 44, y + 12, 76, 76);

    ctx.fillStyle = "#222222";
    ctx.font = "700 22px Microsoft YaHei, Arial, sans-serif";
    ctx.fillText(`${index + 1}. #${fabric.original_id} ${localizedName(fabric)}`, 140, y + 34);
    ctx.font = "16px Microsoft YaHei, Arial, sans-serif";
    ctx.fillStyle = "#5d584e";
    ctx.fillText(localizedManufacturer(fabric), 140, y + 60);
    ctx.fillText(t("colorLabel", { hex: fabric.hex_code }), 140, y + 84);
    ctx.fillStyle = "#222222";
    wrapCanvasText(ctx, t("partLabel", { note: item.note || "" }), 520, y + 42, 590, 22);
  }

  downloadCanvas(canvas, "fabric-selection.png");
  setStatus(t("exportImageDone"), false);
}

function exportBomCsv() {
  if (!state.cart.length) {
    setStatus(t("cartEmptyBom"), true);
    return;
  }
  const rows = [
    ["original_id", "manufacturer", "name", "hex_code", "part_note"],
    ...state.cart
      .map((item) => {
        const fabric = state.byId.get(item.id);
        if (!fabric) {
          return null;
        }
        return [
          fabric.original_id,
          fabric.manufacturer,
          fabric.name,
          fabric.hex_code,
          item.note || "",
        ];
      })
      .filter(Boolean),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadBlob(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }), "BOM.csv");
  setStatus(t("exportBomDone"), false);
}

function exportCheckerPng() {
  if (!state.cart.length) {
    setStatus(t("cartEmptyChecker"), true);
    return;
  }
  const cell = 50;
  const cols = Math.min(10, state.cart.length);
  const rows = Math.ceil(state.cart.length / 10);
  const canvas = document.createElement("canvas");
  canvas.width = cols * cell;
  canvas.height = rows * cell;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  state.cart.forEach((item, index) => {
    const fabric = state.byId.get(item.id);
    if (!fabric) {
      return;
    }
    const x = (index % 10) * cell;
    const y = (rows - 1 - Math.floor(index / 10)) * cell;
    ctx.fillStyle = fabric.hex_code;
    ctx.fillRect(x, y, cell, cell);
  });

  downloadCanvas(canvas, "Checker.png");
  setStatus(t("exportCheckerDone", { width: canvas.width, height: canvas.height }), false);
}

function localizedName(fabric) {
  return state.language === "en" ? fabric.name_en || fabric.name : fabric.name;
}

function localizedManufacturer(fabric) {
  return state.language === "en"
    ? fabric.manufacturer_en || fabric.manufacturer
    : fabric.manufacturer;
}

function fabricLabel(fabric) {
  return `${fabric.original_id} ${localizedManufacturer(fabric)} ${localizedName(fabric)}`;
}

function encodeBase64Json(payload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function decodeBase64Json(raw) {
  return JSON.parse(decodeURIComponent(escape(atob(raw))));
}

function csvCell(value) {
  const text = String(value ?? "");
  if (/[",\r\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function downloadCanvas(canvas, filename) {
  canvas.toBlob((blob) => {
    if (!blob) {
      setStatus(t("imageExportFailed"), true);
      return;
    }
    downloadBlob(blob, filename);
  }, "image/png");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(state.language === "zh" ? "" : " ");
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const separator = state.language === "zh" ? "" : " ";
    const test = line ? `${line}${separator}${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, cursorY);
  }
}

function renderStatusBadge(element, fabric) {
  const status = getDesignStatus(fabric);
  element.replaceChildren();
  element.className = "status-badge hidden";
  element.removeAttribute("title");
  element.removeAttribute("aria-label");
  if (!status) {
    return;
  }

  element.classList.remove("hidden");
  element.classList.add(status.toLowerCase());
  element.title = status === "RND" ? t("rndAria") : t("nrndAria");
  element.setAttribute("aria-label", element.title);
  const icon = document.createElement("span");
  if (status === "RND") {
    icon.className = "rnd-icon";
    icon.style.setProperty("--rnd-icon-url", `url("${RND_ICON_URL}")`);
  } else {
    icon.className = "nrnd-icon";
    icon.style.setProperty("--nrnd-icon-url", `url("${NRND_ICON_URL}")`);
  }
  element.append(icon);
}

function getDesignStatus(fabric) {
  if (fabric.design_status) {
    return fabric.design_status;
  }
  if (fabric.not_recommended_for_new_design) {
    return "NRND";
  }
  if (fabric.recommended_for_new_design) {
    return "RND";
  }
  return "";
}

function setStatus(message, isError) {
  dom.statusBar.textContent = message;
  dom.statusBar.classList.toggle("error", Boolean(isError));
}

function makeUid() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function naturalIdSort(a, b) {
  const aNumber = Number(a);
  const bNumber = Number(b);
  if (Number.isFinite(aNumber) && Number.isFinite(bNumber)) {
    return aNumber - bNumber;
  }
  return String(a).localeCompare(String(b));
}

function readableTextColor(r, g, b) {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#111111" : "#ffffff";
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function srgbToLinear(channel) {
  const value = channel / 255;
  if (value <= 0.04045) {
    return value / 12.92;
  }
  return ((value + 0.055) / 1.055) ** 2.4;
}

function rgbToLab(r, g, b) {
  const red = srgbToLinear(r);
  const green = srgbToLinear(g);
  const blue = srgbToLinear(b);
  let x = red * 0.4124564 + green * 0.3575761 + blue * 0.1804375;
  let y = red * 0.2126729 + green * 0.7151522 + blue * 0.072175;
  let z = red * 0.0193339 + green * 0.119192 + blue * 0.9503041;
  x /= 0.95047;
  y /= 1;
  z /= 1.08883;
  const pivot = (value) => (value > 0.008856 ? value ** (1 / 3) : 7.787 * value + 16 / 116);
  const fx = pivot(x);
  const fy = pivot(y);
  const fz = pivot(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function deltaE2000(lab1, lab2) {
  const [l1, a1, b1] = lab1.map(Number);
  const [l2, a2, b2] = lab2.map(Number);
  const kL = 1;
  const kC = 1;
  const kH = 1;
  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const cBar = (c1 + c2) / 2;
  const cBar7 = cBar ** 7;
  const g = 0.5 * (1 - Math.sqrt(cBar7 / (cBar7 + 25 ** 7)));
  const ap1 = (1 + g) * a1;
  const ap2 = (1 + g) * a2;
  const cp1 = Math.sqrt(ap1 * ap1 + b1 * b1);
  const cp2 = Math.sqrt(ap2 * ap2 + b2 * b2);
  const hp1 = hueDegrees(b1, ap1);
  const hp2 = hueDegrees(b2, ap2);

  const dLp = l2 - l1;
  const dCp = cp2 - cp1;
  let dHp = 0;
  if (cp1 * cp2 !== 0) {
    if (Math.abs(hp2 - hp1) <= 180) {
      dHp = hp2 - hp1;
    } else if (hp2 <= hp1) {
      dHp = hp2 - hp1 + 360;
    } else {
      dHp = hp2 - hp1 - 360;
    }
  }
  const dHpValue = 2 * Math.sqrt(cp1 * cp2) * Math.sin(degToRad(dHp / 2));
  const lBarP = (l1 + l2) / 2;
  const cBarP = (cp1 + cp2) / 2;
  let hBarP = hp1 + hp2;
  if (cp1 * cp2 === 0) {
    hBarP = hp1 + hp2;
  } else if (Math.abs(hp1 - hp2) <= 180) {
    hBarP = (hp1 + hp2) / 2;
  } else if (hp1 + hp2 < 360) {
    hBarP = (hp1 + hp2 + 360) / 2;
  } else {
    hBarP = (hp1 + hp2 - 360) / 2;
  }

  const t =
    1 -
    0.17 * Math.cos(degToRad(hBarP - 30)) +
    0.24 * Math.cos(degToRad(2 * hBarP)) +
    0.32 * Math.cos(degToRad(3 * hBarP + 6)) -
    0.2 * Math.cos(degToRad(4 * hBarP - 63));
  const deltaTheta = 30 * Math.exp(-(((hBarP - 275) / 25) ** 2));
  const rc = 2 * Math.sqrt(cBarP ** 7 / (cBarP ** 7 + 25 ** 7));
  const sl = 1 + (0.015 * (lBarP - 50) ** 2) / Math.sqrt(20 + (lBarP - 50) ** 2);
  const sc = 1 + 0.045 * cBarP;
  const sh = 1 + 0.015 * cBarP * t;
  const rt = -Math.sin(degToRad(2 * deltaTheta)) * rc;

  return Math.sqrt(
    (dLp / (kL * sl)) ** 2 +
      (dCp / (kC * sc)) ** 2 +
      (dHpValue / (kH * sh)) ** 2 +
      rt * (dCp / (kC * sc)) * (dHpValue / (kH * sh)),
  );
}

function hueDegrees(b, a) {
  if (a === 0 && b === 0) {
    return 0;
  }
  const hue = radToDeg(Math.atan2(b, a));
  return hue >= 0 ? hue : hue + 360;
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}
