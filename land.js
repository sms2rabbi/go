const inputsDiv = document.getElementById('inputs');
const shapeSelect = document.getElementById('shape');
const inputsDiv2 = document.getElementById('inputs2');
const shapeSelect2 = document.getElementById('shape2');
const inputsDiv3 = document.getElementById('inputs3');
const shapeSelect3 = document.getElementById('shape3');

const allInputDivs = [inputsDiv, inputsDiv2, inputsDiv3];

function clearOtherSectionsInputs(currentDiv) {
  allInputDivs.forEach(div => {
    if (div !== currentDiv) {
      const inputs = div.querySelectorAll('input');
      inputs.forEach(input => {
        input.value = '';
      });
    }
  });
}

// এখানে তোমার event listener গুলো
shapeSelect.addEventListener('change', () => {
  renderInputs(shapeSelect.value, inputsDiv);
});

shapeSelect2.addEventListener('change', () => renderInputs(shapeSelect2.value, inputsDiv2));

shapeSelect3.addEventListener('change', () => renderInputs(shapeSelect3.value, inputsDiv3));

// ✨ নতুন অংশ: ইনপুট এভেন্ট লিসেনার লাগানো
allInputDivs.forEach(div => {
  div.addEventListener('input', () => {
    clearOtherSectionsInputs(div);
  });
});

window.onload = () => {
  renderInputs(shapeSelect.value, inputsDiv);
  renderInputs(shapeSelect2.value, inputsDiv2);
  renderInputs(shapeSelect3.value, inputsDiv3);
};



//⛔⛔ renderInputs function
function renderInputs(shape, targetDiv) {
  if (!targetDiv) return;

  if (shape === 'rectangle') {
    targetDiv.innerHTML = `
      <label class="common-text2">দৈর্ঘ্য (ফুট):</label>
      <input type="number" id="rectangle_length">
      <label class="common-text2">প্রস্থ (ফুট):</label>
      <input type="number" id="rectangle_width">
    `;
    
    
  } else if (shape === 'triangle') {
    targetDiv.innerHTML = `
      <label class="onlyone">ত্রিভুজের বাহু নির্বাচন করুন</label>
      <select id="triangleType">
        <option value="scalene">অসমবাহু</option>
        <option value="equilateral">সমবাহু</option>
        <option value="isosceles">সমদ্বিবাহু</option>
      </select>
      <div id="triangleInputs"></div>
    `;
    
    
    const triangleType = targetDiv.querySelector('#triangleType');
    triangleType.addEventListener('change', renderTriangleInputs);
    renderTriangleInputs();
    
  } else if (shape === 'rightTriangle') {
    targetDiv.innerHTML = `
      <label class="common-text2">বেইজ (ফুট):</label>
      <input type="number" id="rt_base">
      <label class="common-text2">উচ্চতা (ফুট):</label>
      <input type="number" id="rt_height">
      <label class="common-text2">কর্ণ (Hypotenuse) (ফুট):</label>
      <input type="number" id="rt_hypotenuse" placeholder="অতিভূজ">
      <label class="common-text2">কোণ (Angle θ) (ডিগ্রি):</label>
      <input type="number" id="rt_angle" placeholder="কোণ θ">
    `;
    
    
  } else if (shape === 'circle') {
  targetDiv.innerHTML = `
    <div id="circleInputs"></div>
  `;
  renderCircleInputs(); 
    
    
  } else if (shape === 'trapezium') {
    targetDiv.innerHTML = `
      <label class="common-text2">উপরের ভূমি (base1) (ফুট):</label>
      <input type="number" id="trapezium_base1">
      <label class="common-text2">নিচের ভূমি (base2) (ফুট):</label>
      <input type="number" id="trapezium_base2">
      <label class="common-text2">উচ্চতা (ফুট):</label>
      <input type="number" id="trapezium_height">
    `;
  } else if (shape === 'parallelogram') {
    targetDiv.innerHTML = `
      <label class="common-text2">ভূমি (ফুট):</label>
      <input type="number" id="parallelogram_base">
      <label class="common-text2">উচ্চতা (ফুট):</label>
      <input type="number" id="parallelogram_height">
    `;
  } else if (shape === 'rhombus') {
    targetDiv.innerHTML = `
      <label for="rhombus_diagonal1" class="common-text2">প্রথম কর্ণ A1 (ফুট):</label>
      <input type="number" id="rhombus_diagonal1" placeholder="প্রথম কর্ণ দিন">
      <label for="rhombus_diagonal2" class="common-text2">দ্বিতীয় কর্ণ A2 (ফুট):</label>
      <input type="number" id="rhombus_diagonal2" placeholder="দ্বিতীয় কর্ণ দিন">
    `;
  } else if (shape === 'square') {
    targetDiv.innerHTML = `
      <label class="common-text2">বাহু (ফুট):</label>
      <input type="number" id="square_side">
    `;
  }
}

