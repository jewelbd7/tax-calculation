const TAX = {
  threshold: 375000,
  slabs: [
    { label: "First BDT 375,000", limit: 375000, rate: 0 },
    { label: "Next BDT 300,000", limit: 300000, rate: 0.10 },
    { label: "Next BDT 400,000", limit: 400000, rate: 0.15 },
    { label: "Next BDT 500,000", limit: 500000, rate: 0.20 },
    { label: "Next BDT 2,000,000", limit: 2000000, rate: 0.25 },
    { label: "Remaining amount", limit: Infinity, rate: 0.30 }
  ],
  minimumTax: 5000,
  rebateIncomeRate: 0.03,
  rebateInvestmentRate: 0.10,
  rebateCap: 750000
};

const translations = {
  en: {
    brand:"Bangladesh Income Tax Calculator",subtitle:"Personal tax estimate • বাংলা ও English",eyebrow:"TAX YEAR 2026–27",
    heading:"Calculate your income tax",intro:"Enter your annual income, eligible investment and tax already paid to get an estimate.",
    incomeTitle:"Income details",grossSalary:"Annual gross salary (BDT)",salaryExempt:"Salary income exempt under applicable rules (BDT)",
    salaryHint:"Enter only the salary exemption allowed by tax rules. The personal tax-free threshold is applied later in the tax slab; do not deduct it here.",
    otherIncome:"Other taxable income (BDT)",investmentTitle:"Investment & tax paid",investment:"Eligible investment for rebate (BDT)",
    investmentHint:"Enter only investments that qualify under the applicable law and limits.",tds:"Tax deducted at source / TDS (BDT)",
    advanceTax:"Advance tax paid (BDT)",calculate:"Calculate tax",reset:"Reset",resultTitle:"Calculation summary",
    payable:"Estimated net tax payable",resultNote:"Estimate only — verify before filing.",taxableIncome:"Taxable total income",
    grossTax:"Tax before rebate",rebate:"Investment tax rebate",minimumTax:"Minimum tax applied",taxAfterRebate:"Tax after rebate",
    taxPaid:"TDS + advance tax",slabTitle:"Progressive slab breakdown",slab:"Slab",rate:"Rate",amount:"Taxable amount",tax:"Tax",
    print:"Print / Save as PDF",disclaimer:"Disclaimer: This is an educational estimate, not official NBR software or professional tax advice. Tax rules, exemptions, rebate eligibility, minimum tax and special categories may change. Check the latest NBR guidance before filing.",
    official:"Official reference:",due:"Estimated tax still payable",refund:"Possible excess tax paid (verify refund eligibility)",noDue:"No additional tax payable based on the entered figures."
  },
  bn: {
    brand:"বাংলাদেশ আয়কর ক্যালকুলেটর",subtitle:"ব্যক্তিগত আয়করের হিসাব • বাংলা ও English",eyebrow:"করবর্ষ ২০২৬–২৭",
    heading:"আপনার আয়কর হিসাব করুন",intro:"বার্ষিক আয়, অনুমোদিত বিনিয়োগ এবং আগে পরিশোধিত করের তথ্য দিন।",
    incomeTitle:"আয়ের বিবরণ",grossSalary:"বার্ষিক মোট বেতন (টাকা)",salaryExempt:"প্রযোজ্য বিধি অনুযায়ী বেতন থেকে করমুক্ত অংশ (টাকা)",
    salaryHint:"শুধু আইন অনুযায়ী অনুমোদিত বেতন-করমুক্ত অংশ লিখুন। ব্যক্তিগত করমুক্ত সীমা পরে Tax Slab-এ প্রয়োগ হবে; এখানে বাদ দেবেন না।",
    otherIncome:"অন্যান্য করযোগ্য আয় (টাকা)",investmentTitle:"বিনিয়োগ ও পরিশোধিত কর",investment:"রেয়াতযোগ্য অনুমোদিত বিনিয়োগ (টাকা)",
    investmentHint:"শুধু আইন ও নির্ধারিত সীমা অনুযায়ী অনুমোদিত বিনিয়োগ লিখুন।",tds:"উৎসে কর্তিত কর / TDS (টাকা)",
    advanceTax:"অগ্রিম পরিশোধিত কর (টাকা)",calculate:"কর হিসাব করুন",reset:"রিসেট",resultTitle:"হিসাবের সারসংক্ষেপ",
    payable:"আনুমানিক নিট প্রদেয় কর",resultNote:"এটি আনুমানিক হিসাব—রিটার্নের আগে যাচাই করুন।",taxableIncome:"মোট করযোগ্য আয়",
    grossTax:"রেয়াতের আগের কর",rebate:"বিনিয়োগজনিত কর রেয়াত",minimumTax:"প্রযোজ্য ন্যূনতম কর",taxAfterRebate:"রেয়াতের পর কর",
    taxPaid:"TDS + অগ্রিম কর",slabTitle:"ধাপভিত্তিক কর হিসাব",slab:"কর ধাপ",rate:"হার",amount:"করযোগ্য পরিমাণ",tax:"কর",
    print:"প্রিন্ট / PDF সংরক্ষণ",disclaimer:"দাবিত্যাগ: এটি শিক্ষামূলক আনুমানিক হিসাব; NBR-এর সরকারি সফটওয়্যার বা পেশাদার কর পরামর্শ নয়। করের নিয়ম, অব্যাহতি, রেয়াত, ন্যূনতম কর ও বিশেষ শ্রেণির বিধান পরিবর্তিত হতে পারে। রিটার্ন জমার আগে সর্বশেষ NBR নির্দেশনা যাচাই করুন।",
    official:"সরকারি তথ্যসূত্র:",due:"আনুমানিক বাকি কর",refund:"অতিরিক্ত কর পরিশোধ হতে পারে (রিফান্ডের যোগ্যতা যাচাই করুন)",noDue:"প্রদত্ত তথ্য অনুযায়ী অতিরিক্ত কর প্রদেয় নেই।"
  }
};

