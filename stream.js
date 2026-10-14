// ============================================================
// MARGZEN - 5-STEP COMPLETE ADAPTIVE PATH PLANNER
// Stream ➔ Degree ➔ Career ➔ Workplace ➔ Time & Deadline
// ============================================================

// Where the wizard sends the user once the roadmap is generated.
// Change this one line if your dashboard page has a different name.
const ROADMAP_PAGE = 'roadmap.html';

let currentStep = 1;
let selectedStream = null;
let selectedDegree = null;
let selectedCareer = null;
let selectedWorkplace = null;
let dailyHours = 2.0;
let deadlineMonths = 3;

// Comprehensive 5-Level Academic, Career & Industry Database
const pathData = {
    // 1. PCM (ALL 23 ENGINEERING BRANCHES)
    pcm: {
        id: 'pcm',
        name: 'PCM',
        subtitle: 'Engineering, Tech & Physical Sciences',
        color: '#38BDF8',
        degrees: [
            { id: 'cse', code: 'CSE', title: 'Computer Science & Engineering', duration: '4 Years', tag: 'Core Computing', icon: '💻', highlights: ['Data Structures & Algorithms', 'Operating Systems', 'Cloud & Networks'] },
            { id: 'aiml', code: 'AI / AI-ML', title: 'Artificial Intelligence & Machine Learning', duration: '4 Years', tag: 'AI & Deep Learning', icon: '🤖', highlights: ['Neural Networks', 'Natural Language Processing', 'Computer Vision'] },
            { id: 'it', code: 'IT', title: 'Information Technology', duration: '4 Years', tag: 'Software & Cloud', icon: '💻', highlights: ['Enterprise Software', 'Database Management', 'Web Systems & DevOps'] },
            { id: 'ece', code: 'ECE', title: 'Electronics & Communication', duration: '4 Years', tag: 'Silicon & 5G/6G', icon: '📡', highlights: ['VLSI Microchips', 'Digital Signal Processing', 'Wireless Communications'] },
            { id: 'electrical', code: 'Electrical', title: 'Electrical Engineering', duration: '4 Years', tag: 'Power & Grid', icon: '⚡', highlights: ['Power Systems', 'Renewable Energy', 'High Voltage Transformers'] },
            { id: 'electronics', code: 'Electronics', title: 'Electronics & Instrumentation', duration: '4 Years', tag: 'Sensors & Automation', icon: '🔌', highlights: ['Industrial Automation', 'Embedded Controllers', 'Micro-Sensors'] },
            { id: 'mechanical', code: 'Mechanical', title: 'Mechanical Engineering', duration: '4 Years', tag: 'Thermodynamics & Design', icon: '⚙️', highlights: ['CAD/CAM Modeling', 'Thermodynamics', 'Finite Element Analysis'] },
            { id: 'civil', code: 'Civil', title: 'Civil & Infrastructure Engineering', duration: '4 Years', tag: 'Structures & Cities', icon: '🏗️', highlights: ['Structural Mechanics', 'Smart Infrastructure', 'Geotechnical Engineering'] },
            
        ],
        careers: {
            cse: [
                { id: 'swe_dev', title: 'Software Developer / Engineer', icon: '💻', role: 'Build high-performance web, backend, and distributed software systems.' },
                { id: 'cloud_architect', title: 'Cloud & DevOps Solutions Architect', icon: '☁️', role: 'Manage cloud clusters (AWS/GCP), CI/CD pipelines, and microservices.' },
                { id: 'cybersecurity_lead', title: 'Cybersecurity & Systems Architect', icon: '🛡️', role: 'Design enterprise defense against cyberattacks and zero-day vulnerabilities.' }
            ],
            aiml: [
                { id: 'ai_engineer', title: 'AI & Machine Learning Engineer', icon: '🤖', role: 'Develop predictive deep neural networks, LLM agents, and computer vision.' }
            ],
            default: [
                { id: 'tech_specialist', title: 'Core Engineering Specialist', icon: '⚙️', role: 'Lead technical design, process implementation, and industrial solutions.' },
                { id: 'rnd_engineer', title: 'Research & Development Engineer', icon: '🔬', role: 'Innovate advanced technologies, materials, and specialized industrial workflows.' }
            ]
        },
        workplaces: {
            cse: [
                { id: 'startup', title: 'Tech Startup', icon: '🚀', tag: 'Fast-Paced & Equity', desc: 'Fast execution, high ownership, modern open-source stacks.' },
                { id: 'product_mng', title: 'Product Company', icon: '🏢', tag: 'Google / Microsoft / Adobe', desc: 'Tier-1 tech giants building global-scale consumer & enterprise apps.' },
                { id: 'service_co', title: 'Service / Consulting Company', icon: '💼', tag: 'TCS / Infosys / Accenture', desc: 'Global digital consulting and client enterprise software delivery.' },
                { id: 'mnc', title: 'Global MNC', icon: '🌐', tag: 'Amazon / Apple / Meta', desc: 'Worldwide offices, established compensation, cross-functional collaboration.' },
                { id: 'saas', title: 'SaaS Enterprise', icon: '☁️', tag: 'Salesforce / Atlassian / Slack', desc: 'Cloud subscription platforms solving high-ticket business problems.' },
                { id: 'fintech', title: 'FinTech & High-Frequency Trading', icon: '💳', tag: 'Stripe / Zerodha / Razorpay', desc: 'Ultra-low latency trading systems, payment gateways, and crypto.' },
                { id: 'gov_psu', title: 'Government / PSU', icon: '🏛️', tag: 'ISRO / DRDO / NIC / IOCL', desc: 'National mission security, high job stability, and sovereign technology.' },
                { id: 'research_lab', title: 'Research & R&D Labs', icon: '🔬', tag: 'DeepMind / OpenAI / IIT Labs', desc: 'Cutting-edge academic and industrial foundational research.' }
            ],
            default: [
                { id: 'product_company', title: 'Product Company', icon: '🏢', tag: 'Core Engineering', desc: 'High-scale industrial engineering & hardware innovation.' },
                { id: 'tech_startup', title: 'High-Growth Startup', icon: '🚀', tag: 'Agile & Innovative', desc: 'Rapid execution with modern engineering stacks.' },
                { id: 'global_mnc', title: 'Global MNC', icon: '🌐', tag: 'Multi-National', desc: 'International enterprise operations with structured career ladders.' },
                { id: 'gov_psu', title: 'Government / PSU', icon: '🏛️', tag: 'National Projects', desc: 'Public sector undertaking with high job security.' }
            ]
        }
    },

    // 2. PCB
    pcb: {
        id: 'pcb',
        name: 'PCB',
        subtitle: 'Medical, Dental & Biological Sciences',
        color: '#4ADE80',
        degrees: [
            { id: 'mbbs', code: 'MBBS', title: 'Bachelor of Medicine & Surgery', duration: '5.5 Years', tag: 'Clinical Medicine', icon: '🩺', highlights: ['Anatomy & Physiology', 'Clinical Surgery', 'Pathology & Pharmacology'] },
            { id: 'bds', code: 'BDS', title: 'Bachelor of Dental Surgery', duration: '5 Years', tag: 'Dental Healthcare', icon: '🦷', highlights: ['Oral Pathology', 'Dental Surgery', 'Orthodontics & Implants'] },
            { id: 'bpharm', code: 'B.Pharm', title: 'Bachelor of Pharmacy', duration: '4 Years', tag: 'Pharmaceuticals', icon: '💊', highlights: ['Medicinal Chemistry', 'Pharmaceutics', 'Clinical Drug Formulation'] },
            { id: 'bscnursing', code: 'B.Sc Nursing', title: 'Nursing & Patient Care', duration: '4 Years', tag: 'Healthcare Services', icon: '🏥', highlights: ['Critical Care Nursing', 'Medical-Surgical', 'Community Health'] },
            { id: 'bpt', code: 'BPT', title: 'Bachelor of Physiotherapy', duration: '4.5 Years', tag: 'Physical Rehabilitation', icon: '🏃‍♂️', highlights: ['Biomechanics', 'Orthopedic Rehab', 'Sports Medicine'] },
            { id: 'biotech', code: 'B.Sc Biotechnology', title: 'Biotechnology & Genetics', duration: '3-4 Years', tag: 'Bio-Engineering', icon: '🧬', highlights: ['Genetic Engineering', 'Molecular Biology', 'Immunology & Gene Editing'] },
            { id: 'microbio', code: 'B.Sc Microbiology', title: 'Microbiology & Pathology', duration: '3 Years', tag: 'Diagnostics & Research', icon: '🔬', highlights: ['Virology & Bacteriology', 'Clinical Diagnostics', 'Microbial Genetics'] },
            { id: 'bams', code: 'BAMS / BHMS', title: 'Ayurvedic & Alternative Medicine', duration: '5.5 Years', tag: 'Integrative Health', icon: '🌿', highlights: ['Herbal Pharmacology', 'Holistic Diagnostics', 'Clinical Practice'] }
        ],
        careers: {
            mbbs: [
                { id: 'physician', title: 'Medical Doctor / Physician', icon: '👨‍⚕️', role: 'Primary patient diagnosis, clinical management and general healthcare consultation.' },
                { id: 'surgeon', title: 'Specialist Surgeon (Cardio/Neuro/Ortho)', icon: '🔪', role: 'Perform specialized surgical operations in multi-specialty hospitals.' },
                { id: 'pediatrician', title: 'Pediatrician / Child Specialist', icon: '👶', role: 'Dedicated healthcare, critical care and treatment for children.' }
            ],
            default: [
                { id: 'doctor_gen', title: 'Healthcare Specialist', icon: '🩺', role: 'Comprehensive patient diagnosis, clinical care, and recovery protocols.' }
            ]
        },
        workplaces: {
            default: [
                { id: 'hospital', title: 'Multispecialty Hospital', icon: '🏥', tag: 'Apollo / Fortis / AIIMS', desc: 'High patient inflow, tertiary surgery, critical care units.' },
                { id: 'private_clinic', title: 'Private Clinic / Practice', icon: '🩺', tag: 'Independent', desc: 'Personalized outpatient care and independent medical consultation.' },
                { id: 'pharma_giant', title: 'Pharmaceutical Giant', icon: '💊', tag: 'Pfizer / Cipla / Sun Pharma', desc: 'Drug manufacturing, formulation R&D, and quality control.' },
                { id: 'gov_hospital', title: 'Government Healthcare / Armed Forces', icon: '🏛️', tag: 'Civil / AFMC / Railways', desc: 'Public healthcare service with high prestige and pension.' },
                { id: 'healthtech_startup', title: 'HealthTech Startup', icon: '🚀', tag: '1mg / Practo / Innovaccer', desc: 'Tele-medicine, AI diagnostics, and digital healthcare products.' }
            ]
        }
    },

    // 3. COMMERCE
    commerce: {
        id: 'commerce',
        name: 'Commerce',
        subtitle: 'Finance, Banking & Strategic Management',
        color: '#FBBF24',
        degrees: [
            { id: 'ca_chartered', code: 'CA (ICAI)', title: 'Chartered Accountancy', duration: '4.5-5 Years', tag: 'Auditing, Tax & Finance', icon: '📑', highlights: ['Advanced Corporate Auditing', 'Direct & Indirect Taxation', 'Strategic Financial Management'] },
            { id: 'bcom_hons', code: 'B.Com (Hons)', title: 'Bachelor of Commerce (Honours)', duration: '3-4 Years', tag: 'Commerce & Accounting', icon: '📈', highlights: ['Corporate Financial Accounting', 'Commercial Law', 'Banking & Insurance'] },
            { id: 'bba_ipm', code: 'BBA / IPM (IIMs)', title: 'Business Administration & Management', duration: '3-5 Years', tag: 'Corporate Strategy', icon: '💼', highlights: ['Strategic Business Leadership', 'Brand Management', 'International Business'] },
            { id: 'bms_bfia', code: 'BMS / BFIA', title: 'Financial & Investment Analysis', duration: '3 Years', tag: 'Capital Markets', icon: '💹', highlights: ['Portfolio & Equity Valuation', 'Derivatives & Risk', 'Mergers & Acquisitions'] },
            { id: 'actuarial_sci', code: 'B.Sc Actuarial Science', title: 'Actuarial & Quantitative Risk', duration: '3-4 Years', tag: 'Risk Modeling & Math', icon: '🎲', highlights: ['Stochastic Risk Models', 'Life Contingencies', 'Insurance Mathematics'] }
        ],
        careers: {
            bcom_hons: [
                { id: 'accountant', title: 'Corporate Accountant / Controller', icon: '📑', role: 'Maintain general ledgers, corporate financial statements, and tax reconciliations.' },
                { id: 'financial_analyst', title: 'Financial Analyst', icon: '📊', role: 'Build financial forecasting models, budget variance reports, and KPI dashboards.' }
            ],
            default: [
                { id: 'finance_lead', title: 'Finance & Strategy Consultant', icon: '💼', role: 'Advise leadership on profitability, investment risks, and operations.' }
            ]
        },
        workplaces: {
            default: [
                { id: 'ca_firm', title: 'CA & Audit Firm', icon: '📑', tag: 'Big 4 (PwC / EY / Deloitte / KPMG)', desc: 'Auditing, corporate taxation, and statutory compliance.' },
                { id: 'corporate_company', title: 'Corporate Company', icon: '🏢', tag: 'Tata / Reliance / Unilever', desc: 'In-house corporate finance, internal audits, and accounting.' },
                { id: 'mnc_finance', title: 'Multi-National Corporation', icon: '🌐', tag: 'Global MNC', desc: 'International treasury, shared services, and cross-border finance.' },
                { id: 'bank', title: 'Commercial & Investment Bank', icon: '🏦', tag: 'HDFC / ICICI / JP Morgan', desc: 'Retail banking, wealth management, and corporate lending.' },
                { id: 'financial_inst', title: 'Financial Institution & NBFC', icon: '📈', tag: 'Goldman Sachs / Bajaj Finance', desc: 'Asset management, venture capital, and hedge funds.' },
                { id: 'gov_psu_fin', title: 'Government / PSU', icon: '🏛️', tag: 'RBI / SEBI / LIC / CAG', desc: 'Sovereign financial regulation and public banking management.' },
                { id: 'fintech_startup', title: 'FinTech Startup', icon: '🚀', tag: 'Cred / PhonePe / Zerodha', desc: 'Disruptive digital payments, neo-banking, and algorithmic trading.' }
            ]
        }
    },

    // 4. ARTS
    arts: {
        id: 'arts',
        name: 'Arts',
        subtitle: 'Humanities, Law, Media & Social Sciences',
        color: '#C084FC',
        degrees: [
            { id: 'ba_psych', code: 'BA Psychology', title: 'Psychology & Behavioral Science', duration: '3-4 Years', tag: 'Mental Health & Mind', icon: '🧠', highlights: ['Cognitive Psychology', 'Clinical Assessment', 'Counseling Interventions'] },
            { id: 'ba_llb', code: 'BA LLB (Hons)', title: '5-Year Integrated Corporate & Criminal Law', duration: '5 Years', tag: 'Legal Jurisprudence', icon: '⚖️', highlights: ['Constitutional Law', 'Corporate Mergers Law', 'Criminal Litigation & IPR'] },
            { id: 'ba_journalism', code: 'BA Journalism & Mass Media', title: 'Mass Communication & Digital Media', duration: '3 Years', tag: 'Media & Broadcasting', icon: '🎙️', highlights: ['Investigative Reporting', 'Broadcast Production', 'Digital Content Strategy'] }
        ],
        careers: {
            default: [
                { id: 'policy_lead', title: 'Public Policy & Media Strategist', icon: '🏛️', role: 'Lead governmental policies, digital media broadcast, or product design.' }
            ]
        },
        workplaces: {
            default: [
                { id: 'law_firm', title: 'Tier-1 Law Firm', icon: '⚖️', tag: 'AZB / Shardul Amarchand', desc: 'High-stakes corporate M&A, cross-border arbitration, IP litigation.' },
                { id: 'think_tank', title: 'UN / Global Think Tank', icon: '🌐', tag: 'United Nations / NITI Aayog', desc: 'Sovereign public policy, human rights, and economic governance.' },
                { id: 'media_house', title: 'Media & Broadcasting House', icon: '📺', tag: 'NDTV / BBC / Times Group', desc: 'Television broadcasting, investigative journalism, and documentary.' }
            ]
        }
    },

    // 5. HONOURS
    honours: {
        id: 'honours',
        name: 'Honours',
        subtitle: 'Advanced Specialisation & Pure Scientific Research',
        color: '#F472B6',
        degrees: [
            { id: 'hons_physics', code: 'B.Sc (Hons) Physics', title: 'Pure Physics & Quantum Theory', duration: '3-4 Years', tag: 'Theoretical Physics', icon: '🌌', highlights: ['Quantum Mechanics', 'Relativity & Astrophysics', 'Condensed Matter Physics'] },
            { id: 'hons_maths', code: 'B.Sc (Hons) Mathematics', title: 'Pure Mathematics & Logic', duration: '3-4 Years', tag: 'Pure Math & Logic', icon: '📐', highlights: ['Abstract Algebra', 'Topology & Differential Geometry', 'Complex Analysis'] }
        ],
        careers: {
            default: [
                { id: 'quantum_scientist', title: 'Research Scientist / Fellow', icon: '🔬', role: 'Lead foundational scientific breakthroughs in world-class research laboratories.' }
            ]
        },
        workplaces: {
            default: [
                { id: 'national_lab', title: 'National & Global Research Lab', icon: '🔬', tag: 'ISRO / CERN / BARC / Max Planck', desc: 'Supercomputing, quantum hardware, astrophysics, and deep tech.' },
                { id: 'premier_univ', title: 'Premier University Institute', icon: '🎓', tag: 'IITs / IISc / Oxford / MIT', desc: 'Doctoral research, theoretical proofs, and academic instruction.' }
            ]
        }
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('margzen_user_name') || 'Student';
    const userDisplayName = document.getElementById('userDisplayName');
    if (userDisplayName) {
        userDisplayName.textContent = `${savedUser}'s Path`;
    }

    const savedStream = localStorage.getItem('margzen_selected_stream') || 'pcm';
    const targetCard = document.querySelector(`.${savedStream}-card`);
    if (targetCard) selectStream(savedStream, targetCard);

    // Sync the combo inputs with the initial state variables (in case markup defaults ever drift).
    const dailyInput = document.getElementById('dailyHoursInput');
    const monthsInput = document.getElementById('deadlineMonthsInput');
    if (dailyInput) dailyInput.value = dailyHours;
    if (monthsInput) monthsInput.value = deadlineMonths;

    updateCalculationBanner();
});