// ✅ renderCircleInputs function (for dynamic input inside circleInputs)
function renderCircleInputs() {
  const baseType = document.getElementById('baseType').value;
  const inputDiv = document.getElementById('circleInputs');

  if (baseType === 'radius') {
    inputDiv.innerHTML = `
      <label class="common-text2">ব্যাসার্ধ (ফুট):</label>
      <input type="number" id="radius">
    `;
  } else if (baseType === 'diameter') {
    inputDiv.innerHTML = `
      <label class="common-text2">ব্যাস (ফুট):</label>
      <input type="number" id="diameter">
    `;
  } else if (baseType === 'circumference') {
    inputDiv.innerHTML = `
      <label class="common-text2">পরিধি (ফুট):</label>
      <input type="number" id="circumference">
    `;
  }
}

function renderTriangleInputs() {
  const type = document.getElementById('triangleType').value;
  const div = document.getElementById('triangleInputs');

  if (type === 'scalene') {
    div.innerHTML = `
      <label class="common-text2">প্রথম বাহু A (ফুট):</label>
      <input type="number" id="a">
      <label class="common-text2">দ্বিতীয় বাহু B (ফুট):</label>
      <input type="number" id="b">
      <label class="common-text2">তৃতীয় বাহু C (ফুট):</label>
      <input type="number" id="c">
    `;
  } else if (type === 'equilateral') {
    div.innerHTML = `
      <label class="common-text2">বাহু a (ফুট):</label>
      <input type="number" id="a">
    `;
  } else if (type === 'isosceles') {
    div.innerHTML = `
      <label class="common-text2"> দুটি সমান বাহু A (ফুট):</label>
      <input type="number" id="a">
      <label class="common-text2"> একটি ভিন্ন বাহু B (ফুট):</label>
      <input type="number" id="b">
    `;
  }
}







//⛔⛔ নিচে Error মেসেজ।
let errorTimeout;

function hideErrorOnUserAction() {
  clearTimeout(errorTimeout);
  const errorDiv = document.getElementById('error');
  if (!errorDiv) return;

  console.log('Hide error triggered');
  errorDiv.innerText = '';
  errorDiv.style.display = 'none';
}

