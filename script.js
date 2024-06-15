document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const clicksElement = document.getElementById('clicks');
    const startButton = document.getElementById('startButton');
    let circles = [];
    let nextId = 0;
    let clicks = 0;
    let testStarted = false;
    let testFinished = false;
    let startTime;
  
    function startGame() {
      if (!testStarted) {
        testStarted = true;
        startButton.disabled = true;
        clicks = 0;
        clicksElement.textContent = clicks;
        circles = [];
        startButton.textContent = 'Test in progress...';
        setTimeout(finishTest, 10000); // Test duration: 10 seconds
        addCircle();
      }
    }
  
    function finishTest() {
      testFinished = true;
      startButton.disabled = false;
      startButton.textContent = 'Start Test';
      alert(`Test finished! Clicks: ${clicks}`);
      testStarted = false;
      testFinished = false;
    }
  
    function addCircle() {
      if (!testFinished) {
        const radius = 25;
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = Math.random() * (canvas.height - 2 * radius) + radius;
        const newCircle = { id: nextId++, x, y, radius };
  
        circles.push(newCircle);
        drawCircle(newCircle);
      }
    }
  
    canvas.addEventListener('click', (event) => {
      if (testStarted && !testFinished) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        for (let i = 0; i < circles.length; i++) {
          const circle = circles[i];
          const distance = Math.sqrt((circle.x - x) ** 2 + (circle.y - y) ** 2);
          if (distance < circle.radius) {
            circles.splice(i, 1);
            clicks++;
            clicksElement.textContent = clicks;
            redrawCanvas();
            addCircle();
            break;
          }
        }
      }
    });
  
    function drawCircle(circle) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }
  
    function redrawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const circle of circles) {
        drawCircle(circle);
      }
    }
  
    startButton.addEventListener('click', startGame);
  });
  