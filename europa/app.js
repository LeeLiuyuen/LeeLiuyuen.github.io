const translations = {
  zh: {
    documentTitle: "Europa Utilities 下载 | Silicore",
    metaDescription: "Europa Utilities 下载页面，适用于 Silicore Europa Pico 与 Europa Core Pro。",
    topbarSubtitle: "Europa 设备配置、维护与生产测试工具",
    homeLink: "返回首页",
    heroTitle: "Europa Utilities",
    heroLead: "用于 Silicore Europa Pico 与 Europa Core Pro 的 PC 配置、服务、固件更新和生产测试工具。",
    downloadButton: "下载 Windows 版本",
    compatibilityTag: "Windows / USB CDC",
    fileNameLabel: "文件",
    fileSizeLabel: "大小",
    updatedLabel: "更新",
    heroCaption: "中文界面预览",
    screenshotsTitle: "软件截图",
    screenshotZhCaption: "中文界面",
    screenshotEnCaption: "English UI",
    featuresTitle: "主要功能",
    featureConnectTitle: "自动连接",
    featureConnectBody: "自动检测一个 Europa USB CDC 设备，并读取产品、硬件、固件和协议能力信息。",
    featureConfigTitle: "配置管理",
    featureConfigBody: "配置风扇档位、档位顺序、温控策略和按钮/遥控绑定，并支持 JSON 导入导出。",
    featureLogTitle: "日志与报告",
    featureLogBody: "读取 Europa Pico 与 Core Pro 事件日志，导出 CSV，并生成生产测试报告。",
    featureFirmwareTitle: "固件更新",
    featureFirmwareBody: "从 .eufw 固件包更新 Europa Pico 与 Europa Core Pro，并在写入前检查设备兼容性。",
    featureMfgTitle: "生产测试",
    featureMfgBody: "Core Pro 制造固件可使用 USB、ADC、传感器、按键、蜂鸣器、风扇和屏幕测试流程。",
    featureLanguageTitle: "中英双语",
    featureLanguageBody: "工具界面和下载页均支持中文与 English，便于生产、售后和海外设备维护。",
    noticeTitle: "兼容性提示",
    noticeWindows: "这是 Windows 桌面工具，运行时需要可访问的 Europa USB CDC 设备。",
    noticeFirmware: "固件更新请使用与设备型号、硬件版本和 MCU 匹配的 .eufw 包。",
    noticeProduction: "生产测试功能仅在 Core Pro 制造固件报告 mfg=1 时启用。",
    heroScreenshotAlt: "Europa Utilities 中文界面截图",
    screenshotZhAlt: "Europa Utilities 中文界面截图",
    screenshotEnAlt: "Europa Utilities 英文界面截图"
  },
  en: {
    documentTitle: "Europa Utilities Download | Silicore",
    metaDescription: "Download Europa Utilities for Silicore Europa Pico and Europa Core Pro devices.",
    topbarSubtitle: "Configuration, service, and production-test tool for Europa devices",
    homeLink: "Home",
    heroTitle: "Europa Utilities",
    heroLead: "A Windows PC tool for configuring, servicing, updating firmware, and running production tests on Silicore Europa Pico and Europa Core Pro devices.",
    downloadButton: "Download for Windows",
    compatibilityTag: "Windows / USB CDC",
    fileNameLabel: "File",
    fileSizeLabel: "Size",
    updatedLabel: "Updated",
    heroCaption: "Chinese UI preview",
    screenshotsTitle: "Screenshots",
    screenshotZhCaption: "Chinese UI",
    screenshotEnCaption: "English UI",
    featuresTitle: "Key Features",
    featureConnectTitle: "Auto Connect",
    featureConnectBody: "Detect one Europa USB CDC device and read product, hardware, firmware, protocol, and capability details.",
    featureConfigTitle: "Configuration",
    featureConfigBody: "Configure fan levels, level order, thermal policy, button and remote bindings, with JSON import and export.",
    featureLogTitle: "Logs & Reports",
    featureLogBody: "Read event logs from Europa Pico and Core Pro, export CSV files, and generate production-test reports.",
    featureFirmwareTitle: "Firmware Update",
    featureFirmwareBody: "Update Europa Pico and Europa Core Pro from .eufw packages, with compatibility checks before flashing.",
    featureMfgTitle: "Production Test",
    featureMfgBody: "Core Pro manufacturing firmware can run USB, ADC, sensor, button, buzzer, fan, and screen test steps.",
    featureLanguageTitle: "Bilingual UI",
    featureLanguageBody: "Both the utility and this download page support Chinese and English for production, service, and overseas maintenance.",
    noticeTitle: "Compatibility Notes",
    noticeWindows: "This is a Windows desktop utility and requires an accessible Europa USB CDC device at runtime.",
    noticeFirmware: "Use .eufw firmware packages that match the device model, hardware revision, and MCU.",
    noticeProduction: "Production-test features are enabled only when Core Pro manufacturing firmware reports mfg=1.",
    heroScreenshotAlt: "Europa Utilities Chinese interface screenshot",
    screenshotZhAlt: "Europa Utilities Chinese interface screenshot",
    screenshotEnAlt: "Europa Utilities English interface screenshot"
  }
};

const toggleButton = document.getElementById("languageToggle");
const storageKey = "europa-utilities-language";

function getInitialLanguage() {
  const saved = localStorage.getItem(storageKey);
  if (saved === "zh" || saved === "en") return saved;
  return "zh";
}

function setLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = dictionary.documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      if (attribute && key && dictionary[key]) {
        element.setAttribute(attribute, dictionary[key]);
      }
    });
  });

  toggleButton.textContent = language === "zh" ? "English" : "中文";
  localStorage.setItem(storageKey, language);
}

toggleButton.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "zh-CN" ? "en" : "zh";
  setLanguage(nextLanguage);
});

setLanguage(getInitialLanguage());