// Stream cards carry tabindex="0" but had no keyboard handler.
document.addEventListener('keydown', (event) => {
    const card = document.activeElement;
    if (!card || !card.classList || !card.classList.contains('stream-card')) return;
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
    }
});

// Close any open combo dropdown when clicking outside of it.
document.addEventListener('click', (event) => {
    if (!event.target.closest('.combo-field')) {
        document.querySelectorAll('.combo-dropdown-list').forEach(list => list.classList.remove('open'));
    }
});

// Close dropdowns on Escape for keyboard users.
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.combo-dropdown-list').forEach(list => list.classList.remove('open'));
    }
});

// STEP 01: SELECT STREAM
function selectStream(streamId, cardElement) {
    selectedStream = streamId;
    selectedDegree = null;
    selectedCareer = null;
    selectedWorkplace = null;

    document.querySelectorAll('.stream-card').forEach(card => card.classList.remove('selected'));
    if (cardElement) cardElement.classList.add('selected');

    const btnContinue = document.getElementById('btnContinueStream');
    if (btnContinue) {
        btnContinue.disabled = false;
        btnContinue.querySelector('span').textContent = `Proceed to Degrees for ${streamId.toUpperCase()}`;
    }

    localStorage.setItem('margzen_selected_stream', streamId);
}