function displayErrorMessage(message = '') {
  const errorDiv = document.getElementById('error');
  if (!errorDiv) return;

  if (!errorDiv.hasAttribute('tabindex')) {
    errorDiv.setAttribute('tabindex', '-1');
  }

  clearTimeout(errorTimeout);

  if (message) {
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
    errorDiv.focus();

    if (!errorDiv.hasListenerAdded) {
      // ✅ Scroll, keydown, টাচ যেকোনো জায়গায় করলে error হাইড হবে
      window.addEventListener('scroll', hideErrorOnUserAction);
      window.addEventListener('keydown', hideErrorOnUserAction);
      window.addEventListener('touchstart', hideErrorOnUserAction); // ✅ main fix
      window.addEventListener('mousedown', hideErrorOnUserAction);  // optional: mouse click

      errorDiv.hasListenerAdded = true;
    }

    errorTimeout = setTimeout(hideErrorOnUserAction, 5000);
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


//⛔⛔⛔⛔ ক্যালকুলট.....
function calculate() {
  let sqft = 0;
  let extraInfo = '';  // এটা যোগ করলাম যাতে extraInfo পাস করতে পারি
  const shape = shapeSelect.value;

  if (shape === 'rectangle') {
    const values = validateInputs([
      { id: 'rectangle_length', label: 'দৈর্ঘ্য' },
      { id: 'rectangle_width', label: 'প্রস্থ' }
    ]);
    if (values === null) return;
    const [l, w] = values;
    sqft = l * w;

  } else if (shape === 'square') {
    const values = validateInputs([{ id: 'square_side', label: 'বাহু' }]);
    if (values === null) return;
    const [s] = values;
    sqft = s * s;

  } else if (shape === 'parallelogram') {
    const values = validateInputs([
      { id: 'parallelogram_base', label: 'ভূমি' },
      { id: 'parallelogram_height', label: 'উচ্চতা' }
    ]);
    if (values === null) return;
    const [b, h] = values;
    sqft = b * h;

  } else if (shape === 'trapezium') {
    const values = validateInputs([
      { id: 'trapezium_base1', label: 'উপরের ভূমি' },
      { id: 'trapezium_base2', label: 'নিচের ভূমি' },
      { id: 'trapezium_height', label: 'উচ্চতা' }
    ]);
    if (values === null) return;
    const [b1, b2, h] = values;
    sqft = 0.5 * (b1 + b2) * h;

  } else if (shape === 'rhombus') {
    const values = validateInputs([
      { id: 'rhombus_diagonal1', label: 'কর্ণ A1' },
      { id: 'rhombus_diagonal2', label: 'কর্ণ A2' }
    ]);
    if (values === null) return;
    
    const [d1, d2] = values;

    if (d1 <= 0 || d2 <= 0) {
      displayErrorMessage('❌ কর্ণের মান শূন্য বা ঋণাত্মক হতে পারে না।');
      return;
    }

    if (d1 === d2) {
      displayErrorMessage('⚠️ কর্ণ দুইটি সমান, এটি সম্ভবত বর্গ হতে পারে। তবে আপনি হিসাব চালিয়ে যেতে পারেন।');
    }

    sqft = 0.5 * d1 * d2;
  }
   displayAreaResults(sqft, '');
  
}



//⛔⛔⛔ ত্রিভুজ নিচে.....
function calculate2() {
  let sqft = 0;
  const shape = shapeSelect2.value;

  if (shape === 'triangle') {
    const type = document.getElementById('triangleType').value;

    if (type === 'scalene') {
      const values = validateInputs([
        { id: 'a', label: '১ম বাহু A' },
        { id: 'b', label: '২য় বাহু B' },
        { id: 'c', label: '৩য় বাহু C' }
      ]);
      if (values === null) return;
      const [a, b, c] = values;

      if (a === b || b === c || a === c) {
        displayErrorMessage("⚠️ অসমবাহু ত্রিভুজে A, B, C তিনটি বাহুর মান ভিন্ন হতে হবে।");
        return;
      }

      if (a + b <= c || a + c <= b || b + c <= a) {
        displayErrorMessage("⚠️ এই মান দিয়ে বৈধ ত্রিভুজ গঠন সম্ভব নয়।");
        return;
      }

      const s = (a + b + c) / 2;
      sqft = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    } else if (type === 'equilateral') {
      const values = validateInputs([{ id: 'a', label: 'বাহু' }]);
      if (values === null) return;
      const [a] = values;
      sqft = (Math.sqrt(3) / 4) * a * a;

    } else if (type === 'isosceles') {
      const values = validateInputs([
        { id: 'a', label: 'সমান বাহু' },
        { id: 'b', label: 'ভিন্ন বাহু' }
      ]);
      if (values === null) return;
      const [a, b] = values;

      if (a === b) {
        displayErrorMessage("⚠️ দুইটি সমান বাহুর মান A ও একটি ভিন্ন বাহু B এর মান দিন।");
        return;
      }

      if (2 * a <= b) {
        displayErrorMessage("⚠️ বৈধ ত্রিভুজ গঠন সম্ভব নয়।");
        return;
      }

      const height = Math.sqrt(a * a - (b * b) / 4);
      sqft = 0.5 * b * height;
    }

    // SAS case with optional angle
    const aInput = parseFloat(document.getElementById('a')?.value);
    const bInput = parseFloat(document.getElementById('b')?.value);
    const angleDeg = parseFloat(document.getElementById('triangle_angle1_optional')?.value);

    if (!isNaN(aInput) && !isNaN(bInput) && !isNaN(angleDeg) && angleDeg > 0 && angleDeg < 180) {
      const angleRad = angleDeg * Math.PI / 180;
      sqft = 0.5 * aInput * bInput * Math.sin(angleRad);
    }

    
  //⛔⛔  সমকোণী ত্রিভুজ
    
    } else if (shape === 'rightTriangle') {
    let a = parseFloat(document.getElementById('rt_base').value);
    let b = parseFloat(document.getElementById('rt_height').value);
    let h = parseFloat(document.getElementById('rt_hypotenuse').value);
    let angle = parseFloat(document.getElementById('rt_angle').value);
    const toRad = deg => deg * Math.PI / 180;
    const toDeg = rad => rad * 180 / Math.PI;
    let θ = !isNaN(angle) ? toRad(angle) : null;
    let explanation = '';

    let countValid = 0;
    [a, b, h, angle].forEach(val => {
      if (!isNaN(val) && val > 0) countValid++;
    });

    if (countValid < 2) {
      let missing = [];
      if (isNaN(a) || a <= 0) missing.push("বেইজ");
      if (isNaN(b) || b <= 0) missing.push("উচ্চতা");
      if (isNaN(h) || h <= 0) missing.push("কর্ণ");
      if (isNaN(angle) || angle <= 0) missing.push("কোণ");

      let msg = "কমপক্ষে দুটি সঠিক মান দিন। উদাহরণস্বরূপ, ";
      if (missing.length === 4) {
        msg = "সর্বনিম্ন দুটি ইনপুট দিন: যেমন বেইজ ও উচ্চতা, বা এক বাহু ও কোণ।";
      } else if (missing.length === 3) {
        msg = `আরো একটি ইনপুট প্রয়োজন: ${missing.join(", ")} এর যেকোনো একটি দিন।`;
      } else {
        msg = `এই ইনপুট গুলো দরকার: ${missing.join(", ")}। অন্তত দুটি দিন।`;
      }

      displayErrorMessage("⚠️ " + msg);
      return;
    }

    // কোণের মান যাচাই
    if (!isNaN(angle) && (angle <= 0 || angle >= 90)) {
      displayErrorMessage("⚠️ কোণের মান ০ থেকে ৯০-এর মধ্যে হতে হবে।");
      return;
    }

    // অতিভুজ যাচাই
    if (!isNaN(h)) {
      if (!isNaN(a) && h <= a) {
        displayErrorMessage("অতিভুজ অবশ্যই বেইজ থেকে বড় হতে হবে।");
        return;
      }
      if (!isNaN(b) && h <= b) {
        displayErrorMessage("অতিভুজ অবশ্যই উচ্চতা থেকে বড় হতে হবে।");
        return;
      }
    }

    // কোণ ও এক বাহু থেকে অন্য দুটি নির্ণয়
    if (θ !== null) {
  if (!isNaN(a)) {
    b = a * Math.tan(θ);
    h = a / Math.cos(θ);
    explanation = `বেইজ ${a.toFixed(2)} ও কোণ ${angle}° থেকে উচ্চতা ও কর্ণ হিসাব।`;
  } else if (!isNaN(b)) {
    a = b / Math.tan(θ);
    h = b / Math.sin(θ);
    explanation = `উচ্চতা ${b.toFixed(2)} ও কোণ ${angle}° থেকে বেইজ ও কর্ণ হিসাব।`;
  } else if (!isNaN(h)) {
    a = h * Math.cos(θ);
    b = h * Math.sin(θ);
    explanation = `কর্ণ ${h.toFixed(2)} ও কোণ ${angle}° থেকে বেইজ ও উচ্চতা হিসাব।`;
  }
}

// তিনটি ভিন্ন ভিন্ন কেস চেক করে মান বের করা
if (!isNaN(a) && !isNaN(b)) {
  h = Math.sqrt(a * a + b * b);
  θ = Math.atan(b / a);
  angle = toDeg(θ);
  document.getElementById('rt_angle').value = angle.toFixed(2);
  explanation = `বেইজ ${a} + উচ্চতা ${b} → কর্ণ = ${h.toFixed(2)} (সূত্র: পিথাগোরাস), কোণ = ${angle.toFixed(2)}°`;
} else if (!isNaN(a) && !isNaN(h) && h > a) {
  b = Math.sqrt(h * h - a * a);
  explanation = `কর্ণ ${h} + বেইজ ${a} → উচ্চতা = ${b.toFixed(2)} (সূত্র: পিথাগোরাস)।`;
} else if (!isNaN(b) && !isNaN(h) && h > b) {
  a = Math.sqrt(h * h - b * b);
  explanation = `কর্ণ ${h} + উচ্চতা ${b} → বেইজ = ${a.toFixed(2)} (সূত্র: পিথাগোরাস)।`;
}

if (!isNaN(a) && !isNaN(b)) {
  sqft = 0.5 * a * b;
}

      
      
      
    let resultText = '';
    if (!isNaN(a)) resultText += `বেইজ: ${a.toFixed(2)} ফুট<br>`;
    if (!isNaN(b)) resultText += `উচ্চতা: ${b.toFixed(2)} ফুট<br>`;
    if (!isNaN(h)) resultText += `কর্ণ: ${h.toFixed(2)} ফুট<br>`;
    if (!isNaN(angle)) resultText += `কোণ: ${angle.toFixed(2)}°<br>`;
    if (sqft > 0) resultText += `ক্ষেত্রফল: ${sqft.toFixed(2)} বর্গফুট<br>`;
    if (explanation) resultText += `<br>🧮 ব্যাখ্যা:<br>${explanation}`;
    document.getElementById('hypotenuse').innerHTML = resultText;
  }

  // যদি rightTriangle না হয়, তাহলে hypotenuse result খালি করো
  if (shape !== 'rightTriangle') {
    document.getElementById('hypotenuse').innerText = '';
  }

  displayAreaResults(sqft, '');
}


  
  


//⬇️⬇️⬇️⬇️ নিচে কমন ফিল্ড ⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔
// ✅ ✅ ✅ কমন স্কয়ারফিট রেজাল্ট ফাংশন

function displayAreaResults(sqft, extraInfo = '') {
  if (sqft > 0) {
    const shotok = sqft / 435.6;
    const katha = sqft / 720;
    const bigha = shotok / 33;
    const acre = sqft / 43560;

    document.getElementById('area').innerHTML = `
      মোট স্কয়ার ফুট: ${sqft.toFixed(2)} ft²
      ${extraInfo ? `<br>${extraInfo}` : ''}
    `;
    document.getElementById('shotok').innerText = `≈ ${shotok.toFixed(4)} শতক`;
    document.getElementById('katha').innerText = `≈ ${katha.toFixed(4)} কাঠা`;
    document.getElementById('bigha').innerText = `≈ ${bigha.toFixed(4)} বিঘা`;
    document.getElementById('acre').innerText = `≈ ${acre.toFixed(4)} একর`;
    document.getElementById('results').style.display = 'block';
  }
}


//⬆️⬆️⬆️ উপরে কমন ফিল্ড ⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔







//⛔⛔⛔ বৃত্ত........
function calculate3() {
  const baseType = document.getElementById('baseType').value;

  let sqft = 0;
  let extraInfo = '';

  if (baseType === 'radius') {
    const values = validateInputs([{ id: 'radius', label: 'ব্যাসার্ধ' }]);
    if (values === null) return;
    const [radius] = values;
    sqft = Math.PI * radius * radius;
    extraInfo = `ব্যাস: ${(2 * radius).toFixed(2)} ফুট`;

  } else if (baseType === 'diameter') {
    const values = validateInputs([{ id: 'diameter', label: 'ব্যাস' }]);
    if (values === null) return;
    const [diameter] = values;
    const radius = diameter / 2;
    sqft = Math.PI * radius * radius;
    extraInfo = `ব্যাসার্ধ: ${radius.toFixed(2)} ফুট`;

  } else if (baseType === 'circumference') {
    const values = validateInputs([{ id: 'circumference', label: 'পরিধি' }]);
    if (values === null) return;
    const [circumference] = values;
    const radius = circumference / (2 * Math.PI);
    sqft = Math.PI * radius * radius;
    extraInfo = `ব্যাসার্ধ: ${radius.toFixed(2)} ফুট, ব্যাস: ${(2 * radius).toFixed(2)} ফুট`;

  } else {
    displayErrorMessage('ভুল ভিত্তির ধরন নির্বাচিত হয়েছে।');
    return;
  }

  displayAreaResults(sqft, extraInfo);
}

//⛔⛔⛔ All end. ⬆️⬆️⬆️

//রেজাল্ট বক্সকে ডায়নামিক্যালি সেকশনের বটমে নেয়া হয়েছে।

document.addEventListener('DOMContentLoaded', () => {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;

  const buttons = document.querySelectorAll('.calculate-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      let currentSection = button.closest('.section');
      if (!currentSection) return;

      let inputsDiv = currentSection.querySelector('div[id^="inputs"]');
      if (!inputsDiv) return;

      // ইনপুট ফাঁকা আছে কিনা চেক করার জন্য
      const inputs = inputsDiv.querySelectorAll('input');
      let allEmpty = true;
      inputs.forEach(input => {
        if (input.value.trim() !== '') {
          allEmpty = false;
        }
      });

      if (allEmpty) {
        resultsDiv.style.display = 'none';
        resultsDiv.querySelectorAll('p').forEach(p => p.innerText = '');
        return;
      }

      // এখন resultsDiv কে currentSection এর parent এর মধ্যে currentSection এর পর সরিয়ে দাও
      const parent = currentSection.parentNode;
      if (currentSection.nextSibling) {
        parent.insertBefore(resultsDiv, currentSection.nextSibling);
      } else {
        parent.appendChild(resultsDiv);
      }

      resultsDiv.style.display = 'block';
    });
  });
});
 


//🚫🚫🚫🚫🚫 নিচে হেডার। 

document.addEventListener("DOMContentLoaded", function () {
  const leftIcon = document.querySelector(".menu-icon-left");
  const rightIcon = document.querySelector(".menu-icon-right");
  const leftDropdown = document.querySelector(".menu-left .dropdown");
  const rightDropdown = document.querySelector(".menu-right .dropdown");

  leftIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    leftDropdown.style.display =
      leftDropdown.style.display === "flex" ? "none" : "flex";
    rightDropdown.style.display = "none";
  });

  rightIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    rightDropdown.style.display =
      rightDropdown.style.display === "flex" ? "none" : "flex";
    leftDropdown.style.display = "none";
  });

  document.addEventListener("click", function () {
    leftDropdown.style.display = "none";
    rightDropdown.style.display = "none";
  });

  // Refresh button
  const refreshBtn = document.querySelector(".refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      location.reload();
    });
  }
});