let language = "en";
const $ = id => document.getElementById(id);
const money = value => "৳" + Math.round(value).toLocaleString("en-BD");
const number = id => Math.max(0, Number($(id).value) || 0);

function translatePage() {
  document.documentElement.lang = language === "bn" ? "bn" : "en";
  document.body.classList.toggle("bn", language === "bn");
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[language][key];
  });
  $("languageBtn").textContent = language === "en" ? "বাংলা" : "English";
  calculateTax();
}

function progressiveTax(income) {
  let remaining = income;
  let totalTax = 0;
  const rows = [];
  for (const slab of TAX.slabs) {
    const taxable = Math.max(0, Math.min(remaining, slab.limit));
    const tax = taxable * slab.rate;
    rows.push({label: slab.label, rate: slab.rate, taxable, tax});
    totalTax += tax;
    remaining -= taxable;
  }
  return { totalTax, rows };
}

function calculateTax(event) {
  if (event) event.preventDefault();
  const grossSalary = number("grossSalary");
  const salaryExempt = Math.min(grossSalary, number("salaryExempt"));
  const otherIncome = number("otherIncome");
  const taxableIncome = Math.max(0, grossSalary - salaryExempt + otherIncome);
  const investment = number("investment");
  const tds = number("tds");
  const advanceTax = number("advanceTax");

  const {totalTax, rows} = progressiveTax(taxableIncome);
  const rebate = Math.min(taxableIncome * TAX.rebateIncomeRate, investment * TAX.rebateInvestmentRate, TAX.rebateCap);
  const taxAfterRebate = Math.max(0, totalTax - rebate);
  const minimumTax = taxableIncome > TAX.threshold ? TAX.minimumTax : 0;
  const payableBeforeCredits = Math.max(taxAfterRebate, minimumTax);
  const taxPaid = tds + advanceTax;
  const net = payableBeforeCredits - taxPaid;

  $("taxableIncome").textContent = money(taxableIncome);
  $("grossTax").textContent = money(totalTax);
  $("rebate").textContent = money(rebate);
  $("minimumTax").textContent = money(minimumTax);
  $("taxAfterRebate").textContent = money(payableBeforeCredits);
  $("taxPaid").textContent = money(taxPaid);
  $("netPayable").textContent = money(Math.max(0, net));

  const labels = language === "bn"
    ? ["প্রথম ৩,৭৫,০০০ টাকা","পরবর্তী ৩,০০,০০০ টাকা","পরবর্তী ৪,০০,০০০ টাকা","পরবর্তী ৫,০০,০০০ টাকা","পরবর্তী ২০,০০,০০০ টাকা","অবশিষ্ট আয়"]
    : TAX.slabs.map(s => s.label);
  $("slabRows").innerHTML = rows.map((r,i) => `<tr><td>${labels[i]}</td><td>${(r.rate*100).toFixed(0)}%</td><td>${money(r.taxable)}</td><td>${money(r.tax)}</td></tr>`).join("");

  const note = $("dueNote");
  if (net > 0) note.textContent = `${translations[language].due}: ${money(net)}`;
  else if (net < 0) note.textContent = `${translations[language].refund}: ${money(Math.abs(net))}`;
  else note.textContent = translations[language].noDue;
}

$("taxForm").addEventListener("submit", calculateTax);
$("languageBtn").addEventListener("click", () => { language = language === "en" ? "bn" : "en"; translatePage(); });
$("resetBtn").addEventListener("click", () => {
  $("taxForm").reset();
  ["grossSalary","salaryExempt","otherIncome","investment","tds","advanceTax"].forEach(id => $(id).value = 0);
  calculateTax();
});
$("printBtn").addEventListener("click", () => window.print());
document.querySelectorAll("input").forEach(input => input.addEventListener("input", calculateTax));
calculateTax();
