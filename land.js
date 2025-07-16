const inputsDiv = document.getElementById('inputs');
const shapeSelect = document.getElementById('shape');

shapeSelect.addEventListener('change', () => renderInputs(shapeSelect.value));
window.onload = () => renderInputs(shapeSelect.value);

function renderInputs(shape) {
  if (shape === 'rectangle') {
    inputsDiv.innerHTML = `
      <label>দৈর্ঘ্য (ফুট):</label>
      <input type="number" id="length">
      <label>প্রস্থ (ফুট):</label>
      <input type="number" id="width">
    `;
  } else if (shape === 'triangle') {
    inputsDiv.innerHTML = `
      <label>ত্রিভুজের ধরন নির্বাচন করুন:</label>
      <select id="triangleType">
        <option value="scalene">অসমবাহু</option>
        <option value="equilateral">সমবাহু</option>
        <option value="isosceles">সমদ্বিবাহু</option>
      </select>
      <div id="triangleInputs"></div>
    `;
    setTimeout(() => {
      document.getElementById('triangleType').addEventListener('change', renderTriangleInputs);
      renderTriangleInputs();
    }, 10);
  } else if (shape === 'rightTriangle') {
    inputsDiv.innerHTML = `
      <label>ভিত্তি (ফুট):</label>
      <input type="number" id="base">
      <label>উচ্চতা (ফুট):</label>
      <input type="number" id="height">
      <label>কর্ণ (Hypotenuse) (ফুট):</label>
      <input type="number" id="rt_hypotenuse" placeholder="অতিভূজ">
      <label>কোণ (Angle θ) (ডিগ্রি):</label>
      <input type="number" id="rt_angle" placeholder="কোণ θ">
    `;
  } else if (shape === 'circle') {
    inputsDiv.innerHTML = `
      <label>ব্যাসার্ধ (ফুট):</label>
      <input type="number" id="radius">
    `;
  } else if (shape === 'trapezium') {
    inputsDiv.innerHTML = `
      <label>উপরের ভূমি (base1) (ফুট):</label>
      <input type="number" id="base1">
      <label>নিচের ভূমি (base2) (ফুট):</label>
      <input type="number" id="base2">
      <label>উচ্চতা (ফুট):</label>
      <input type="number" id="height">
    `;
  } else if (shape === 'quadrilateral') {
    inputsDiv.innerHTML = `
      <label>প্রথম বাহু A (ফুট):</label>
      <input type="number" id="qa">
      <label>দ্বিতীয় বাহু B (ফুট):</label>
      <input type="number" id="qb">
      <label>তৃতীয় বাহু C (ফুট):</label>
      <input type="number" id="qc">
      <label>চতুর্থ বাহু D (ফুট):</label>
      <input type="number" id="qd">
      <label>কোণ θ (A ও C এর মাঝে) ডিগ্রিতে:</label>
      <input type="number" id="angle">
    `;
  } else if (shape === 'square') {
    inputsDiv.innerHTML = `
      <label>একটি বাহু (ফুট):</label>
      <input type="number" id="side">
    `;
  } else if (shape === 'parallelogram') {
    inputsDiv.innerHTML = `
      <label>ভূমি (ফুট):</label>
      <input type="number" id="base">
      <label>উচ্চতা (ফুট):</label>
      <input type="number" id="height">
    `;
  } else if (shape === 'rhombus') {
    inputsDiv.innerHTML = `
      <label>প্রথম কর্ণ A1  (ফুট):</label>
      <input type="number" id="d1">
      <label>দ্বিতীয় কর্ণ A2 (ফুট):</label>
      <input type="number" id="d2">
    `;
  }
}


//⛔⛔