function proceedToStep2() {
    if (!selectedStream) return;
    renderDegreesGrid(selectedStream);
    goToStep(2);
}

// STEP 02: SELECT DEGREE
function renderDegreesGrid(streamId) {
    const stream = pathData[streamId];
    if (!stream) return;

    updateBreadcrumbs();

    const subtitle = document.getElementById('degreeSubtitle');
    if (subtitle) {
        subtitle.innerHTML = `Explore and select your discipline under <strong>${stream.name} (${stream.subtitle})</strong>.`;
    }

    const grid = document.getElementById('degreesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    stream.degrees.forEach(deg => {
        const card = document.createElement('div');
        card.className = `degree-card ${selectedDegree && selectedDegree.id === deg.id ? 'selected' : ''}`;
        card.onclick = () => selectDegree(deg, card);

        const highlightTags = deg.highlights.map(h => `<span class="deg-subject-tag">${h}</span>`).join('');

        card.innerHTML = `
            <div class="degree-card-top">
                <div class="deg-icon-bubble">${deg.icon}</div>
                <div class="deg-duration-pill">${deg.duration}</div>
            </div>
            <h3 class="degree-code">${deg.code}</h3>
            <p class="degree-title">${deg.title}</p>
            <span class="degree-field-tag">${deg.tag}</span>
            <div class="degree-highlights-wrap">
                ${highlightTags}
            </div>
            <div class="card-select-badge">✓</div>
        `;

        grid.appendChild(card);
    });

    const btnContinue = document.getElementById('btnContinueDegree');
    if (btnContinue) {
        btnContinue.disabled = selectedDegree ? false : true;
        if (selectedDegree) {
            btnContinue.querySelector('span').textContent = `Proceed to Careers for ${selectedDegree.code}`;
        }
    }
}

