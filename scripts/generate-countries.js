// Script to generate 50 countries tax data
const countries = [
  {
    slug: "portugal", name: "Portugal", flag: "\ud83c\uddf5\ud83c\uddf9", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:7479,rate:14.5},{min:7479,max:11284,rate:23},{min:11284,max:15992,rate:26.5},{min:15992,max:20700,rate:28.5},{min:20700,max:26355,rate:35},{min:26355,max:38632,rate:37},{min:38632,max:50483,rate:43.5},{min:50483,max:78834,rate:45},{min:78834,max:null,rate:48}], topRate:48, notes:"Plus solidarity surcharge of 2.5% on income over 80k and 5% over 250k." },
    corporateTax: { standardRate:21, smallBusinessRate:17, notes:"17% on first 25k of taxable income for SMEs. Municipal surcharge up to 1.5%." },
    vat: { standardRate:23, reducedRates:[6,13], notes:"6% on essential food and books. 13% on restaurant meals." },
    capitalGainsTax: { rate:28, longTermRate:28, notes:"Flat 28% on investment gains. Can opt for aggregation with income tax." },
    socialSecurity: { employeeRate:11, employerRate:23.75, selfEmployedRate:21.4, notes:"Self-employed pay 21.4% on 70% of declared income." },
    specialRegimes: [
      { name:"NHR 2.0 (Scientific Research Incentive)", description:"Replaced original NHR in 2024. 20% flat tax on eligible employment/self-employment income for qualified professionals in scientific research and innovation.", eligibility:"Must not have been a Portuguese tax resident in the previous 5 years. Must work in qualifying scientific or innovation roles." },
      { name:"Golden Visa", description:"Residency-by-investment program offering path to EU residency and citizenship.", eligibility:"Minimum investment of 500k EUR in qualifying funds or 250k+ in cultural heritage projects." }
    ],
    taxTreaties:79, costOfLivingIndex:46, qualityOfLifeIndex:71, digitalNomadVisa:true,
    digitalNomadVisaDetails:"D8 Digital Nomad Visa: minimum income of 3,510 EUR/month. Valid for 1 year, renewable.",
    summary:"Portugal offers a warm climate and affordable European lifestyle with moderate tax rates. The country replaced its popular NHR program with a more targeted regime in 2024. It remains attractive for digital nomads with its D8 visa and growing tech ecosystem in Lisbon and Porto.",
    pros:["Digital nomad visa available","Affordable cost of living for Western Europe","Strong expat community","Path to EU citizenship"],
    cons:["High top marginal income tax rate (48%)","NHR program replaced with stricter version","Social security contributions are significant"],
    bestFor:["digital nomads","retirees","EU residency seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "spain", name: "Spain", flag: "\ud83c\uddea\ud83c\uddf8", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:12450,rate:19},{min:12450,max:20200,rate:24},{min:20200,max:35200,rate:30},{min:35200,max:60000,rate:37},{min:60000,max:300000,rate:45},{min:300000,max:null,rate:47}], topRate:47, notes:"Rates include both state and regional components. Autonomous communities may vary." },
    corporateTax: { standardRate:25, smallBusinessRate:23, notes:"23% for companies with turnover under 1M EUR. 15% for newly created companies in first 2 years." },
    vat: { standardRate:21, reducedRates:[4,10], notes:"4% super-reduced on bread, milk, books. 10% on food, transport, hospitality." },
    capitalGainsTax: { rate:19, longTermRate:28, notes:"19% up to 6k, 21% 6k-50k, 23% 50k-200k, 27% 200k-300k, 28% over 300k." },
    socialSecurity: { employeeRate:6.35, employerRate:29.9, selfEmployedRate:30.6, notes:"Self-employed minimum base ~300 EUR/month. Progressive system." },
    specialRegimes: [{ name:"Beckham Law", description:"Flat 24% tax rate on Spanish-source income up to 600k EUR for 6 years.", eligibility:"Must not have been Spanish tax resident in previous 5 years. Must relocate for employment." }],
    taxTreaties:96, costOfLivingIndex:50, qualityOfLifeIndex:72, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa launched 2023. Minimum income ~2,520 EUR/month.",
    summary:"Spain combines vibrant culture and excellent quality of life with a progressive tax system. The Beckham Law offers significant tax savings for qualifying new residents. Barcelona and Valencia are popular hubs for digital nomads.",
    pros:["Beckham Law flat 24% for new residents","Digital nomad visa","Excellent quality of life","Large expat communities"],
    cons:["High top marginal rate (47%)","Complex regional tax variations","High employer social security costs"],
    bestFor:["digital nomads","employees relocating","retirees"], lastUpdated:"2024-01"
  },
  {
    slug: "ireland", name: "Ireland", flag: "\ud83c\uddee\ud83c\uddea", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:42000,rate:20},{min:42000,max:null,rate:40}], topRate:40, notes:"Plus USC (Universal Social Charge) of 0.5-8% and PRSI of 4%." },
    corporateTax: { standardRate:15, smallBusinessRate:15, notes:"15% standard rate (increased from 12.5% for large multinationals under OECD Pillar Two). 12.5% still applies to companies under threshold." },
    vat: { standardRate:23, reducedRates:[9,13.5], notes:"9% on newspapers, e-publications. 13.5% on fuel, building services." },
    capitalGainsTax: { rate:33, notes:"33% flat rate on gains. Annual exemption of 1,270 EUR." },
    socialSecurity: { employeeRate:4, employerRate:11.05, selfEmployedRate:4, notes:"PRSI Class S for self-employed at 4%." },
    specialRegimes: [
      { name:"Special Assignee Relief Programme (SARP)", description:"30% income tax relief on employment income over 75k EUR for assignees.", eligibility:"Must be assigned to work in Ireland by a relevant employer. Minimum income 75k EUR." },
      { name:"Knowledge Development Box", description:"Effective 6.25% rate on qualifying IP income.", eligibility:"Must have qualifying patents or copyrighted software developed in Ireland." }
    ],
    taxTreaties:76, costOfLivingIndex:73, qualityOfLifeIndex:75, digitalNomadVisa:false,
    summary:"Ireland is a major tech and pharma hub with one of Europe's lowest corporate tax rates. While personal income taxes are moderate, the effective rate rises significantly with USC and PRSI. Dublin offers a vibrant startup ecosystem but high cost of living.",
    pros:["Low corporate tax rate (12.5-15%)","English-speaking EU country","Strong tech sector","Knowledge Development Box for IP"],
    cons:["High cost of living especially Dublin","No digital nomad visa","High effective personal tax with USC/PRSI","Capital gains tax at 33%"],
    bestFor:["startups","tech companies","corporate headquarters"], lastUpdated:"2024-01"
  },
  {
    slug: "netherlands", name: "Netherlands", flag: "\ud83c\uddf3\ud83c\uddf1", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:75518,rate:36.93},{min:75518,max:null,rate:49.5}], topRate:49.5, notes:"Two-bracket system. Box 2 (substantial interest) at 24.5% up to 67k, 33% above." },
    corporateTax: { standardRate:25.8, smallBusinessRate:19, notes:"19% on first 200k EUR profit. 25.8% above that." },
    vat: { standardRate:21, reducedRates:[9], notes:"9% reduced rate on food, water, medicines, books, hotels." },
    capitalGainsTax: { rate:33, notes:"No capital gains tax on Box 1 (employment). Box 2 substantial interest: 24.5-33%. Box 3 deemed return taxed at 36%." },
    socialSecurity: { employeeRate:27.65, employerRate:18.15, selfEmployedRate:27.65, notes:"Employee contributions are combined with income tax. Includes AOW, ANW, Wlz." },
    specialRegimes: [
      { name:"30% Ruling", description:"Tax-free allowance of 30% of gross salary for first 5 years (capped at max 27% of salary from 2024).", eligibility:"Must be recruited from abroad, have specific expertise, and meet minimum salary threshold of ~41,954 EUR." },
      { name:"Innovation Box", description:"Effective 9% tax rate on profits from qualifying innovative activities.", eligibility:"Must have qualifying IP (patents, R&D certificates)." }
    ],
    taxTreaties:100, costOfLivingIndex:73, qualityOfLifeIndex:78, digitalNomadVisa:false,
    summary:"The Netherlands offers a business-friendly environment with the famous 30% ruling for expat workers. Corporate tax rates are competitive with the Innovation Box regime. Amsterdam and Rotterdam are major international business hubs.",
    pros:["30% ruling for expat workers","Innovation Box 9% rate","Excellent business infrastructure","English widely spoken"],
    cons:["High personal income tax (49.5%)","No digital nomad visa","Box 3 deemed return tax","High cost of living"],
    bestFor:["expat employees","tech companies","international businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "germany", name: "Germany", flag: "\ud83c\udde9\ud83c\uddea", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:11604,rate:0},{min:11604,max:17005,rate:14},{min:17005,max:66760,rate:24},{min:66760,max:277825,rate:42},{min:277825,max:null,rate:45}], topRate:45, notes:"Progressive formula between brackets. Plus solidarity surcharge of 5.5% on tax amount (only for high earners)." },
    corporateTax: { standardRate:30, notes:"15% corporate tax + 5.5% solidarity surcharge + ~14% trade tax = ~30% effective." },
    vat: { standardRate:19, reducedRates:[7], notes:"7% reduced rate on food, books, newspapers, public transport." },
    capitalGainsTax: { rate:26.375, notes:"26.375% flat rate (25% + solidarity surcharge). Abgeltungssteuer system." },
    socialSecurity: { employeeRate:20.3, employerRate:20.8, selfEmployedRate:40, notes:"Covers health, pension, unemployment, long-term care. Self-employed pay full amount." },
    specialRegimes: [],
    taxTreaties:96, costOfLivingIndex:65, qualityOfLifeIndex:76, digitalNomadVisa:false,
    summary:"Germany has Europe's largest economy with a complex but comprehensive tax system. High personal and corporate tax rates are offset by excellent infrastructure and social services. Berlin has emerged as a major startup hub with a growing tech ecosystem.",
    pros:["Strong economy and business infrastructure","Extensive tax treaty network","Excellent social services","Berlin startup ecosystem"],
    cons:["High overall tax burden (~30% corporate)","Complex bureaucracy","No digital nomad visa","High social security contributions"],
    bestFor:["established businesses","employees","manufacturing companies"], lastUpdated:"2024-01"
  },
  {
    slug: "france", name: "France", flag: "\ud83c\uddeb\ud83c\uddf7", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:11294,rate:0},{min:11294,max:28797,rate:11},{min:28797,max:82341,rate:30},{min:82341,max:177106,rate:41},{min:177106,max:null,rate:45}], topRate:45, notes:"Family quotient system divides income by household shares. Plus 3% contribution on high incomes." },
    corporateTax: { standardRate:25, notes:"25% standard rate. Reduced 15% rate on first 42,500 EUR for qualifying SMEs." },
    vat: { standardRate:20, reducedRates:[5.5,10], notes:"5.5% on food, books, energy. 10% on restaurants, transport, renovations." },
    capitalGainsTax: { rate:30, notes:"Flat tax (PFU) of 30% on investment income (12.8% income tax + 17.2% social contributions). Can opt for progressive." },
    socialSecurity: { employeeRate:22, employerRate:45, selfEmployedRate:45, notes:"Very high employer contributions. Includes health, pension, unemployment, family." },
    specialRegimes: [
      { name:"Impatriate Regime", description:"30-50% of compensation can be exempt from income tax for employees transferred to France.", eligibility:"Must be assigned from abroad or directly recruited from outside France. Valid for up to 8 years." }
    ],
    taxTreaties:121, costOfLivingIndex:67, qualityOfLifeIndex:69, digitalNomadVisa:false,
    summary:"France has a high-tax environment with excellent public services and social protections. The family quotient system can significantly reduce taxes for families. Paris remains a global business center with strong government support for startups through the La French Tech initiative.",
    pros:["Family quotient reduces taxes for families","Flat tax option on investment income","Excellent healthcare and social services","Strong R&D tax credits"],
    cons:["Very high employer social contributions (45%)","Complex tax system","No digital nomad visa","High cost of living in Paris"],
    bestFor:["families","R&D companies","luxury sector businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "united-kingdom", name: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7", region: "Europe", currency: "GBP",
    incomeTax: { brackets: [{min:0,max:12570,rate:0},{min:12570,max:50270,rate:20},{min:50270,max:125140,rate:40},{min:125140,max:null,rate:45}], topRate:45, notes:"Personal allowance tapers off above 100k GBP. Scotland has different rates." },
    corporateTax: { standardRate:25, smallBusinessRate:19, notes:"25% for profits over 250k GBP. 19% for profits under 50k. Marginal relief between." },
    vat: { standardRate:20, reducedRates:[0,5], notes:"0% on food, children's clothing, books. 5% on domestic energy." },
    capitalGainsTax: { rate:20, longTermRate:20, notes:"10% basic rate, 20% higher rate. Annual exempt amount 6,000 GBP (2024/25). Residential property +8%." },
    socialSecurity: { employeeRate:8, employerRate:13.8, selfEmployedRate:9, notes:"Class 1 NI: 8% employee on earnings 12,570-50,270 GBP, 2% above. Class 4 for self-employed." },
    specialRegimes: [
      { name:"Non-Domiciled (Non-Dom) Status", description:"Being reformed from April 2025. New residence-based regime replacing the remittance basis. 4-year FIG regime for new UK residents.", eligibility:"New arrivals to the UK who have not been UK tax resident in previous 10 years." }
    ],
    taxTreaties:130, costOfLivingIndex:75, qualityOfLifeIndex:70, digitalNomadVisa:false,
    summary:"The UK offers a well-established financial and legal system with moderate tax rates. London is a global financial center. The non-dom regime is being reformed but still offers benefits for new arrivals. Post-Brexit, the UK has its own trade agreements and immigration rules.",
    pros:["Well-established legal and financial system","Moderate income tax rates","Extensive tax treaty network (130+)","English-speaking"],
    cons:["Non-dom regime being phased out","High cost of living in London","No digital nomad visa","Post-Brexit complications for EU access"],
    bestFor:["finance professionals","international businesses","investors"], lastUpdated:"2024-01"
  },
  {
    slug: "switzerland", name: "Switzerland", flag: "\ud83c\udde8\ud83c\udded", region: "Europe", currency: "CHF",
    incomeTax: { brackets: [{min:0,max:14500,rate:0},{min:14500,max:31600,rate:0.77},{min:31600,max:41400,rate:0.88},{min:41400,max:55200,rate:2.64},{min:55200,max:72500,rate:2.97},{min:72500,max:78100,rate:5.94},{min:78100,max:103600,rate:6.6},{min:103600,max:134600,rate:8.8},{min:134600,max:176000,rate:11},{min:176000,max:755200,rate:13.2},{min:755200,max:null,rate:11.5}], topRate:13.2, notes:"Federal rates only. Cantonal and municipal taxes add 10-35% depending on location. Total can be 20-45%." },
    corporateTax: { standardRate:14.9, notes:"Federal 8.5% + cantonal/municipal rates. Effective rates range from 12-22% depending on canton. Zug and Schwyz among lowest." },
    vat: { standardRate:8.1, reducedRates:[2.6,3.8], notes:"2.6% on food, medicines, newspapers. 3.8% on accommodation. Lowest VAT in Europe." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax on private movable assets. Real estate gains taxed at cantonal level." },
    socialSecurity: { employeeRate:6.4, employerRate:6.4, selfEmployedRate:10, notes:"AHV/IV/EO: 5.3% each. ALV: 1.1% each. Plus mandatory pension (BVG) and health insurance." },
    specialRegimes: [
      { name:"Lump-Sum Taxation (Forfait Fiscal)", description:"Tax based on living expenses rather than actual income. Available in most cantons except Zurich and Basel.", eligibility:"Foreign nationals who do not carry out gainful activity in Switzerland. Minimum tax base varies by canton." }
    ],
    taxTreaties:108, costOfLivingIndex:131, qualityOfLifeIndex:84, digitalNomadVisa:false,
    summary:"Switzerland offers low corporate taxes, no capital gains tax on investments, and a stable political environment. Tax rates vary significantly by canton, with Zug being famous for its low rates. The extremely high cost of living is offset by correspondingly high salaries.",
    pros:["No capital gains tax on private investments","Low corporate tax rates","Extremely stable economy and politics","Lump-sum taxation option"],
    cons:["Very high cost of living","Complex cantonal tax system","No digital nomad visa","Mandatory expensive health insurance"],
    bestFor:["investors","high-net-worth individuals","holding companies"], lastUpdated:"2024-01"
  },
  {
    slug: "estonia", name: "Estonia", flag: "\ud83c\uddea\ud83c\uddea", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:null,rate:20}], topRate:20, notes:"Flat 20% rate. Basic exemption up to 7,848 EUR/year (phases out above 14,400 EUR)." },
    corporateTax: { standardRate:20, notes:"0% on retained/reinvested profits. 20% only when profits are distributed. 14% on regular dividends." },
    vat: { standardRate:22, reducedRates:[9], notes:"9% on accommodation, books, periodicals, some medical equipment." },
    capitalGainsTax: { rate:20, notes:"Taxed as regular income at 20% flat rate." },
    socialSecurity: { employeeRate:1.6, employerRate:33.8, selfEmployedRate:33.8, notes:"Employer bears bulk of social tax (33%). Employee pays 1.6% unemployment insurance." },
    specialRegimes: [
      { name:"e-Residency", description:"Digital identity for non-residents to start and manage an EU company online. Does not provide tax residency.", eligibility:"Anyone can apply. Does not grant right to live in Estonia or EU." },
      { name:"0% Corporate Tax on Retained Profits", description:"Companies pay no tax on reinvested profits. Only distributed profits are taxed at 20% (14% for regular distributions).", eligibility:"All Estonian-registered companies." }
    ],
    taxTreaties:61, costOfLivingIndex:50, qualityOfLifeIndex:64, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa for remote workers. Must earn at least 3,504 EUR/month gross. Valid up to 1 year.",
    summary:"Estonia is a digital-first nation famous for its e-Residency program and 0% tax on retained corporate profits. The flat 20% income tax and advanced digital infrastructure make it ideal for startups and tech entrepreneurs. Tallinn has a growing startup scene.",
    pros:["0% corporate tax on retained profits","e-Residency program","Flat 20% income tax","Advanced digital infrastructure","Digital nomad visa"],
    cons:["High employer social contributions (33.8%)","Small domestic market","Cold climate","VAT recently increased to 22%"],
    bestFor:["startups","tech entrepreneurs","e-commerce businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "bulgaria", name: "Bulgaria", flag: "\ud83c\udde7\ud83c\uddec", region: "Europe", currency: "BGN",
    incomeTax: { brackets: [{min:0,max:null,rate:10}], topRate:10, notes:"Flat 10% rate - one of the lowest in the EU." },
    corporateTax: { standardRate:10, notes:"Flat 10% - lowest in the EU alongside Hungary." },
    vat: { standardRate:20, reducedRates:[9], notes:"9% on hotel accommodation and restaurant food (temporary measure)." },
    capitalGainsTax: { rate:10, notes:"10% flat rate. Gains from EU/EEA regulated market shares exempt." },
    socialSecurity: { employeeRate:13.78, employerRate:18.92, selfEmployedRate:26.8, notes:"Split between employee and employer. Covers pension, health, unemployment." },
    specialRegimes: [],
    taxTreaties:68, costOfLivingIndex:34, qualityOfLifeIndex:55, digitalNomadVisa:false,
    summary:"Bulgaria has the lowest flat tax rates in the EU at just 10% for both personal and corporate income. The extremely low cost of living makes it attractive for freelancers and remote workers. Sofia has a developing tech scene, though infrastructure lags behind Western Europe.",
    pros:["Lowest income and corporate tax in EU (10%)","Very low cost of living","EU member state","Growing tech scene in Sofia"],
    cons:["Lower quality infrastructure","No digital nomad visa","Complex bureaucracy","Limited English in government offices"],
    bestFor:["freelancers","cost-conscious entrepreneurs","remote workers"], lastUpdated:"2024-01"
  },
  {
    slug: "romania", name: "Romania", flag: "\ud83c\uddf7\ud83c\uddf4", region: "Europe", currency: "RON",
    incomeTax: { brackets: [{min:0,max:null,rate:10}], topRate:10, notes:"Flat 10% rate. Special 1% rate for microenterprises with turnover under 500k EUR." },
    corporateTax: { standardRate:16, notes:"16% standard. 1% turnover tax for microenterprises (under 500k EUR revenue)." },
    vat: { standardRate:19, reducedRates:[5,9], notes:"9% on food, accommodation, restaurants. 5% on housing (under threshold)." },
    capitalGainsTax: { rate:10, notes:"10% flat rate on capital gains." },
    socialSecurity: { employeeRate:35, employerRate:2.25, selfEmployedRate:25, notes:"Employee pays bulk: 25% pension + 10% health. Employer: 2.25% labor insurance." },
    specialRegimes: [
      { name:"Microenterprise Tax", description:"1% turnover tax (or 3% without employees) for companies with revenue under 500k EUR.", eligibility:"Company with revenue under 500k EUR and at least 1 employee." }
    ],
    taxTreaties:86, costOfLivingIndex:36, qualityOfLifeIndex:56, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital nomad visa available. Must earn at least 3x Romanian average gross salary.",
    summary:"Romania offers competitive tax rates with a flat 10% income tax and a generous microenterprise regime. The 1% turnover tax for small companies is one of Europe's best deals. Bucharest and Cluj have vibrant tech scenes with a growing pool of talent.",
    pros:["Flat 10% income tax","1% microenterprise tax","Low cost of living","EU member","Growing tech hubs"],
    cons:["High employee social contributions (35%)","Infrastructure challenges","Bureaucratic complexity","Digital nomad visa requirements"],
    bestFor:["microenterprise owners","freelancers","tech startups"], lastUpdated:"2024-01"
  },
  {
    slug: "hungary", name: "Hungary", flag: "\ud83c\udded\ud83c\uddfa", region: "Europe", currency: "HUF",
    incomeTax: { brackets: [{min:0,max:null,rate:15}], topRate:15, notes:"Flat 15% rate. Family tax benefits available for families with children." },
    corporateTax: { standardRate:9, notes:"9% - lowest in the EU. Plus 2% local business tax on revenue." },
    vat: { standardRate:27, reducedRates:[5,18], notes:"27% - highest in the EU. 5% on basic food, medicine. 18% on some food, accommodation." },
    capitalGainsTax: { rate:15, notes:"15% flat rate, same as income tax." },
    socialSecurity: { employeeRate:18.5, employerRate:13, selfEmployedRate:18.5, notes:"Employee: 18.5% social contribution. Employer: 13% social tax." },
    specialRegimes: [
      { name:"KATA (Small Taxpayers Itemized Tax)", description:"Fixed monthly tax for small entrepreneurs (being reformed). Simple flat-rate alternative.", eligibility:"Self-employed and sole proprietors under revenue threshold." }
    ],
    taxTreaties:83, costOfLivingIndex:40, qualityOfLifeIndex:60, digitalNomadVisa:true,
    digitalNomadVisaDetails:"White Card digital nomad visa. Must work for foreign company or be self-employed with foreign clients.",
    summary:"Hungary boasts the EU's lowest corporate tax rate at 9%, though its VAT at 27% is the highest. The flat 15% income tax is attractive. Budapest offers a vibrant cultural scene and growing tech ecosystem at very affordable prices.",
    pros:["Lowest corporate tax in EU (9%)","Flat 15% income tax","Low cost of living","Digital nomad visa available"],
    cons:["Highest VAT in EU (27%)","Complex local business taxes","Political uncertainty","Language barrier"],
    bestFor:["corporations","small business owners","budget-conscious nomads"], lastUpdated:"2024-01"
  },
  {
    slug: "czech-republic", name: "Czech Republic", flag: "\ud83c\udde8\ud83c\uddff", region: "Europe", currency: "CZK",
    incomeTax: { brackets: [{min:0,max:1935552,rate:15},{min:1935552,max:null,rate:23}], topRate:23, notes:"15% standard rate. 23% on income above ~48x average monthly wage." },
    corporateTax: { standardRate:21, notes:"21% standard rate. Set to decrease to 19% in coming years." },
    vat: { standardRate:21, reducedRates:[12], notes:"12% reduced rate on food, medicines, accommodation, selected services." },
    capitalGainsTax: { rate:15, notes:"Taxed as income at 15%. Exempt after 3 years for securities, 10 years for real estate." },
    socialSecurity: { employeeRate:11, employerRate:33.8, selfEmployedRate:29.2, notes:"Employer: 24.8% social + 9% health. Employee: 6.5% social + 4.5% health." },
    specialRegimes: [],
    taxTreaties:90, costOfLivingIndex:45, qualityOfLifeIndex:68, digitalNomadVisa:false,
    summary:"Czech Republic offers moderate tax rates with a well-developed business environment in the heart of Europe. Prague is an attractive city for expats with good quality of life at reasonable costs. The tax system is relatively straightforward with capital gains exemptions for long-term holdings.",
    pros:["Moderate 15% income tax rate","Capital gains exempt after 3 years","Central European location","Good quality of life"],
    cons:["High employer social contributions (33.8%)","No digital nomad visa","Rising cost of living in Prague","Complex residency procedures"],
    bestFor:["employees","long-term investors","European base seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "poland", name: "Poland", flag: "\ud83c\uddf5\ud83c\uddf1", region: "Europe", currency: "PLN",
    incomeTax: { brackets: [{min:0,max:120000,rate:12},{min:120000,max:null,rate:32}], topRate:32, notes:"Tax-free amount of 30,000 PLN. Flat 19% option available for business income." },
    corporateTax: { standardRate:19, smallBusinessRate:9, notes:"9% for small taxpayers (revenue under 2M EUR) and startups in first year." },
    vat: { standardRate:23, reducedRates:[5,8], notes:"5% on basic food, books. 8% on construction, restaurants, some food." },
    capitalGainsTax: { rate:19, notes:"Flat 19% on capital gains from securities and investments." },
    socialSecurity: { employeeRate:13.71, employerRate:20.48, selfEmployedRate:32, notes:"Includes pension, disability, sickness, health insurance." },
    specialRegimes: [
      { name:"IP Box", description:"5% tax rate on qualified IP income (patents, software copyrights).", eligibility:"Must conduct qualifying R&D activities generating eligible IP income." }
    ],
    taxTreaties:86, costOfLivingIndex:42, qualityOfLifeIndex:63, digitalNomadVisa:false,
    summary:"Poland offers competitive tax rates with a 12% basic income tax and 9% corporate rate for small businesses. The IT/IP Box at 5% is particularly attractive for software developers. Warsaw and Krakow are growing tech hubs with a large pool of skilled developers.",
    pros:["Low 12% income tax rate","9% corporate rate for small businesses","5% IP Box for tech","Large skilled workforce"],
    cons:["32% rate on higher income","No digital nomad visa","Complex Polish Deal regulations","Language barrier"],
    bestFor:["software developers","small businesses","tech companies"], lastUpdated:"2024-01"
  },
  {
    slug: "italy", name: "Italy", flag: "\ud83c\uddee\ud83c\uddf9", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:28000,rate:23},{min:28000,max:50000,rate:35},{min:50000,max:null,rate:43}], topRate:43, notes:"Plus regional (1.23-3.33%) and municipal (0-0.9%) surcharges." },
    corporateTax: { standardRate:24, notes:"24% IRES + 3.9% IRAP (regional production tax) = ~27.9% effective." },
    vat: { standardRate:22, reducedRates:[4,5,10], notes:"4% on essentials. 5% on some food/health. 10% on tourism, food, energy." },
    capitalGainsTax: { rate:26, notes:"26% on financial gains. 12.5% on government bonds. Participation exemption for qualifying shareholdings." },
    socialSecurity: { employeeRate:10, employerRate:30, selfEmployedRate:26.07, notes:"INPS contributions. Self-employed Gestione Separata: 26.07%." },
    specialRegimes: [
      { name:"Flat Tax for New Residents", description:"100,000 EUR lump-sum tax on worldwide income for new Italian tax residents. 25,000 EUR for each family member.", eligibility:"Must not have been Italian tax resident in at least 9 of previous 10 years." },
      { name:"Regime Forfettario", description:"15% flat tax (5% first 5 years for new activities) on business income with forfait expense deduction.", eligibility:"Self-employed/freelancers with revenue under 85,000 EUR/year." }
    ],
    taxTreaties:100, costOfLivingIndex:58, qualityOfLifeIndex:66, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital nomad visa introduced 2024. Minimum annual income of 28,000 EUR. Valid for 1 year, renewable.",
    summary:"Italy offers interesting options for new residents including a 100k EUR lump-sum tax on worldwide income and the Regime Forfettario for freelancers. The country has recently introduced a digital nomad visa. Rome, Milan, and smaller cities offer rich cultural experiences.",
    pros:["100k lump-sum tax for wealthy new residents","Regime Forfettario 5-15% for freelancers","Digital nomad visa","Rich cultural lifestyle"],
    cons:["High top marginal rate (43%)","Complex bureaucracy","High employer social contributions","Regional tax surcharges"],
    bestFor:["wealthy individuals","freelancers under 85k","lifestyle seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "greece", name: "Greece", flag: "\ud83c\uddec\ud83c\uddf7", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:10000,rate:9},{min:10000,max:20000,rate:22},{min:20000,max:30000,rate:28},{min:30000,max:40000,rate:36},{min:40000,max:null,rate:44}], topRate:44, notes:"Plus solidarity contribution abolished for most income." },
    corporateTax: { standardRate:22, notes:"22% flat rate. Reduced for certain sectors." },
    vat: { standardRate:24, reducedRates:[6,13], notes:"6% on medicines, books. 13% on food, energy, water. Island reductions available." },
    capitalGainsTax: { rate:15, notes:"15% on gains from securities. Real estate exempt after 5 years." },
    socialSecurity: { employeeRate:13.87, employerRate:22.29, selfEmployedRate:26.95, notes:"Covers pension, health, supplementary insurance." },
    specialRegimes: [
      { name:"Non-Dom Flat Tax", description:"100,000 EUR annual flat tax on foreign income for new Greek tax residents. Plus 20,000 EUR per family member.", eligibility:"Must invest at least 500,000 EUR in Greek assets. Must not have been Greek tax resident in 7 of previous 8 years." },
      { name:"50% Tax Exemption for New Employees", description:"50% income tax exemption for 7 years for employees transferring to Greece.", eligibility:"Must not have been Greek tax resident in 5 of previous 6 years. Must work for Greek employer." }
    ],
    taxTreaties:57, costOfLivingIndex:47, qualityOfLifeIndex:62, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital nomad visa for non-EU nationals. Must earn at least 3,500 EUR/month. 7% flat tax on foreign income for first 7 years.",
    summary:"Greece offers attractive regimes for new residents including a flat tax on foreign income and a 50% income tax exemption for relocating employees. The digital nomad visa with a 7% flat tax on foreign income is particularly competitive. Athens and the islands offer an enviable lifestyle.",
    pros:["7% flat tax for digital nomads","50% tax exemption for new employees","100k flat tax for wealthy","Excellent lifestyle and climate"],
    cons:["High top marginal rate (44%)","High VAT (24%)","Bureaucratic challenges","Economic instability history"],
    bestFor:["digital nomads","relocating employees","wealthy individuals"], lastUpdated:"2024-01"
  },
  {
    slug: "croatia", name: "Croatia", flag: "\ud83c\udded\ud83c\uddf7", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:50400,rate:23.6},{min:50400,max:null,rate:35.4}], topRate:35.4, notes:"Rates include municipal surtax (varies by city). Base rates are 20% and 30%." },
    corporateTax: { standardRate:18, smallBusinessRate:10, notes:"10% for companies with revenue under 1M EUR. 18% standard." },
    vat: { standardRate:25, reducedRates:[5,13], notes:"5% on basic food. 13% on accommodation, restaurants, newspapers." },
    capitalGainsTax: { rate:10, notes:"10% on capital gains. Exempt after 2 years of holding for securities." },
    socialSecurity: { employeeRate:20, employerRate:16.5, selfEmployedRate:36.5, notes:"Employee: 20% (pension + health). Employer: 16.5%." },
    specialRegimes: [],
    taxTreaties:61, costOfLivingIndex:48, qualityOfLifeIndex:62, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital nomad visa for non-EU citizens. Must earn at least 2,539.31 EUR/month. Valid 1 year, no Croatian income tax on foreign income.",
    summary:"Croatia joined the Eurozone in 2023 and offers competitive tax rates, especially for small companies at 10%. The digital nomad visa exempts holders from Croatian income tax on foreign-source income. Split and Dubrovnik attract remote workers with Mediterranean lifestyle.",
    pros:["10% corporate tax for small companies","Digital nomad visa with tax exemption","EU/Eurozone member","Beautiful Mediterranean lifestyle"],
    cons:["High VAT (25%)","High social contributions","Limited English in government","Smaller market"],
    bestFor:["small businesses","digital nomads","lifestyle seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "cyprus", name: "Cyprus", flag: "\ud83c\udde8\ud83c\uddfe", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:19500,rate:0},{min:19500,max:28000,rate:20},{min:28000,max:36300,rate:25},{min:36300,max:60000,rate:30},{min:60000,max:null,rate:35}], topRate:35, notes:"Generous 19,500 EUR tax-free allowance." },
    corporateTax: { standardRate:12.5, notes:"12.5% - one of the lowest in the EU. IP Box effective rate can be as low as 2.5%." },
    vat: { standardRate:19, reducedRates:[5,9], notes:"5% on food, books. 9% on accommodation, restaurants." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax except on disposal of immovable property in Cyprus (20%)." },
    socialSecurity: { employeeRate:8.3, employerRate:12, selfEmployedRate:15.6, notes:"Covers social insurance, redundancy, training, social cohesion." },
    specialRegimes: [
      { name:"Non-Dom Regime", description:"Non-domiciled tax residents are exempt from Special Defence Contribution (SDC) on dividends, interest, and rental income. Effectively 0% on passive income.", eligibility:"Must be Cyprus tax resident but not domiciled. Non-dom status available for 17 years." },
      { name:"50% Employment Income Exemption", description:"50% of remuneration is exempt from income tax for 17 years for new employees earning over 55,000 EUR.", eligibility:"Must not have been Cyprus tax resident in 3 of previous 5 years. Minimum salary 55,000 EUR." }
    ],
    taxTreaties:65, costOfLivingIndex:52, qualityOfLifeIndex:66, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital nomad visa for non-EU nationals. Must earn at least 3,500 EUR/month. Valid 1 year, renewable up to 3 years.",
    summary:"Cyprus is a popular tax planning jurisdiction with no capital gains tax on securities, a non-dom regime that exempts passive income, and a 50% employment income exemption. The 12.5% corporate rate and IP Box make it ideal for holding companies.",
    pros:["No capital gains tax on securities","Non-dom exempts passive income","50% employment exemption","12.5% corporate tax","IP Box at ~2.5%"],
    cons:["Divided island","Small domestic market","Hot summers","Limited public transport"],
    bestFor:["holding companies","investors","high-earning employees"], lastUpdated:"2024-01"
  },
  {
    slug: "malta", name: "Malta", flag: "\ud83c\uddf2\ud83c\uddf9", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:9100,rate:0},{min:9100,max:14500,rate:15},{min:14500,max:19500,rate:25},{min:19500,max:60000,rate:25},{min:60000,max:null,rate:35}], topRate:35, notes:"Rates for single individuals. Different scales for married couples and parents." },
    corporateTax: { standardRate:35, notes:"35% nominal rate but effective 5% through full imputation system and 6/7 shareholder refund." },
    vat: { standardRate:18, reducedRates:[5,7], notes:"5% on electricity, confectionery, printed matter. 7% on accommodation." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax on securities for non-resident shareholders. Residents taxed on worldwide gains." },
    socialSecurity: { employeeRate:10, employerRate:10, selfEmployedRate:15, notes:"Capped at maximum weekly contributions. Covers pension, health, sickness." },
    specialRegimes: [
      { name:"Full Imputation System", description:"35% corporate tax with 6/7 refund to shareholders, resulting in effective 5% rate.", eligibility:"Must have Malta company with proper substance. Foreign shareholders can claim refund." },
      { name:"Global Residence Programme", description:"15% flat tax on foreign income remitted to Malta with minimum tax of 15,000 EUR/year.", eligibility:"Non-EU nationals. Must purchase/rent property in Malta." }
    ],
    taxTreaties:76, costOfLivingIndex:56, qualityOfLifeIndex:66, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Nomad Residence Permit. Must earn at least 2,700 EUR/month. Valid 1 year, renewable up to 3 years.",
    summary:"Malta offers one of Europe's most attractive corporate tax systems with an effective 5% rate through its full imputation system. English-speaking EU member with a warm climate and growing iGaming and fintech sectors. The Nomad Residence Permit attracts remote workers.",
    pros:["Effective 5% corporate tax","English-speaking EU member","Digital nomad visa","Pleasant Mediterranean climate","Growing fintech hub"],
    cons:["High nominal corporate rate (35%)","Small island","Limited housing supply","Rising cost of living"],
    bestFor:["holding companies","iGaming businesses","digital nomads"], lastUpdated:"2024-01"
  },
  {
    slug: "monaco", name: "Monaco", flag: "\ud83c\uddf2\ud83c\udde8", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:null,rate:0}], topRate:0, notes:"No personal income tax for residents (except French nationals who remain subject to French tax)." },
    corporateTax: { standardRate:25, notes:"25% on companies generating more than 25% of turnover outside Monaco. No tax if 75%+ revenue from within Monaco." },
    vat: { standardRate:20, reducedRates:[5.5,10], notes:"Aligned with French VAT system." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax for individuals." },
    socialSecurity: { employeeRate:14, employerRate:35, selfEmployedRate:14, notes:"Covers health, pension, unemployment. Similar to French system." },
    specialRegimes: [],
    taxTreaties:35, costOfLivingIndex:180, qualityOfLifeIndex:80, digitalNomadVisa:false,
    summary:"Monaco is the ultimate zero-tax jurisdiction for personal income, with no income tax or capital gains tax for residents. However, the astronomical cost of living and strict residency requirements make it accessible only to the ultra-wealthy. Corporate tax applies to companies with foreign revenue.",
    pros:["Zero personal income tax","Zero capital gains tax","Prestigious address","Mediterranean climate","Political stability"],
    cons:["Extremely high cost of living","Strict residency requirements","Corporate tax on foreign revenue","Tiny territory","French nationals still taxed by France"],
    bestFor:["ultra-high-net-worth individuals","luxury businesses","retirees with wealth"], lastUpdated:"2024-01"
  },
  {
    slug: "singapore", name: "Singapore", flag: "\ud83c\uddf8\ud83c\uddec", region: "Asia", currency: "SGD",
    incomeTax: { brackets: [{min:0,max:20000,rate:0},{min:20000,max:30000,rate:2},{min:30000,max:40000,rate:3.5},{min:40000,max:80000,rate:7},{min:80000,max:120000,rate:11.5},{min:120000,max:160000,rate:15},{min:160000,max:200000,rate:18},{min:200000,max:240000,rate:19},{min:240000,max:280000,rate:19.5},{min:280000,max:320000,rate:20},{min:320000,max:500000,rate:22},{min:500000,max:1000000,rate:23},{min:1000000,max:null,rate:24}], topRate:24, notes:"Progressive rates. No tax on income earned and kept abroad (territorial basis for individuals)." },
    corporateTax: { standardRate:17, notes:"17% headline rate. Effective rate lower with partial tax exemption: 75% exemption on first 10k, 50% on next 190k." },
    vat: { standardRate:9, reducedRates:[], notes:"GST (Goods and Services Tax) at 9% from 2024. No reduced rates." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax in Singapore." },
    socialSecurity: { employeeRate:20, employerRate:17, selfEmployedRate:8, notes:"CPF (Central Provident Fund). Rates decrease with age. Self-employed contribute to Medisave only." },
    specialRegimes: [
      { name:"Not Ordinarily Resident (NOR)", description:"Tax only on Singapore-source income based on time spent in Singapore for qualifying individuals.", eligibility:"Must meet specific criteria including being tax resident for first time or after 3+ years of non-residence." },
      { name:"Global Investor Programme", description:"Permanent residency through investment in business or fund.", eligibility:"Minimum investment of SGD 10M in new business, existing business expansion, or qualifying fund." }
    ],
    taxTreaties:90, costOfLivingIndex:85, qualityOfLifeIndex:82, digitalNomadVisa:false,
    summary:"Singapore is Asia's premier business hub with no capital gains tax, low corporate rates, and a territorial tax system for individuals. The city-state offers world-class infrastructure, rule of law, and strategic location. High cost of living is offset by low overall tax burden.",
    pros:["No capital gains tax","Low corporate tax (effective <10% for SMEs)","Territorial taxation","World-class infrastructure","English-speaking"],
    cons:["High cost of living","No digital nomad visa","High CPF contributions","Strict regulations"],
    bestFor:["holding companies","traders","wealth management","tech startups"], lastUpdated:"2024-01"
  },
  {
    slug: "hong-kong", name: "Hong Kong", flag: "\ud83c\udded\ud83c\uddf0", region: "Asia", currency: "HKD",
    incomeTax: { brackets: [{min:0,max:50000,rate:2},{min:50000,max:100000,rate:6},{min:100000,max:150000,rate:10},{min:150000,max:200000,rate:14},{min:200000,max:null,rate:17}], topRate:17, notes:"Salaries tax with standard rate of 15% on net income as alternative. Territorial taxation - only HK-sourced income taxed." },
    corporateTax: { standardRate:16.5, notes:"8.25% on first HKD 2M of profits, 16.5% thereafter. Two-tiered system." },
    vat: { standardRate:0, reducedRates:[], notes:"No VAT or sales tax in Hong Kong." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax." },
    socialSecurity: { employeeRate:5, employerRate:5, selfEmployedRate:5, notes:"MPF (Mandatory Provident Fund): 5% each, capped at HKD 1,500/month." },
    specialRegimes: [
      { name:"Two-Tiered Profits Tax", description:"8.25% rate on first HKD 2M of assessable profits. 16.5% on the remainder.", eligibility:"All companies. Only one nominated entity per group can benefit." }
    ],
    taxTreaties:45, costOfLivingIndex:80, qualityOfLifeIndex:72, digitalNomadVisa:false,
    summary:"Hong Kong operates under a territorial tax system with no capital gains tax, no VAT, and low income tax rates capped at 15-17%. The city is a major financial center connecting East and West. Despite recent political changes, it remains a top business hub.",
    pros:["No capital gains tax","No VAT","Territorial taxation","Low income tax (max 17%)","Major financial center"],
    cons:["High cost of living especially housing","No digital nomad visa","Political uncertainty","Limited space"],
    bestFor:["international traders","financial services","holding companies"], lastUpdated:"2024-01"
  },
  {
    slug: "uae", name: "United Arab Emirates", flag: "\ud83c\udde6\ud83c\uddea", region: "Asia", currency: "AED",
    incomeTax: { brackets: [{min:0,max:null,rate:0}], topRate:0, notes:"No personal income tax in the UAE." },
    corporateTax: { standardRate:9, notes:"9% on taxable income exceeding AED 375,000. 0% below threshold. Free zone companies may qualify for 0% on qualifying income." },
    vat: { standardRate:5, reducedRates:[0], notes:"5% standard rate. 0% on exports, international transport, precious metals." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax for individuals or businesses (outside of corporate tax scope)." },
    socialSecurity: { employeeRate:5, employerRate:12.5, selfEmployedRate:0, notes:"Only applies to UAE/GCC nationals. Expats are exempt from social security." },
    specialRegimes: [
      { name:"Free Zones", description:"Numerous free zones offering 0% corporate tax on qualifying income, 100% foreign ownership, and no personal income tax.", eligibility:"Must establish entity within a designated free zone. Qualifying income criteria apply under new CT law." },
      { name:"Golden Visa", description:"Long-term residency visa (5 or 10 years) for investors, entrepreneurs, specialized talents, and outstanding students.", eligibility:"Various categories: investors (AED 2M+ property), entrepreneurs, professionals with specialized degrees." }
    ],
    taxTreaties:115, costOfLivingIndex:62, qualityOfLifeIndex:74, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Virtual Working Programme: 1-year renewable visa. Must earn at least USD 3,500/month. Available in Dubai and Abu Dhabi.",
    summary:"The UAE offers zero personal income tax, making it one of the world's most tax-friendly jurisdictions. The introduction of 9% corporate tax in 2023 brought some change, but free zone benefits persist. Dubai and Abu Dhabi are global business hubs with excellent infrastructure.",
    pros:["Zero personal income tax","Zero capital gains tax","Free zone benefits","World-class infrastructure","Golden Visa program","Digital nomad visa"],
    cons:["9% corporate tax introduced","High cost of living in Dubai","Hot climate","Cultural adjustments","Expensive real estate"],
    bestFor:["freelancers","consultants","traders","entrepreneurs","high earners"], lastUpdated:"2024-01"
  },
  {
    slug: "thailand", name: "Thailand", flag: "\ud83c\uddf9\ud83c\udded", region: "Asia", currency: "THB",
    incomeTax: { brackets: [{min:0,max:150000,rate:0},{min:150000,max:300000,rate:5},{min:300000,max:500000,rate:10},{min:500000,max:750000,rate:15},{min:750000,max:1000000,rate:20},{min:1000000,max:2000000,rate:25},{min:2000000,max:5000000,rate:30},{min:5000000,max:null,rate:35}], topRate:35, notes:"Income remitted to Thailand in same year as earned now taxable from 2024. Previously only if remitted in same tax year." },
    corporateTax: { standardRate:20, notes:"20% standard. SMEs: 0% on first 300k THB, 15% on 300k-3M THB." },
    vat: { standardRate:7, reducedRates:[], notes:"7% (temporarily reduced from 10%). On goods and services." },
    capitalGainsTax: { rate:35, notes:"Taxed as regular income at progressive rates. Withholding tax on dividends 10%." },
    socialSecurity: { employeeRate:5, employerRate:5, selfEmployedRate:0, notes:"Capped at THB 750/month each. Limited benefits." },
    specialRegimes: [
      { name:"BOI Investment Promotion", description:"Tax holidays of 3-13 years for qualifying investments in promoted activities.", eligibility:"Must apply to Board of Investment for specific approved activities. Minimum investment requirements vary." },
      { name:"Long-Term Resident (LTR) Visa", description:"17% flat tax on employment income. Exemption from tax on foreign income for wealthy pensioners, wealthy global citizens, and remote workers.", eligibility:"Various categories with different income/investment thresholds. Remote workers: min $80k/year salary." }
    ],
    taxTreaties:61, costOfLivingIndex:35, qualityOfLifeIndex:58, digitalNomadVisa:true,
    digitalNomadVisaDetails:"LTR Visa for Remote Workers: 17% flat income tax, 10-year visa. Must earn $80k+/year or $40k+ with master's degree.",
    summary:"Thailand offers an incredibly low cost of living with a tax system that is becoming stricter on foreign income remittance. The LTR visa provides a 17% flat tax rate and long-term residency for qualifying professionals. Bangkok and Chiang Mai are top digital nomad destinations.",
    pros:["Very low cost of living","LTR visa with 17% flat tax","Excellent food and culture","Strong digital nomad community","Low VAT at 7%"],
    cons:["Foreign income now taxable when remitted","High top marginal rate (35%)","Visa complexity","Language barrier","Hot and humid climate"],
    bestFor:["digital nomads","retirees","remote workers","budget-conscious expats"], lastUpdated:"2024-01"
  },
  {
    slug: "malaysia", name: "Malaysia", flag: "\ud83c\uddf2\ud83c\uddfe", region: "Asia", currency: "MYR",
    incomeTax: { brackets: [{min:0,max:5000,rate:0},{min:5000,max:20000,rate:1},{min:20000,max:35000,rate:3},{min:35000,max:50000,rate:6},{min:50000,max:70000,rate:11},{min:70000,max:100000,rate:19},{min:100000,max:400000,rate:25},{min:400000,max:600000,rate:26},{min:600000,max:2000000,rate:28},{min:2000000,max:null,rate:30}], topRate:30, notes:"Foreign-source income exempt for tax residents (territorial system). Being reviewed for potential changes." },
    corporateTax: { standardRate:24, smallBusinessRate:15, notes:"15% on first MYR 150k for SMEs with paid-up capital under MYR 2.5M. 24% standard." },
    vat: { standardRate:8, reducedRates:[], notes:"Sales Tax at 5-10% on goods. Service Tax at 8% on services. No VAT/GST." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax on securities. Real property gains tax (RPGT) applies to property disposals." },
    socialSecurity: { employeeRate:11, employerRate:13, selfEmployedRate:0, notes:"EPF (Employees Provident Fund). Self-employed can contribute voluntarily." },
    specialRegimes: [
      { name:"Labuan IBFC", description:"3% tax on net profits or flat MYR 20,000 for Labuan trading companies.", eligibility:"Must be a Labuan company conducting offshore trading or non-trading activities." },
      { name:"Malaysia My Second Home (MM2H)", description:"Long-term residency programme with various financial requirements.", eligibility:"Must meet financial requirements including fixed deposits and monthly income proof." }
    ],
    taxTreaties:75, costOfLivingIndex:33, qualityOfLifeIndex:60, digitalNomadVisa:true,
    digitalNomadVisaDetails:"DE Rantau Digital Nomad Pass. Must earn at least USD 24,000/year. Valid 3-12 months, renewable.",
    summary:"Malaysia offers a territorial tax system where foreign-source income is generally exempt for residents. The country has one of the lowest costs of living in Southeast Asia with a high standard of infrastructure. Kuala Lumpur is a growing tech hub with excellent connectivity.",
    pros:["Territorial taxation (foreign income exempt)","No capital gains tax on securities","Very low cost of living","Good infrastructure","English widely spoken","Digital nomad visa"],
    cons:["Potential changes to territorial system","30% top marginal rate","Hot and humid climate","Labuan rules tightening"],
    bestFor:["remote workers","retirees","international business owners"], lastUpdated:"2024-01"
  },
  {
    slug: "japan", name: "Japan", flag: "\ud83c\uddef\ud83c\uddf5", region: "Asia", currency: "JPY",
    incomeTax: { brackets: [{min:0,max:1950000,rate:5},{min:1950000,max:3300000,rate:10},{min:3300000,max:6950000,rate:20},{min:6950000,max:9000000,rate:23},{min:9000000,max:18000000,rate:33},{min:18000000,max:40000000,rate:40},{min:40000000,max:null,rate:45}], topRate:45, notes:"Plus 2.1% reconstruction surcharge and 10% resident tax. Effective top rate ~55%." },
    corporateTax: { standardRate:30.62, notes:"Effective rate including national, local, and enterprise taxes. Can be lower for SMEs." },
    vat: { standardRate:10, reducedRates:[8], notes:"8% on food and non-alcoholic beverages (except restaurant/takeout dining)." },
    capitalGainsTax: { rate:20.315, notes:"20.315% flat rate on financial gains (15.315% national + 5% local)." },
    socialSecurity: { employeeRate:15, employerRate:15, selfEmployedRate:30, notes:"Covers pension, health, employment insurance. Split equally employer/employee." },
    specialRegimes: [],
    taxTreaties:78, costOfLivingIndex:74, qualityOfLifeIndex:73, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa launched 2024. Up to 6 months. Must earn over 10M JPY/year. Must be from visa-exempt country.",
    summary:"Japan has one of the world's highest tax burdens with an effective top rate exceeding 55% when all taxes are combined. However, the country offers exceptional quality of life, safety, and infrastructure. Tokyo is a major global financial center with a growing startup ecosystem.",
    pros:["Exceptional safety and quality of life","World-class infrastructure","Strong consumer market","Rich cultural experience","Digital nomad visa (new)"],
    cons:["Very high effective tax rate (55%+)","Complex tax system","High corporate tax","Language barrier","Aging population"],
    bestFor:["market-focused businesses","cultural seekers","safety-conscious expats"], lastUpdated:"2024-01"
  },
  {
    slug: "south-korea", name: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7", region: "Asia", currency: "KRW",
    incomeTax: { brackets: [{min:0,max:14000000,rate:6},{min:14000000,max:50000000,rate:15},{min:50000000,max:88000000,rate:24},{min:88000000,max:150000000,rate:35},{min:150000000,max:300000000,rate:38},{min:300000000,max:500000000,rate:40},{min:500000000,max:1000000000,rate:42},{min:1000000000,max:null,rate:45}], topRate:45, notes:"Plus local income tax of 10% of national tax. Effective top rate ~49.5%." },
    corporateTax: { standardRate:24, notes:"Graduated: 9% up to 200M KRW, 19% up to 20B, 21% up to 300B, 24% above. Plus 10% local surcharge." },
    vat: { standardRate:10, reducedRates:[], notes:"10% flat rate. Essential goods exempt." },
    capitalGainsTax: { rate:22, notes:"22% on most gains. Residential property: 6-45% depending on holding period and number of homes." },
    socialSecurity: { employeeRate:9.4, employerRate:10.1, selfEmployedRate:19.5, notes:"National Pension 4.5% each, Health 3.545% each, Employment 0.9/1.15%." },
    specialRegimes: [
      { name:"Flat Tax for Foreign Workers", description:"19% flat tax rate on gross salary for up to 5 years.", eligibility:"Foreign nationals starting employment in Korea. Can opt for flat 19% instead of progressive rates." }
    ],
    taxTreaties:93, costOfLivingIndex:67, qualityOfLifeIndex:69, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Workcation (K-Visa) launched 2024. For remote workers from qualifying countries. Valid up to 2 years.",
    summary:"South Korea offers a flat 19% tax option for foreign workers that can significantly reduce taxes compared to the progressive system. Seoul is a vibrant tech hub, home to Samsung, LG, and a thriving startup ecosystem. The K-Visa provides digital nomad opportunities.",
    pros:["19% flat tax option for foreign workers","World-class technology infrastructure","Vibrant startup ecosystem","K-Visa for digital nomads"],
    cons:["High progressive tax rates (up to 49.5%)","Complex regulations","High property taxes","Language barrier","Mandatory military service for male citizens"],
    bestFor:["foreign employees","tech professionals","cultural enthusiasts"], lastUpdated:"2024-01"
  },
  {
    slug: "vietnam", name: "Vietnam", flag: "\ud83c\uddfb\ud83c\uddf3", region: "Asia", currency: "VND",
    incomeTax: { brackets: [{min:0,max:5000000,rate:5},{min:5000000,max:10000000,rate:10},{min:10000000,max:18000000,rate:15},{min:18000000,max:32000000,rate:20},{min:32000000,max:52000000,rate:25},{min:52000000,max:80000000,rate:30},{min:80000000,max:null,rate:35}], topRate:35, notes:"VND amounts per month. Foreign contractors may have different withholding rules." },
    corporateTax: { standardRate:20, notes:"20% standard. Incentive rates of 10-17% available for specific sectors and zones." },
    vat: { standardRate:10, reducedRates:[5], notes:"5% on essential goods. 0% on exports." },
    capitalGainsTax: { rate:20, notes:"20% on gains or 0.1% of gross transfer value for securities." },
    socialSecurity: { employeeRate:10.5, employerRate:21.5, selfEmployedRate:0, notes:"Covers social insurance, health, unemployment. Foreigners contribute partially." },
    specialRegimes: [],
    taxTreaties:80, costOfLivingIndex:28, qualityOfLifeIndex:50, digitalNomadVisa:false,
    summary:"Vietnam offers one of the lowest costs of living in Asia with a growing economy. The 20% corporate tax rate and investment incentives attract foreign businesses. Ho Chi Minh City and Hanoi are popular with digital nomads despite the lack of a formal nomad visa.",
    pros:["Extremely low cost of living","Growing economy","Low corporate tax with incentives","Vibrant expat community in HCMC"],
    cons:["No digital nomad visa","Complex visa regulations","35% top income tax","Limited English in government","Infrastructure still developing"],
    bestFor:["budget-conscious nomads","manufacturing investors","early-stage entrepreneurs"], lastUpdated:"2024-01"
  },
  {
    slug: "indonesia", name: "Indonesia", flag: "\ud83c\uddee\ud83c\udde9", region: "Asia", currency: "IDR",
    incomeTax: { brackets: [{min:0,max:60000000,rate:5},{min:60000000,max:250000000,rate:15},{min:250000000,max:500000000,rate:25},{min:500000000,max:5000000000,rate:30},{min:5000000000,max:null,rate:35}], topRate:35, notes:"IDR amounts per year. Non-residents taxed at flat 20% on Indonesian-source income." },
    corporateTax: { standardRate:22, notes:"22% standard. 50% reduction for listed companies meeting certain criteria." },
    vat: { standardRate:11, reducedRates:[], notes:"11% standard. Export of goods and services at 0%." },
    capitalGainsTax: { rate:0.1, notes:"0.1% final tax on sale of listed shares. 25% on non-listed shares for residents." },
    socialSecurity: { employeeRate:5, employerRate:9.24, selfEmployedRate:5, notes:"BPJS Ketenagakerjaan and BPJS Kesehatan. Covers work accident, death, pension, health." },
    specialRegimes: [
      { name:"Second Home Visa", description:"5-10 year stay permit for foreigners. Tax implications depend on residency status.", eligibility:"Must have USD 130,000+ in savings or proof of income." }
    ],
    taxTreaties:71, costOfLivingIndex:27, qualityOfLifeIndex:48, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa (B211A) and Second Home Visa. E-Visa for remote workers available in Bali and other locations.",
    summary:"Indonesia, home to the digital nomad paradise of Bali, offers very low living costs and a growing digital economy. The tax system is being modernized with new brackets and VAT increases. Bali remains one of the world's most popular remote work destinations.",
    pros:["Very low cost of living","Bali digital nomad hub","Low social security contributions","Growing digital economy"],
    cons:["Complex bureaucracy","35% top income tax","Limited infrastructure outside cities","Visa complexity","Internet reliability varies"],
    bestFor:["digital nomads in Bali","budget travelers","market-entry businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "india", name: "India", flag: "\ud83c\uddee\ud83c\uddf3", region: "Asia", currency: "INR",
    incomeTax: { brackets: [{min:0,max:300000,rate:0},{min:300000,max:700000,rate:5},{min:700000,max:1000000,rate:10},{min:1000000,max:1200000,rate:15},{min:1200000,max:1500000,rate:20},{min:1500000,max:null,rate:30}], topRate:30, notes:"New regime rates (default from 2024). Old regime with deductions still available. Plus 4% health/education cess." },
    corporateTax: { standardRate:25.17, notes:"22% + surcharge + cess for existing companies. 15% for new manufacturing companies (effective ~17.16%)." },
    vat: { standardRate:18, reducedRates:[5,12], notes:"GST system: 5%, 12%, 18%, 28% slabs. 18% is most common for services." },
    capitalGainsTax: { rate:12.5, notes:"Short-term: 20% on listed, 30% on unlisted. Long-term: 12.5% above 1.25 lakh exemption." },
    socialSecurity: { employeeRate:12, employerRate:12, selfEmployedRate:0, notes:"PF (Provident Fund) 12% each for employees earning up to 15k/month basic. Voluntary for self-employed." },
    specialRegimes: [
      { name:"SEZ (Special Economic Zone)", description:"Tax holidays and exemptions for businesses in designated zones.", eligibility:"Must set up operations in a notified SEZ. Various conditions apply." }
    ],
    taxTreaties:96, costOfLivingIndex:22, qualityOfLifeIndex:46, digitalNomadVisa:false,
    summary:"India offers one of the world's lowest costs of living with a massive consumer market. The new tax regime simplifies brackets. India is a global IT hub with Bangalore, Hyderabad, and Pune as major tech centers. No dedicated digital nomad visa exists.",
    pros:["Lowest cost of living globally","Massive consumer market","Strong IT talent pool","15% manufacturing corporate tax","English widely used in business"],
    cons:["Complex tax system with multiple regimes","No digital nomad visa","Bureaucratic challenges","Infrastructure varies widely","High GST on many services"],
    bestFor:["IT companies","manufacturing","market-access seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "philippines", name: "Philippines", flag: "\ud83c\uddf5\ud83c\udded", region: "Asia", currency: "PHP",
    incomeTax: { brackets: [{min:0,max:250000,rate:0},{min:250000,max:400000,rate:15},{min:400000,max:800000,rate:20},{min:800000,max:2000000,rate:25},{min:2000000,max:8000000,rate:30},{min:8000000,max:null,rate:35}], topRate:35, notes:"CREATE MORE Act reduced rates. 250k PHP tax-free threshold." },
    corporateTax: { standardRate:25, smallBusinessRate:20, notes:"20% for domestic companies with net taxable income under 5M PHP and total assets under 100M PHP." },
    vat: { standardRate:12, reducedRates:[], notes:"12% standard VAT on goods and services." },
    capitalGainsTax: { rate:15, notes:"15% on net capital gains from sale of shares not traded on the stock exchange." },
    socialSecurity: { employeeRate:5, employerRate:9.5, selfEmployedRate:14, notes:"SSS, PhilHealth, Pag-IBIG combined contributions." },
    specialRegimes: [
      { name:"PEZA (Philippine Economic Zone Authority)", description:"Income tax holiday of 4-7 years followed by 5% gross income tax.", eligibility:"Must register as PEZA enterprise in designated economic zones." }
    ],
    taxTreaties:43, costOfLivingIndex:28, qualityOfLifeIndex:48, digitalNomadVisa:false,
    summary:"The Philippines offers a low cost of living with an English-speaking population. The tax system was reformed under the CREATE law with reduced corporate rates. Manila and Cebu have growing BPO and tech sectors. No formal digital nomad visa exists.",
    pros:["Low cost of living","English-speaking country","250k PHP tax-free allowance","PEZA incentives","Young workforce"],
    cons:["35% top income tax","No digital nomad visa","Infrastructure challenges","Natural disaster risk","Complex bureaucracy"],
    bestFor:["BPO companies","English-speaking market","cost-conscious businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "taiwan", name: "Taiwan", flag: "\ud83c\uddf9\ud83c\uddfc", region: "Asia", currency: "TWD",
    incomeTax: { brackets: [{min:0,max:560000,rate:5},{min:560000,max:1260000,rate:12},{min:1260000,max:2520000,rate:20},{min:2520000,max:4720000,rate:30},{min:4720000,max:null,rate:40}], topRate:40, notes:"TWD amounts. Standard deduction of 124k TWD for singles. Foreign specialists may opt for 18% flat rate." },
    corporateTax: { standardRate:20, notes:"20% standard. 12% surtax on undistributed earnings." },
    vat: { standardRate:5, reducedRates:[], notes:"5% flat rate — one of the lowest in the world." },
    capitalGainsTax: { rate:0, notes:"Securities transaction tax of 0.3% instead of capital gains tax on listed stocks." },
    socialSecurity: { employeeRate:5.5, employerRate:14.02, selfEmployedRate:5.5, notes:"Covers labor insurance, health insurance, pension." },
    specialRegimes: [
      { name:"Foreign Special Professional Tax Incentive", description:"18% flat tax on first 3M TWD of salary for qualifying foreign professionals.", eligibility:"Must hold special professional status (Gold Card holders, senior professionals). First 3 years of residency." }
    ],
    taxTreaties:34, costOfLivingIndex:45, qualityOfLifeIndex:68, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Employment Gold Card for foreign professionals. Combines work permit, visa, and resident permit. Tax incentives for first 3 years.",
    summary:"Taiwan offers a competitive tax environment with only 5% VAT, no capital gains tax on listed securities, and special incentives for foreign professionals via the Gold Card program. Taipei is a major tech hub home to TSMC and a thriving startup scene.",
    pros:["Only 5% VAT","No capital gains tax on listed stocks","Gold Card with tax incentives","World-class tech sector","Safe and clean"],
    cons:["40% top income tax rate","12% surtax on undistributed profits","Limited tax treaties","Geopolitical risks"],
    bestFor:["tech professionals","semiconductor industry","foreign specialists"], lastUpdated:"2024-01"
  },
  {
    slug: "usa", name: "United States", flag: "\ud83c\uddfa\ud83c\uddf8", region: "Americas", currency: "USD",
    incomeTax: { brackets: [{min:0,max:11600,rate:10},{min:11600,max:47150,rate:12},{min:47150,max:100525,rate:22},{min:100525,max:191950,rate:24},{min:191950,max:243725,rate:32},{min:243725,max:609350,rate:35},{min:609350,max:null,rate:37}], topRate:37, notes:"Federal rates only. State taxes add 0-13.3% (California highest). No state tax in FL, TX, NV, WA, WY, SD, AK, NH, TN." },
    corporateTax: { standardRate:21, notes:"21% federal flat rate. State taxes add 0-11.5%. Some states have no corporate tax." },
    vat: { standardRate:0, reducedRates:[], notes:"No federal VAT. Sales tax varies by state (0-10.25%). Many states have no sales tax." },
    capitalGainsTax: { rate:20, longTermRate:20, notes:"0%, 15%, or 20% federal depending on income. Plus 3.8% NIIT for high earners. State taxes may apply." },
    socialSecurity: { employeeRate:7.65, employerRate:7.65, selfEmployedRate:15.3, notes:"FICA: 6.2% Social Security (capped) + 1.45% Medicare (uncapped). Self-employed pay both halves." },
    specialRegimes: [
      { name:"Qualified Small Business Stock (QSBS)", description:"Up to 100% exclusion of capital gains (up to $10M) on qualifying small business stock held 5+ years.", eligibility:"C-corp with gross assets under $50M. Must hold stock for 5+ years." },
      { name:"Foreign Earned Income Exclusion (FEIE)", description:"Exclude up to $126,500 (2024) of foreign earned income if living abroad.", eligibility:"US citizen/resident living abroad 330+ days per year or bona fide resident of foreign country." }
    ],
    taxTreaties:66, costOfLivingIndex:72, qualityOfLifeIndex:72, digitalNomadVisa:false,
    summary:"The US has a complex multi-layered tax system with federal, state, and local taxes. However, states like Florida, Texas, and Nevada offer zero state income tax. Uniquely, the US taxes citizens on worldwide income regardless of residency. The startup ecosystem is the world's largest.",
    pros:["World's largest market","No-tax states available","QSBS exclusion for startups","Strong IP protection","Deep capital markets"],
    cons:["Worldwide taxation for citizens","Complex multi-state tax system","No digital nomad visa","High healthcare costs","Self-employment tax 15.3%"],
    bestFor:["startups","market-access seekers","tech companies"], lastUpdated:"2024-01"
  },
  {
    slug: "canada", name: "Canada", flag: "\ud83c\udde8\ud83c\udde6", region: "Americas", currency: "CAD",
    incomeTax: { brackets: [{min:0,max:55867,rate:15},{min:55867,max:111733,rate:20.5},{min:111733,max:154906,rate:26},{min:154906,max:220000,rate:29},{min:220000,max:null,rate:33}], topRate:33, notes:"Federal rates. Provincial taxes add 4-25.75%. Combined top rate ranges from 44.5% (Nunavut) to 54.8% (Nova Scotia)." },
    corporateTax: { standardRate:26.5, notes:"15% federal + ~11.5% provincial average. Small business rate: 9% federal on first 500k CAD." },
    vat: { standardRate:5, reducedRates:[], notes:"5% federal GST. Provinces add PST (0-10%) or use HST (13-15%). Alberta has no PST." },
    capitalGainsTax: { rate:26.76, notes:"50% of gains included in income (66.7% inclusion for amounts over 250k CAD from 2024). Taxed at marginal rate." },
    socialSecurity: { employeeRate:7.2, employerRate:7.7, selfEmployedRate:14.4, notes:"CPP/QPP + EI contributions. Self-employed pay both CPP portions." },
    specialRegimes: [
      { name:"SR&ED Tax Credit", description:"Investment tax credit of 15-35% for scientific research and experimental development expenditures.", eligibility:"Any Canadian business conducting qualifying R&D activities. Higher rate for CCPCs." }
    ],
    taxTreaties:94, costOfLivingIndex:68, qualityOfLifeIndex:76, digitalNomadVisa:false,
    summary:"Canada offers a high quality of life with a progressive tax system. The small business corporate rate of 9% is competitive, and the SR&ED program provides generous R&D credits. Toronto and Vancouver are major tech hubs, though high housing costs are a concern.",
    pros:["Small business 9% federal rate","Generous SR&ED R&D credits","High quality of life","Stable political system","Universal healthcare"],
    cons:["High combined personal tax (up to 54.8%)","No digital nomad visa","High cost of living in major cities","Capital gains inclusion rate increasing"],
    bestFor:["R&D companies","small businesses","quality-of-life seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "mexico", name: "Mexico", flag: "\ud83c\uddf2\ud83c\uddfd", region: "Americas", currency: "MXN",
    incomeTax: { brackets: [{min:0,max:8952,rate:1.92},{min:8952,max:75984,rate:6.4},{min:75984,max:133536,rate:10.88},{min:133536,max:155229,rate:16},{min:155229,max:185852,rate:17.92},{min:185852,max:374837,rate:21.36},{min:374837,max:590795,rate:23.52},{min:590795,max:1127926,rate:30},{min:1127926,max:1503902,rate:32},{min:1503902,max:4511707,rate:34},{min:4511707,max:null,rate:35}], topRate:35, notes:"MXN annual amounts. Complex bracket system with credits at each level." },
    corporateTax: { standardRate:30, notes:"30% flat rate. Plus 10% on profit distributions. Employee profit sharing (PTU) of 10%." },
    vat: { standardRate:16, reducedRates:[0], notes:"16% standard. 0% on food, medicines, books." },
    capitalGainsTax: { rate:10, notes:"10% on stock market gains. Real estate gains taxed at progressive rates." },
    socialSecurity: { employeeRate:2.78, employerRate:26.5, selfEmployedRate:2.78, notes:"IMSS covers health, disability, retirement. Employer bears majority." },
    specialRegimes: [
      { name:"RESICO (Simplified Trust Regime)", description:"1-2.5% monthly ISR on income for individuals with annual income under 3.5M MXN.", eligibility:"Individuals with business/professional income under 3.5M MXN/year (~USD 200k)." }
    ],
    taxTreaties:59, costOfLivingIndex:30, qualityOfLifeIndex:52, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Temporary Resident Visa allows remote work. No specific income requirement but must prove economic solvency.",
    summary:"Mexico offers a low cost of living with proximity to the US market. The RESICO regime provides very low tax rates for small businesses and freelancers. Mexico City, Playa del Carmen, and Merida are popular digital nomad destinations with growing coworking scenes.",
    pros:["Very low cost of living","RESICO 1-2.5% for small earners","Proximity to US market","Vibrant digital nomad scene","Rich culture"],
    cons:["30% corporate tax","Complex tax system","Security concerns in some areas","PTU profit sharing obligation","Bureaucratic challenges"],
    bestFor:["digital nomads","nearshore businesses","cost-conscious entrepreneurs"], lastUpdated:"2024-01"
  },
  {
    slug: "brazil", name: "Brazil", flag: "\ud83c\udde7\ud83c\uddf7", region: "Americas", currency: "BRL",
    incomeTax: { brackets: [{min:0,max:24511,rate:0},{min:24511,max:33919,rate:7.5},{min:33919,max:45012,rate:15},{min:45012,max:55976,rate:22.5},{min:55976,max:null,rate:27.5}], topRate:27.5, notes:"BRL annual amounts. Relatively low top rate by global standards." },
    corporateTax: { standardRate:34, notes:"15% IRPJ + 10% surcharge on profit over 240k BRL/year + 9% CSLL = ~34% effective." },
    vat: { standardRate:17, reducedRates:[7,12], notes:"ICMS (state VAT) 7-25%. IPI (federal). PIS/COFINS. Being reformed into dual VAT." },
    capitalGainsTax: { rate:15, notes:"15% up to 5M BRL, 17.5% 5-10M, 20% 10-30M, 22.5% above 30M. Monthly threshold of 20k BRL exempt for stock sales." },
    socialSecurity: { employeeRate:14, employerRate:28.8, selfEmployedRate:20, notes:"INSS contributions. 7.5-14% progressive for employees. Employer: ~28.8% total." },
    specialRegimes: [
      { name:"Simples Nacional", description:"Simplified tax regime for micro and small enterprises. Single payment covering multiple taxes at 4-33% depending on revenue bracket.", eligibility:"Annual revenue up to BRL 4.8M." }
    ],
    taxTreaties:35, costOfLivingIndex:32, qualityOfLifeIndex:52, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa available. Must earn at least USD 1,500/month from foreign sources. Valid 1 year, renewable.",
    summary:"Brazil has Latin America's largest economy with a complex but reforming tax system. The Simples Nacional regime simplifies compliance for small businesses. Sao Paulo is a major business hub, while Florianopolis and remote beach towns attract digital nomads.",
    pros:["Low income tax top rate (27.5%)","Simples Nacional for small businesses","Digital nomad visa","Large consumer market","Low entry income requirement"],
    cons:["Very complex tax system","34% effective corporate tax","High employer contributions","Bureaucratic challenges","Currency volatility"],
    bestFor:["market-access businesses","small business owners","digital nomads"], lastUpdated:"2024-01"
  },
  {
    slug: "colombia", name: "Colombia", flag: "\ud83c\udde8\ud83c\uddf4", region: "Americas", currency: "COP",
    incomeTax: { brackets: [{min:0,max:1090,rate:0},{min:1090,max:1700,rate:19},{min:1700,max:4100,rate:28},{min:4100,max:8670,rate:33},{min:8670,max:18970,rate:35},{min:18970,max:31000,rate:37},{min:31000,max:null,rate:39}], topRate:39, notes:"UVT-based brackets (1 UVT = ~47,065 COP in 2024). Progressive system." },
    corporateTax: { standardRate:35, notes:"35% standard rate. Reduced rates available for specific sectors and free trade zones (20%)." },
    vat: { standardRate:19, reducedRates:[5], notes:"19% standard. 5% on some processed foods, insurance, and storage." },
    capitalGainsTax: { rate:15, notes:"15% on occasional gains. 10% on dividends for residents." },
    socialSecurity: { employeeRate:8, employerRate:20.5, selfEmployedRate:28.5, notes:"Covers health, pension, ARL (occupational risk). Independent contractors pay full amount." },
    specialRegimes: [
      { name:"Free Trade Zones", description:"20% corporate tax rate (vs 35% standard) and VAT exemption on inputs.", eligibility:"Must be established in designated free trade zone. Various requirements depending on zone type." }
    ],
    taxTreaties:16, costOfLivingIndex:26, qualityOfLifeIndex:48, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa (V-type). Must earn at least 3x Colombian minimum wage (~USD 975/month). Valid 2 years.",
    summary:"Colombia offers a very low cost of living and a growing digital nomad community, especially in Medellin and Bogota. The tax system is relatively high for formal employment but the digital nomad visa has low income requirements. Free trade zones offer 20% corporate rate.",
    pros:["Very low cost of living","Digital nomad visa with low threshold","Free trade zone 20% rate","Growing startup scene in Medellin","Warm climate"],
    cons:["High corporate tax (35%)","Complex tax code","Security perception","39% top income rate","Limited tax treaties"],
    bestFor:["digital nomads","cost-conscious remote workers","free trade zone businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "costa-rica", name: "Costa Rica", flag: "\ud83c\udde8\ud83c\uddf7", region: "Americas", currency: "CRC",
    incomeTax: { brackets: [{min:0,max:4181000,rate:0},{min:4181000,max:6244000,rate:10},{min:6244000,max:10414000,rate:15},{min:10414000,max:20872000,rate:20},{min:20872000,max:null,rate:25}], topRate:25, notes:"CRC annual amounts. Territorial taxation - only Costa Rican-source income taxed." },
    corporateTax: { standardRate:30, notes:"30% standard. Progressive rates for SMEs: 5% on first 5.6M CRC, 10% up to 8.4M, 15% up to 11.2M, 20% up to 22.4M." },
    vat: { standardRate:13, reducedRates:[1,2,4], notes:"13% standard. Reduced rates on healthcare, education, some foods." },
    capitalGainsTax: { rate:15, notes:"15% on capital gains from 2023. Previously capital gains were not taxed." },
    socialSecurity: { employeeRate:10.5, employerRate:26.5, selfEmployedRate:10.5, notes:"CCSS (social security). High employer burden covers health, pension, workers' comp." },
    specialRegimes: [
      { name:"Free Trade Zone Regime", description:"Various tax incentives including 0% corporate tax for qualifying companies for up to 12 years.", eligibility:"Must invest minimum amount and create jobs in designated free trade zones." }
    ],
    taxTreaties:6, costOfLivingIndex:40, qualityOfLifeIndex:62, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Digital Nomad Visa. Must earn at least USD 3,000/month (or USD 5,000 for families). Valid 1 year, renewable once.",
    summary:"Costa Rica offers territorial taxation, meaning foreign-source income is not taxed. The country is famous for its biodiversity, stable democracy, and Pura Vida lifestyle. The digital nomad visa was introduced in 2022 and has attracted many remote workers to beach towns like Tamarindo and Santa Teresa.",
    pros:["Territorial taxation (foreign income tax-free)","Stable democracy","Digital nomad visa","Beautiful natural environment","No army"],
    cons:["High employer social security costs (26.5%)","30% corporate tax","New capital gains tax","Limited infrastructure in rural areas","Relatively high cost for Central America"],
    bestFor:["remote workers with foreign income","nature lovers","digital nomads"], lastUpdated:"2024-01"
  },
  {
    slug: "panama", name: "Panama", flag: "\ud83c\uddf5\ud83c\udde6", region: "Americas", currency: "USD",
    incomeTax: { brackets: [{min:0,max:11000,rate:0},{min:11000,max:50000,rate:15},{min:50000,max:null,rate:25}], topRate:25, notes:"Territorial taxation. Only Panama-source income taxed. Foreign-source income exempt." },
    corporateTax: { standardRate:25, notes:"25% on net taxable income. Special rates for Panama Pacific Area and free zones." },
    vat: { standardRate:7, reducedRates:[], notes:"ITBMS (similar to VAT) at 7%. 10% on alcohol/tobacco. 15% on accommodation." },
    capitalGainsTax: { rate:10, notes:"10% on capital gains. 5% on sale of securities." },
    socialSecurity: { employeeRate:9.75, employerRate:12.25, selfEmployedRate:9.75, notes:"CSS contributions covering health, maternity, disability, old age." },
    specialRegimes: [
      { name:"Friendly Nations Visa", description:"Fast-track permanent residency for citizens of 50+ 'friendly' nations.", eligibility:"Must establish economic/professional tie to Panama (employment, business, or bank deposit of USD 5,000)." },
      { name:"Multinational Headquarters (SEM)", description:"Tax incentives for regional headquarters including exemptions on foreign-source income.", eligibility:"Must serve as regional headquarters for multinational operations. Minimum employees required." }
    ],
    taxTreaties:19, costOfLivingIndex:38, qualityOfLifeIndex:54, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Remote Worker Visa. Must earn at least USD 3,000/month from foreign employer. Valid 9 months, renewable up to 18 months.",
    summary:"Panama offers territorial taxation with zero tax on foreign-source income, making it ideal for international entrepreneurs. The USD currency, Friendly Nations Visa, and strategic location as the Americas' business hub add to its appeal. Panama City is a modern financial center.",
    pros:["Territorial taxation (no tax on foreign income)","US dollar currency","Friendly Nations Visa","Strategic Americas hub","Digital nomad visa"],
    cons:["FATF grey list concerns","Limited English outside business","25% income tax on local income","Hot humid climate"],
    bestFor:["international entrepreneurs","holding companies","Americas-based businesses"], lastUpdated:"2024-01"
  },
  {
    slug: "paraguay", name: "Paraguay", flag: "\ud83c\uddf5\ud83c\uddfe", region: "Americas", currency: "PYG",
    incomeTax: { brackets: [{min:0,max:null,rate:10}], topRate:10, notes:"Flat 10% rate on personal income. Territorial basis — only Paraguay-source income taxed." },
    corporateTax: { standardRate:10, notes:"10% flat corporate tax. Plus 5% additional tax on profit distribution." },
    vat: { standardRate:10, reducedRates:[5], notes:"10% standard. 5% on basic food, pharmaceuticals, and agricultural products." },
    capitalGainsTax: { rate:10, notes:"Taxed as regular income at 10%." },
    socialSecurity: { employeeRate:9, employerRate:16.5, selfEmployedRate:9, notes:"IPS contributions for employees. Self-employed can opt in." },
    specialRegimes: [
      { name:"Maquila Regime", description:"1% tax on value added for export assembly operations.", eligibility:"Manufacturing operations focused on export. Must apply to Ministry of Industry." }
    ],
    taxTreaties:6, costOfLivingIndex:24, qualityOfLifeIndex:42, digitalNomadVisa:false,
    summary:"Paraguay offers one of the simplest and lowest tax systems in the Americas with a flat 10% rate on everything and territorial taxation. The cost of living is among the lowest in South America. Asuncion has a small but growing expat community attracted by the low taxes.",
    pros:["Flat 10% income and corporate tax","Territorial taxation","Extremely low cost of living","Simple tax system","Easy residency"],
    cons:["Limited infrastructure","Small market","No digital nomad visa","Language barrier (Spanish/Guarani)","Limited international flights"],
    bestFor:["tax minimizers","budget expats","territorial income earners"], lastUpdated:"2024-01"
  },
  {
    slug: "australia", name: "Australia", flag: "\ud83c\udde6\ud83c\uddfa", region: "Oceania", currency: "AUD",
    incomeTax: { brackets: [{min:0,max:18200,rate:0},{min:18200,max:45000,rate:16},{min:45000,max:135000,rate:30},{min:135000,max:190000,rate:37},{min:190000,max:null,rate:45}], topRate:45, notes:"2024-25 rates after Stage 3 tax cuts. Plus 2% Medicare levy. 47% effective top rate." },
    corporateTax: { standardRate:30, smallBusinessRate:25, notes:"25% for base rate entities (turnover under AUD 50M). 30% for larger companies." },
    vat: { standardRate:10, reducedRates:[], notes:"GST at 10%. Food, health, education are GST-free." },
    capitalGainsTax: { rate:22.5, notes:"50% discount for assets held 12+ months. Taxed at marginal rate on included amount." },
    socialSecurity: { employeeRate:0, employerRate:11.5, selfEmployedRate:0, notes:"Superannuation Guarantee: employer contributes 11.5% (rising to 12% by 2025). No employee social security contribution." },
    specialRegimes: [],
    taxTreaties:46, costOfLivingIndex:73, qualityOfLifeIndex:78, digitalNomadVisa:false,
    summary:"Australia offers a high quality of life with a relatively simple tax system. The 2024 Stage 3 tax cuts significantly reduced the tax burden for middle-income earners. Sydney and Melbourne are major business centers. The superannuation system means no employee social security contributions.",
    pros:["Stage 3 tax cuts reducing burden","No employee social security","25% small business rate","High quality of life","50% CGT discount"],
    cons:["45% top marginal rate","No digital nomad visa","High cost of living","30% large company rate","Distance from major markets"],
    bestFor:["employees","small businesses","quality-of-life seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "new-zealand", name: "New Zealand", flag: "\ud83c\uddf3\ud83c\uddff", region: "Oceania", currency: "NZD",
    incomeTax: { brackets: [{min:0,max:14000,rate:10.5},{min:14000,max:48000,rate:17.5},{min:48000,max:70000,rate:30},{min:70000,max:180000,rate:33},{min:180000,max:null,rate:39}], topRate:39, notes:"NZD amounts. ACC levy (~1.6%) also applies." },
    corporateTax: { standardRate:28, notes:"28% flat rate for all companies." },
    vat: { standardRate:15, reducedRates:[], notes:"GST at 15% on most goods and services. No reduced rates." },
    capitalGainsTax: { rate:0, notes:"No general capital gains tax. Bright-line test applies to residential property (2 years)." },
    socialSecurity: { employeeRate:0, employerRate:4, selfEmployedRate:0, notes:"KiwiSaver: optional employee contributions (3-10%). Employer minimum 3%. ACC levy ~1.6%." },
    specialRegimes: [
      { name:"Transitional Tax Resident", description:"4-year exemption from tax on most foreign income for new tax residents.", eligibility:"Must be becoming a New Zealand tax resident for the first time (or after 10+ years absence)." }
    ],
    taxTreaties:40, costOfLivingIndex:72, qualityOfLifeIndex:77, digitalNomadVisa:false,
    summary:"New Zealand has no capital gains tax (with limited exceptions), making it attractive for investors. The 4-year transitional resident exemption shelters foreign income for new arrivals. Auckland and Wellington offer high quality of life in a stable, English-speaking environment.",
    pros:["No capital gains tax","4-year foreign income exemption for new residents","Stable English-speaking country","High quality of life","No social security contributions for employees"],
    cons:["39% top income tax rate","High cost of living","Remote geographic location","Small domestic market","15% GST with no reduced rates"],
    bestFor:["investors","new residents with foreign income","lifestyle seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "south-africa", name: "South Africa", flag: "\ud83c\uddff\ud83c\udde6", region: "Africa", currency: "ZAR",
    incomeTax: { brackets: [{min:0,max:237100,rate:18},{min:237100,max:370500,rate:26},{min:370500,max:512800,rate:31},{min:512800,max:673000,rate:36},{min:673000,max:857900,rate:39},{min:857900,max:1817000,rate:41},{min:1817000,max:null,rate:45}], topRate:45, notes:"ZAR amounts. Tax-free threshold of ~95,750 ZAR for under 65s." },
    corporateTax: { standardRate:27, notes:"27% standard rate (reduced from 28% in 2023)." },
    vat: { standardRate:15, reducedRates:[0], notes:"15% standard. 0% on basic food items, fuel, international transport." },
    capitalGainsTax: { rate:18, notes:"40% of gain included in income for individuals (max effective rate ~18%). 80% for companies." },
    socialSecurity: { employeeRate:1, employerRate:2, selfEmployedRate:0, notes:"UIF (Unemployment Insurance) only: 1% each. No comprehensive social security." },
    specialRegimes: [
      { name:"Special Economic Zones", description:"Reduced 15% corporate tax rate and other incentives for qualifying businesses.", eligibility:"Must be located in designated SEZ and meet employment/investment criteria." }
    ],
    taxTreaties:79, costOfLivingIndex:32, qualityOfLifeIndex:48, digitalNomadVisa:false,
    summary:"South Africa offers a gateway to the African continent with moderate tax rates and low social security contributions. Cape Town is increasingly popular with digital nomads and has a growing tech scene. The residence-based tax system taxes worldwide income for residents.",
    pros:["Low social security contributions","SEZ 15% corporate rate","Gateway to Africa","Low cost of living","English-speaking","Cape Town lifestyle"],
    cons:["45% top income tax rate","No digital nomad visa","Safety concerns","Load shedding (power issues)","Worldwide taxation for residents"],
    bestFor:["Africa-focused businesses","cost-conscious professionals","Cape Town lifestyle seekers"], lastUpdated:"2024-01"
  },
  {
    slug: "mauritius", name: "Mauritius", flag: "\ud83c\uddf2\ud83c\uddfa", region: "Africa", currency: "MUR",
    incomeTax: { brackets: [{min:0,max:700000,rate:15},{min:700000,max:null,rate:20}], topRate:20, notes:"MUR amounts. Numerous deductions and allowances available. Effective rate often lower." },
    corporateTax: { standardRate:15, notes:"15% standard. Partial exemption system can reduce effective rate to 3% on foreign-source income." },
    vat: { standardRate:15, reducedRates:[], notes:"15% standard rate on goods and services." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax in Mauritius." },
    socialSecurity: { employeeRate:3, employerRate:6, selfEmployedRate:3, notes:"National Pension Fund and National Savings Fund contributions." },
    specialRegimes: [
      { name:"Global Business License (GBL)", description:"Partial exemption system providing 80% foreign tax credit, resulting in effective 3% tax on foreign income.", eligibility:"Must hold GBL license and meet substance requirements." },
      { name:"Premium Visa", description:"Long-stay visa for remote workers and retirees.", eligibility:"Must earn or receive at least USD 1,500/month from foreign sources. Valid 1 year, renewable." }
    ],
    taxTreaties:46, costOfLivingIndex:35, qualityOfLifeIndex:55, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Premium Visa for remote workers. Must earn at least USD 1,500/month. Valid 1 year, renewable.",
    summary:"Mauritius is a popular offshore financial center with no capital gains tax and an effective 3% corporate tax on foreign income through its GBL regime. The tropical island nation offers a relaxed lifestyle with growing fintech and business services sectors.",
    pros:["No capital gains tax","Effective 3% tax on foreign corporate income","Low cost of living","Tropical lifestyle","Premium Visa for nomads","English and French speaking"],
    cons:["Small domestic market","Remote island location","20% top income tax","Limited infrastructure compared to developed nations"],
    bestFor:["holding companies","investors","remote workers seeking tropical lifestyle"], lastUpdated:"2024-01"
  },
  {
    slug: "rwanda", name: "Rwanda", flag: "\ud83c\uddf7\ud83c\uddfc", region: "Africa", currency: "RWF",
    incomeTax: { brackets: [{min:0,max:360000,rate:0},{min:360000,max:1200000,rate:20},{min:1200000,max:null,rate:30}], topRate:30, notes:"RWF annual amounts. Simplified system with only 3 brackets." },
    corporateTax: { standardRate:30, notes:"30% standard. Reduced 0% for strategic investors and priority sectors for up to 7 years." },
    vat: { standardRate:18, reducedRates:[0], notes:"18% standard. 0% on exports and essential goods." },
    capitalGainsTax: { rate:5, notes:"5% withholding tax on capital gains." },
    socialSecurity: { employeeRate:5, employerRate:5, selfEmployedRate:5, notes:"RSSB contributions: 3% pension + 0.5% occupational hazards each." },
    specialRegimes: [
      { name:"Special Economic Zone Incentives", description:"0% corporate tax for up to 7 years for strategic investments. Preferential rates after.", eligibility:"Must invest in priority sectors designated by Rwanda Development Board." }
    ],
    taxTreaties:13, costOfLivingIndex:22, qualityOfLifeIndex:38, digitalNomadVisa:false,
    summary:"Rwanda is Africa's rising star with a business-friendly government, low corruption, and ambitious digital economy goals. Kigali is one of Africa's cleanest and safest cities. Tax incentives for strategic investments make it attractive for businesses targeting East Africa.",
    pros:["Very low cost of living","Business-friendly government","Low corruption for Africa","5% capital gains tax","Clean and safe (Kigali)"],
    cons:["30% income and corporate tax","Small domestic market","No digital nomad visa","Limited infrastructure","Developing economy"],
    bestFor:["Africa-focused entrepreneurs","impact investors","East Africa market entry"], lastUpdated:"2024-01"
  },
  {
    slug: "bahamas", name: "Bahamas", flag: "\ud83c\udde7\ud83c\uddf8", region: "Caribbean", currency: "BSD",
    incomeTax: { brackets: [{min:0,max:null,rate:0}], topRate:0, notes:"No personal income tax, capital gains tax, or wealth tax." },
    corporateTax: { standardRate:0, notes:"No corporate income tax. Business license fees apply based on turnover." },
    vat: { standardRate:10, reducedRates:[0], notes:"10% VAT standard rate (reduced from 12% in 2022). 0% on breadbasket items." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax." },
    socialSecurity: { employeeRate:3.9, employerRate:5.9, selfEmployedRate:8.8, notes:"NIB (National Insurance Board) contributions." },
    specialRegimes: [
      { name:"HEART (Bahamas Residence Card)", description:"Permanent residency for high-net-worth individuals making economic contribution.", eligibility:"Must purchase property of at least BSD 750,000 or invest in approved project." }
    ],
    taxTreaties:2, costOfLivingIndex:85, qualityOfLifeIndex:60, digitalNomadVisa:true,
    digitalNomadVisaDetails:"BEATS (Bahamas Extended Access Travel Stay). Must earn at least USD 750/year (effectively no minimum). Valid 1 year.",
    summary:"The Bahamas is a zero-tax paradise with no income, corporate, or capital gains taxes. Revenue comes primarily from VAT and import duties. The BEATS program makes it easy for remote workers to relocate. High cost of living and import dependency are the main drawbacks.",
    pros:["Zero income tax","Zero corporate tax","Zero capital gains tax","BEATS digital nomad program","Beautiful Caribbean location"],
    cons:["High cost of living","10% VAT","Limited domestic economy","Hurricane risk","Dependent on imports","Very few tax treaties"],
    bestFor:["high-net-worth individuals","investment income earners","remote workers"], lastUpdated:"2024-01"
  },
  {
    slug: "cayman-islands", name: "Cayman Islands", flag: "\ud83c\uddf0\ud83c\uddfe", region: "Caribbean", currency: "KYD",
    incomeTax: { brackets: [{min:0,max:null,rate:0}], topRate:0, notes:"No direct taxes: no income tax, corporate tax, capital gains tax, or withholding tax." },
    corporateTax: { standardRate:0, notes:"No corporate income tax. Government revenue from duties, fees, and licenses." },
    vat: { standardRate:0, reducedRates:[], notes:"No VAT or sales tax. Revenue from import duties (22-27% on most goods)." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax." },
    socialSecurity: { employeeRate:5, employerRate:5, selfEmployedRate:10, notes:"Pension contributions to approved private pension funds." },
    specialRegimes: [
      { name:"Global Citizen Concierge Program", description:"2-year certificate for remote workers to live and work in the Cayman Islands.", eligibility:"Must earn at least USD 100,000/year (individual) or USD 150,000 (couple). Must have health insurance." }
    ],
    taxTreaties:0, costOfLivingIndex:120, qualityOfLifeIndex:70, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Global Citizen Concierge Program. Must earn USD 100,000+/year (individual). Valid 2 years.",
    summary:"The Cayman Islands is the world's most famous zero-tax jurisdiction with no income, corporate, VAT, or capital gains taxes. It's a major global financial center and offshore fund domicile. The extremely high cost of living and income requirements limit access to high earners.",
    pros:["Absolutely zero taxes","Major financial center","Global Citizen program","Beautiful Caribbean location","English-speaking","Stable British Overseas Territory"],
    cons:["Extremely high cost of living","High import duties","Very high income requirement for residence","Small community","Hurricane risk","No tax treaties"],
    bestFor:["fund managers","ultra-high earners","financial professionals"], lastUpdated:"2024-01"
  },
  {
    slug: "bermuda", name: "Bermuda", flag: "\ud83c\udde7\ud83c\uddf2", region: "Caribbean", currency: "BMD",
    incomeTax: { brackets: [{min:0,max:null,rate:0}], topRate:0, notes:"No personal income tax." },
    corporateTax: { standardRate:15, notes:"15% corporate income tax effective 2025 for MNEs with global revenue over 750M EUR (OECD Pillar Two). 0% for others." },
    vat: { standardRate:0, reducedRates:[], notes:"No VAT. Revenue from customs duties, payroll tax, and land tax." },
    capitalGainsTax: { rate:0, notes:"No capital gains tax." },
    socialSecurity: { employeeRate:6, employerRate:8, selfEmployedRate:14, notes:"Payroll tax: complex rates by salary band. Combined employer/employee ~14% average." },
    specialRegimes: [
      { name:"Digital Nomad Work From Bermuda Certificate", description:"1-year certificate allowing remote workers to live in Bermuda.", eligibility:"Must be employed by or own a company outside Bermuda. Must have health insurance. No minimum income requirement stated." }
    ],
    taxTreaties:5, costOfLivingIndex:140, qualityOfLifeIndex:72, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Work From Bermuda Certificate. No strict minimum income. Must work for/own non-Bermuda company. Valid 1 year.",
    summary:"Bermuda is a renowned offshore financial center with no personal income tax, VAT, or capital gains tax. The 2025 introduction of 15% corporate tax for large multinationals represents a shift. The island offers a safe, English-speaking environment with stunning beaches but extreme cost of living.",
    pros:["Zero personal income tax","Zero capital gains tax","Safe English-speaking environment","Work From Bermuda program","Major insurance/reinsurance hub"],
    cons:["Extremely high cost of living","15% corporate tax for large MNEs from 2025","Very small territory","High import costs","Limited housing"],
    bestFor:["insurance/reinsurance professionals","high earners","remote workers who value safety"], lastUpdated:"2024-01"
  },
  {
    slug: "georgia", name: "Georgia", flag: "\ud83c\uddec\ud83c\uddea", region: "Europe", currency: "GEL",
    incomeTax: { brackets: [{min:0,max:null,rate:20}], topRate:20, notes:"Flat 20% rate. Small business status: 1% on turnover up to 500k GEL." },
    corporateTax: { standardRate:15, notes:"15% but only on distributed profits (Estonian-style). Undistributed profits are tax-free." },
    vat: { standardRate:18, reducedRates:[], notes:"18% standard rate. Threshold for registration: 100k GEL annual turnover." },
    capitalGainsTax: { rate:20, notes:"Taxed as regular income. Exempt for Georgian-source securities listed on Georgian exchange." },
    socialSecurity: { employeeRate:2, employerRate:2, selfEmployedRate:4, notes:"Pension contributions: 2% each employer/employee. Government adds 2% for lower earners." },
    specialRegimes: [
      { name:"Small Business Status", description:"1% tax on gross revenue for businesses with turnover under 500k GEL (~USD 190k).", eligibility:"Individual entrepreneur with annual turnover under 500k GEL." },
      { name:"Virtual Zone Person", description:"0% corporate tax on IT services income from foreign sources.", eligibility:"IT companies exporting services. Must apply for Virtual Zone certificate." },
      { name:"Individual Entrepreneur", description:"Flat 1% on turnover for qualifying small businesses. 3% for micro business.", eligibility:"Various thresholds apply based on business type." }
    ],
    taxTreaties:56, costOfLivingIndex:28, qualityOfLifeIndex:48, digitalNomadVisa:true,
    digitalNomadVisaDetails:"Remotely from Georgia program. Visa-free stay for many nationalities up to 1 year. No minimum income requirement for many passport holders.",
    summary:"Georgia is one of the most tax-friendly countries for freelancers and small businesses with a 1% turnover tax and 0% corporate tax on IT exports. The country offers visa-free entry for many nationalities, very low cost of living, and the Estonian-style corporate tax model. Tbilisi has a growing digital nomad scene.",
    pros:["1% small business tax","0% IT export tax (Virtual Zone)","0% tax on undistributed profits","Very low cost of living","Visa-free for many nationalities","Low social security (2%)"],
    cons:["20% flat income tax for employees","Developing infrastructure","Limited domestic market","Language barrier","Geopolitical risks"],
    bestFor:["freelancers","IT companies","small business owners","budget nomads"], lastUpdated:"2024-01"
  },
  {
    slug: "luxembourg", name: "Luxembourg", flag: "\ud83c\uddf1\ud83c\uddfa", region: "Europe", currency: "EUR",
    incomeTax: { brackets: [{min:0,max:11265,rate:0},{min:11265,max:13173,rate:8},{min:13173,max:15081,rate:9},{min:15081,max:16989,rate:10},{min:16989,max:18897,rate:11},{min:18897,max:20805,rate:12},{min:20805,max:22713,rate:14},{min:22713,max:24621,rate:16},{min:24621,max:26529,rate:18},{min:26529,max:28437,rate:20},{min:28437,max:30345,rate:22},{min:30345,max:32253,rate:24},{min:32253,max:34161,rate:26},{min:34161,max:36069,rate:28},{min:36069,max:37977,rate:30},{min:37977,max:39885,rate:32},{min:39885,max:41793,rate:34},{min:41793,max:43701,rate:36},{min:43701,max:45609,rate:38},{min:45609,max:100000,rate:39},{min:100000,max:150000,rate:40},{min:150000,max:200000,rate:41},{min:200000,max:null,rate:42}], topRate:42, notes:"Many narrow brackets. Plus solidarity surcharge (7-9% of tax) and municipal tax (~6.75% in Luxembourg City)." },
    corporateTax: { standardRate:24.94, notes:"17% corporate + 1.19% solidarity surcharge + 6.75% municipal = ~24.94% in Luxembourg City." },
    vat: { standardRate:17, reducedRates:[3,8,14], notes:"17% standard - lowest standard VAT in EU. 3% on food, books, children's clothes." },
    capitalGainsTax: { rate:21, longTermRate:21, notes:"Half of gains exempt after 6 months holding. 50k EUR exemption on some movable property." },
    socialSecurity: { employeeRate:12.45, employerRate:12.45, selfEmployedRate:24.9, notes:"Covers pension, health, long-term care, mutual insurance." },
    specialRegimes: [
      { name:"IP Regime", description:"80% exemption on net income from qualifying IP rights, resulting in effective rate of ~5%.", eligibility:"Must own qualifying IP rights (patents, copyrighted software, trademarks). Nexus approach applies." },
      { name:"SOPARFI (Holding Company)", description:"Participation exemption on dividends and capital gains from qualifying subsidiaries.", eligibility:"Must hold at least 10% or EUR 1.2M acquisition price. Various conditions apply." }
    ],
    taxTreaties:85, costOfLivingIndex:92, qualityOfLifeIndex:82, digitalNomadVisa:false,
    summary:"Luxembourg is a major financial center and EU institution hub with a sophisticated holding company regime and IP Box. The lowest standard VAT in the EU (17%) and a participation exemption make it attractive for corporate structuring. High quality of life but very high cost of living.",
    pros:["Lowest standard VAT in EU (17%)","IP regime ~5% effective rate","SOPARFI holding company benefits","EU financial center","Multilingual workforce","High quality of life"],
    cons:["High personal income tax (42%+)","No digital nomad visa","Very high cost of living","Small country","Complex multi-bracket system"],
    bestFor:["holding companies","fund management","IP-heavy businesses","EU institutions"], lastUpdated:"2024-01"
  }
];

const fs = require('fs');
fs.writeFileSync(
  'E:/WhereToPayLessTax/data/countries.json',
  JSON.stringify(countries, null, 2),
  'utf8'
);
console.log(`Generated ${countries.length} countries`);