function renderTriangleInputs() {
  const type = document.getElementById('triangleType').value;
  const div = document.getElementById('triangleInputs');

  if (type === 'scalene') {
    div.innerHTML = `
      <label>প্রথম বাহু A (ফুট):</label>
      <input type="number" id="a">
      <label>দ্বিতীয় বাহু B (ফুট):</label>
      <input type="number" id="b">
      <label>তৃতীয় বাহু C (ফুট):</label>
      <input type="number" id="c">
    `;
  } else if (type === 'equilateral') {
    div.innerHTML = `
      <label>বাহু a (ফুট):</label>
      <input type="number" id="a">
    `;
  } else if (type === 'isosceles') {
    div.innerHTML = `
      <label> দুটি সমান বাহু A (ফুট):</label>
      <input type="number" id="a">
      <label> একটি ভিন্ন বাহু B (ফুট):</label>
      <input type="number" id="b">
    `;
  }
}

function displayErrorMessage(message = '') {
  const errorDiv = document.getElementById('error');
  if (!errorDiv) return;

  errorDiv.innerText = '';
  errorDiv.style.display = 'none';

  if (message) {
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';

    setTimeout(() => {
      errorDiv.innerText = '';
      errorDiv.style.display = 'none';
    }, 3000);
  }
}

function validateInputs(fields) {
  const missing = [];
  const values = [];

  fields.forEach(({ id, label }) => {
    const input = document.getElementById(id);
    const value = parseFloat(input?.value);
    if (isNaN(value) || value <= 0) {
      missing.push(label);
      values.push(null);
    } else {
      values.push(value);
    }
  });

  if (missing.length > 0) {
    const msg = 'ভুল : ' + missing.join(' ও ') + ' এর ঘরে সঠিক মান দিন।';
    displayErrorMessage(msg);
    return null;
  }

  return values;
}


//⛔⛔ ক্যালকুলেট.... 