function selectDegree(degreeObj, cardElement) {
    selectedDegree = degreeObj;
    selectedCareer = null;
    selectedWorkplace = null;

    document.querySelectorAll('.degree-card').forEach(c => c.classList.remove('selected'));
    if (cardElement) cardElement.classList.add('selected');

    const btnContinue = document.getElementById('btnContinueDegree');
    if (btnContinue) {
        btnContinue.disabled = false;
        btnContinue.querySelector('span').textContent = `Proceed to Careers for ${degreeObj.code}`;
    }

    localStorage.setItem('margzen_selected_degree', JSON.stringify(degreeObj));
}

function proceedToStep3() {
    if (!selectedDegree) return;
    renderCareersGrid(selectedStream, selectedDegree);
    goToStep(3);
}

// STEP 03: SELECT CAREER
function renderCareersGrid(streamId, degreeObj) {
    const stream = pathData[streamId];
    if (!stream || !degreeObj) return;

    updateBreadcrumbs();

    const subtitle = document.getElementById('careerSubtitle');
    if (subtitle) {
        subtitle.innerHTML = `Select your target professional role after completing <strong>${degreeObj.code}</strong>.`;
    }

    const grid = document.getElementById('careersGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const careersList = (stream.careers && stream.careers[degreeObj.id]) ? stream.careers[degreeObj.id] : stream.careers.default || [];

    careersList.forEach(career => {
        const card = document.createElement('div');
        card.className = `career-card ${selectedCareer && selectedCareer.id === career.id ? 'selected' : ''}`;
        card.onclick = () => selectCareer(career, card);

        card.innerHTML = `
            <div class="career-icon-bubble">${career.icon}</div>
            <div class="career-content">
                <h3 class="career-title">${career.title}</h3>
                <p class="career-description">${career.role}</p>
                <div class="career-badges-row">
                    <span class="career-pill">High Growth</span>
                    <span class="career-pill">AI Prepared</span>
                </div>
            </div>
            <div class="card-select-badge">✓</div>
        `;

        grid.appendChild(card);
    });

    const btnContinueCareer = document.getElementById('btnContinueCareer');
    if (btnContinueCareer) {
        btnContinueCareer.disabled = selectedCareer ? false : true;
    }
}

function selectCareer(careerObj, cardElement) {
    selectedCareer = careerObj;
    selectedWorkplace = null;

    document.querySelectorAll('.career-card').forEach(c => c.classList.remove('selected'));
    if (cardElement) cardElement.classList.add('selected');

    const btnContinueCareer = document.getElementById('btnContinueCareer');
    if (btnContinueCareer) {
        btnContinueCareer.disabled = false;
        btnContinueCareer.querySelector('span').textContent = `Proceed to Workplace for ${careerObj.title}`;
    }

    localStorage.setItem('margzen_selected_career', JSON.stringify(careerObj));
}

function proceedToStep4() {
    if (!selectedCareer) return;
    renderWorkplacesGrid(selectedStream, selectedDegree, selectedCareer);
    goToStep(4);
}

// STEP 04: SELECT COMPANY / WORKPLACE TYPE
function renderWorkplacesGrid(streamId, degreeObj, careerObj) {
    const stream = pathData[streamId];
    if (!stream) return;

    updateBreadcrumbs();

    const subtitle = document.getElementById('workplaceSubtitle');
    if (subtitle) {
        subtitle.innerHTML = `Select your target company / workplace environment for <strong>${careerObj.title}</strong> (${degreeObj.code}).`;
    }

    const grid = document.getElementById('workplacesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const workplacesList = (stream.workplaces && stream.workplaces[degreeObj.id]) ? stream.workplaces[degreeObj.id] : stream.workplaces.default || [];

    workplacesList.forEach(wp => {
        const card = document.createElement('div');
        card.className = `workplace-card ${selectedWorkplace && selectedWorkplace.id === wp.id ? 'selected' : ''}`;
        card.onclick = () => selectWorkplace(wp, card);

        card.innerHTML = `
            <div class="workplace-card-top">
                <div class="workplace-icon-bubble">${wp.icon}</div>
                <span class="workplace-tag-pill">${wp.tag}</span>
            </div>
            <h3 class="workplace-title">${wp.title}</h3>
            <p class="workplace-desc">${wp.desc}</p>
            <div class="card-select-badge">✓</div>
        `;

        grid.appendChild(card);
    });

    const btnContinueWorkplace = document.getElementById('btnContinueWorkplace');
    if (btnContinueWorkplace) {
        btnContinueWorkplace.disabled = selectedWorkplace ? false : true;
    }
}

function selectWorkplace(workplaceObj, cardElement) {
    selectedWorkplace = workplaceObj;

    document.querySelectorAll('.workplace-card').forEach(c => c.classList.remove('selected'));
    if (cardElement) cardElement.classList.add('selected');

    const btnContinueWorkplace = document.getElementById('btnContinueWorkplace');
    if (btnContinueWorkplace) {
        btnContinueWorkplace.disabled = false;
        btnContinueWorkplace.querySelector('span').textContent = `Proceed to Timeline for ${workplaceObj.title}`;
    }

    localStorage.setItem('margzen_selected_workplace', JSON.stringify(workplaceObj));
}

function proceedToStep5() {
    if (!selectedWorkplace) return;
    updateBreadcrumbs();
    updateCalculationBanner();
    goToStep(5);
}

// ============================================================
// STEP 05: TIME & DEADLINE — single combo input + dropdown fields
// ============================================================

// Toggles a combo dropdown open/closed. Pass forceOpen=true to always open
// (used on input focus), otherwise it just flips the current state.
function toggleComboDropdown(dropdownId, forceOpen) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    // Close any other open dropdown first, so only one is visible at a time.
    document.querySelectorAll('.combo-dropdown-list').forEach(list => {
        if (list.id !== dropdownId) list.classList.remove('open');
    });

    if (forceOpen === true) {
        dropdown.classList.add('open');
    } else {
        dropdown.classList.toggle('open');
    }
}

// Called when a dropdown option is clicked: fills the input with that value
// and closes the dropdown, then re-runs the same logic as typing manually.
function selectComboOption(inputId, dropdownId, value) {
    const input = document.getElementById(inputId);
    if (input) input.value = value;

    const dropdown = document.getElementById(dropdownId);
    if (dropdown) dropdown.classList.remove('open');

    if (inputId === 'dailyHoursInput') {
        handleDailyHoursInput(value);
    } else if (inputId === 'deadlineMonthsInput') {
        handleMonthsInput(value);
    }
}

// Fires on every keystroke in the Hours/Day input (typed OR set via preset).
function handleDailyHoursInput(val) {
    if (String(val).trim() === '') return; // user is mid-edit, keep last valid value
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0 && num <= 16) {
        dailyHours = num;
        updateCalculationBanner();
    }
}

