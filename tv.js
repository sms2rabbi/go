document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('triangleCanvas');

  const points = [
    { x: 20, y: 80 },  // A
    { x: 50, y: 20 },  // B
    { x: 80, y: 80 }   // C
  ];

  const linePoints = [
    [points[0], points[1]], // AB
    [points[1], points[2]], // BC
    [points[2], points[0]]  // CA
  ];

  const lineElements = [];

  // Create lines
  linePoints.forEach(([p1, p2]) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.style.stroke = 'white';
    line.style.strokeWidth = '2';
    svg.appendChild(line);
    lineElements.push(line);
  });

  // Add point labels (A, B, C)
  points.forEach((point, i) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', point.x);

    // 🔻🔻🔻 এই লাইনে পরিবর্তন: B (i === 1) হলে 5px নিচে নামানো 🔻🔻🔻
    text.setAttribute('y', i === 1 ? point.y - 3 : point.y - 8); 
    // ⬆️ A ও C এর জন্য আগের মতোই থাকবে, শুধু B একটু নিচে

    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '10');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-weight', 'bold');
    text.textContent = String.fromCharCode(65 + i); // A, B, C
    svg.appendChild(text);
  });

  function animateLine(line, duration) {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.animation = 'none';
    void line.offsetWidth;
    line.style.animation = `drawLine ${duration}s ease forwards`;
  }

  let orderIndex = 0;
  const orders = [
    [0, 1, 2], // AB, BC, CA
    [2, 1, 0], // CA, BC, AB (reverse)
    [1, 2, 0], // BC, CA, AB
    [1, 0, 2]  // BC, AB, CA
  ];

  function animateTriangleLoop() {
    let currentOrder = orders[orderIndex % orders.length];
    let i = 0;

    function drawNextLine() {
      const line = lineElements[currentOrder[i]];
      animateLine(line, 4.5); // ✴️ চাইলে এটাও স্লো করতে পারো
      i++;

      if (i < currentOrder.length) {
        setTimeout(drawNextLine, 4500); // ✴️ এটা Delay প্রতি লাইনের পরে
      } else {
        setTimeout(() => {
          // Reset lines
          lineElements.forEach(line => {
            line.style.animation = 'none';
            line.style.strokeDashoffset = line.getTotalLength();
          });

          orderIndex++; // Move to next order
          animateTriangleLoop(); // Loop again
        }, 5000); // ✴️ এটা হচ্ছে লাইন শেষ হওয়ার পর বিশ্রামের সময়
      }
    }

    drawNextLine();
  }

  animateTriangleLoop();
});


//⛔⛔ উপরে হিরোনস ক্যালকুল্যাটর কোড⛔⛔ 


//⛔⛔⛔ উপরে ত্রিভুজ অঙ্কন। ⬆️⬆️

(() => {
  const svg = document.getElementById('triangleCanvas');
  if (!svg) return;

  const labels = svg.querySelectorAll('text');
  if (labels.length === 0) return;

  // প্রথমে সব লেবেলে CSS ট্রানজিশন বসাই (transform ও opacity জন্য)
  labels.forEach(label => {
    label.style.transition = 'transform 0.05s ease, opacity 0.05s ease';
  });

  let opacity = 0;
  let increasing = true;
  let translateY = 0;
  let moveDown = true;

  setInterval(() => {
    labels.forEach(label => {
      label.style.opacity = opacity;
      label.style.transform = `translateY(${translateY}px)`;
    });

    // opacity control
    if (increasing) {
      opacity += 0.02;
      if (opacity >= 1) increasing = false;
    } else {
      opacity -= 0.02;
      if (opacity <= 0) increasing = true;
    }

    // translateY control for up-down movement
    if (moveDown) {
      translateY += 0.2;
      if (translateY >= 5) moveDown = false;
    } else {
      translateY -= 0.2;
      if (translateY <= -5) moveDown = true;
    }
  }, 50);
})();


//⛔⛔⛔ উপরে ত্রিভুজ অঙ্কন। ⬆️⬆️

//⛔⛔⛔ নিচে heron's foromula টেক্স ⬇️⬇️

const box = document.getElementById("animationBox");

    function getRandomTriangle() {
      let a, b, c;
      do {
        a = Math.floor(Math.random() * 15) + 5;
        b = Math.floor(Math.random() * 15) + 5;
        c = Math.floor(Math.random() * 15) + 5;
      } while (!(a + b > c && a + c > b && b + c > a)); // Valid triangle condition
      return [a, b, c];
    }

    function runAnimation() {
      const [a, b, c] = getRandomTriangle();
      const s = ((a + b + c) / 2).toFixed(2);
      const inside = (s * (s - a) * (s - b) * (s - c));
      const area = Math.sqrt(inside).toFixed(2);

      const steps = [
        `ধরা যাক, তিনটি বাহু: A = ${a}, B = ${b}, C = ${c}`,
        `অর্ধপরিসীমা: S = (a + b + c) / 2 = (${a} + ${b} + ${c}) / 2 = ${s}`,
        `Heron সূত্র: Area = √[s(s-a)(s-b)(s-c)]`,
        `→ Area = √[${s} × (${s} - ${a}) × (${s} - ${b}) × (${s} - ${c})]`,
        `→ Area = √[${s} × ${(s - a).toFixed(2)} × ${(s - b).toFixed(2)} × ${(s - c).toFixed(2)}]`,
        `→ Area = √[${inside.toFixed(2)}]`,
        `→ Area ≈ ${area} বর্গ একক`,
        `✅ তিন বাহু দ্বারা নির্ণীত ত্রিভুজের ক্ষেত্রফল ≈ ${area}`
      ];

      box.innerHTML = ''; // Clear previous

      steps.forEach((text, index) => {
        const line = document.createElement('div');
        line.className = 'step-line';
        line.textContent = text;
        box.appendChild(line);

        setTimeout(() => {
          line.classList.add('show');
        }, index * 2000);
      });

      const totalDuration = steps.length * 2000 + 2000;
      setTimeout(runAnimation, totalDuration); // Loop again
    }

    runAnimation();