function calculate() {
  let sqft = 0;
  const shape = shapeSelect.value;

  if (shape === 'rectangle') {
    const values = validateInputs([{ id: 'length', label: 'দৈর্ঘ্য' }, { id: 'width', label: 'প্রস্থ' }]);
    if (values === null) return;
    const [l, w] = values;
    sqft = l * w;

  } else if (shape === 'triangle') {
    const type = document.getElementById('triangleType').value;

    
      
      //⛔⛔ বিষমবাহু ত্রিভুজ.... 
    if (type === 'scalene') {
  const values = validateInputs([
    { id: 'a', label: '১ম বাহু A' },
    { id: 'b', label: '২য় বাহু B' },
    { id: 'c', label: '৩য় বাহু C' }
  ]);
  if (values === null) return;
  const [a, b, c] = values;

  // সব বাহু ভিন্ন কিনা চেক
  if (a === b || b === c || a === c) {
    displayErrorMessage("⚠️ অসমবাহু ত্রিভুজে A, B, C তিনটি বাহুর মান ভিন্ন হতে হবে।");
    return;
  }

  // ত্রিভুজ গঠন সম্ভব কিনা চেক
  if (a + b <= c || a + c <= b || b + c <= a) {
    displayErrorMessage("⚠️ দুঃখিত: এই মানগুলো দিয়ে বৈধ ত্রিভুজ গঠন সম্ভব নয়। যেকোনো দুই বাহুর যোগফল তৃতীয় বাহুর চেয়ে বড় হতে হবে।");
    return;
  }

  // ক্ষেত্রফল হিসাব (Heron's formula)
  const s = (a + b + c) / 2;
  sqft = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    
    
    
    
      //⛔⛔
    } else if (type === 'equilateral') {
      const values = validateInputs([{ id: 'a', label: 'বাহু' }]);
      if (values === null) return;
      const [a] = values;
      sqft = (Math.sqrt(3) / 4) * a * a;

      
      
      //⛔⛔ সমদ্বিবাহু ত্রিভুজ......
      } else if (type === 'isosceles') {
  const values = validateInputs([
    { id: 'a', label: 'সমান বাহু' },
    { id: 'b', label: 'ভিন্ন বাহু' }
  ]);
  if (values === null) return;
  const [a, b] = values;

  // সমবাহু হয়ে গেলে বাতিল
  if (a === b) {
    displayErrorMessage("⚠️ দুইটি সমান বাহুর মান A ও একটি ভিন্ন বাহু B এর মান দিন। আপনি যা দিয়েছেন তা সমবাহু হয়েগেছে।");
    return;
  }

  // ত্রিভুজ গঠনের শর্ত চেক: 2a > b
  if (2 * a <= b) {
    displayErrorMessage("⚠️ দুঃখিত: এই মানগুলো দিয়ে বৈধ ত্রিভুজ গঠন সম্ভব নয়। ত্রিভুজ গঠনের শর্ত হল- দু'টি বাহুর যোগফল অপর বাহুর চেয়ে বড় হতে হবে।");
    return;
  }

  // ক্ষেত্রফল হিসাব
  const height = Math.sqrt(a * a - (b * b) / 4);
  sqft = 0.5 * b * height;
}
    

    
    
    
    //⛔⛔⛔⛔⛔
  } else if (shape === 'rightTriangle') {
    let a = parseFloat(document.getElementById('base').value);
    let b = parseFloat(document.getElementById('height').value);
    let h = parseFloat(document.getElementById('rt_hypotenuse').value);
    let angle = parseFloat(document.getElementById('rt_angle').value);
    const toRad = deg => deg * Math.PI / 180;
    let θ = !isNaN(angle) ? toRad(angle) : null;
    let explanation = '';

    let countValid = 0;
[a, b, h, angle].forEach(val => {
  if (!isNaN(val) && val > 0) countValid++;
});

if (countValid < 2) {
  displayErrorMessage("কমপক্ষে দুটি সঠিক মান দিন (যেমন: বেইজ ও উচ্চতা, অথবা এক বাহু ও কোণ)।");
  return;
}

    if (θ !== null && !isNaN(a)) {
      b = a * Math.tan(θ);
      h = a / Math.cos(θ);
      explanation = `বেইজ ${a.toFixed(2)} ও কোণ ${angle}° থেকে উচ্চতা ও কর্ণ হিসাব।`;
    } else if (θ !== null && !isNaN(b)) {
      a = b / Math.tan(θ);
      h = b / Math.sin(θ);
      explanation = `উচ্চতা ${b.toFixed(2)} ও কোণ ${angle}° থেকে বেইজ ও কর্ণ হিসাব।`;
    } else if (θ !== null && !isNaN(h)) {
      a = h * Math.cos(θ);
      b = h * Math.sin(θ);
      explanation = `কর্ণ ${h.toFixed(2)} ও কোণ ${angle}° থেকে বেইজ ও উচ্চতা হিসাব।`;
    } else if (!isNaN(a) && !isNaN(b)) {
      h = Math.sqrt(a * a + b * b);
      explanation = `বেইজ ${a} + উচ্চতা ${b} → কর্ণ = ${h.toFixed(2)} (পিথাগোরাস সূত্র)।`;
    } else if (!isNaN(a) && !isNaN(h) && h > a) {
      b = Math.sqrt(h * h - a * a);
      explanation = `কর্ণ ${h} + বেইজ ${a} → উচ্চতা = ${b.toFixed(2)} (পিথাগোরাস সূত্র)।`;
    } else if (!isNaN(b) && !isNaN(h) && h > b) {
      a = Math.sqrt(h * h - b * b);
      explanation = `কর্ণ ${h} + উচ্চতা ${b} → বেইজ = ${a.toFixed(2)} (পিথাগোরাস সূত্র)।`;
    }

    if (!isNaN(a) && !isNaN(b)) {
      sqft = 0.5 * a * b;
    }

    let resultText = '';
    if (!isNaN(a)) resultText += `বেইজ: ${a.toFixed(2)} ফুট<br>`;
    if (!isNaN(b)) resultText += `উচ্চতা: ${b.toFixed(2)} ফুট<br>`;
    if (!isNaN(h)) resultText += `কর্ণ: ${h.toFixed(2)} ফুট<br>`;
    if (!isNaN(angle)) resultText += `কোণ: ${angle}°<br>`;
    if (sqft > 0) resultText += `ক্ষেত্রফল: ${sqft.toFixed(2)} বর্গফুট<br>`;
    if (explanation) resultText += `<br>🧮 ব্যাখ্যা:<br>${explanation}`;
    document.getElementById('hypotenuse').innerHTML = resultText;

  } else if (shape === 'circle') {
    const values = validateInputs([{ id: 'radius', label: 'ব্যাসার্ধ' }]);
    if (values === null) return;
    const [r] = values;
    sqft = Math.PI * r * r;

  } else if (shape === 'trapezium') {
    const values = validateInputs([{ id: 'base1', label: 'উপরের ভূমি' }, { id: 'base2', label: 'নীচের ভূমি' }, { id: 'height', label: 'উচ্চতা' }]);
    if (values === null) return;
    const [b1, b2, h] = values;
    sqft = 0.5 * (b1 + b2) * h;

  } else if (shape === 'quadrilateral') {
    const values = validateInputs([{ id: 'qa', label: 'বাহু A' }, { id: 'qb', label: 'বাহু B' }, { id: 'qc', label: 'বাহু C' }, { id: 'qd', label: 'বাহু D' }, { id: 'angle', label: 'কোণ θ' }]);
    if (values === null) return;
    const [a, b, c, d, angle] = values;
    const s = (a + b + c + d) / 2;
    const rad = angle * Math.PI / 180;
    sqft = Math.sqrt((s - a)*(s - b)*(s - c)*(s - d) - a*b*c*d*Math.pow(Math.cos(rad / 2), 2));

  } else if (shape === 'square') {
    const values = validateInputs([{ id: 'side', label: 'বাহু' }]);
    if (values === null) return;
    const [s] = values;
    sqft = s * s;

  } else if (shape === 'parallelogram') {
    const values = validateInputs([{ id: 'base', label: 'ভূমি' }, { id: 'height', label: 'উচ্চতা' }]);
    if (values === null) return;
    const [base, height] = values;
    sqft = base * height;

  } else if (shape === 'rhombus') {
    const values = validateInputs([{ id: 'd1', label: 'প্রথম কর্ণ' }, { id: 'd2', label: 'দ্বিতীয় কর্ণ' }]);
    if (values === null) return;
    const [d1, d2] = values;
    sqft = 0.5 * d1 * d2;
  }

  const shotok = sqft / 435.6;
  const katha = sqft / 720;
  const bigha = shotok / 33;
  const acre = sqft / 43560;

  document.getElementById('area').innerText = `মোট স্কয়ার ফুট: ${sqft.toFixed(2)} ft²`;
  document.getElementById('shotok').innerText = `≈ ${shotok.toFixed(4)} শতক`;
  document.getElementById('katha').innerText = `≈ ${katha.toFixed(4)} কাঠা`;
  document.getElementById('bigha').innerText = `≈ ${bigha.toFixed(4)} বিঘা`;
  document.getElementById('acre').innerText = `≈ ${acre.toFixed(4)} একর`;

  if (shape !== 'rightTriangle') {
    document.getElementById('hypotenuse').innerText = '';
  }

  document.getElementById('results').style.display = 'block';
}




//⛔⛔⛔ নীচে হেডারের js..... 

// ড্রপডাউন টগল (বাম ও ডান মেনুর জন্য)
document.querySelectorAll('.menu-icon-left, .menu-icon-right').forEach(icon => {
  icon.addEventListener('click', function (e) {
    e.stopPropagation(); // বাইরের ক্লিক আটকায়
    const parent = this.closest('.menu-section');

    // অন্য ড্রপডাউন বন্ধ করে শুধু বর্তমানটা খোলা রাখি
    document.querySelectorAll('.menu-section').forEach(section => {
      if (section !== parent) {
        section.classList.remove('show-dropdown');
      }
    });

    parent.classList.toggle('show-dropdown');
  });
});

// বাইরে ক্লিক করলে সব ড্রপডাউন বন্ধ হয়
document.addEventListener('click', () => {
  document.querySelectorAll('.menu-section').forEach(section => {
    section.classList.remove('show-dropdown');
  });
});

// রিফ্রেশ বাটনের কাজ (যদি পেজ রিফ্রেশ চাও)
document.querySelector('.refresh-btn')?.addEventListener('click', () => {
  location.reload();
});