// Fires on every keystroke in the Months input (typed OR set via preset).
function handleMonthsInput(val) {
    if (String(val).trim() === '') return; // user is mid-edit, keep last valid value
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0 && num <= 36) {
        deadlineMonths = num;
        updateCalculationBanner();
    }
}

function updateCalculationBanner() {
    const totalDays = deadlineMonths * 30;
    const totalHours = Math.round(dailyHours * totalDays);

    const titleEl = document.getElementById('calcSummaryTitle');
    const descEl = document.getElementById('calcSummaryDesc');

    if (titleEl) {
        titleEl.textContent = `Total Target: ~${totalHours} Dedicated Study Hours`;
    }
    if (descEl) {
        descEl.textContent = `Calculated at ${dailyHours.toFixed(1)} hrs/day for ${deadlineMonths} months (~${totalDays} study days). AI daily targets & quizzes will adapt dynamically to this pace.`;
    }
}

// FINALIZATION
function finalizeRoadmap() {
    if (!selectedStream || !selectedDegree || !selectedCareer || !selectedWorkplace) {
        return;
    }

    const btn = document.getElementById('btnGenerateRoadmap');
    const btnSpan = btn ? btn.querySelector('span') : null;
    const originalText = btnSpan ? btnSpan.textContent : '';
    if (btnSpan) btnSpan.textContent = 'Configuring Adaptive Daily Targets & Roadmap...';
    if (btn) btn.disabled = true;

    const fullProfile = {
        stream: selectedStream.toUpperCase(),
        degree: selectedDegree.code,
        degreeTitle: selectedDegree.title,
        career: selectedCareer.title,
        workplace: selectedWorkplace.title,
        dailyHours: dailyHours,
        deadlineMonths: deadlineMonths,
        totalHours: Math.round(dailyHours * deadlineMonths * 30),
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('margzen_active_path', JSON.stringify(fullProfile));

    setTimeout(() => {
        // Restore the button first, so a blocked or failed navigation
        // does not leave it stuck on "Configuring...".
        if (btnSpan) btnSpan.textContent = originalText;
        if (btn) btn.disabled = false;

        window.location.href = ROADMAP_PAGE;
    }, 1200);
}

// BREADCRUMBS & NAVIGATION
function updateBreadcrumbs() {
    const streamName = selectedStream ? pathData[selectedStream].name : 'Stream';
    const degCode = selectedDegree ? selectedDegree.code : 'Degree';
    const careerTitle = selectedCareer ? selectedCareer.title : 'Career';
    const wpTitle = selectedWorkplace ? selectedWorkplace.title : 'Workplace';

    ['trailStreamName', 'trailStreamName2', 'trailStreamName3', 'trailStreamName4'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = streamName;
    });

    ['trailDegreeName', 'trailDegreeName2', 'trailDegreeName3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = degCode;
    });

    ['trailCareerName', 'trailCareerName2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = careerTitle;
    });

    const wpEl = document.getElementById('trailWorkplaceName');
    if (wpEl) wpEl.textContent = wpTitle;
}

function goToStep(stepNumber) {
    if (stepNumber === 2 && !selectedStream) return;
    if (stepNumber === 3 && (!selectedStream || !selectedDegree)) return;
    if (stepNumber === 4 && (!selectedStream || !selectedDegree || !selectedCareer)) return;
    if (stepNumber === 5 && (!selectedStream || !selectedDegree || !selectedCareer || !selectedWorkplace)) return;

    currentStep = stepNumber;

    for (let i = 1; i <= 5; i++) {
        const section = document.getElementById(`wizardStep${i}`);
        const pill = document.getElementById(`stepPill${i}`);
        if (section) section.classList.toggle('active', i === stepNumber);
        if (pill) {
            pill.classList.toggle('active', i === stepNumber);
            pill.classList.toggle('completed', i < stepNumber);
        }
    }

    for (let l = 1; l <= 4; l++) {
        const line = document.getElementById(`line${l}`);
        if (line) line.classList.toggle('active', stepNumber > l);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}